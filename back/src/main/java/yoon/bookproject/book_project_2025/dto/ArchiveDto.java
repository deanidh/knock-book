package yoon.bookproject.book_project_2025.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ArchiveDto {
    private Long archiveId;
    private Long memberId;
    private String isbn;
    private String readingStatus;
    private Integer currentPage;
    private LocalDate startedAt;
    private LocalDate finishedAt;
    private String review;
}
