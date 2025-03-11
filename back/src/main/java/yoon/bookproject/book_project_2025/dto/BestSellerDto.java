package yoon.bookproject.book_project_2025.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BestSellerDto {
    private Long bestsellerId;
    private String title;
    private String author;
    private String image;
    private String link;
    private String description;
}
