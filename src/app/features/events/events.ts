import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Icon } from '../../shared/components/icon/icon';
import { EventService } from './services/event.service';
import { EventCardModel } from '../../core/models/event.model';
import { UiCardEvent } from '../../shared/components/ui.card.event/ui.card.event';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events',
  imports: [Icon, UiCardEvent, FormsModule],
  templateUrl: './events.html',
  styleUrl: './events.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Events implements OnInit {
  private readonly eventService = inject(EventService);

  readonly events = signal<EventCardModel[]>([]);
  searchTerm = signal<string>('');

  private timeoutId: any;

  ngOnInit(): void {
    this.getEvents();
  }

  async getEvents(searchTerm?: string): Promise<void> {
    const events = await this.eventService.getEvents(searchTerm);
    this.events.set(events);
  }

  updateTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.getEvents(this.searchTerm());
    }, 1000);
  }
}
