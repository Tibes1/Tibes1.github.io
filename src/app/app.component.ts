import { Component, OnInit  } from '@angular/core';

import { Language, Content } from 'src/app/Language';
import { LanguageService } from 'src/app/services/language.service';

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
  language!:Language
  selectedLanguage!:Language;  
  content!:Content


  ngOnInit() {
    this.languageService.getLanguageByLang(this.lang).subscribe((value:Language) => {
      this.language = value
      this.selectedLanguage = this.language
      this.content = this.language.content
      
      console.log("teste2")
      console.log(this.language)
      console.log("teste3")
      console.log(this.selectedLanguage)
      console.log("teste4")
      console.log(this.content)
    })
  }

  private resolve: Function|null = null
  greeting: Promise<string>|null = null
  arrived: boolean = false

  clicked() {
    if (this.arrived) {
      this.reset();
    } else {
      this.resolve!();
      this.arrived = true;
    }
  }

  reset() {
    this.arrived = false;
    this.greeting = new Promise<string>((resolve, reject) => {
      this.resolve = resolve;
    });
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
