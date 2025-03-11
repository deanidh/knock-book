package yoon.bookproject.book_project_2025.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yoon.bookproject.book_project_2025.entity.BestSellers;

@Repository
public interface BestSellersRepository extends JpaRepository<BestSellers, Long> {
}
