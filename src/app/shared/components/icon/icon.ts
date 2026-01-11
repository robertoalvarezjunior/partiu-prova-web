import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-icon',
  imports: [NgOptimizedImage],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  name = input.required<string>();
  size = input<number | string>(24);
  label = input<string | null>(null);

  // Derived state com computed()
  protected iconPath = computed(() => `assets/icons/${this.name()}.svg`);
}
