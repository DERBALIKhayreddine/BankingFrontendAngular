import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button'; // Optional for buttons
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  slides = [
    {
      image: 'https://miro.medium.com/v2/resize:fit:1400/0*CIlkutOVe15Jkmb8',
      title: 'Angular 19',
      description: 'Angular is a platform for building mobile and desktop web applications.',
      link: 'https://angular.io/'
    },
    {
      image: 'https://miro.medium.com/v2/resize:fit:716/1*98O4Gb5HLSlmdUkKg1DP1Q.png',
      title: 'Spring Boot 3.4.1',
      description: 'Spring Boot makes it easy to create stand-alone, production-grade Spring-based Applications.',
      link: 'https://spring.io/projects/spring-boot'
    }
  ];
  

  currentSlide = 0;

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
