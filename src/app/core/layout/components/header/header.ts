import {
  Component,
  computed,
  signal,
  ElementRef,
  HostListener,
  inject,
  ChangeDetectionStrategy,
  output,
} from '@angular/core';
import { injectAuthService } from '../../../auth/services/auth.service';
import { UiButton } from '../../../../shared/components/ui-button/ui-button';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [UiButton, NgOptimizedImage, RouterLink],
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

  user = this.auth.user;
  userInitial = computed(() => this.user()?.email?.charAt(0).toUpperCase() ?? '');

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
