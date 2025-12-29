import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  
  // UI State com Signals
  isLoading = signal(false);
  isLoadingGoogle = signal(false)

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async loginWithGoogle() {
    this.isLoadingGoogle.set(true);
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      console.log('Dados de login:', this.loginForm.value);
      // Simulação de delay de rede
      setTimeout(() => this.isLoading.set(false), 2000);
    }
  }
}