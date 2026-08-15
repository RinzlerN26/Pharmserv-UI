import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { SearchComponent } from '../../components/search/search.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PharmaService } from '../../services/pharma.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-pharma',
  imports: [
    TableComponent,
    SearchComponent,
    PaginationComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './pharma.component.html',
  styleUrl: './pharma.component.scss',
})
export class PharmaComponent {
  constructor(private pharmaService: PharmaService) {}

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;
  searchTerm: string = '';

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.currentPage = 1;
    this.loadPharmaData();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPharmaData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.loadPharmaData();
  }

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

  newPharmaEntry: any = {
    Medicine: '',
    Company: '',
    'Purchase Rate': '',
    Dealer: '',
    Expiry: '',
  };

  formFields: any = [
    { label: 'Medicine', key: 'Medicine', type: 'text' },
    { label: 'Company', key: 'Company', type: 'text' },
    { label: 'Purchase Rate', key: 'Purchase Rate', type: 'text' },
    { label: 'Dealer', key: 'Dealer', type: 'text' },
    { label: 'Expiry', key: 'Expiry', type: 'text' },
  ];

  userIntId: number = parseInt(sessionStorage.getItem('userIntId') || '0', 10);

  loadPharmaData(): void {
    if (!this.userIntId) {
      return;
    }

    this.pharmaService
      .getPharmaEntries(
        this.userIntId,
        this.currentPage,
        this.pageSize,
        this.searchTerm,
      )
      .subscribe({
        next: (response) => {
          this.pharmaData = response.content.map(
            (item: any, index: number) => ({
              Id: (this.currentPage - 1) * this.pageSize + index + 1,
              Medicine: item.medicineName,
              Company: item.companyName,
              'Purchase Rate': item.purchaseRate,
              Dealer: item.dealerName,
              Expiry: item.expiryDate,
              pharmaId: item.pharmaId,
            }),
          );

          this.totalItems = response.totalElements;
          this.totalPages = response.totalPages;
        },

        error: (err) => {
          console.error('Failed to load pharma data', err);
        },
      });
  }

  ngOnInit() {
    this.loadPharmaData();
  }

  handleAddEntry() {
    const modalElement = document.getElementById('addModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.show();
    }
  }

  addEntry() {
    const modalElement = document.getElementById('addModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      const pharmaDetails = {
        medicineName: this.newPharmaEntry.Medicine,
        companyName: this.newPharmaEntry.Company,
        purchaseRate: parseInt(this.newPharmaEntry['Purchase Rate'] || '0', 10),
        dealerName: this.newPharmaEntry.Dealer,
        expiryDate: this.newPharmaEntry.Expiry,
        userId: this.userIntId,
      };
      this.pharmaService.addPharmaEntry(pharmaDetails).subscribe({
        next: () => {
          this.loadPharmaData();
          alert('Entry Added Successfully.');
          (document.activeElement as HTMLElement)?.blur();
          setTimeout(() => {
            modal.hide();
          }, 10);
        },
        error: (err) => {
          console.error('Failed to add pharma entry', err);
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
            this.loadPharmaData();
            alert('Entry Updated Successfully.');
            (document.activeElement as HTMLElement)?.blur();
            setTimeout(() => {
              modal.hide();
            }, 10);
          },
          error: (err) => {
            console.error('Failed to add pharma entry', err);
          },
        });
    }
  }

  handleDeleteEntry(row: any) {
    const pharmaIntId = parseInt(row.pharmaId || '0', 10);
    this.pharmaService
      .deletePharmaEntry(this.userIntId, pharmaIntId)
      .subscribe({
        next: () => {
          this.loadPharmaData();
        },
        error: (err) => {
          console.error('Failed to delete pharma entry', err);
        },
      });
  }
}
