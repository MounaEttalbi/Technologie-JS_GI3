"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Book = /** @class */ (function () {
    function Book(title, author, pages, status, price, pagesRead, format, suggestedBy) {
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
    Book.prototype.currentlyAt = function () {
        return (this.pagesRead / this.pages) * 100;
    };
    Book.prototype.deleteBook = function (books) {
        var _this = this;
        return books.filter(function (book) { return book.title !== _this.title; });
    };
    return Book;
}());
exports.default = Book;
