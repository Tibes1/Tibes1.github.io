import { Component, Input,  } from '@angular/core';
import { Content, Language } from 'src/app/Language';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  
  @Input() content!: any;

  hamMenuBtn = document.querySelector('.header__main-ham-menu-cont') as HTMLElement;
  smallMenu = document.querySelector('.header__sm-menu') as HTMLElement;
  headerHamMenuBtn = document.querySelector('.header__main-ham-menu') as HTMLElement;
  headerHamMenuCloseBtn = document.querySelector('.header__main-ham-menu-close') as HTMLElement;
  headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link');
  
  displayNone:string = 'd-none'

  showDiv: boolean = false;

  toggleDiv() {
    this.showDiv = !this.showDiv;
  }

  

}
