import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-main-button-component',
  imports: [],
  templateUrl: './main-button-component.html',
  styleUrl: './main-button-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.main-button]': 'true',
    '[class.main-button--sm]': 'size() === "sm"',
    '[class.main-button--lg]': 'size() === "lg"',
    '[class.main-button--main-color]': 'bgColor() === "main-color"',
    '[class.main-button--none-color]': 'bgColor() === "none-color"',
    '[class.main-button--disabled]': 'disabled()', // Classe para estilização
    '[attr.disabled]': 'disabled() ? true : null', // Atributo para acessibilidade
    '[style.pointer-events]': 'disabled() ? "none" : "auto"',
  },
})
export class MainButtonComponent {
  readonly size = input<'sm' | 'lg'>('lg');
  readonly bgColor = input<'main-color' | 'none-color'>('main-color');
  readonly disabled = input<boolean>(false);
}
