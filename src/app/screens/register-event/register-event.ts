import { Component } from '@angular/core';
import { BasicInfo } from '../../components/basic-info/basic-info';
import { DateTime } from '../../components/date-time/date-time';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Endereco } from '../../components/endereco/endereco';

@Component({
  selector: 'app-register-event',
  imports: [BasicInfo, DateTime, Endereco, ReactiveFormsModule],
  templateUrl: './register-event.html',
  styleUrl: './register-event.scss',
})
export class RegisterEvent {
  registerEventForm = new FormGroup({
    basicInfo: new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      eventCategory: new FormControl('', [Validators.required]),
    }),
  });
}
