import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { email, form, minLength, required, submit, Field } from '@angular/forms/signals';
import { injectAuthService } from '../../core/auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UiButton } from '../../shared/components/ui.button/ui.button';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [Field, UiButton, RouterLink, NgOptimizedImage],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private client = injectAuthService();
  private readonly router = inject(Router);

  hasError = signal<string | null>(null);

  loginModel = signal({
    email: '',
    password: '',
  });

  isLoading = signal(false);
  isLoadingGoogle = signal(false);

  loginForm = form(this.loginModel, (s) => {
    required(s.email, { message: 'Email obrigatório' });
    email(s.email, { message: 'Email inválido' });
    required(s.password, { message: 'Senha obrigatória' });
    minLength(s.password, 6, { message: 'Senha deve ter no mínimo 6 caracteres' });
  });

  async loginWithGoogle() {
    if (this.isLoadingGoogle()) return;

    try {
      this.isLoadingGoogle.set(true);
      this.hasError.set(null);

      await new Promise((_) => this.client.signInWithOauth());
    } catch (error) {
      if (error instanceof Error) {
        this.hasError.set('Impossível fazer login com o Google no momento.');
      }
    } finally {
      this.isLoadingGoogle.set(false);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().valid()) {
      submit(this.loginForm, async () => {
        try {
          this.isLoading.set(true);
          const { error } = await this.client.signInWithPassword(
            this.loginForm.email().value(),
            this.loginForm.password().value()
          );

          if (error) throw error;

          this.router.navigate(['/success'], {
            replaceUrl: true,
          });
        } catch (error) {
          if (error instanceof Error) {
            this.hasError.set('Usuário ou senha inválidos.');
          }
        } finally {
          this.isLoading.set(false);
        }
      });
    }
  }
}
