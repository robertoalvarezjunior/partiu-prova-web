import { Component, EventEmitter, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui.calendar.html',
  styleUrls: ['./ui.calendar.scss'],
})
export class UiCalendar {
  dateSelected = output<Date>();

  currentDate = new Date();
  monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  days: number[] = [];
  month: number;
  year: number;

  constructor() {
    this.month = this.currentDate.getMonth();
    this.year = this.currentDate.getFullYear();
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.days = [];
    const firstDay = new Date(this.year, this.month, 1).getDay();
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      this.days.push(0); // Placeholder for empty days
    }
    for (let i = 1; i <= daysInMonth; i++) {
      this.days.push(i);
    }
  }

  selectDate(day: number): void {
    if (day > 0) {
      const selected = new Date(this.year, this.month, day);
      this.dateSelected.emit(selected);
    }
  }

  prevMonth(): void {
    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
    this.generateCalendar();
  }
}
