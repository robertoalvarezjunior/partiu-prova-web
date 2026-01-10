import {
  Component,
  computed,
  signal,
  ElementRef,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { injectAuthService } from '../../../auth/services/auth.service';
import { UiButton } from '../../../../shared/components/ui.button/ui.button';
import { NgOptimizedImage } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [UiButton, NgOptimizedImage, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class Header {
  auth = injectAuthService();
  readonly isMenuOpen = signal(false);
  private readonly elementRef = inject(ElementRef);
  private readonly router = inject(Router);

  user = this.auth.user;
  userInitial = computed(() => this.user()?.email?.charAt(0).toUpperCase() ?? '');

  constructor() {
    // Monitora a navegação para fechar o menu automaticamente
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.isMenuOpen.set(false); // Reset do estado ao mudar de rota
    });
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (this.isMenuOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  toggleMenu() {
    this.isMenuOpen.update((value) => !value);
  }

  signOut() {
    this.auth.signOut();
    this.closeMenu();
  }
}
