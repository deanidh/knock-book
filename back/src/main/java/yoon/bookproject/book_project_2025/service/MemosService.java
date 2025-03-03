package yoon.bookproject.book_project_2025.service;

import org.springframework.stereotype.Service;
import yoon.bookproject.book_project_2025.dto.MemoDto;
import yoon.bookproject.book_project_2025.entity.Archives;
import yoon.bookproject.book_project_2025.entity.Memos;
import yoon.bookproject.book_project_2025.repository.ArchivesRepository;
import yoon.bookproject.book_project_2025.repository.MemosRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemosService {

    private final MemosRepository memosRepository;
    private final ArchivesRepository archivesRepository;

    public MemosService(MemosRepository memosRepository, ArchivesRepository archivesRepository) {
        this.memosRepository=memosRepository;
        this.archivesRepository=archivesRepository;
    }

    //메모 작성
    public MemoDto createMemo(MemoDto memoDto, Long archiveId) {

        Archives archive = archivesRepository.findById(archiveId)
                .orElseThrow(() -> new RuntimeException(("해당 아카이브를 찾을 수 없습니다. 아카이브 ID : ") + archiveId));

        Memos memo = new Memos();
        memo.setArchives(archive);
        memo.setMemoText(memoDto.getMemoText());
        memo.setMemoPage(memoDto.getMemoPage());
        memo.setTimestamp(LocalDateTime.now());

        Memos savedMemo = memosRepository.save(memo);

        return MemoDto.builder()
                .memoId(savedMemo.getMemoId())
                .archiveId(savedMemo.getArchives().getArchiveId())
                .memoText(savedMemo.getMemoText())
                .memoPage(savedMemo.getMemoPage())
                .timestamp(savedMemo.getTimestamp())
                .build();
    }

    //특정 아카이브에 속한 메모 목록 조회
    public List<MemoDto> getMemos(Long archiveId) {
        List<Memos> memosList = memosRepository.findByArchives_archiveId(archiveId);
        return memosList.stream()
                .map(memo -> MemoDto.builder()
                        .memoId(memo.getMemoId())
                        .archiveId(memo.getArchives().getArchiveId())
                        .memoText(memo.getMemoText())
                        .memoPage(memo.getMemoPage())
                        .timestamp(memo.getTimestamp())
                        .build())
                .collect(Collectors.toList());
    }

    //메모 삭제
    public void deleteMemo(Long memoId, Long memberId) {
        Memos memo = memosRepository.findById(memoId)
                .orElseThrow(() -> new RuntimeException("메모를 찾을 수 없습니다. memoId : " + memoId));

        if (!memo.getArchives().getMembers().getMemberId().equals(memberId)) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        memosRepository.delete(memo);
    }
}
