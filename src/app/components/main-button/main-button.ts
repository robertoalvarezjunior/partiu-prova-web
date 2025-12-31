import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-main-button',
  imports: [],
  templateUrl: './main-button.html',
  styleUrl: './main-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
    '[class.main-button]': 'true',
    '[class.main-button--sm]': 'size() === "sm"',
    '[class.main-button--lg]': 'size() === "lg"',
    '[class.main-button--main-color]': 'bgColor() === "main-color"',
    '[class.main-button--none-color]': 'bgColor() === "none-color"',
  }
})
export class MainButton {
  readonly size = input<'sm' | 'lg'>('lg');
  readonly bgColor = input<'main-color' | 'none-color'>('main-color');
}
