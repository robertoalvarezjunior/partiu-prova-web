import { Injectable } from '@angular/core';
import { injectSupabase } from '../../../core/supabase/services/client.service';
import { EventCardModel, EventModel } from '../../../core/models/event.model';
import { CategoryModel } from '../../../core/models/category.model';

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

  async getEvents(
    searchTerm?: string,
    // date?: Date,
    categoryId?: number | bigint | null
  ): Promise<EventCardModel[]> {
    let query = this.client
      .from('events')
      .select('id, title, starts_at, local, category:categories(id, name)');

    if (searchTerm) {
      query = query.ilike('title', `%${searchTerm}%`);
    }
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query.limit(10);
    if (error) {
      console.error('Erro ao buscar eventos:', error.message);
      throw error;
    }
    return (data as unknown as EventCardModel[]) ?? [];
  }

  async getCategories(): Promise<CategoryModel[]> {
    const { data, error } = await this.client.from('categories').select('id, name');
    if (error) {
      console.error('Erro ao buscar categorias:', error.message);
      throw error;
    }
    return (data as CategoryModel[]) ?? [];
  }

  async getEventById(id: string): Promise<EventModel> {
    const { data, error } = await this.client
      .from('events')
      .select(
        'id, title, description, starts_at, ends_at, local, policy, coupons, created_by_id, category:categories(name)'
      )
      .eq('id', id)
      .single();
    if (error) {
      console.error('Erro ao buscar evento:', error.message);
      throw error;
    }
    return data as unknown as EventModel;
  }
}
