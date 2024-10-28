"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs"); // Use * as fs instead of default import
var Book_1 = require("./Book");
var bookForm = document.getElementById("book-form");
var bookList = document.getElementById("book-list");
var csvFilePath = "data.csv";
// Write the CSV headers if the file is empty or doesn't exist
if (!fs.existsSync(csvFilePath) || fs.readFileSync(csvFilePath, "utf8").trim() === "") {
    fs.writeFileSync(csvFilePath, "Title,Author,Pages,Status,Price,PagesRead,Format,SuggestedBy\n");
}
bookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var pages = +document.getElementById("pages").value;
    var status = document.getElementById("status").value;
    var price = +document.getElementById("price").value;
    var pagesRead = +document.getElementById("pagesRead").value;
    var format = document.getElementById("format").value;
    var suggestedBy = document.getElementById("suggestedBy").value;
    var newBook = new Book_1.default(title, author, pages, status, price, pagesRead, format, suggestedBy);
    addBook(newBook);
    saveBookToCSV(newBook);
    bookForm.reset();
});
function addBook(book) {
    var bookDiv = document.createElement("div");
    bookDiv.innerHTML = "\n        <p>".concat(book.title, " by ").concat(book.author, "</p>\n        <p>Progress: ").concat((book.pagesRead / book.pages) * 100, "%</p>\n    ");
    bookList.appendChild(bookDiv);
}
function saveBookToCSV(book) {
    const csvRow = `"${book.title}","${book.author}",${book.pages},"${book.status}",${book.price},${book.pagesRead},"${book.format}","${book.suggestedBy}"\n`;
    
    // Create a Blob with the CSV data
    const blob = new Blob([csvRow], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    
    // Create a URL for the Blob and set it as the href attribute of the link
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    
    // Append the link to the body (it won't be visible)
    document.body.appendChild(link);
    
    // Trigger a click on the link to download the file
    link.click();
    
    // Clean up and remove the link
    document.body.removeChild(link);
}

