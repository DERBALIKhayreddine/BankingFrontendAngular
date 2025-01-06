import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import { Account } from '../../../../models/account.model';
import { ClientService } from '../../../../services/client.service';
import { Client } from '../../../../models/client.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountFormComponent } from '../account-form/account-form.component';
import { ConfirmdeleteComponent } from '../../confirmdelete/confirmdelete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-account-list',
  imports: [
   CommonModule,
     FormsModule,
     MatTableModule,
     MatDialogModule,
     MatIconModule,
     MatButtonModule,
     MatInputModule,
     MatFormFieldModule,
     MatSortModule,
     MatAutocompleteModule,  // Import for mat-autocomplete
     MatOptionModule,   
     MatCardModule,
     MatPaginatorModule
  ],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'rib', 'accountBalance', 'clientName', 'actions'];
  dataSource = new MatTableDataSource<Account>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private accountService: AccountService,
    private toaster: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  // Load accounts from the server
  loadAccounts(): void {
    this.accountService.getAllAccounts().subscribe((accounts) => {
      this.dataSource.data = accounts;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // Apply table filter
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Open Add Account Dialog
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AccountFormComponent, {
      width: '400px',
      data: { account: { id: null, rib: '', accountBalance: 0, client: null } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toaster.success('Account added successfully!', 'Success');
        this.loadAccounts();
      }
    });
  }

  // Open Edit Account Dialog
  openEditDialog(account: Account): void {
    const dialogRef = this.dialog.open(AccountFormComponent, {
      width: '400px',
      data: { account },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toaster.success('Account updated successfully!', 'Success');
        this.loadAccounts();
      }
    });
  }

  // Open Delete Confirmation Dialog
  openDeleteDialog(account: Account): void {
    const dialogRef = this.dialog.open(ConfirmdeleteComponent, {
      width: '300px',
      data: { type: 'Account', name: account.rib },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.accountService.deleteAccount(account.id).subscribe(() => {
          this.toaster.success('Account deleted successfully!', 'Success');
          this.loadAccounts();
        });
      }
    });
  }
}