import Book from './Book'; // Ensure you import the Book class

const bookForm = document.getElementById('book-form') as HTMLFormElement;
const bookList = document.getElementById('books') as HTMLUListElement;
const stats = document.getElementById('stats') as HTMLParagraphElement;

let books: Book[] = [];

// Function to update the book list in the UI
function updateBookList() {
    bookList.innerHTML = ''; // Clear the current list
    let totalBooksRead = 0;
    let totalPagesRead = 0;

    books.forEach((book) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} by ${book.author} - Pages Read: ${book.pagesRead}/${book.pages}`;
        bookList.appendChild(listItem);
        if (book.finished) {
            totalBooksRead++;
            totalPagesRead += book.pages;
        } else {
            totalPagesRead += book.pagesRead;
        }
    });

    stats.textContent = `Total Books Read: ${totalBooksRead}, Total Pages Read: ${totalPagesRead}`;
}


// Function to handle form submission
async function handleFormSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission

    const title = (document.getElementById('title') as HTMLInputElement).value;
    const author = (document.getElementById('author') as HTMLInputElement).value;
    const pages = Number((document.getElementById('pages') as HTMLInputElement).value);
    const pagesRead = Number((document.getElementById('pagesRead') as HTMLInputElement).value);
    const status = (document.getElementById('status') as HTMLSelectElement).value;
    const format = (document.getElementById('format') as HTMLSelectElement).value;
    const suggestedBy = (document.getElementById('suggestedBy') as HTMLInputElement).value;
    const price = Number((document.getElementById('price') as HTMLInputElement).value);

    // Create a new book instance
    const newBook = new Book(title, author, pages, status, price, pagesRead, format, suggestedBy);

    // Send data to server to save in CSV
    await saveBookToCSV(newBook);

    // Clear form fields
    bookForm.reset();
}


// Function to save the book to a CSV file
async function saveBookToCSV(book: Book) {
    try {
        const response = await fetch('/save-book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });

        if (!response.ok) {
            throw new Error('Failed to save book');
        }
    } catch (error) {
        console.error('Error saving book:', error);
    }
}

// Add event listener for form submission
bookForm.addEventListener('submit', handleFormSubmit);
