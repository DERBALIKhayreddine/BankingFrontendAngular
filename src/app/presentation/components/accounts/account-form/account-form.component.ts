import { Component, Inject, OnInit } from '@angular/core';
import { Account } from '../../../../models/account.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../../../services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { Client } from '../../../../models/client.model';
import { ClientService } from '../../../../services/client.service';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-account-form',
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
    MatSelectModule, // Ensure this is included
    MatOptionModule, // Ensure this is included
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent implements OnInit {
  clients: Client[] = []; // List of clients to associate with the account
  selectedClientId: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<AccountFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { account: Account },
    private accountService: AccountService,
    private clientService: ClientService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    if (this.data.account.client) {
      this.selectedClientId = this.data.account.client.id;
    }
  }

  // Load clients
  loadClients(): void {
    this.clientService.getAllClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  // Save account
  save(): void {
    if (this.data.account.id) {
      const updatedAccount = {
        rib: this.data.account.rib,
        accountBalance: this.data.account.accountBalance,
      };
      this.accountService.updateAccount(this.data.account.id, updatedAccount).subscribe(() => {
        this.toaster.success('Account updated successfully!', 'Success');
        this.dialogRef.close(true);
      });
    } else {
      if (!this.selectedClientId) {
        this.toaster.error('Please select a client for the account.', 'Error');
        return;
      }
      this.accountService.createAccount(this.selectedClientId, this.data.account).subscribe(() => {
        this.toaster.success('Account created successfully!', 'Success');
        this.dialogRef.close(true);
      });
    }
  }
}