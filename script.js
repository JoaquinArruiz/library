function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function info(Book){
        return (this.title + " by " + this.author + ", "+ this.pages +" pages, "+ this.read)
    }
}


let book = new Book('titulo', 'nam', 345, "not read")