package yoon.bookproject.book_project_2025.config.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import yoon.bookproject.book_project_2025.dto.JwtToken;
import yoon.bookproject.book_project_2025.entity.Members;
import yoon.bookproject.book_project_2025.repository.MembersRepository;

import java.security.Key;
import java.time.Duration;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenProvider {

    private final Key key;
    private final MembersRepository membersRepository;
    public static final long ACCESS_TIME = Duration.ofMinutes(30).toMillis(); // 만료시간 30분
    public static final long REFRESH_TIME = Duration.ofDays(14).toMillis(); // 만료시간 2주

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey, MembersRepository membersRepository) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.membersRepository = membersRepository;
    }

    public JwtToken generateToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();

        Date accessTokenExpiresIn = new Date(now + ACCESS_TIME);
        Date refreshTokenExpiresIn = new Date(now + REFRESH_TIME);

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("auth", authorities)
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        String refreshToken = Jwts.builder()
                .setExpiration(refreshTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .refreshTokenExpiresIn(REFRESH_TIME)
                .build();
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = extractClaims(accessToken);

        if(claims.get("auth") == null) {
            throw new RuntimeException("Invalid token");
        }

        Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get("auth").toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.error("Invalid JWT signature");
            return false;
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT");
            return false;
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT");
            return false;
        } catch (IllegalArgumentException e) {
            log.error("JWT claims is empty");
            return false;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public Long getExpiration(String accessToken) {
        Date expiration = extractClaims(accessToken).getExpiration();
        Long now = new Date().getTime();

        return (expiration.getTime() - now);
    }

    private Claims extractClaims(String accessToken) {
        try {
            return Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public Long extractMemberId(HttpServletRequest request) {

        //Authorization 헤더에서 토큰 추출
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            throw new RuntimeException("유효한 토큰이 존재하지 않습니다. 헤더가 null이거나 Bearer로 시작하지 않습니다.");
        }
        String token = authHeader.substring(7);

        //토큰 유효성 검사
        if (!validateToken(token)) {
            throw new RuntimeException("유효한 토큰이 존재하지 않습니다.");
        }

        //토큰에서 claims 추출 후 subject(username) 획득
        Claims claims = extractClaims(token);
        String username = claims.getSubject();

        Members members = membersRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다."));
        return members.getMemberId();
    }
}
