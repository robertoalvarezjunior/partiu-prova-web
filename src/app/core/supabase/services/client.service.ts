import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { enviroment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(enviroment.supabaseUrl, enviroment.supabaseKey);
  }
}

export const injectSupabase = () => {
  const clientService = inject(ClientService);
  return clientService.supabase;
};
