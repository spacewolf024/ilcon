import { Component, ViewEncapsulation, OnInit }      from '@angular/core';
import { CarouselConfig } from 'ng2-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../User';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  providers: [{provide: CarouselConfig, useValue: {interval: 4000, noPause: false}}]
})
export class HomeComponent implements OnInit {
  user: FormGroup;
  constructor() {}
  ngOnInit() {
    this.user = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(2)]),
      account: new FormGroup({
        email: new FormControl('', Validators.required),
        confirm: new FormControl('', Validators.required)
      }),
      comments: new FormControl('')
    });
  }
  
  activeSlideChange() {

  }

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    console.log(value, valid);
    console.log('confirm: ', value.account.confirm);
    console.log('email: ', value.account.email);
    console.log(this.validateEmail(value.account.email));
  }

  validateEmail(c) {
    let EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return EMAIL_REGEXP.test(c) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }
}
