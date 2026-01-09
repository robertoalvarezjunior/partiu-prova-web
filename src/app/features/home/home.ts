import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButton } from '../../shared/components/ui-button/ui-button';
import { injectAuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, UiButton],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  client = injectAuthService();
}
