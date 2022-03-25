function Book(title, author, pageNumber, beenRead) {
    this.title = title
    this.author = author
    this.pageNumber = pageNumber
    this.beenRead = beenRead;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function displayBookForm() {
    main.appendChild(bookForm);
    main.removeChild(addBook);
}

function clearForm() {
    newBookTitle.value = '';
    newBookAuthor.value = '';
    newBookPages.value = '';
    bookReadTrue.checked = false;
    bookReadFalse.checked = false;
}

function cancelForm() {
    main.removeChild(bookForm);
    clearForm();
    main.appendChild(addBook);
}

function submitBook() {
    if (newBookTitle.value.split(' ')[0] === '') {
        alert('You must type a Title before submitting!');
        return;
    }
    if (bookReadTrue.checked === false && bookReadFalse.checked === false) {
        alert('You have to select an option. (Have you read this book?)');
        return;
    }
    let title = newBookTitle.value;
    let author = newBookAuthor.value;
    let pageNumber = newBookPages.value;
    let beenRead = bookReadTrue.checked ? true : false;
    let newBook = new Book(title, author, pageNumber, beenRead);
    addBookToLibrary(newBook);
    main.removeChild(bookForm);
    clearForm();
    createCardGrid();
    main.appendChild(addBook);
}

function createCardGrid() {
    for (let i = 0; i < myLibrary.length; i++) {
        if(document.getElementById(`card-${i}`) !== null) continue;
        addCard(myLibrary[i], i);
    }
}

function addCard(book, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', `card-${index}`);
    container.appendChild(card);
    const bookTitle = document.createElement('h2');
    bookTitle.textContent = `${book.title}`;
    card.appendChild(bookTitle);
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = `Author: ${book.author}`;
    card.appendChild(bookAuthor);
    const bookPageNumber = document.createElement('p');
    bookPageNumber.textContent = `Pages: ${book.pageNumber}`;
    card.appendChild(bookPageNumber);
    const bookBeenRead = document.createElement('p');
    bookBeenRead.textContent = 'Read: ';
    const beenReadImage = document.createElement('img');
    beenReadImage.setAttribute('src', `./icons/read-${book.beenRead}.svg`);
    beenReadImage.classList.add(`book-read-${book.beenRead}`);
    bookBeenRead.appendChild(beenReadImage);
    card.appendChild(bookBeenRead);
}

let myLibrary = [];

const container = document.querySelector('.container');
const bookForm = document.querySelector('.new-book');
const main = document.querySelector('main');
const addBook = document.querySelector('.add-book');
const submitButton = document.querySelector('.submit');
const cancelButton = document.querySelector('.cancel');
const newBookTitle = document.querySelector('#book-title');
const newBookAuthor = document.querySelector('#book-author');
const newBookPages = document.querySelector('#book-pages');
const bookReadTrue = document.querySelector('#book-read-true');
const bookReadFalse = document.querySelector('#book-read-false');

addBook.addEventListener('click', displayBookForm);
submitButton.addEventListener('click', submitBook);
cancelButton.addEventListener('click', cancelForm);

main.removeChild(bookForm);