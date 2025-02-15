package yoon.bookproject.book_project_2025.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import yoon.bookproject.book_project_2025.dto.JwtToken;
import yoon.bookproject.book_project_2025.dto.LogInDto;
import yoon.bookproject.book_project_2025.dto.SignUpDto;
import yoon.bookproject.book_project_2025.entity.Members;
import yoon.bookproject.book_project_2025.service.MembersService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
@Tag(name = "Members", description = "회원 관련 API")
public class MembersController {

    private final MembersService memberService;

    @PostMapping("/signup")
    @Operation(summary = "회원가입", description = "회원가입 API")
    public ResponseEntity<Members> signUp(@Valid @RequestBody SignUpDto signUpDto) {
        return ResponseEntity.ok()
                .body(memberService.signUp(signUpDto));
    }

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "로그인 API")
    public ResponseEntity<JwtToken> login(@Valid @RequestBody LogInDto logInDto) {
        return ResponseEntity.ok()
                .body(memberService.login(logInDto.getUsername(), logInDto.getPassword()));
    }

    @PostMapping("/logout")
    @Operation(summary = "로그아웃", description = "로그아웃 API")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        String accessToken = resolveToken(token);
        return ResponseEntity.ok(memberService.logout(accessToken));
    }

    private String resolveToken(String token) {
        if (StringUtils.hasText(token) && token.startsWith("Bearer")) {
            return token.substring(7);
        }
        return null;
    }
}
