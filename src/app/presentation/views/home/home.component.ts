import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatButtonModule } from '@angular/material/button'; // Optional for buttons
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AccountService } from '../../../services/account.service';
import { ClientService } from '../../../services/client.service';

import {
  ApexChart,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexTitleSubtitle
} from 'ng-apexcharts';

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  title: ApexTitleSubtitle;
};

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type AreaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-home',
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
            MatPaginatorModule,
            NgApexchartsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
   // Chart options
   statisticsOverviewOptions: PieChartOptions = {
    series: [],
    chart: { type: 'pie' },
    labels: [],
    title: { text: 'Statistics Overview' },
  };

  accountsByClientsChartOptions: LineChartOptions = {
    series: [],
    chart: { type: 'line', height: 350 },
    xaxis: { categories: [] },
    title: { text: 'Accounts by Clients' },
  };

  clientsByAccountsChartOptions: AreaChartOptions = {
    series: [],
    chart: { type: 'area', height: 350 },
    xaxis: { categories: [] },
    dataLabels: { enabled: false },
    title: { text: 'Clients by Accounts' },
  };

  constructor(private clientService: ClientService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Fetch data for pie chart
    this.clientService.getAllClients().subscribe((clients) => {
      this.accountService.getAllAccounts().subscribe((accounts) => {
        this.setupStatisticsOverviewChart(clients.length, accounts.length);
      });
      this.setupClientsByAccountsChart(clients);
    });

    // Fetch data for line chart
    this.accountService.getAllAccounts().subscribe((accounts) => {
      this.setupAccountsByClientsChart(accounts);
    });
  }

  setupStatisticsOverviewChart(clientsCount: number, accountsCount: number): void {
    this.statisticsOverviewOptions = {
      series: [clientsCount, accountsCount],
      chart: { type: 'pie' },
      labels: ['Clients', 'Accounts'],
      title: { text: 'Statistics Overview' },
    };
  }

  setupAccountsByClientsChart(accounts: any[]): void {
    const accountsPerClient = accounts.reduce((acc: any, account: any) => {
      acc[account.clientName] = (acc[account.clientName] || 0) + 1;
      return acc;
    }, {});

    const series = Object.values(accountsPerClient);
    const categories = Object.keys(accountsPerClient);

    this.accountsByClientsChartOptions = {
      series: [
        {
          name: 'Accounts',
          data: series as number[],
        },
      ],
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        categories: categories,
      },
      title: {
        text: 'Accounts by Clients',
      },
    };
  }

  setupClientsByAccountsChart(clients: any[]): void {
    const clientsPerAccount = clients.reduce((acc: any, client: any) => {
      const accountCount = client.accounts ? client.accounts.length : 0;
      acc[client.nom + ' ' + client.prenom] = accountCount;
      return acc;
    }, {});

    const series = Object.values(clientsPerAccount);
    const categories = Object.keys(clientsPerAccount);

    this.clientsByAccountsChartOptions = {
      series: [
        {
          name: 'Clients',
          data: series as number[],
        },
      ],
      chart: {
        type: 'area',
        height: 350,
      },
      xaxis: {
        categories: categories,
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: 'Clients by Accounts',
      },
    };
  }
}