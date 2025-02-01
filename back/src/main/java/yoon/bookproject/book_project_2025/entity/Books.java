package yoon.bookproject.book_project_2025.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "Books")
public class Books {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @Column(name = "Title")
    private String title;

    @Column(name = "Author")
    private String author;

    @Column(name = "Pages")
    private int pages;

    @Column(name = "Publisher")
    private String publisher;

    @Column(name = "ISBN")
    private String isbn;

    @Column(name = "Image")
    private String image;

    @Column(name = "Category_Big")
    private String categoryBig;

    @Column(name = "Category_Small")
    private String categorySmall;
}
