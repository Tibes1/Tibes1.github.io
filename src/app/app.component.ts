import { Component, OnInit  } from '@angular/core';

import { Language, Content } from 'src/app/Language';
import { LanguageService} from 'src/app/services/language.service'; //, lang, language, selectedLanguage, content 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Portifolio';

  constructor(private languageService: LanguageService) {}
  languages: Language[] = [];

  lang:string = navigator.language
  language!:Array<Language>
  selectedLanguage!:Language; 
  content!:Content

  testeAny:any

  async getLanguage() {
    console.log('passo :2')
    await this.languageService.getLanguageByLang(this.lang).subscribe((data: Array<Language>) => {
      this.language = data
      this.selectedLanguage = this.language[0]
      this.content = this.selectedLanguage.content
    })
  }



  ngOnInit() {
    console.log('passo :1')
    this.getLanguage()
  }

}

//  // defini se uma linguagem será criada ou atualizada
//  saveLanguage(form: NgForm) {
//    if (this.language.id !== undefined) {
//      this.languageService.updateLanguage(this.language).subscribe(() => {
//        this.cleanForm(form);
//      });
//    } else {
//      this.languageService.saveLanguage(this.language).subscribe(() => {
//        this.cleanForm(form);
//      });
//    }
//  }
//  
//  // Chama o serviço para obtém todas as linguagens
//  getLanguages() {
//    this.languageService.getLanguages().subscribe((languages: Language[]) => {
//      this.languages = languages;
//    });
//  }
//
//  // deleta uma linguagem
//  deleteLanguage(language: Language) {
//    this.languageService.deleteLanguage(language).subscribe(() => {
//      this.getLanguages();
//    });
//  }
//
//  // copia a linguagem para ser editado.
//  editLanguage(language: Language) {
//    this.language = { ...language };
//  }
//  
//  // limpa o formulario
//  cleanForm(form: NgForm) {
//    this.getLanguages();
//    form.resetForm();
//    this.language = {} as Language;
//  }
//  
