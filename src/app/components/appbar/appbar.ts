import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainButton } from "../main-button/main-button";
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-appbar',
  imports: [MainButton, NgOptimizedImage, RouterLink],
  templateUrl: './appbar.html',
  styleUrl: './appbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Appbar {
  teste(){
    console.log("teste");
  }
}
