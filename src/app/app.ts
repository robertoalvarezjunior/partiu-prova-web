import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { enviroment } from '../enviroments/enviroment';
import { Header } from './core/layout/components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  bannerDev: boolean = enviroment.production;
}
