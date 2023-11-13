import { Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.scss']
})
export class HomeHeroComponent implements OnInit {

  @Input() content: any;  


  ngOnInit(): void {
      


  }

}
