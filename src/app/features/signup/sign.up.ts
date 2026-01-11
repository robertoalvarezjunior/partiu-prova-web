import { Component, inject, signal } from '@angular/core';
import { email, Field, form, minLength, required, submit, validate } from '@angular/forms/signals';
import { injectAuthService } from '../../core/auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UiButton } from '../../shared/components/ui.button/ui.button';
import { UiInput } from '../../shared/components/ui.input/ui.input';

@Component({
  selector: 'app-sign-up',
  imports: [Field, RouterLink, UiButton, UiInput],
  templateUrl: './sign.up.html',
  styleUrl: './sign.up.scss',
})
export class SignUp {
  signUpModel = signal({
    email: '',
    password: '',
    confirmPassword: '',
  });

  private readonly router = inject(Router);

  private auth = injectAuthService();

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

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.signUpForm().valid()) {
      submit(this.signUpForm, async () => {
        try {
          this.isLoading.set(true);
          const { data, error } = await this.auth.signUp(
            this.signUpForm.email().value(),
            this.signUpForm.password().value()
          );

          if (error) throw error;

          this.router.navigate(['/success'], {
            replaceUrl: true,
          });
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
