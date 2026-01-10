import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'button[ui-button]',
  imports: [],
  templateUrl: './ui.button.html',
  styleUrl: './ui.button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[class.ui-button]': 'true',
    '[class.ui-button-p]': '"ui-button-p--" + size()',
    '[class.is-loading]': 'loading()',
    '[disabled]': 'disabled() || loading()',
    '(click)': 'onClick($event)',
  },
})
export class UiButton {
  variant = input<'primary' | 'secondary' | 'tertiary'>('primary');
  size = input<'sm' | 'md' | 'lg'>('sm');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  wFull = input<boolean>(false);

  classes = computed(() => {
    return {
      'ui-button': true,
      [`ui-button--${this.variant()}`]: true,
      [`ui-button-p--${this.size()}`]: true,
      ['w']: this.wFull(),
    };
  });

  btnClick = output<MouseEvent>();

  protected onClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.btnClick.emit(event);
  }
}
