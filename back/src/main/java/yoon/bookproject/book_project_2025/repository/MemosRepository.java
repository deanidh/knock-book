package yoon.bookproject.book_project_2025.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yoon.bookproject.book_project_2025.entity.Memos;

import java.util.List;

@Repository
public interface MemosRepository extends JpaRepository<Memos, Long> {

    List<Memos> findByArchives_archiveId(Long archiveId);
}
