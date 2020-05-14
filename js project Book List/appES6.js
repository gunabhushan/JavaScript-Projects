class Book{
    constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}}
class UI{
    addBookList(book){
        const bookList = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
                         <td>${book.author}</td>
                         <td>${book.isbn}</td>
                         <td><a href="#" class="delete">X</a></td>`
        bookList.appendChild(row);

        const ax = JSON.stringify(row);
        localStorage.setItem('value',ax);
    }
    
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    
    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
    
    showAlert(message, classname){
        const ediv = document.createElement('div');
        const form = document.getElementById('book-form');
        const container = document.querySelector('.container');
        ediv.className = `u-full-width alert ${classname}`;
        ediv.appendChild(document.createTextNode(`${message}`))
        container.insertBefore(ediv,form);
        setTimeout(function(){
            ediv.style.display = 'none';
        },2000)
    }
    
}

class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBooks(book){
        const books = Store.getBooks();

        books.push(book)

        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBooks(isbm){
        const books = Store.getBooks();

        books.forEach(function(item,index){
            if(item.isbn === isbm){
                  books.splice(index,1);
            }
        });
        
        localStorage.setItem('books',JSON.stringify(books));

    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI()

            ui.addBookList(book);
        })
    }
}

document.addEventListener('DOMContentLoaded',Store.displayBooks);

document.getElementById('book-form').addEventListener('submit',function(e){
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    const book = new Book(title,author,isbn);

    const ui = new UI();

    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please check the fields below', 'error');
    }
    else{
        ui.addBookList(book);

        Store.addBooks(book);

        ui.clearFields();
                
        ui.showAlert('Book added','success');
    }
    e.preventDefault();
})
document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI();

    ui.deleteBook(e.target);

    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

    if(e.target.className === 'delete'){
    ui.showAlert('Successfully deleted','success');
    }

    e.preventDefault();
})
