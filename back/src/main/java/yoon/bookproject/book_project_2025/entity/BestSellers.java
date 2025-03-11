package yoon.bookproject.book_project_2025.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "bestsellers")
@Getter
@Setter
public class BestSellers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bestsellerId;

    private String title;
    private String author;
    private String image;
    private String link;
    private String description;
}
