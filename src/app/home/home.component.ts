import { Component, ViewEncapsulation, DoCheck, Input, Output, EventEmitter }      from '@angular/core';
import { CarouselConfig } from 'ng2-bootstrap';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  providers: [{provide: CarouselConfig, useValue: {interval: 4000, noPause: false}}]
})
export class HomeComponent {

  public constructor() {
  }

  activeSlideChange(activeSlideNdx: number): void {
    console.log('Is this shit happening ', activeSlideNdx);
    if (activeSlideNdx === 4) {
      
    }
  }
}
