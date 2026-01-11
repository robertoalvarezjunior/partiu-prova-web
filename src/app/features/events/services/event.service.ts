import { Injectable, signal } from '@angular/core';
import { injectSupabase } from '../../../core/supabase/services/client.service';
import { EventCardModel, EventModel } from '../../../core/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  client = injectSupabase();

  async getEventsCard(): Promise<EventCardModel[]> {
    const { data, error } = await this.client
      .from('events')
      .select('id, title, starts_at, local, category:categories(id, name)')
      .limit(3);
    if (error) {
      console.error('Erro ao buscar eventos:', error.message);
      throw error;
    }
    return (data as unknown as EventCardModel[]) ?? [];
  }
}
