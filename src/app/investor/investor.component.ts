import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { DatePipe } from '@angular/common';
import CustomValidators from '../forms/CustomValidators';
import { NDA_User } from '../NDA_User';
import { InvestorService } from './investor.service';

@Component({
  selector: 'investor',
  styleUrls: ['./investor.component.css'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './investor.component.html',
  providers: [InvestorService]
})

export class InvestorComponent implements OnInit {

  @ViewChild('lgModal') public childModal: ModalDirective;

  today: number = Date.now();
  agreeBtn: boolean = false;
  invalidEmail: boolean = false;
  submitBtn: boolean = false;
  ndaUser: FormGroup;
  errorMessage: any;
  investorObject = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'id': '',
    'valid': ''
  };

  constructor(private investorService: InvestorService) { }

  ngOnInit() {
    this.createNewUser();
  }

  public onHide() {
    console.log('close');
    this.createNewUser();
  }

  public chckbxClick() {
    this.agreeBtn = !this.agreeBtn;
  }

  public onSubmit({ value, valid }: { value: NDA_User, valid: boolean }) {
    this.submitBtn = true;

    console.log(value, valid, this.agreeBtn);

    if (valid && this.agreeBtn) {
      this.investorObject.firstName = value.firstName;
      this.investorObject.lastName = value.lastName;
      this.investorObject.email = value.email;
      this.investorObject.id = this.getParameterByName('id');
      this.investorObject.valid  = this.getParameterByName('valid');
      (window as any).location = '/scripts/download.php' + '?firstName=' + this.investorObject.firstName + '&lastName=' + this.investorObject.lastName + '&email=' + this.investorObject.email 
      + '&id=' + this.investorObject.id + '&valid=' + this.investorObject.valid;
      // this.addUser();

    } else {
      this.invalidEmail = true;
    }
  }

  public addUser() {
    this.investorService.addUser(this.investorObject)
      .then(
      data => { console.log(data);
      },
      error => this.errorMessage = <any>error);
  }

  public getParameterByName(name) {

    let url = window.location.href;
    
    name = name.replace(/[\[\]]/g, "\\$&");

    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);

    if (!results) return null;

    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

  public createNewUser() {
    this.submitBtn = false;
    this.agreeBtn = false;
    this.invalidEmail = false;
    this.ndaUser = new FormGroup({
      agreeCheck: new FormControl('', Validators.required),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, CustomValidators.validateEmail])
    });
  }

  public onCancel(): void {

    this.createNewUser();
  }


}