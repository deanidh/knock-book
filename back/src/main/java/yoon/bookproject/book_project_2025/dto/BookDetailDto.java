package yoon.bookproject.book_project_2025.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookDetailDto {
    private String title;
    private String author;
    private int pages;
    private String publisher;
    private String isbn;
    private String image;
    private String categoryBig;
    private String categorySmall;
}
