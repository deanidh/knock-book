package yoon.bookproject.book_project_2025.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yoon.bookproject.book_project_2025.config.jwt.JwtTokenProvider;
import yoon.bookproject.book_project_2025.dto.JwtToken;
import yoon.bookproject.book_project_2025.dto.SignUpDto;
import yoon.bookproject.book_project_2025.entity.Members;
import yoon.bookproject.book_project_2025.repository.MembersRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class MembersService {

    private final MembersRepository membersRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final RedisTemplate redisTemplate;

    @Transactional
    public Members signUp(SignUpDto signupDto) {
        if(membersRepository.existsByUsername(signupDto.getUsername())) {
            throw new RuntimeException("The user already exists");
        }

        String encodedPassword = passwordEncoder.encode(signupDto.getPassword());

        List<String> roles = new ArrayList<>();
        roles.add("ROLE_USER");

        Members member = Members.builder()
                .username(signupDto.getUsername())
                .password(encodedPassword)
                .nickname(signupDto.getNickname())
                .phone(signupDto.getPhone())
                .roles(roles)
                .build();

        return membersRepository.save(member);
    }

    @Transactional
    public JwtToken login(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        JwtToken jwtToken = tokenProvider.generateToken(authentication);

        redisTemplate.opsForValue().set("RT:" + authentication.getName(),
                jwtToken.getRefreshToken(), jwtToken.getRefreshTokenExpiresIn(), TimeUnit.MILLISECONDS);

        return jwtToken;
    }

    @Transactional
    public String logout(String accessToken) {
        if(!tokenProvider.validateToken(accessToken)) {
            throw new RuntimeException("Invalid access token");
        }

        Authentication authentication = tokenProvider.getAuthentication(accessToken);

        if (redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
            redisTemplate.delete("RT:" + authentication.getName());
        }

        Long expiration = tokenProvider.getExpiration(accessToken);
        redisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);

        return "Logout successful";
    }
}
