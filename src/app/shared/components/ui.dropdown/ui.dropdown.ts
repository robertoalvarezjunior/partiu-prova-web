import { Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
import { CategoryModel } from '../../../core/models/category.model';

@Component({
  selector: 'app-ui-dropdown',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './ui.dropdown.html',
  styleUrls: ['./ui.dropdown.scss'],
})
export class UiDropdown {
  readonly items = input<CategoryModel[]>([]);
  @Output() itemSelected = new EventEmitter<CategoryModel>();

  isOpen = false;
  selectedItem: CategoryModel | null = null;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: CategoryModel): void {
    this.selectedItem = item;
    this.itemSelected.emit(item);
    this.isOpen = false;
  }
}
