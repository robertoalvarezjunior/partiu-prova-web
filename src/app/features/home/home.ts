import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButton } from '../../shared/components/ui.button/ui.button';
import { injectAuthService } from '../../core/auth/services/auth.service';
import { UiCardEvent } from '../../shared/components/ui.card.event/ui.card.event';
import { EventService } from '../events/services/event.service';
import { EventCardModel } from '../../core/models/event.model';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-home',
  imports: [RouterLink, UiButton, UiCardEvent, Icon],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  auth = injectAuthService();
  event = inject(EventService);

  eventsCard = signal<EventCardModel[]>([]);

  constructor() {
    this.getEventsCard();
  }

  async getEventsCard(): Promise<void> {
    const events = await this.event.getEventsHome();

    this.eventsCard.set(events);
  }

  navigateTo(path: string, id?: string): string {
    return `/${path}/${id}`;
  }
}
