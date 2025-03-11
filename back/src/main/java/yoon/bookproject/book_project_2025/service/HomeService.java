package yoon.bookproject.book_project_2025.service;

import org.springframework.stereotype.Service;
import yoon.bookproject.book_project_2025.entity.BestSellers;
import yoon.bookproject.book_project_2025.repository.BestSellersRepository;

import java.util.List;

@Service
public class HomeService {
    private final BestSellersRepository bestSellersRepository;

    public HomeService(BestSellersRepository bestSellersRepository) {
        this.bestSellersRepository = bestSellersRepository;
    }

    public List<BestSellers> getBestSellers() {
        return bestSellersRepository.findAll();
    }
}
