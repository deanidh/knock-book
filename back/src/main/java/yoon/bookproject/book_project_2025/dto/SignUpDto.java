package yoon.bookproject.book_project_2025.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class SignUpDto {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String nickname;

    @NotBlank
    private String phone;
}
