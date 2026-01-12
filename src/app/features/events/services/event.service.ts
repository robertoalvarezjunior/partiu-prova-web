import { Injectable } from '@angular/core';
import { injectSupabase } from '../../../core/supabase/services/client.service';
import { EventCardModel } from '../../../core/models/event.model';
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

    // if (date) {
    //   const year = date.getFullYear();
    //   const month = date.getMonth() + 1;
    //   const day = date.getDate();
    //   query = query.gte('starts_at', `${year}-${month}-${day} 00:00:00`);
    //   query = query.lte('starts_at', `${year}-${month}-${day} 23:59:59`);
    // }

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
}
