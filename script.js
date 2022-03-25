let myLibrary = [];

function Book(author, title, pageNumber, beenRead) {
    this.author = author
    this.title = title
    this.pageNumber = pageNumber
    this.beenRead = beenRead;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function displayBookForm() {
    main.appendChild(bookForm);
}

const bookForm = document.querySelector('.new-book');
const main = document.querySelector('main');
const addBook = document.querySelector('.add-book');
addBook.addEventListener('click', displayBookForm);

main.removeChild(bookForm);