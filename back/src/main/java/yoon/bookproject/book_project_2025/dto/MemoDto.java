package yoon.bookproject.book_project_2025.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemoDto {
    private Long memoId;
    private Long archiveId;
    private String memoText;
    private Integer memoPage;
    private LocalDateTime timestamp;
}
