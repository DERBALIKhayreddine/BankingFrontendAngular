import { Component, inject, NgModule, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../../../models/client.model';
import { ClientService } from '../../../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ClientformComponent } from '../clientform/clientform.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';  // Required for mat-autocomplete
import { MatOptionModule } from '@angular/material/core';  // Required for mat-option
import {MatCardModule} from '@angular/material/card';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmdeleteComponent } from '../../confirmdelete/confirmdelete.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-client-list',
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
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'rib', 'accountBalance', 'actions'];
  dataSource = new MatTableDataSource<Client>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  // Load clients
  loadClients(): void {
    this.clientService.getAllClients().subscribe((clients) => {
      this.dataSource.data = clients.map((client) => ({
        ...client,
        rib: client.accounts?.length ? client.accounts.map((acc) => acc.rib).join(', ') : 'No RIB',
        accountBalance: client.accounts?.reduce((sum, acc) => sum + acc.accountBalance, 0) || 0,
      }));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // Apply filter
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Open edit dialog
  openEditDialog(client: Client): void {
    const dialogRef = this.dialog.open(ClientformComponent, {
      width: '400px',
      data: client,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toaster.success('Client updated successfully!', 'Success');
        this.loadClients();
      }
    });
  }

  // Open delete dialog
  openDeleteDialog(client: Client): void {
    const dialogRef = this.dialog.open(ConfirmdeleteComponent, {
      width: '300px',
      data: { type: 'Client', name: `${client.nom} ${client.prenom}` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe(() => {
          this.toaster.success('Client deleted successfully!', 'Success');
          this.loadClients();
        });
      }
    });
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(ClientformComponent, {
      width: '400px',
      data: { id: null, nom: '', prenom: '', accounts: [] }, // Empty client object for creation
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toaster.success('Client added successfully!', 'Success');
        this.loadClients(); // Refresh the list after adding
      }
    });
  }
}