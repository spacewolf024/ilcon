import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef }      from '@angular/core';
import { CarouselConfig } from 'ng2-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../User';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ModalDirective } from 'ng2-bootstrap/modal';



@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  providers: [{provide: CarouselConfig, useValue: {interval: 4000, noPause: false}}]
})

export class HomeComponent implements OnInit {

  user: FormGroup;
  UserObject = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'phone': '',
    'comments': ''
  }
  emailError: boolean = false;
  @ViewChild('lgModal') public childModal:ModalDirective;


  constructor(private http: Http) {}


  ngOnInit() {
    this.createNewUser();
  }

  

  createNewUser(): void {
    this.user = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', Validators.required),
      comments: new FormControl('')
    });
  }
  
  activeSlideChange(ndex) {
    console.log(ndex);
  }

  onHide() {
    this.createNewUser();
  }

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    console.log(value, valid);
    if(valid) {

      this.UserObject.firstName = value.firstName;
      this.UserObject.lastName = value.lastName;
      this.UserObject.email = value.email;
      this.UserObject.phone = value.phone;
      this.UserObject.comments = value.comments;
      this.addUser();
      this.childModal.hide();
      
    }
  }
  hide() {

  }

  onCancel(): void {
    this.createNewUser();
  }

  validateEmail(c) {
    let EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return EMAIL_REGEXP.test(c) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }

  // addUser (user: User) Observable<User> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });

  //   return this.http.post('/scripts/request.php', { user }, options)
  //                   .map(this.extractData)
  //                   .catch(this.handleError);
  // }

addUser (): Promise<User> {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  console.log(this.UserObject);
  
  return this.http.post('/scripts/request.php', this.UserObject, options)
             .toPromise()
             .then(this.extractData)
             .catch(this.handleError);
}

private extractData(res: Response) {
  let body = res.json();
  return body.data || { };
}

private handleError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Promise.reject(errMsg);
}

}
