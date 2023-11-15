import { Component, Input} from '@angular/core';


@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.scss']
})
export class HomeHeroComponent {

  @Input() content: any;  


}
