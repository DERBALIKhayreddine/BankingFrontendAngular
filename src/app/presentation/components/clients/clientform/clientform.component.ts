import { Component, Inject } from '@angular/core';
import { Client } from '../../../../models/client.model';
import { ClientService } from '../../../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientform',
  imports: [    
    CommonModule,
      FormsModule,
      MatTableModule,
      MatDialogModule,
      MatIconModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatSortModule],
  templateUrl: './clientform.component.html',
  styleUrl: './clientform.component.css'
})
export class ClientformComponent {
  constructor(
    public dialogRef: MatDialogRef<ClientformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private clientService: ClientService,
    private toaster: ToastrService
  ) {
    if (!this.data.accounts) {
      this.data.accounts = [];
    }
  }

  save(): void {
    if (this.data.id) {
      this.clientService.updateClient(this.data.id, this.data).subscribe(() => {
        this.toaster.success('Client updated successfully!', 'Success');
        this.dialogRef.close(true);
      });
    } else {
      this.clientService.createClient(this.data).subscribe(() => {
        this.toaster.success('Client created successfully!', 'Success');
        this.dialogRef.close(true);
      });
    }
  }
}