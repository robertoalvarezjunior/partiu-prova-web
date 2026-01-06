import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);

  private http = inject(HttpClient);
  
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
      this.http.post('http://localhost:8080/login', this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Login failed', error);
          this.isLoading.set(false);
        }
      });
    }
  }
}