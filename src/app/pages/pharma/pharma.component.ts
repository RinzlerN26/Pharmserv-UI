import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
@Component({
  selector: 'app-pharma',
  imports: [TableComponent],
  templateUrl: './pharma.component.html',
  styleUrl: './pharma.component.scss',
})
export class PharmaComponent {
  columns: string[] = [
    'Id',
    'Medicine',
    'Company',
    'Purchase Rate',
    'Dealer',
    'Expiry',
  ];
  pharmaData = [
    {
      Id: 1,
      Medicine: 'M',
      Company: 'A',
      'Purchase Rate': 10,
      Dealer: 'B',
      Expiry: 'YYYY-MM-DD',
    },
    {
      Id: 2,
      Medicine: 'M',
      Company: 'A',
      'Purchase Rate': 10,
      Dealer: 'B',
      Expiry: 'YYYY-MM-DD',
    },
    {
      Id: 3,
      Medicine: 'M',
      Company: 'A',
      'Purchase Rate': 10,
      Dealer: 'B',
      Expiry: 'YYYY-MM-DD',
    },
  ];
}
