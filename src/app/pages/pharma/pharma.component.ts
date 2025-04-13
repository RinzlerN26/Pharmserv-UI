import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { PharmaService } from '../../services/pharma.service';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-pharma',
  imports: [TableComponent, FormsModule],
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
    'Actions',
  ];

  pharmaData: any[] = [];

  selectedRow: any = {};

  userIntId: Number = parseInt(sessionStorage.getItem('userIntId') || '0', 10);

  ngOnInit() {
    if (this.userIntId) {
      this.pharmaService.getPharmaEntries(this.userIntId).subscribe({
        next: (response) => {
          this.pharmaData = response.map((item: any, index: number) => ({
            Id: index + 1,
            Medicine: item.medicineName,
            Company: item.companyName,
            'Purchase Rate': item.purchaseRate,
            Dealer: item.dealerName,
            Expiry: item.expiryDate,
            pharmaId: item.pharmaId,
          }));
        },
        error: (err) => {
          console.error('Failed to load pharma data', err);
        },
      });
    }
  }

  handleUpdateEntry(row: any) {
    this.selectedRow = { ...row };
    const modalElement = document.getElementById('updateModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.show();
    }
  }

  updateEntry() {
    const modalElement = document.getElementById('updateModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      const pharmaDetails = {
        medicineName: this.selectedRow.Medicine,
        companyName: this.selectedRow.Company,
        purchaseRate: parseInt(this.selectedRow['Purchase Rate'] || '0', 10),
        dealerName: this.selectedRow.Dealer,
        expiryDate: this.selectedRow.Expiry,
      };
      const pharmaIntId = parseInt(this.selectedRow.pharmaId || '0', 10);
      this.pharmaService
        .updatePharmaEntry(this.userIntId, pharmaIntId, pharmaDetails)
        .subscribe({
          next: () => {
            this.pharmaService.getPharmaEntries(this.userIntId).subscribe({
              next: (response) => {
                this.pharmaData = response.map((item: any, index: number) => ({
                  Id: index + 1,
                  Medicine: item.medicineName,
                  Company: item.companyName,
                  'Purchase Rate': item.purchaseRate,
                  Dealer: item.dealerName,
                  Expiry: item.expiryDate,
                  pharmaId: item.pharmaId,
                }));
              },
              error: (err) => {
                console.error('Failed to load pharma data', err);
              },
            });
          },
          error: (err) => {
            console.error('Failed to update pharma entry', err);
          },
        });
      alert('Entry Updated Successfully.');
      modal.hide();
    }
  }

  handleDeleteEntry(row: any) {
    const pharmaIntId = parseInt(row.pharmaId || '0', 10);
    this.pharmaService
      .deletePharmaEntry(this.userIntId, pharmaIntId)
      .subscribe({
        next: () => {
          this.pharmaService.getPharmaEntries(this.userIntId).subscribe({
            next: (response) => {
              this.pharmaData = response.map((item: any, index: number) => ({
                Id: index + 1,
                Medicine: item.medicineName,
                Company: item.companyName,
                'Purchase Rate': item.purchaseRate,
                Dealer: item.dealerName,
                Expiry: item.expiryDate,
                pharmaId: item.pharmaId,
              }));
            },
            error: (err) => {
              console.error('Failed to load pharma data', err);
            },
          });
        },
        error: (err) => {
          console.error('Failed to delete pharma entry', err);
        },
      });
  }
}
