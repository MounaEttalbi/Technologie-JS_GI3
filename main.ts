import Book from "./Book";
import fs from "fs";

const bookForm = document.getElementById("book-form") as HTMLFormElement;
const bookList = document.getElementById("book-list") as HTMLDivElement;
const csvFilePath = "./data.csv";

// Écrire les en-têtes CSV si le fichier est vide ou n'existe pas encore
if (!fs.existsSync(csvFilePath) || fs.readFileSync(csvFilePath, "utf8").trim() === "") {
    fs.writeFileSync(csvFilePath, "Title,Author,Pages,Status,Price,PagesRead,Format,SuggestedBy\n");
}

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
    addBook(newBook);
    saveBookToCSV(newBook);
    bookForm.reset();
});

function addBook(book: Book) {
    const bookDiv = document.createElement("div");
    bookDiv.innerHTML = `
        <p>${book.title} by ${book.author}</p>
        <p>Progress: ${(book.pagesRead / book.pages) * 100}%</p>
    `;
    bookList.appendChild(bookDiv);
}

function saveBookToCSV(book: Book) {
    const csvRow = `"${book.title}","${book.author}",${book.pages},"${book.status}",${book.price},${book.pagesRead},"${book.format}","${book.suggestedBy}"\n`;
    fs.appendFile(csvFilePath, csvRow, (err:any) => {
        if (err) {
            console.error("Erreur lors de l'enregistrement du livre dans le fichier CSV :", err);
        } else {
            console.log("Livre ajouté dans le fichier CSV avec succès.");
        }
    });
}
