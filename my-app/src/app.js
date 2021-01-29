const bookGrid = document.querySelector("#book-grid");
const library = [];
const btnTrigerBookAdd = document.querySelector(".btn-add-book");
const addBookForm = document.querySelector("#add-book");
const addBookFormWrapper = addBookForm.parentElement;
const editBookForm = document.querySelector("#edit-book");
const editBookFormWrapper = editBookForm.parentElement;
let editedBook;

const addDetailsToBook = (title, author, pages, read) => {
  const bookContainer = document.createElement("div");
  const bookTitle = document.createElement("h1");
  const bookAuthor = document.createElement("h1");
  const bookRead = document.createElement("h1");
  const bookDelete = document.createElement("button");
  const bookEdit = document.createElement("button");
  const btnGrp = document.createElement("div");
  const bookPages = document.createElement("h1");
  bookContainer.classList.add("book-container");
  bookTitle.classList.add("text-blue-800");
  bookAuthor.classList.add("font-bold");
  bookRead.classList.add("text-green-600");
  bookPages.classList.add("text-yellow-500");
  btnGrp.classList.add("btn-holder", "text-center");
  bookDelete.classList.add("btn", "btn-alert");
  bookEdit.classList.add("btn", "btn-warning");
  btnGrp.append(bookDelete, bookEdit);
  bookTitle.textContent = title;
  bookAuthor.textContent = author;
  bookPages.textContent = pages;
  bookRead.textContent = read ? "Read" : "Not Read";
  bookDelete.textContent = "Delete";
  bookEdit.textContent = "Edit";

  bookContainer.append(bookTitle, bookAuthor, bookPages, bookRead, btnGrp);
  return { bookContainer, btnGrp };
};

const book = (title, author, pages, read) => {
  const bookDiv = addDetailsToBook(title, author, pages, read);
  const { bookContainer, btnGrp } = bookDiv;
  return { title, author, pages, read, bookContainer, btnGrp };
};

const updateLibrary = (library) => {
  bookGrid.innerHTML = "";
  library.forEach((book) => addBookToGrid(book));
};

const addBookToGrid = (book) => {
  addEventListerToButtons(book);
  bookGrid.appendChild(book.bookContainer);
};

const removeBook = (book, bookContainer) => {
  if (!(bookContainer.parentElement === bookGrid)) return; // fix for a stupid bug i had :(
  bookGrid.removeChild(bookContainer);
  const index = library.indexOf(book);
  if (index > -1) library.splice(index, 1);
  else library = [];
};

const editBook = (book) => {
  editBookFormWrapper.classList.toggle("hidden");
  const [name_input, author_input, pages, read_check] = editBookForm.elements;
  name_input.value = book.title;
  author_input.value = book.author;
  pages.value = book.pages;
  if (book.read) {
    read_check.checked = true;
  }
  editedBook = book;
};

const addEventListerToButtons = (book) => {
  const deleteBtn = book.btnGrp.firstChild;
  const editBtn = book.btnGrp.lastChild;
  const bookContainer = book.bookContainer;
  deleteBtn.addEventListener("click", () => removeBook(book, bookContainer));
  editBtn.addEventListener("click", () => editBook(book, bookContainer));
};

btnTrigerBookAdd.addEventListener("click", () => {
  addBookFormWrapper.classList.toggle("hidden");
  console.log(addBookForm);
});

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const [title, author, pages, add_read] = addBookForm.elements;
  const readBool = add_read.checked;
  let nameCheck;
  library.forEach((book) => {
    nameCheck =
      book.title.toLowerCase().trim() === title.value.toLowerCase().trim();
    if (!nameCheck) return;
  });
  if (nameCheck) alert("This book already exists in your library!");
  else {
    library.push(book(title.value, author.value, pages.value, readBool));
    updateLibrary(library);
    title.value = "";
    author.value = "";
    addBookFormWrapper.classList.toggle("hidden");
  }
});

editBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookIndex = library.indexOf(editedBook);
  const [title, author, pages, read] = editBookForm.elements;
  const newBook = book(title.value, author.value, pages.value, read.checked);
  library[bookIndex] = newBook;
  updateLibrary(library);
  read.checked = false;
  editBookFormWrapper.classList.toggle("hidden");
});

//Removes the popup when the user clicks on the side of the form popup
window.onclick = (e) => {
  console.log("CLICK");
  const clicked =
    e.target.id === "form-add-wrapper" || e.target.id === "form-edit-wrapper";

  if (
    !addBookFormWrapper.classList.contains("hidden") &&
    clicked &&
    e.target.id === "form-add-wrapper"
  ) {
    addBookFormWrapper.classList.toggle("hidden");
  } else if (
    !editBookFormWrapper.classList.contains("hidden") &&
    clicked &&
    e.target.id === "form-edit-wrapper"
  ) {
    editBookFormWrapper.classList.toggle("hidden");
  }
};
