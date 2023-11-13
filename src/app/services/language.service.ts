import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Language } from '../Language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  url = `http://localhost:3000/languages`; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos as linguagens
  getLanguages(): Observable<Language[]> {
    return this.httpClient.get<Language[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem uma linguagem pelo id
  getLanguageById(id: number): Observable<Language> {
    return this.httpClient.get<Language>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getLanguageByLang(lang: string): Observable<Language> {
    return this.httpClient.get<Language>(this.url + '?q=' + lang)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva uma linguagem
  saveLanguage(language: Language): Observable<Language> {
    return this.httpClient.post<Language>(this.url, JSON.stringify(language), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza uma linguagem
  updateLanguage(language: Language): Observable<Language> {
    return this.httpClient.put<Language>(this.url + '/' + language.id, JSON.stringify(language), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta uma linguagem
  deleteLanguage(language: Language) {
    return this.httpClient.delete<Language>(this.url + '/' + language.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}