import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Icon } from '../../shared/components/icon/icon';
import { EventService } from './services/event.service';
import { EventCardModel } from '../../core/models/event.model';
import { UiCardEvent } from '../../shared/components/ui.card.event/ui.card.event';
import { FormsModule } from '@angular/forms';
import { UiCalendar } from '../../shared/components/ui.calendar/ui.calendar';
import { UiDropdown } from '../../shared/components/ui.dropdown/ui.dropdown';
import { CategoryModel } from '../../core/models/category.model';
import { CommonModule } from '@angular/common';
import { UiButton } from '../../shared/components/ui.button/ui.button';

@Component({
  selector: 'app-events',
  imports: [UiCardEvent, FormsModule, CommonModule, UiButton],
  templateUrl: './events.html',
  styleUrl: './events.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Events implements OnInit {
  private readonly eventService = inject(EventService);

  readonly events = signal<EventCardModel[]>([]);
  readonly categories = signal<CategoryModel[]>([]);
  protected selectedCategory = signal<CategoryModel | null>(null);

  searchTerm = signal<string>('');
  // showCalendar = signal(false);

  private timeoutId: any;

  ngOnInit(): void {
    this.getEvents();
    this.getCategories();
  }

  async getEvents(
    searchTerm?: string,
    // date?: Date,
    categoryId?: number | bigint | null
  ): Promise<void> {
    const events = await this.eventService.getEvents(searchTerm, this.selectedCategory()?.id);
    this.events.set(events);
  }

  async getCategories(): Promise<void> {
    const categories = await this.eventService.getCategories();
    this.categories.set(categories);
  }

  updateTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.getEvents(this.searchTerm());
    }, 1000);
  }

  // toggleCalendar(): void {
  //   this.showCalendar.set(!this.showCalendar());
  // }

  // onDateSelected(date: Date): void {
  //   this.getEvents(this.searchTerm(), date);
  //   this.showCalendar.set(false);
  // }

  onCategorySelected(category?: CategoryModel | null): void {
    if (!category) {
      this.selectedCategory.set(null);
      this.getEvents(this.searchTerm());
      return;
    }
    this.selectedCategory.set(category);
    this.getEvents(this.searchTerm(), category.id);
  }
}
