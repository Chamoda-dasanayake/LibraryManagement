package com.example.LibraryManagement.controller;

import com.example.LibraryManagement.model.Book;
import com.example.LibraryManagement.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id) {
        return bookService.getBookById(id);
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable String id, @RequestBody Book book) {
        return bookService.updateBook(id, book);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable String id) {
        bookService.deleteBookById(id);
    }

    @GetMapping("/year/{year}")
    public List<Book> getBooksByYear(@PathVariable int year) {
        return bookService.findBooksByPublicationYear(year);
    }

    @GetMapping("/{id}/genre")
    public String getGenreByBookId(@PathVariable String id) {
        return bookService.getGenreByBookId(id);
    }

    @DeleteMapping("/year/{year}")
    public void deleteBooksByYear(@PathVariable int year) {
        bookService.deleteBooksByPublicationYear(year);
    }
}
