import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success-component',
  imports: [],
  templateUrl: './success-component.html',
  styleUrl: './success-component.scss',
})
export class SuccessComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
