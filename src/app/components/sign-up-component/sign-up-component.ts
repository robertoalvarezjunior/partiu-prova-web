import { Component, signal } from '@angular/core';
import { MainButtonComponent } from '../main-button-component/main-button-component';
import { email, form, minLength, required, validate, Field } from '@angular/forms/signals';
import { injectAuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sign-up-component',
  imports: [MainButtonComponent, Field],
  templateUrl: './sign-up-component.html',
  styleUrl: './sign-up-component.scss',
})
export class SignUpComponent {
  signUpModel = signal({
    email: '',
    password: '',
    confirmPassword: '',
  });

  private client = injectAuthService();

  // UI State com Signals
  isLoading = signal(false);
  isLoadingGoogle = signal(false);

  signUpForm = form(this.signUpModel, (s) => {
    required(s.email, { message: 'Email obrigatório' });
    email(s.email, { message: 'Email inválido' });
    required(s.password, { message: 'Senha obrigatória' });
    minLength(s.password, 6, { message: 'Senha deve ter no mínimo 6 caracteres' });
    required(s.confirmPassword, { message: 'Confirmação de senha obrigatória' });

    validate(s.confirmPassword, ({ value, valueOf }) => {
      const confirmPassword = value();
      const password = valueOf(s.password);

      if (confirmPassword !== password) {
        return {
          kind: 'passwordMismatch',
          message: 'As senhas não conferem',
        };
      }
      return null;
    });
  });

  async loginWithGoogle() {
    this.isLoadingGoogle.set(true);
    this.client.signInWithOauth();
    this.isLoadingGoogle.set(false);
  }

  async onSubmit(): Promise<void> {}
}
