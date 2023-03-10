let shelf = document.querySelector('.shelf')
//Books Class
class Book{
    constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    }
}
//Book Class

//Book.prototype.info = function(Book) {
//    return (Book.title + " by " + Book.author + ", "+ Book.pages +" pages, "+ Book.read)
//}

//Demo Books
let book1 = new Book('Demo Book', 'Author', 450, true)
let book2 = new Book('Demo Book 2', 'Rohtua', 345, false)
//Demo Books


//Function Empty Book

function emptyBook(a){
    if (a.title == '' || a.author == '' || a.pages == '') {
        return false
    }
    else {
        return true
    }
}

//Global Library
let Library = [book1, book2]

//Function that gets books from the form
let getBook = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('read').checked

    return new Book(title, author, pages, isRead)
}

function addBookToLibrary() {
    let newBook = getBook()
    if (emptyBook(newBook)){
        Library.push(newBook)
        let newCard =createBookCard(newBook)
        shelf.appendChild(newCard)
    }
    else {
        alert ('Book has Empty fields')
    }
    submit.removeEventListener('click', () =>{
        addBookToLibrary()
    })
    document.getElementById('form').reset()
    
}

const submit = document.getElementById('add')
submit.addEventListener('click', () =>{
    addBookToLibrary()
})





//Create the card
let createBookCard = (book) => {

    let card = document.createElement('div');
    card.classList.add('card');

    let title = document.createElement('h1');
    title.textContent = book.title;
    card.appendChild(title);

    let author = document.createElement('h3');
    author.textContent = "-" + book.author;
    card.appendChild(author);

    let pages = document.createElement('h4');
    pages.textContent = ("Pages: " +book.pages);
    card.appendChild(pages);

    let read = document.createElement('h5');
    read.textContent = (ifRead(book.read));
    if(book.read == true) { //Changes background color to red or green depending on the read status
        read.style.backgroundColor= 'green';
    }
    else {
        read.style.backgroundColor='red'
    }
    card.appendChild(read);

    let buttons = document.createElement('div')
    buttons.classList.add('card-button')

    let deleteBtn = document.createElement('div'); //Button to eliminate the card
    deleteBtn.textContent = "???????delete";
    deleteBtn.classList.add('delete-button');
    buttons.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => { //Use indexOf to find the book
        let index = Library.indexOf(book);
        Library.splice(index, 1); // using splice to remove the book in specific
        shelf.removeChild(card); // removing child from the 'shelf' in the html
    });

    let toggleBtn = document.createElement('div'); //Button to change the read status
    toggleBtn.textContent = "read???????";
    toggleBtn.classList.add('toggle-button');
    buttons.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
        let index = Library.indexOf(book);
        if(book.read == true) { //Change the background color
            read.style.backgroundColor= 'red';
        }
        else {
            read.style.backgroundColor='green'
        }
        book.read = !book.read //changing the status
        read.textContent = ifRead(book.read) //changing the text according to the status
        Library.splice(index, 1); //replacing it in array
    });
    
    card.appendChild(buttons)
    return card;
};

//Change text inside the READ status
let ifRead = (a) => {

    if(a==true) {
        return 'READ';
    }
    else{
        return 'NOT READ';
    }

}

//Show all the preload/demo books

Library.forEach(book => {
    let bookCard = createBookCard(book)
    shelf.appendChild(bookCard);
})

