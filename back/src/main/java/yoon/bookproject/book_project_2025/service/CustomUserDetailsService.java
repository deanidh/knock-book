package yoon.bookproject.book_project_2025.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import yoon.bookproject.book_project_2025.entity.Members;
import yoon.bookproject.book_project_2025.repository.MembersRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MembersRepository membersRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return membersRepository.findByUsername(username)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(" Not found user"));
    }

    private UserDetails createUserDetails(Members member) {
        List<GrantedAuthority> authorities = member.getRoles().stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return User.builder()
                .username(member.getUsername())
                .password(member.getPassword())
                .authorities(authorities)
                .build();
    }
}
