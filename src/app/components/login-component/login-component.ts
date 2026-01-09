import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { email, Field, form, minLength, required, submit } from '@angular/forms/signals';
import { MainButtonComponent } from '../main-button-component/main-button-component';
import { injectAuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [Field, MainButtonComponent, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  private client = injectAuthService();
  private readonly router = inject(Router);

  hasError = signal<string | null>(null);

  loginModel = signal({
    email: '',
    password: '',
  });

  // UI State com Signals
  isLoading = signal(false);
  isLoadingGoogle = signal(false);

  loginForm = form(this.loginModel, (s) => {
    required(s.email, { message: 'Email obrigatório' });
    email(s.email, { message: 'Email inválido' });
    required(s.password, { message: 'Senha obrigatória' });
    minLength(s.password, 6, { message: 'Senha deve ter no mínimo 6 caracteres' });
  });

  async loginWithGoogle() {
    this.isLoadingGoogle.set(true);
    this.client.signInWithOauth();
    this.isLoadingGoogle.set(false);
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
