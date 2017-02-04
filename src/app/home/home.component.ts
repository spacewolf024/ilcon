import { Component, ViewEncapsulation }      from '@angular/core';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public myInterval: number = 4000;
}
