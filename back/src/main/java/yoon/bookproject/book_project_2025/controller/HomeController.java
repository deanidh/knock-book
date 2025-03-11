package yoon.bookproject.book_project_2025.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yoon.bookproject.book_project_2025.dto.BestSellerDto;
import yoon.bookproject.book_project_2025.entity.BestSellers;
import yoon.bookproject.book_project_2025.service.HomeService;

import java.util.List;

@RestController
@RequestMapping("/api/home")
@Tag(name = "Home", description = "홈 화면 관련 API")
public class HomeController {
    private final HomeService homeService;

    public HomeController(HomeService homeService) {
        this.homeService = homeService;
    }

    @GetMapping("/bestsellers")
    @Operation(summary = "베스트셀러 배너 API", description = "베스트셀러 데이터들을 받아오는 API")
    public ResponseEntity<List<BestSellerDto>> BestSellers_Banner() {
        List<BestSellers> bestSellers = homeService.getBestSellers();

        List<BestSellerDto> bestSellerDtos = bestSellers.stream().map(bestSeller ->
                BestSellerDto.builder()
                        .bestsellerId(bestSeller.getBestsellerId())
                        .title(bestSeller.getTitle())
                        .author(bestSeller.getAuthor())
                        .image(bestSeller.getImage())
                        .link(bestSeller.getLink())
                        .description(bestSeller.getDescription())
                        .build())
                .toList();

        return ResponseEntity.ok(bestSellerDtos);
    }
}
