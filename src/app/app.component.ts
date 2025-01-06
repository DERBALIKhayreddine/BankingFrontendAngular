import { Component, OnInit } from '@angular/core';
import { RouterOutlet ,RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatToolbarModule, MatButtonModule,MatIconModule,RouterLink,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
}