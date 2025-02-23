package yoon.bookproject.book_project_2025.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class JwtToken {

    private String grantType;
    private String accessToken;
    private String refreshToken;

    private Long refreshTokenExpiresIn;
}
