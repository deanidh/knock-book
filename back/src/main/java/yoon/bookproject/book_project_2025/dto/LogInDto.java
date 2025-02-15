package yoon.bookproject.book_project_2025.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class LogInDto {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
