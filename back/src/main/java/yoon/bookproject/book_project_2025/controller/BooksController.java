package yoon.bookproject.book_project_2025.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import yoon.bookproject.book_project_2025.dto.BookDetailDto;
import yoon.bookproject.book_project_2025.dto.BookSummaryDto;
import yoon.bookproject.book_project_2025.entity.Books;
import yoon.bookproject.book_project_2025.service.BooksService;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@Tag(name = "Books", description = "책 관련 API")
public class BooksController {

    private final BooksService booksService;

    @Autowired
    public BooksController(BooksService booksService) {
        this.booksService = booksService;
    }

    @GetMapping("/search")
    @Operation(summary = "책 검색", description = "책 제목과 작가명으로 책을 검색하는 API")
    public List<BookSummaryDto> searchBooks(@RequestParam(required = false, defaultValue = "") String title
    , @RequestParam(required = false, defaultValue = "") String author) {
        return booksService.searchBooks(title, author);
    }

    @GetMapping("/{id}")
    @Operation(summary = "책 정보 열람", description = "선택한 책의 상세 정보를 반환하는 API")
    public BookDetailDto getBookDetail(@PathVariable("id") Long bookId) {
        return booksService.getBookDetail(bookId);
    }
}
