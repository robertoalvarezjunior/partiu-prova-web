import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';

@Component({
  selector: 'app-ui-input',
  imports: [Field],
  templateUrl: './ui.input.html',
  styleUrl: './ui.input.scss',
})
export class UiInput {
  field = input.required<FieldTree<string, string>>();
  type = input.required<string>();
  id = input.required<string>();
  placeholder = input.required<string>();
  label = input<string>('');
}
