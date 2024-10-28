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
      pagesRead: number,
      status: string,
      format: string,
      suggestedBy: string,
      price: number
    ) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.pagesRead = pagesRead;
      this.status = status;
      this.format = format;
      this.suggestedBy = suggestedBy;
      this.price = price;
      this.finished = pagesRead >= pages;
    }
  
    currentlyAt(): number {
      return (this.pagesRead / this.pages) * 100;
    }
  
    deleteBook(books: Book[]): Book[] {
      return books.filter(book => book.title !== this.title);
    }
  }
  