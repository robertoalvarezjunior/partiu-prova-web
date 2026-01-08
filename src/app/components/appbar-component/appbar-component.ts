import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainButtonComponent } from '../main-button-component/main-button-component';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UiButton } from '../../shared/components/ui-button/ui-button';

@Component({
  selector: 'app-appbar-component',
  imports: [MainButtonComponent, NgOptimizedImage, RouterLink, UiButton],
  templateUrl: './appbar-component.html',
  styleUrl: './appbar-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppbarComponent {
  teste() {
    console.log('teste');
  }
}
