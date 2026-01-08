import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectAuthService } from '../../services/auth-service';
import { email, Field, form, minLength, required, submit } from '@angular/forms/signals';
import { MainButtonComponent } from '../main-button-component/main-button-component';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [Field, MainButtonComponent, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  private client = injectAuthService();

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

          alert('Login successful!');
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message);
          }
        } finally {
          this.isLoading.set(false);
        }
      });
    }
  }
}
