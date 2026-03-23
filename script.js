const myLibrary = [];

// CONSTRUCTOR
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// TOGGLE READ STATUS
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// ADD BOOK
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

// DISPLAY BOOKS
function displayBooks() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? "Read" : "Not Read"}</p>
      <button class="toggle">Toggle Read</button>
      <button class="remove">Remove</button>
    `;

    // REMOVE
    card.querySelector(".remove").addEventListener("click", () => {
      removeBook(book.id);
    });

    // TOGGLE
    card.querySelector(".toggle").addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });

    libraryDiv.appendChild(card);
  });
}

// REMOVE FUNCTION
function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  myLibrary.splice(index, 1);
  displayBooks();
}

// FORM HANDLING
const form = document.getElementById("bookForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);
  form.reset();
});

// SHOW FORM
document.getElementById("newBookBtn").addEventListener("click", () => {
  document.getElementById("formContainer").classList.toggle("hidden");
});

// SAMPLE DATA (optional)
addBookToLibrary("Book One", "Author A", 200, true);
addBookToLibrary("Book Two", "Author B", 150, false);