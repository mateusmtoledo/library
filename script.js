function Book(title, author, pageNumber, beenRead) {
    this.title = title
    this.author = author
    this.pageNumber = pageNumber
    this.beenRead = beenRead;
}

Book.prototype.addCard = function() {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    container.appendChild(this.card);
    const bookTitle = document.createElement('h2');
    bookTitle.textContent = `${this.title}`;
    this.card.appendChild(bookTitle);
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = `Author: ${this.author}`;
    this.card.appendChild(bookAuthor);
    const bookPageNumber = document.createElement('p');
    bookPageNumber.textContent = `Pages: ${this.pageNumber}`;
    this.card.appendChild(bookPageNumber);
    const bookBeenRead = document.createElement('p');
    bookBeenRead.textContent = 'Read: ';
    const beenReadImage = document.createElement('img');
    beenReadImage.setAttribute('src', `./icons/read-${this.beenRead}.svg`);
    beenReadImage.classList.add(`book-read-${this.beenRead}`);
    bookBeenRead.appendChild(beenReadImage);
    this.card.appendChild(bookBeenRead);
    beenReadImage.addEventListener('click', this.changeReadStatus.bind(this));
    const deleteItem = document.createElement('img');
    deleteItem.setAttribute('src', './icons/trash-can-outline.svg');
    deleteItem.classList.add('remove-item');
    deleteItem.addEventListener('click', this.removeItem.bind(this));
    this.card.appendChild(deleteItem);
}

Book.prototype.removeItem = function() {
    myLibrary.splice(myLibrary.indexOf(this), 1);
    createCardGrid();
}

Book.prototype.changeReadStatus = function() {
    const element = this.card.querySelector('p img');
    if (this.beenRead === true) {
        element.setAttribute('src', `./icons/read-false.svg`);
        element.classList.replace('book-read-true', 'book-read-false');
        this.beenRead = false;
    }
    else {
        element.setAttribute('src', `./icons/read-true.svg`);
        element.classList.replace('book-read-false', 'book-read-true');
        this.beenRead = true;
    }
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
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    for (let i = 0; i < myLibrary.length; i++) {
        myLibrary[i].addCard(myLibrary[i], i);
    }
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