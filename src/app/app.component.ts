import { Component, OnInit  } from '@angular/core';

import { Language } from 'src/app/Language';
import { LanguageService } from 'src/app/services/language.service';

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Portifolio';

  constructor(private languageService: LanguageService) {
  }

  lang:string = navigator.language

  language = {} as Language;
  languages: Language[] = [];

  //navigator language selected
  selectedLanguage:any = {};  
  //extraction of content 
  content:any;
  
  getLanguage() {
    this.languageService.getLanguageByLang(this.lang).subscribe((language: Language) => {
      this.selectedLanguage = language;

      this.content = this.selectedLanguage[0].content
    });
  }

  ngOnInit() {
    this.getLanguage()
    this.getLanguages()
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
