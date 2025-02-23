package yoon.bookproject.book_project_2025.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yoon.bookproject.book_project_2025.entity.Archives;

import java.util.List;

@Repository
public interface ArchivesRepository extends JpaRepository<Archives, Long> {
    //Archives 엔티티에는 Member 필드가 존재 -> memberId를 기준으로 쿼리하기 위해 JPA의 중첩 속성을 사용해야 함
    List<Archives> findByMembers_memberId(Long memberId);
}
