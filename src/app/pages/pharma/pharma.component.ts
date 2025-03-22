import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
@Component({
  selector: 'app-pharma',
  imports: [TableComponent],
  templateUrl: './pharma.component.html',
  styleUrl: './pharma.component.scss',
})
export class PharmaComponent {
  columns: string[] = ['id', 'name', 'price'];
  pharmaData = [
    { id: 1, name: 'Paracetamol', price: 10 },
    { id: 2, name: 'Ibuprofen', price: 15 },
    { id: 3, name: 'Aspirin', price: 12 },
  ];
}
