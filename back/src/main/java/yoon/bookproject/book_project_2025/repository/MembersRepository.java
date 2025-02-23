package yoon.bookproject.book_project_2025.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yoon.bookproject.book_project_2025.entity.Members;

import java.util.Optional;

@Repository
public interface MembersRepository extends JpaRepository<Members, Long> {

    Optional<Members> findByUsername(String username);
    boolean existsByUsername(String username);
}
