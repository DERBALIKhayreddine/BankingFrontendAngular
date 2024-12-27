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
  client: Client;

  constructor(
    public dialogRef: MatDialogRef<ClientformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private clientService: ClientService
  ) {
    this.client = { ...data }; // Clone the data passed to the dialog
  }

  saveClient(): void {
    if (this.client.id) {
      // Update client
      this.clientService.updateClient(this.client.id, this.client).subscribe(() => {
        this.dialogRef.close(this.client);
      });
    } else {
      // Create new client
      this.clientService.createClient(this.client).subscribe(() => {
        this.dialogRef.close(this.client);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

