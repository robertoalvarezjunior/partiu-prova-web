import { Component } from '@angular/core';
import { AppbarComponent } from '../../components/appbar-component/appbar-component';
import { MainButtonComponent } from '../../components/main-button-component/main-button-component';
import { RouterLink } from '@angular/router';
import { UiButton } from '../../shared/components/ui-button/ui-button';

@Component({
  selector: 'app-home',
  imports: [AppbarComponent, RouterLink, MainButtonComponent, UiButton],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
