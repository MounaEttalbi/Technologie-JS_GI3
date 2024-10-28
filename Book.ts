export default class Book {
  title: string;
  author: string;
  pages: number;
  pagesRead: number;
  status: string;
  format: string;
  suggestedBy: string;
  price: number;
  finished: boolean;

  constructor(
      title: string,
      author: string,
      pages: number,
      status: string,
      price: number,
      pagesRead: number,
      format: string,
      suggestedBy: string,
  ) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.status = status;
      this.pagesRead = pagesRead;
      this.format = format;
      this.suggestedBy = suggestedBy;
      this.price = price;
      this.finished = pagesRead >= pages;
  }

  currentlyAt(): number {
      return (this.pagesRead / this.pages) * 100;
  }

  updateBook(details: Partial<Omit<Book, 'title' | 'finished'>>): void {
      Object.assign(this, details);
      this.finished = this.pagesRead >= this.pages; // Update finished status
  }
}

class BookManager {
  private books: Book[] = [];

  // Create
  addBook(book: Book): void {
      this.books.push(book);
  }

  // Read
  getBooks(): Book[] {
      return this.books;
  }

  getBook(title: string): Book | undefined {
      return this.books.find(book => book.title === title);
  }

  // Update
  updateBook(title: string, updatedDetails: Partial<Omit<Book, 'title' | 'finished'>>): boolean {
      const book = this.getBook(title);
      if (book) {
          book.updateBook(updatedDetails);
          return true; // Update was successful
      }
      return false; // Book not found
  }

  // Delete
  deleteBook(title: string): void {
      this.books = this.books.filter(book => book.title !== title);
  }
}
