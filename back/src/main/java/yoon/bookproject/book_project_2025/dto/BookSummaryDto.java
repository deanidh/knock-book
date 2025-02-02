package yoon.bookproject.book_project_2025.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BookSummaryDto {
    private Long bookId;
    private String title;
    private String author;
    private String image;
}
