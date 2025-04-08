import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() data: any[] = [];
  @Input() showDelete: boolean = false;
  @Output() delete = new EventEmitter<any>();

  onDeleteClick(row: any) {
    this.delete.emit(row);
  }
}
