const baseUrl = "http://localhost:8080/api/books";

document.addEventListener("DOMContentLoaded", loadBooks);

async function loadBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "<li>Loading...</li>";

  try {
    const response = await fetch(baseUrl);
    const books = await response.json();

    list.innerHTML = "";

    if (books.length === 0) {
      list.innerHTML = "<li>No books available.</li>";
      return;
    }

    books.forEach(book => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span><strong>${book.title}</strong> by ${book.author}</span>
        <button class="delete-btn" onclick="deleteBook('${book.id}')">Delete</button>
      `;
      list.appendChild(li);
    });

  } catch (error) {
    console.error("Error fetching books:", error);
    list.innerHTML = "<li>Failed to load books.</li>";
  }
}

document.getElementById("addBookForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  try {
    await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author })
    });

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    loadBooks();

  } catch (error) {
    console.error("Error adding book:", error);
  }
});

async function deleteBook(id) {
  try {
    await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    loadBooks();
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}
