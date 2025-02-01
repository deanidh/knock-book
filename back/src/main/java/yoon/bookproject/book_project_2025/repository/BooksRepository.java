package yoon.bookproject.book_project_2025.repository;

import jakarta.persistence.QueryHint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import yoon.bookproject.book_project_2025.dto.BookSummaryDto;
import yoon.bookproject.book_project_2025.entity.Books;

import java.util.List;

public interface BooksRepository extends JpaRepository<Books, Long> {

    @QueryHints(@QueryHint(name = "org.hibernate.cacheable", value = "false"))
    @Query("SELECT new yoon.bookproject.book_project_2025.dto.BookSummaryDto(b.bookId, b.title, b.author, b.image) " +
            "FROM Books b " +
            "WHERE b.title LIKE CONCAT('%', :title, '%') " +
            "AND b.author LIKE CONCAT('%', :author, '%')")
    List<BookSummaryDto> findBookSummaryByTitleAndAuthorContaining(@Param("title") String title,
                                                                   @Param("author") String author);
}
