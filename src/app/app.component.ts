import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from './shared/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Assurez-vous d'importer FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule], // Ajouter FormsModule ici
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'tp-angular';

  books: Book[] = [
    new Book('ألف ليلة وليلة', true),
    new Book('موسم الهجرة إلى الشمال', false),
    new Book('ذاكرة الجسد', true),
    new Book('The Great Gatsby', true),
    new Book('Pride and Prejudice', true)
  ];
  
  selectedBook: string = ''; // Propriété pour two-way binding
}
