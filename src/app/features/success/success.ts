import { Component } from '@angular/core';
import { UiButton } from '../../shared/components/ui.button/ui.button';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-success',
  imports: [UiButton, NgOptimizedImage, RouterLink],
  templateUrl: './success.html',
  styleUrl: './success.scss',
})
export class Success {}
