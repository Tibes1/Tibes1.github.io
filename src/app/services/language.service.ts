import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Language } from '../Language';

import { environment } from '../env';

import {OpenAI} from "openai";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }


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

  
    getLanguageByLang(lang: string):void {
      //= this.httpClient.get<Language>(this.url +  '?lang=pt-BR')
    
      let language = this.httpClient.get<Language>(this.url +'?lang=' + lang)
    
      let retorno1
      console.log("teste1 -------")
      language.subscribe((value) => {
        console.log("teste")
        console.log(value)
        retorno1 = value
      })

      return retorno1
    }




    //async randonfunc(observable: any, lang: string) {
//
  //  let teste:any
//
  //  observable.subscribe((data: Language) => {
  //      teste = JSON.stringify(data)
//
  //      console.log(data)
//
  //      if (teste === undefined) {
//
  //        //this.mainGPT(lang)
  //        console.log("--------------------------")
  //        console.log("nulo")
  //        console.log(this.url + '?lang=' + lang)
  //        return data
  //      } else {
  //        return data
  //      }
  //    }
  //  )
  //}
//
}