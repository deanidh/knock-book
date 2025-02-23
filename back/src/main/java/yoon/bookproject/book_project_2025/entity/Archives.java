package yoon.bookproject.book_project_2025.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "archives")
@Getter
@Setter
public class Archives {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long archiveId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Members members;

    @Column(nullable = false)
    private String isbn;

    private String readingStatus;

    private Integer currentPage;

    private LocalDate startedAt;

    private LocalDate finishedAt;

    private String review;
}
