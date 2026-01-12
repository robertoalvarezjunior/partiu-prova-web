import { Injectable } from '@angular/core';
import { injectSupabase } from '../../../core/supabase/services/client.service';
import { EventCardModel } from '../../../core/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  client = injectSupabase();

  async getEventsHome(): Promise<EventCardModel[]> {
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

  async getEvents(searchTerm?: string): Promise<EventCardModel[]> {
    let query = this.client
      .from('events')
      .select('id, title, starts_at, local, category:categories(id, name)');

    if (searchTerm) {
      query = query.ilike('title', `%${searchTerm}%`);
    }

    const { data, error } = await query.limit(10);
    if (error) {
      console.error('Erro ao buscar eventos:', error.message);
      throw error;
    }
    return (data as unknown as EventCardModel[]) ?? [];
  }
}
