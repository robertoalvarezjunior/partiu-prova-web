import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { injectAuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.html',
  styleUrl: './callback.scss',
})
export class Callback implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = injectAuthService();

  protected readonly processing = signal(true);

  ngOnInit(): void {
    this.handleAuthCallback();
  }

  private handleAuthCallback(): void {
    // O fragment contém tudo após o '#'
    const fragment = this.route.snapshot.fragment;

    if (fragment) {
      const params = new URLSearchParams(fragment);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken && refreshToken) {
        this.authService.setSession(accessToken, refreshToken);
        this.router.navigate(['/success'], {
          replaceUrl: true,
        });
        return;
      }
    }

    this.processing.set(false);
    this.router.navigate(['/login'], { queryParams: { error: 'auth_failed' } });
  }
}
