import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButton } from '../../shared/components/ui.button/ui.button';
import { injectAuthService } from '../../core/auth/services/auth.service';
import { UiCardEvent } from '../../shared/components/ui.card.event/ui.card.event';
import { injectSupabase } from '../../core/supabase/services/client.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, UiButton, UiCardEvent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  auth = injectAuthService();
  client = injectSupabase();

  events = signal<Array<any>>([]);

  constructor() {
    this.getEvents();
  }

  async getEvents() {
    const { data, error } = await this.client
      .from('events')
      .select('id, title, starts_at')
      .limit(3);
    if (error) throw error;
    this.events.set(data ?? []);
  }
}
