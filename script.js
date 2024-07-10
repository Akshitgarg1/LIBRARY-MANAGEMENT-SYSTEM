document.getElementById('showBooksBtn').addEventListener('click', showAllBooks);
document.getElementById('addBooksBtn').addEventListener('click', showAddBookForm);
document.getElementById('extractBookBtn').addEventListener('click', showExtractBookForm);
document.getElementById('deleteBookBtn').addEventListener('click', showDeleteBookForm);
document.getElementById('publishDateBtn').addEventListener('click', showPublishDateForm);
document.getElementById('returnDateBtn').addEventListener('click', showReturnDateForm);
document.getElementById('modifyDetailsBtn').addEventListener('click', showModifyDetailsForm);

function getBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
}

function setBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

function showAllBooks() {
    const books = getBooks();
    let content = '<h2>All Books</h2>';
    if (books.length > 0) {
        content += `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Publish Date</th>
                    <th>Return Date</th>
                    <th>Available</th>
                </tr>
        `;
        books.forEach(book => {
            content += `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.price}</td>
                    <td>${book.publishDate || '-'}</td>
                    <td>${book.returnDate || '-'}</td>
                    <td>${book.available ? 'Yes' : 'No'}</td>
                </tr>
            `;
        });
        content += '</table>';
    } else {
        content += '<p>No books available.</p>';
    }
    document.getElementById('content').innerHTML = content;
}

function showAddBookForm() {
    const content = `
        <h2>Add Book</h2>
        <form id="addBookForm">
            <label for="id">Book ID:</label><br>
            <input type="text" id="id" name="id" required><br>
            <label for="name">Book Name:</label><br>
            <input type="text" id="name" name="name" required><br>
            <label for="author">Author Name:</label><br>
            <input type="text" id="author" name="author" required><br>
            <label for="price">Book Price:</label><br>
            <input type="text" id="price" name="price" required><br>
            <label for="publishDate">Publish Date:</label><br>
            <input type="text" id="publishDate" name="publishDate"><br>
            <label for="returnDate">Return Date:</label><br>
            <input type="text" id="returnDate" name="returnDate"><br>
            <label for="available">Available:</label><br>
            <select id="available" name="available">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select><br><br>
            <input type="submit" value="Add Book">
        </form>
    `;
    document.getElementById('content').innerHTML = content;
    document.getElementById('addBookForm').addEventListener('submit', addBook);
}

function addBook(event) {
    event.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const author = document.getElementById('author').value;
    const price = document.getElementById('price').value;
    const publishDate = document.getElementById('publishDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const available = document.getElementById('available').value === 'true';

    const books = getBooks();
    books.push({ id, name, author, price, publishDate, returnDate, available });
    setBooks(books);

    showAllBooks();
}

function showExtractBookForm() {
    const content = `
        <h2>Extract Book by ID</h2>
        <form id="extractBookForm">
            <label for="searchId">Book ID:</label><br>
            <input type="text" id="searchId" name="searchId" required><br><br>
            <input type="submit" value="Extract Book">
        </form>
    `;
    document.getElementById('content').innerHTML = content;
    document.getElementById('extractBookForm').addEventListener('submit', extractBook);
}

function extractBook(event) {
    event.preventDefault();
    const searchId = document.getElementById('searchId').value;
    const books = getBooks();
    const book = books.find(book => book.id === searchId);

    let content = '<h2>Extracted Book</h2>';
    if (book) {
        content += `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Publish Date</th>
                    <th>Return Date</th>
                    <th>Available</th>
                </tr>
                <tr>
                    <td>${book.id}</td>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.price}</td>
                    <td>${book.publishDate || '-'}</td>
                    <td>${book.returnDate || '-'}</td>
                    <td>${book.available ? 'Yes' : 'No'}</td>
                </tr>
            </table>
        `;
    } else {
        content += '<p>Book not found.</p>';
    }
    document.getElementById('content').innerHTML = content;
}

function showDeleteBookForm() {
    const content = `
        <h2>Delete Book by ID</h2>
        <form id="deleteBookForm">
            <label for="deleteId">Book ID:</label><br>
            <input type="text" id="deleteId" name="deleteId" required><br><br>
            <input type="submit" value="Delete Book">
        </form>
    `;
    document.getElementById('content').innerHTML = content;
    document.getElementById('deleteBookForm').addEventListener('submit', deleteBook);
}

function deleteBook(event) {
    event.preventDefault();
    const deleteId = document.getElementById('deleteId').value;
    let books = getBooks();
    books = books.filter(book => book.id !== deleteId);
    setBooks(books);

    showAllBooks();
}

function showPublishDateForm() {
    const content = `
        <h2>Publish Date</h2>
        <form id="publishDateForm">
            <label for="publishDateId">Book ID:</label><br>
            <input type="text" id="publishDateId" name="publishDateId" required><br>
            <label for="publishDate">Publish Date:</label><br>
            <input type="text" id="publishDate" name="publishDate" required><br><br>
            <input type="submit" value="Update Publish Date">
        </form>
    `;
    document.getElementById('content').innerHTML = content;
    document.getElementById('publishDateForm').addEventListener('submit', updatePublishDate);
}

function updatePublishDate(event) {
    event.preventDefault();
    const publishDateId = document.getElementById('publishDateId').value;
    const publishDate = document.getElementById('publishDate').value;

    let books = getBooks();
    books = books.map(book => {
        if (book.id === publishDateId) {
            return { ...book, publishDate };
        }
        return book;
    });
    setBooks(books);

    showAllBooks();
}

function showReturnDateForm() {
    const content = `
        <h2>Return Date</h2>
        <form id="returnDateForm">
            <label for="returnDateId">Book ID:</label><br>
            <input type="text" id="returnDateId" name="returnDateId" required><br>
            <label for="returnDate">Return Date:</label><br>
            <input type="text" id="returnDate" name="returnDate" required><br><br>
            <input type="submit" value="Update Return Date">
        </form>
    `;
    document.getElementById('content').innerHTML = content;
    document.getElementById('returnDateForm').addEventListener('submit', updateReturnDate);
}

function updateReturnDate(event) {
    event.preventDefault();
    const returnDateId = document.getElementById('returnDateId').value;
    const returnDate = document.getElementById('returnDate').value;

    let books = getBooks();
    books = books.map(book => {
        if (book.id === returnDateId) {
            return { ...book, returnDate };
        }
        return book;
    });
    setBooks(books);

    showAllBooks();
}
function addModifyDetailsButton() {
    const menu = document.getElementById('menu');
    const modifyBtn = document.createElement('button');
    modifyBtn.textContent = 'Modify Details';
    modifyBtn.id = 'modifyDetailsBtn';
    modifyBtn.addEventListener('click', showModifyDetailsForm);
    menu.appendChild(modifyBtn);
}
function showModifyDetailsForm() {
    const content = `
        <h2>Modify Book Details</h2>
        <form id="modifyBookForm">
            <label for="modifyId">Book ID:</label><br>
            <input type="text" id="modifyId" name="modifyId" required><br><br>
            <label for="fieldToModify">Field to Modify:</label><br>
            <select id="fieldToModify" name="fieldToModify">
                <option value="name">Name</option>
                <option value="author">Author</option>
                <option value="price">Price</option>
                <option value="publishDate">Publish Date</option>
                <option value="returnDate">Return Date</option>
                <option value="available">Available</option>
            </select><br><br>
            <label for="newValue">New Value:</label><br>
            <input type="text" id="newValue" name="newValue" required><br><br>
            <input type="submit" value="Modify Details">
        </form>
    `;
    document.getElementById('content').innerHTML = content;
    document.getElementById('modifyBookForm').addEventListener('submit', modifyBookDetails);
}
function modifyBookDetails(event) {
    event.preventDefault();
    const modifyId = document.getElementById('modifyId').value;
    const fieldToModify = document.getElementById('fieldToModify').value;
    const newValue = document.getElementById('newValue').value;

    let books = getBooks();
    books = books.map(book => {
        if (book.id === modifyId) {
            return { ...book, [fieldToModify]: newValue };
        }
        return book;
    });
    setBooks(books);

    showAllBooks();
}
function init() {
    showAllBooks();
}
init();
