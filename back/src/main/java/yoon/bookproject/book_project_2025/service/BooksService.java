package yoon.bookproject.book_project_2025.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yoon.bookproject.book_project_2025.dto.BookDetailDto;
import yoon.bookproject.book_project_2025.dto.BookSummaryDto;
import yoon.bookproject.book_project_2025.entity.Books;
import yoon.bookproject.book_project_2025.repository.BooksRepository;

import java.util.List;

@Service
public class BooksService {

    private final BooksRepository booksRepository;

    @Autowired
    public BooksService(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    @Transactional(readOnly = true)
    public List<BookSummaryDto> searchBooks(String title, String author) {
        return booksRepository.findBookSummaryByTitleAndAuthorContaining(title, author);
    }

    @Transactional(readOnly = true)
    public BookDetailDto getBookDetail(Long bookId) {
        Books book = booksRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("해당 책을 찾을 수 없습니다."));

        return new BookDetailDto(
                book.getTitle(),
                book.getAuthor(),
                book.getPages(),
                book.getPublisher(),
                book.getIsbn(),
                book.getImage(),
                book.getCategoryBig(),
                book.getCategorySmall()
        );
    }
}
