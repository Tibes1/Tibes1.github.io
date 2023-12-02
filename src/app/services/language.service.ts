import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, map, switchMap } from 'rxjs';
import { Content, Language } from '../Language';

import { environment } from '../env';

import {OpenAI} from "openai";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  callsRemaining: number = 1; // Defina o número máximo de chamadas permitidas

  lang:string = navigator.language
  language:Array<Language> = []
  selectedLanguage!:Language; 
  content!:Content

  private languageUpdateSubject = new Subject<void>();
  languageUpdate$ = this.languageUpdateSubject.asObservable();

  openai:any = new OpenAI({
    apiKey: environment.apiKey,
    //apiKey: 'fake api key',
    dangerouslyAllowBrowser: true 
  });

  url = `http://localhost:3000/languages`; // api rest fake
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  fullLog() {
    console.log("teste: 1")
    console.log(this.language)
    console.log("teste: 2")
    console.log(this.lang)
    console.log("teste: 3")
    console.log(this.language[0])
    console.log("teste: 4")
    console.log(this.selectedLanguage)
    console.log("teste: 5")
    console.log(this.content)
    console.log("teste: 6")
    console.log(this.content.about.call)
  }

  updateLanguageData(data: any): void {
    this.language = data;
    this.selectedLanguage = data[0];
    this.content = data[0].content;
    this.fullLog();

    //enviar dados para app.component.ts
    this.languageUpdateSubject.next();
  }

  // Obtem todos as linguagens
  getLanguages(): Observable<Language[]> {
    return this.httpClient.get<Language[]>(this.url)
  }

  // Obtem uma linguagem pelo id
  getLanguageById(id: number): Observable<Language> {
    
    return this.httpClient.get<Language>(this.url + '/' + id)
  }

  // salva uma linguagem
  saveLanguage( language: any): Observable<any> {
    console.log(language)

    return this.httpClient.post((this.url ), language, this.httpOptions)
  }

  // utualiza uma linguagem
  updateLanguage(language: Language): Observable<Language> {
    return this.httpClient.put<Language>(this.url + '/' + language, JSON.stringify(language), this.httpOptions)
  }

  // deleta uma linguagem
  deleteLanguage(language: Language) {
    return this.httpClient.delete<Language>(this.url + '/' + language, this.httpOptions)
  }

  
  getLanguageByLang() : Promise<Array<Language>> {
    console.log('passo :3');

  
    return new Promise<Array<Language>>((resolve, reject) => {
      this.httpClient.get<Language>(this.url + '?lang=' + this.lang)
        .subscribe(
          (data: any) => {
            if (data.length === 0) {
              if (this.callsRemaining > 0) {
                this.callsRemaining--;
                
                // O array está vazio, chama a função para criar uma nova tradução
                this.mainGPT(this.lang).subscribe(
                  (newTranslation: Language) => {
                    this.updateLanguageData([newTranslation]);
                    resolve(this.language); // Resolvendo a promise com os dados da linguagem
                  },
                  (error: any) => {
                    console.error(error);
                    reject(error); // Rejeitando a promise com o erro
                  }
                );
                
              } else {
                console.log('Limite de chamadas excedido. Aguarde para evitar exceder os limites da API.');
                resolve(this.language); // Retorna os dados já existentes
              }
            } else {
              this.updateLanguageData(data);
              resolve(this.language); // Resolvendo a promise com os dados da linguagem
            }
          },
          (error: any) => {
            console.error(error);
            reject(error); // Rejecting the promise with the error
          }
        );
    });
  }

  
  mainGPT(lang: string): any {
    let json: any;

    const APIreturn = this.httpClient.get<Language>(this.url + '?lang=en-US').pipe(
      switchMap((data: Language) => {
        this.updateLanguageData(data)
        console.log("teste1");
        json = JSON.stringify(data);
  
        console.log(json);
        console.log(lang);
        
        return this.openai.chat.completions.create({
          "model": "gpt-3.5-turbo",
          "messages":[
            {"role": "system", "content": "You are a  translator"},
            {"role": "user", "content": `translate the json to ${lang}: ${json}`}
          ]
        });

      }),
      map((completion: any) => {
        console.log("_____________________________________________");
        console.log(completion.choices[0]);
        // Retornando os dados da tradução criada
        return completion.choices[0];
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
    
    APIreturn.toPromise().then(result => {
      console.log(result)
      console.log(JSON.parse(result.message.content));
      this.updateLanguageData(JSON.parse(result.message.content))

      //gambiarra pra duplicated ID
      this.selectedLanguage.id = new Date().getTime()

      this.saveLanguage(this.selectedLanguage).subscribe(
        (response) => {
          console.log('API Response:', response);
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    })
  }
    

    
  
}