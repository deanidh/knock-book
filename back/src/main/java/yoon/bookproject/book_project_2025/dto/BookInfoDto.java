package yoon.bookproject.book_project_2025.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookInfoDto {
    private String title;
    private String author;
    private String publisher;
    private String link;
    private String isbn;
    private String image;
    private String description;

    @Builder
    public BookInfoDto(String title, String author, String publisher, String link,
                          String isbn, String image, String description) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.link = link;
        this.isbn = isbn;
        this.image = image;
        this.description = description;
    }
}
