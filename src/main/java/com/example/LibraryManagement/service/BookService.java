package com.example.LibraryManagement.service;

import com.example.LibraryManagement.model.Book;
import java.util.List;

public interface BookService {
    Book addBook(Book book);
    List<Book> getAllBooks();
    Book getBookById(String id);
    Book updateBook(String id, Book book);
    void deleteBookById(String id);
    List<Book> findBooksByPublicationYear(int year);
    String getGenreByBookId(String id);
    void deleteBooksByPublicationYear(int year);
}
