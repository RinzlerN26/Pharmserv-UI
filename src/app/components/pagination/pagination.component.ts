import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [10, 20, 50];

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  get pages(): (number | string)[] {
    if (this.totalPages <= 1) {
      return this.totalPages === 1 ? [1] : [];
    }

    if (this.totalPages <= 7) {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    }

    const pages: (number | string)[] = [];

    pages.push(1);

    if (this.currentPage > 4) {
      pages.push('...');
    }

    const startPage = Math.max(2, this.currentPage - 1);
    const endPage = Math.min(this.totalPages - 1, this.currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (this.currentPage < this.totalPages - 3) {
      pages.push('...');
    }

    pages.push(this.totalPages);

    return pages;
  }

  goToPage(page: number | string): void {
    if (
      typeof page !== 'number' ||
      page < 1 ||
      page > this.totalPages ||
      page === this.currentPage
    ) {
      return;
    }

    this.pageChange.emit(page);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newPageSize = Number(selectElement.value);

    this.pageSizeChange.emit(newPageSize);
  }

  get startItem(): number {
    if (this.totalItems === 0) {
      return 0;
    }

    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }
}
