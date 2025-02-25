package yoon.bookproject.book_project_2025.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import yoon.bookproject.book_project_2025.config.jwt.JwtTokenProvider;
import yoon.bookproject.book_project_2025.dto.ArchiveDto;
import yoon.bookproject.book_project_2025.entity.Archives;
import yoon.bookproject.book_project_2025.service.ArchivesService;

import java.util.List;

@RestController
@RequestMapping("/api/archive")
@Tag(name = "Archives", description = "아카이빙 관련 API")
public class ArchivesController {

    public final ArchivesService archivesService;
    public final JwtTokenProvider jwtTokenProvider;

    public ArchivesController(ArchivesService archivesService, JwtTokenProvider jwtTokenProvider) {
        this.archivesService = archivesService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    //아카이브에 책 추가
    @PostMapping("/add")
    @Operation(summary = "아카이브 추가 API", description = "원하는 책을 아카이브에 추가하는 API")
    public ResponseEntity<String> addArchives(@RequestBody ArchiveDto archiveDto, HttpServletRequest request) {
        Long memberId = jwtTokenProvider.extractMemberId(request);
        archiveDto.setMemberId(memberId);
        archivesService.addArchives(archiveDto);
        return ResponseEntity.ok("아카이브에 추가되었습니다.");
    }

    //아카이브에서 책 삭제
    @DeleteMapping("/{isbn}")
    @Operation(summary = "아카이브 삭제 API", description = "원하는 책을 아카이브에서 삭제하는 API")
    public ResponseEntity<String> deleteArchives(@PathVariable("isbn") String isbn, HttpServletRequest request) {
        Long memberId = jwtTokenProvider.extractMemberId(request);
        archivesService.deleteArchives(isbn, memberId);
        return ResponseEntity.ok("아카이브에서 삭제되었습니다.");
    }

    //아카이브 목록 조회
    @GetMapping("/my")
    @Operation(summary = "아카이브 목록 조회 API", description = "사용자의 아카이브 목록을 조회하는 API")
    public ResponseEntity<List<ArchiveDto>> getArchives(HttpServletRequest request) {
        Long memberId = jwtTokenProvider.extractMemberId(request);

        List<Archives> archivesList = archivesService.getArchives(memberId);

        List<ArchiveDto> archiveDtos = archivesList.stream().map(archives ->
                ArchiveDto.builder()
                        .archiveId(archives.getArchiveId())
                        .memberId(archives.getMembers().getMemberId())
                        .isbn(archives.getIsbn())
                        .title(archives.getTitle())
                        .author(archives.getAuthor())
                        .publisher(archives.getPublisher())
                        .image(archives.getImage())
                        .link(archives.getLink())
                        .readingStatus(archives.getReadingStatus())
                        .currentPage(archives.getCurrentPage())
                        .startedAt(archives.getStartedAt())
                        .finishedAt(archives.getFinishedAt())
                        .review(archives.getReview())
                        .build()
        ).toList();

        return ResponseEntity.ok(archiveDtos);
    }

    //아카이브 정보 수정
    @PutMapping("/{isbn}")
    @Operation(summary = "아카이브 정보 수정 API", description = "아카이브의 정보를 수정하는 API")
    public ResponseEntity<String> updateArchives(@PathVariable("isbn") String isbn,
                                                 @RequestBody ArchiveDto archiveDto,
                                                 HttpServletRequest request) {

        Long memberId =  jwtTokenProvider.extractMemberId(request);

        archivesService.updateArchive(isbn, memberId, archiveDto);

        return ResponseEntity.ok("아카이브 수정이 완료되었습니다.");
    }
}
