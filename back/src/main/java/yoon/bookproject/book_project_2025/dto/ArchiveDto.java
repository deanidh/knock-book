package yoon.bookproject.book_project_2025.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.jackson.Jacksonized;
import yoon.bookproject.book_project_2025.entity.Members;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Jacksonized
public class ArchiveDto {
    private Long archiveId;
    private Long memberId;
    private String isbn;
    private String title;
    private String author;
    private String publisher;
    private String image;
    private String link;
    private String readingStatus;
    private Integer currentPage;
    private LocalDate startedAt;
    private LocalDate finishedAt;
    private String review;
}
