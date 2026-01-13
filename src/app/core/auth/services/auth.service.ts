import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthChangeEvent, AuthSession, Session } from '@supabase/supabase-js';
import { injectSupabase } from '../../supabase/services/client.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private client = injectSupabase();

  // Signal privado para gerenciar o estado
  private _session = signal<AuthSession | null>(null);

  // Exposição reativa do estado
  readonly session = this._session.asReadonly();
  readonly isAuthenticated = computed(() => !!this._session());
  readonly user = computed(() => this._session()?.user ?? null);

  private url: string = environment.redirectUrl;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    // 1. Pega a sessão inicial
    const { data } = await this.client.auth.getSession();
    this._session.set(data.session);

    // 2. Ouve mudanças (login/logout) e atualiza o Signal
    this.client.auth.onAuthStateChange((_, session) => {
      this._session.set(session);
    });
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.client.auth.onAuthStateChange(callback);
  }

  signInWithPassword(email: string, password: string) {
    return this.client.auth.signInWithPassword({ email, password });
  }

  signInWithOauth() {
    return this.client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${this.url}auth/callback` },
    });
  }

  async signUp(email: string, password: string) {
    return await this.client.auth.signUp({
      email: email,
      password: password,
    });
  }

  async signOut() {
    await this.client.auth.signOut();
  }

  setSession(accessToken: string, refreshToken: string) {
    return this.client.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }
}

export const injectAuthService = () => {
  const authService = inject(AuthService);
  return authService;
};
