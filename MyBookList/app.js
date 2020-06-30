//* Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// *UI Class : Handle UI Task
class UI {
  static displayBooks() {
    // const StoredBooks = [
    //   {
    //     title: "Book One",
    //     author: "Conan Doyle",
    //     isbn: "34343",
    //   },
    //   {
    //     title: "Book Two",
    //     author: "GRR Martin",
    //     isbn: "43544",
    //   },
    // ];
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  //   * SHow alert
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // * Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
  static clearFileds() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}
// *Store class : handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
// * Events : Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks());

// * Events : Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // * Prevent actual dsubmit
  e.preventDefault();

  // *get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // *Validate
  if (title === "" || isbn === "" || author === "") {
    UI.showAlert("Please fill all the fields!!!", "danger");
  } else {
    //   * Instantiate a book
    const book = new Book(title, author, isbn);
    console.log(book);

    //   * Add book to the list
    UI.addBookToList(book);
    // *Add book to store as well
    Store.addBook(book);

    // * Show success message
    UI.showAlert(":: Book Added!!", "success");

    //   * Clear fields
    UI.clearFileds();
  }
});

// * Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  //   console.log(e.target);
  UI.deleteBook(e.target);
  // * Remove book from the store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //   *show alert
  UI.showAlert("BOOK REMOVED!!", "success");
});
