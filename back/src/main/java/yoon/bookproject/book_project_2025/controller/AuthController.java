package yoon.bookproject.book_project_2025.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yoon.bookproject.book_project_2025.config.jwt.JwtTokenProvider;
import yoon.bookproject.book_project_2025.dto.JwtToken;
import yoon.bookproject.book_project_2025.dto.TokenRequestDto;
import yoon.bookproject.book_project_2025.service.CustomUserDetailsService;

import java.util.concurrent.TimeUnit;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Tag(name = "Auth", description = "토큰 발급 관련 API")
public class AuthController {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate<String, Object> redisTemplate;
    private final CustomUserDetailsService customUserDetailsService;

    @PostMapping("/reissue")
    @Operation(summary = "토큰 재발급 API", description = "Refresh token 유효성 검증 후 Access token과 Refresh token 재발급")
    public ResponseEntity<?> reissueToken(@RequestBody TokenRequestDto tokenRequestDto) {
        String username = tokenRequestDto.getUsername();
        System.out.println("Username : " + username);
        String requestRefreshToken = tokenRequestDto.getRefreshToken();
        System.out.println("requestRefreshToken : " + requestRefreshToken);

        //redis에서 username을 key로 하는 refresh token 조회
        String storedRefreshToken = (String) redisTemplate.opsForValue().get("RT:" + username);
        System.out.println("storedRefreshToken : " + storedRefreshToken);
        if (storedRefreshToken == null) {
            System.out.println('1');
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token not found");
        }

        //클라이언트에서 보낸 refresh token과 redis에 저장된 토큰 비교
        if (!storedRefreshToken.equals(requestRefreshToken)) {
            System.out.println('2');
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }

        //refresh token 유효성 검증
        if (!jwtTokenProvider.validateToken(requestRefreshToken)) {
            System.out.println('3');
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Expired refresh token");
        }

        //사용자 정보 로드
        var userDetails = customUserDetailsService.loadUserByUsername(username);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails,
                null, userDetails.getAuthorities());

        //새로운 access token과 refresh token 생성
        JwtToken newToken = jwtTokenProvider.generateToken(authentication);
        System.out.println("New Refresh Token : " + newToken.getRefreshToken());

        //redis에 새로운 refresh token을 저장
        redisTemplate.opsForValue().set("RT:" + username, newToken.getRefreshToken(),
                JwtTokenProvider.REFRESH_TIME, TimeUnit.MILLISECONDS);

        return ResponseEntity.ok(newToken);
    }
}
