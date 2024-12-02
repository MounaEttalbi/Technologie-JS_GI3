import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from './shared/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule], // Ajout de CommonModule ici
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Correction : styleUrls (pluriel)
})
export class AppComponent {
  title = 'tp-angular';

  books: Book[] = [
    new Book('ألف ليلة وليلة', true),
    new Book('موسم الهجرة إلى الشمال', false),
    new Book('ذاكرة الجسد', true)
  ];
}
