import { Component, inject, OnInit, signal } from '@angular/core';
import { Icon } from '../../shared/components/icon/icon';
import { EventService } from './services/event.service';
import { EventCardModel } from '../../core/models/event.model';
import { UiCardEvent } from '../../shared/components/ui.card.event/ui.card.event';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events',
  imports: [Icon, UiCardEvent, FormsModule],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  private readonly eventService = inject(EventService);
  private searchSubject = new Subject<string>();

  readonly events = signal<EventCardModel[]>([]);
  searchTerm = '';

  ngOnInit(): void {
    this.getEvents();
    this.searchSubject.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((searchTerm) => {
      this.getEvents(searchTerm);
    });
  }

  onSearchChange(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  async getEvents(searchTerm?: string): Promise<void> {
    const events = await this.eventService.getEvents(searchTerm);
    this.events.set(events);
  }
}
