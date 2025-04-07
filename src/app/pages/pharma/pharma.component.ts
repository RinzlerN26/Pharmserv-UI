import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { PharmaService } from '../../services/pharma.service';
@Component({
  selector: 'app-pharma',
  imports: [TableComponent],
  templateUrl: './pharma.component.html',
  styleUrl: './pharma.component.scss',
})
export class PharmaComponent {
  constructor(private pharmaService: PharmaService) {}

  columns: string[] = [
    'Id',
    'Medicine',
    'Company',
    'Purchase Rate',
    'Dealer',
    'Expiry',
  ];

  pharmaData: any[] = [];

  ngOnInit() {
    console.log(sessionStorage.getItem('userIntId'));
    if (sessionStorage.getItem('userIntId')) {
      const userIntId = parseInt(
        sessionStorage.getItem('userIntId') || '0',
        10
      );

      this.pharmaService.getPharmaEntries(userIntId).subscribe({
        next: (response) => {
          this.pharmaData = response.map((item: any, index: number) => ({
            Id: index + 1,
            Medicine: item.medicineName,
            Company: item.companyName,
            'Purchase Rate': item.purchaseRate,
            Dealer: item.dealerName,
            Expiry: item.expiryDate,
          }));
        },
        error: (err) => {
          console.error('Failed to load pharma data', err);
        },
      });
    }
  }
}
