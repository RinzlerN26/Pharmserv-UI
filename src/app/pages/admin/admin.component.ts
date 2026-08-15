import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../services/user.service';
import { SearchComponent } from '../../components/search/search.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, SearchComponent, PaginationComponent, TableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  columns: string[] = ['Id', 'User Id', 'Name', 'Email'];

  users: any[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;
  searchTerm: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService
      .getAllUsers(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response) => {
          this.users = response.content.map((user: any, index: number) => ({
            Id: (this.currentPage - 1) * this.pageSize + index + 1,

            'User Id': user.userId,
            Name: user.userName,
            Email: user.userEmail,

            userIntId: user.id,
          }));

          this.totalItems = response.totalElements;
          this.totalPages = response.totalPages;
        },

        error: (err) => {
          console.error('Failed to load users', err);
        },
      });
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.currentPage = 1;

    this.loadUsers();
  }

  onPageChange(page: number): void {
    this.currentPage = page;

    this.loadUsers();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;

    this.loadUsers();
  }
}
