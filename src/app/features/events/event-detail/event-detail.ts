import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Icon } from '../../../shared/components/icon/icon';
import { ActivatedRoute } from '@angular/router';
import { ClientService, injectSupabase } from '../../../core/supabase/services/client.service';
import { EventModel } from '../../../core/models/event.model';
import { EventService } from '../services/event.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  imports: [Icon],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.scss',
})
export class EventDetail {
  protected event = signal<EventModel | null>(null);
  private route = inject(ActivatedRoute);
  private data = signal(this.route.data);
  private eventService = inject(EventService);
  readonly date = computed(() => {
    const eventDate = this.event()?.starts_at;
    return eventDate ? formatDate(eventDate, 'dd/MM/yyyy', 'pt-BR') : '';
  });
  readonly time = computed(() => {
    const eventTime = this.event()?.starts_at;
    return eventTime ? formatDate(eventTime, 'HH:mm', 'pt-BR') : '';
  });

  constructor() {
    this.route.params.subscribe((params) => {
      this.getEventById(params['id']);
    });
  }

  private async getEventById(id: string) {
    const event = await this.eventService.getEventById(id);
    this.event.set(event);
  }
}
