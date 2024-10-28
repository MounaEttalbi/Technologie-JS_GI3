import express from 'express';
import bodyParser from 'body-parser';
import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Use bodyParser to handle JSON data
app.use(bodyParser.json());

// CSV Writer configuration
const csvWriter = createObjectCsvWriter({
    path: path.join(__dirname, './data.csv'), // Use absolute path
    header: [
        { id: 'title', title: 'Title' },
        { id: 'author', title: 'Author' },
        { id: 'pages', title: 'Pages' },
        { id: 'pagesRead', title: 'Pages Read' },
        { id: 'status', title: 'Status' },
        { id: 'format', title: 'Format' },
        { id: 'suggestedBy', title: 'Suggested By' },
        { id: 'price', title: 'Price' },
        { id: 'finished', title: 'Finished' }, // Include finished in the header
    ],
});

// Route to save book
app.post('/save-book', async (req, res) => {
    try {
        const book = req.body;
        // Check if the file already exists
        const fileExists = fs.existsSync(csvWriter.path);
        
        // Append the book to CSV
        await csvWriter.writeRecords([book]);
        
        res.status(200).json({ message: 'Book saved successfully!' });
    } catch (error) {
        console.error('Error saving book:', error);
        res.status(500).json({ message: 'Error saving book' });
    }
});

// Serve static files if needed (like HTML, CSS, JS)
app.use(express.static('public')); // Make sure your HTML and JS are served correctly

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});