package yoon.bookproject.book_project_2025.dto;

import lombok.Data;

@Data
public class TokenRequestDto {
    private String username;
    private String refreshToken;
}
