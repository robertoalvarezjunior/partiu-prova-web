import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-info',
  imports: [ReactiveFormsModule],
  templateUrl: './basic-info.html',
  styleUrl: './basic-info.scss',
  standalone: true,
})
export class BasicInfo {
  readonly form = input.required<FormGroup>();

  categories: Array<String> = ['Corrida', 'Ciclismo'];

  get name() {
    return this.form().get('name');
  }
}
