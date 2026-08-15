import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() placeholder: string = 'Search...';
  @Input() debounceTime: number = 400;
  @Input() initialValue: string = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  searchTerm = '';

  private debounceTimer: ReturnType<typeof setTimeout> | undefined;

  ngOnInit(): void {
    this.searchTerm = this.initialValue;
  }

  onSearchChange(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.searchChange.emit(this.searchTerm.trim());
    }, this.debounceTime);
  }

  clearSearch(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.searchTerm = '';
    this.searchChange.emit('');
    this.clear.emit();
  }
}
