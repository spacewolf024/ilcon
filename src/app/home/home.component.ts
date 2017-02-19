import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarouselConfig } from 'ng2-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../User';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { HomeService } from './home.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  providers: [{ provide: CarouselConfig, useValue: { interval: 4000, noPause: false } }, HomeService]
})

export class HomeComponent implements OnInit {

  modalRequest: boolean = true;
  modalSuccess: boolean = false;
  modalFail: boolean = false;
  status: any;
  user: FormGroup;
  errorMessage: any;
  userObject = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'phone': '',
    'comments': ''
  }
  emailError: boolean = false;
  @ViewChild('lgModal') public childModal: ModalDirective;

  constructor(private homeService: HomeService) { }


  ngOnInit() {
    this.createNewUser();
  }

  public createNewUser(): void {

    this.modalRequest = true;
    this.modalSuccess = false;
    this.modalFail = false;

    this.user = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', Validators.required),
      comments: new FormControl('')
    });
  }

  public activeSlideChange(ndex) {
    // console.log(ndex);
  }

  public onHide() {
    this.createNewUser();
  }

  public onSubmit({ value, valid }: { value: User, valid: boolean }) {
    console.log(value, valid);

    if (valid) {
      this.userObject.firstName = value.firstName;
      this.userObject.lastName = value.lastName;
      this.userObject.email = value.email;
      this.userObject.phone = value.phone;
      this.userObject.comments = value.comments;
      this.addUser();
    }
  }

  public addUser() {
    this.homeService.addUser(this.userObject)
      .then(
      data => {
        this.status = data.success;
        if (this.status === true) {
          this.modalRequest = false;
          this.modalSuccess = true;
        } else {
          this.modalRequest = false;
          this.modalFail = true;
        }
      },
      error => this.errorMessage = <any>error);
  }

  public onCancel(): void {
    this.createNewUser();
  }

  public showChildModal(): void {
    this.childModal.show();
  }

  public validateEmail(c) {
    let EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return EMAIL_REGEXP.test(c) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }

}
