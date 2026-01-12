import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { UiButton } from '../ui.button/ui.button';
import { formatDate } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ui-card-event',
  imports: [Icon, UiButton, RouterLink],
  templateUrl: './ui.card.event.html',
  styleUrl: './ui.card.event.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCardEvent {
  readonly title = input.required<string>();
  readonly date = input.required<Date>();
  readonly local = input.required<string>();
  readonly category = input.required<string>();
  readonly btn = input<string>();

  readonly dateFormat = computed(() => formatDate(this.date(), 'dd/MM/yyyy', 'pt-BR'));
}
