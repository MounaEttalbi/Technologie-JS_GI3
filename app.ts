import Book from "./Book";

const bookForm = document.getElementById("book-form") as HTMLFormElement;
const bookList = document.getElementById("book-list") as HTMLDivElement;

bookForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const author = (document.getElementById("author") as HTMLInputElement).value;
    const pages = +(document.getElementById("pages") as HTMLInputElement).value;
    const status = (document.getElementById("status") as HTMLInputElement).value;
    const price = +(document.getElementById("price") as HTMLInputElement).value;
    const pagesRead = +(document.getElementById("pagesRead") as HTMLInputElement).value;
    const format = (document.getElementById("format") as HTMLInputElement).value;
    const suggestedBy = (document.getElementById("suggestedBy") as HTMLInputElement).value;

    const newBook = new Book(title, author, pages, status, price, pagesRead, format, suggestedBy);
    addBookToUI(newBook);
    bookForm.reset();
});

function addBookToUI(book: Book) {
    const bookDiv = document.createElement("div");
    bookDiv.innerHTML = `
        <p>${book.title} by ${book.author}</p>
        <p>Progress: ${(book.pagesRead / book.pages) * 100}%</p>
    `;
    bookList.appendChild(bookDiv);
}
