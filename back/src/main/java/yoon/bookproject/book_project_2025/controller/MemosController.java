package yoon.bookproject.book_project_2025.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import yoon.bookproject.book_project_2025.dto.MemoDto;
import yoon.bookproject.book_project_2025.service.MemosService;

import java.util.List;

@RestController
@RequestMapping("/api/memo")
@Tag(name = "Memos", description = "메모 관련 API")
public class MemosController {

    private final MemosService memosService;

    public MemosController(MemosService memosService) {
        this.memosService = memosService;
    }

    //메모 작성
    @PostMapping("/{archiveId}")
    @Operation(summary = "메모 추가 API", description = "아카이브 된 책에 메모를 추가하는 API")
    public ResponseEntity<MemoDto> createMemo(@RequestBody MemoDto memoDto,
                                              @PathVariable("archiveId") Long archiveId) {
        MemoDto createdMemo = memosService.createMemo(memoDto, archiveId);
        return ResponseEntity.ok(createdMemo);
    }

    //메모 목록
    @GetMapping("/{archiveId}")
    @Operation(summary = "메모 목록 조회 API", description = "책에 작성된 메모들을 조회하는 API")
    public ResponseEntity<List<MemoDto>> getMemos(@PathVariable("archiveId") Long archiveId) {
        List<MemoDto> memos = memosService.getMemos(archiveId);
        return ResponseEntity.ok(memos);
    }
}
