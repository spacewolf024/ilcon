import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'investor',
  styleUrls: ['./investor.component.css'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './investor.component.html',
  providers: []
})

export class InvestorComponent {

   @ViewChild('lgModal') public childModal: ModalDirective;
   today: number = Date.now();

   user = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', Validators.required),
    });

}