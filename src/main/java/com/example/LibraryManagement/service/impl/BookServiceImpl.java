package com.example.LibraryManagement.service.impl;

import com.example.LibraryManagement.model.Book;
import com.example.LibraryManagement.repository.BookRepository;
import com.example.LibraryManagement.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(String id) {
        return bookRepository.findById(id).orElse(null);
    }

    @Override
    public Book updateBook(String id, Book book) {
        Book existingBook = bookRepository.findById(id).orElse(null);
        if (existingBook != null) {
            existingBook.setTitle(book.getTitle());
            existingBook.setAuthor(book.getAuthor());
            existingBook.setPublicationYear(book.getPublicationYear());
            existingBook.setGenre(book.getGenre());
            return bookRepository.save(existingBook);
        }
        return null;
    }

    @Override
    public void deleteBookById(String id) {
        bookRepository.deleteById(id);
    }

    @Override
    public List<Book> findBooksByPublicationYear(int year) {
        return bookRepository.findByPublicationYear(year);
    }

    @Override
    public String getGenreByBookId(String id) {
        Optional<Book> book = bookRepository.findById(id);
        return book.map(Book::getGenre).orElse("Genre not found");
    }

    @Override
    public void deleteBooksByPublicationYear(int year) {
        List<Book> books = bookRepository.findByPublicationYear(year);
        bookRepository.deleteAll(books);
    }
}
