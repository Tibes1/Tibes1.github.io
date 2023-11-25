import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Content, Language } from '../Language';

import { environment } from '../env';

import {OpenAI} from "openai";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }
  
  lang:string = navigator.language
  language:Array<Language> = []
  selectedLanguage!:Language; 
  content!:Content


  openai:any = new OpenAI({
    apiKey: environment.apiKey,
    dangerouslyAllowBrowser: true 
  });



  mainGPT(lang:string) {
    let observable:Observable<Language>
    let json:any

    observable = this.httpClient.get<Language>(this.url +'?lang=en-US')

    observable.subscribe((data: Language) => {
      console.log("-------------")
      console.log("teste1")
      json = JSON.stringify(data)

      console.log(json)
      console.log(lang)

      const completion = this.openai.chat.completions.create({
        messages: [{ role: "system", content: `traduza para linguagem:${lang} o seguinte json:${json}`}],
        model: "gpt-3.5-turbo",
      });
      console.log("_____________________________________________")
      console.log(completion.choices[0]);
    });

    

  }

  url = `http://localhost:3000/languages`; // api rest fake


  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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
  saveLanguage(language: Language): Observable<Language> {
    return this.httpClient.post<Language>(this.url, JSON.stringify(language), this.httpOptions)
  }

  // utualiza uma linguagem
  updateLanguage(language: Language): Observable<Language> {
    return this.httpClient.put<Language>(this.url + '/' + language.id, JSON.stringify(language), this.httpOptions)
  }

  // deleta uma linguagem
  deleteLanguage(language: Language) {
    return this.httpClient.delete<Language>(this.url + '/' + language.id, this.httpOptions)
  }

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

  getLanguageByLang(): Promise<Array<Language>> {
    console.log('passo :3');
  
    return new Promise<Array<Language>>((resolve, reject) => {
      this.httpClient.get<Language>(this.url + '?lang=' + this.lang)
        .subscribe(
          (data: any) => {
            if (data[0] == null) {
              console.log('language do not exist')
            } 
            this.language = data;
            this.selectedLanguage = this.language[0];
            this.content = this.selectedLanguage.content;
            this.fullLog();
            resolve(this.language); // Resolving the promise with the language data
          },
          (error: any) => {
            console.error(error);
            reject(error); // Rejecting the promise with the error
          }
        );
    });
  }

}