import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { enviroment } from '../enviroments/enviroment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  bannerDev: boolean = enviroment.production;
}
