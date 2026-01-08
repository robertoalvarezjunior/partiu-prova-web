import { inject, Injectable } from '@angular/core';
import { injectSupabase } from './client-service';
import { AuthSession } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private client = injectSupabase();
  private _session: AuthSession | null = null;

  get session() {
    this.client.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  signInWithPassword(email: string, password: string) {
    return this.client.auth.signInWithPassword({ email, password });
  }

  signInWithOauth() {
    return this.client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:4200/auth/callback' },
    });
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.client.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async createAccount(email: string, id: string) {
    const { error: insertError } = await this.client.from('users').insert({ email: email, id: id });

    if (insertError) {
      throw insertError;
    }
  }

  signOut() {
    return this.client.auth.signOut();
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
