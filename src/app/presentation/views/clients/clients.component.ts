import { Component } from '@angular/core';
import { ClientListComponent } from "../../components/clients/client-list/client-list.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  imports: [ClientListComponent,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

}
