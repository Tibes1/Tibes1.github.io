import { Component, OnInit  } from '@angular/core';

import { Language } from 'src/app/Language';
import { LanguageService } from 'src/app/services/language.service';

import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Portifolio';

  constructor(private languageService: LanguageService) {}

  lang:string = navigator.language

  language$: Observable<Language> = new Observable((observer) => {
    
    //get
    this.language = this.languageService.getLanguageByLang(this.lang);
    console.log('----------------------------------')
    console.log(this.language.subscribe((value: any) => {console.log(value)}))
    observer.next(this.language)

    //chacagem de lang inexistente

    //popula local
    console.log('teste0')
    console.log(this.language$)
    console.log("teste1")
    console.log(this.language)
    console.log("teste2")
    console.log(this.content)
    
    observer.next(this.content)

    //distribuo
    
  });

  languages: Language[] = [];
  language:any;

  //navigator language selected
  selectedLanguage:any = {};  
  //extraction of content 
  content:any;
  

  ngOnInit() {

    const teste = this.language$.subscribe(value=>{
      console.log(value)
    })
      
    //this.getLanguage()
    console.log(teste)

  }

  // defini se uma linguagem será criada ou atualizada
  saveLanguage(form: NgForm) {
    if (this.language.id !== undefined) {
      this.languageService.updateLanguage(this.language).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.languageService.saveLanguage(this.language).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }
  
  // Chama o serviço para obtém todas as linguagens
  getLanguages() {
    this.languageService.getLanguages().subscribe((languages: Language[]) => {
      this.languages = languages;
    });
  }

  // deleta uma linguagem
  deleteLanguage(language: Language) {
    this.languageService.deleteLanguage(language).subscribe(() => {
      this.getLanguages();
    });
  }

  // copia a linguagem para ser editado.
  editLanguage(language: Language) {
    this.language = { ...language };
  }
  
  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getLanguages();
    form.resetForm();
    this.language = {} as Language;
  }
  
}
