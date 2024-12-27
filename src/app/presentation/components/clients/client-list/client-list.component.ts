import { Component, inject, NgModule, OnInit } from '@angular/core';
import { Client } from '../../../../models/client.model';
import { ClientService } from '../../../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { ClientformComponent } from '../clientform/clientform.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';  // Required for mat-autocomplete
import { MatOptionModule } from '@angular/material/core';  // Required for mat-option
import {MatCardModule} from '@angular/material/card';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmdeleteComponent } from '../../confirmdelete/confirmdelete.component';
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
    MatCardModule 
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  filterValue: string = '';
  displayedColumns: string[] = ['nom', 'prenom', 'rib', 'actions'];
  toaster = inject(ToastrService); // Inject ToastrService

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.clients = data;
        this.filteredClients = data;
      },
      (error) => {
        console.error('Error loading clients', error);
        this.toaster.error('Failed to load clients', 'Error'); // Show error if loading fails
      }
    );
  }

  applyFilter(): void {
    const filterValueLowerCase = this.filterValue.trim().toLowerCase();
    if (filterValueLowerCase) {
      this.filteredClients = this.clients.filter((client) =>
        client.nom.toLowerCase().includes(filterValueLowerCase) || 
        client.prenom.toLowerCase().includes(filterValueLowerCase) ||
        client.rib.toLowerCase().includes(filterValueLowerCase)
      );
    } else {
      this.filteredClients = [...this.clients]; // Reset if no filter value
    }
  }

  editClient(client: Client): void {
    const dialogRef = this.dialog.open(ClientformComponent, {
      width: '500px',
      height: '500px',
      data: client
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadClients();
        this.toaster.success('Client updated successfully', 'Success');
      }
    });
  }

  openClientFormDialog(): void {
    const dialogRef = this.dialog.open(ClientformComponent, {
      width: '500px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadClients();
        this.toaster.success('Client created successfully', 'Success');
      }
    });
  }

  deleteClient(id: number): void {
    const dialogRef = this.dialog.open(ConfirmdeleteComponent, {
      width: '400px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe((confirmDelete) => {
      if (confirmDelete) {
        this.clientService.deleteClient(id).subscribe(
          () => {
            this.clients = this.clients.filter((client) => client.id !== id);
            this.filteredClients = this.filteredClients.filter((client) => client.id !== id);
            this.toaster.success('Client deleted successfully', 'Success');
          },
          (error) => {
            console.error('Error deleting client', error);
            this.toaster.error('Failed to delete client', 'Error');
          }
        );
      }
    });
  }
}