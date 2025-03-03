package yoon.bookproject.book_project_2025.service;

import org.springframework.stereotype.Service;
import yoon.bookproject.book_project_2025.dto.ArchiveDto;
import yoon.bookproject.book_project_2025.entity.Archives;
import yoon.bookproject.book_project_2025.entity.Members;
import yoon.bookproject.book_project_2025.repository.ArchivesRepository;
import yoon.bookproject.book_project_2025.repository.MembersRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class ArchivesService {

    private final ArchivesRepository archivesRepository;
    private final MembersRepository membersRepository;

    public ArchivesService(ArchivesRepository archivesRepository, MembersRepository membersRepository) {
        this.archivesRepository = archivesRepository;
        this.membersRepository = membersRepository;
    }

    //아카이브 추가
    public ArchiveDto addArchives(ArchiveDto archiveDto) {
        Members members = membersRepository.findById(archiveDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다."));


        Archives archives = new Archives();
        archives.setMembers(members); //Member 엔티티 설정
        archives.setIsbn(archiveDto.getIsbn());
        archives.setTitle(archiveDto.getTitle());
        archives.setAuthor(archiveDto.getAuthor());
        archives.setPublisher(archiveDto.getPublisher());
        archives.setImage(archiveDto.getImage());
        archives.setLink(archiveDto.getLink());
        archives.setReadingStatus(null);
        archives.setCurrentPage(null);
        archives.setStartedAt(LocalDate.now());
        archives.setFinishedAt(null);
        archives.setReview(null);

        Archives savedArchive = archivesRepository.save(archives);

        return ArchiveDto.builder()
                .archiveId(savedArchive.getArchiveId())
                .isbn(savedArchive.getIsbn())
                .title(savedArchive.getTitle())
                .author(savedArchive.getAuthor())
                .publisher(savedArchive.getPublisher())
                .image(savedArchive.getImage())
                .link(savedArchive.getLink())
                .build();
    }

    //아카이브 삭제
    public void deleteArchives(Long archiveId, Long memberId) {
        Archives archives = archivesRepository.findById(archiveId)
                .orElseThrow(() -> new RuntimeException("아카이브를 찾을 수 없습니다. 파라미터로 들어온 ID : " + archiveId));

        //연관된 Member의 member_id와 요청의 memberId를 비교하여 권한 검증
        if (!archives.getMembers().getMemberId().equals(memberId)) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        archivesRepository.delete(archives);
    }

    //아카이브 목록
    public List<Archives> getArchives(Long memberId) {
        return archivesRepository.findByMembers_memberId(memberId);
    }

    //선택한 아카이브 상세 정보 조회
    public ArchiveDto getArchiveDetail(Long archiveId, Long memberId) {
        Archives archive = archivesRepository.findById(archiveId)
                .orElseThrow(() -> new RuntimeException("아카이브를 찾을 수 없습니다. 아카이브 ID : " + archiveId));

        if (!archive.getMembers().getMemberId().equals(memberId)) {
            throw new RuntimeException("조회 권한이 없습니다.");
        }

        return ArchiveDto.builder()
                .archiveId(archive.getArchiveId())
                .memberId(archive.getMembers().getMemberId())
                .isbn(archive.getIsbn())
                .title(archive.getTitle())
                .author(archive.getAuthor())
                .publisher(archive.getPublisher())
                .image(archive.getImage())
                .link(archive.getLink())
                .readingStatus(archive.getReadingStatus())
                .currentPage(archive.getCurrentPage())
                .startedAt(archive.getStartedAt())
                .finishedAt(archive.getFinishedAt())
                .review(archive.getReview())
                .build();
    }

    //아카이브 정보 수정
    public void updateArchive(Long archiveId, Long memberId, ArchiveDto archiveDto) {
        Archives archive = archivesRepository.findByArchiveIdAndMembers_memberId(archiveId, memberId)
                .orElseThrow(() -> new RuntimeException("해당 아카이브를 찾을 수 없습니다. 파라미터로 들어온 ID : " + archiveId +
                         ", 파라미터로 들어온 memberId : " + memberId));

        if (!archive.getMembers().getMemberId().equals(memberId)) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }

        archive.setReadingStatus(archiveDto.getReadingStatus());
        archive.setCurrentPage(archiveDto.getCurrentPage());
        archive.setStartedAt(archiveDto.getStartedAt());
        archive.setFinishedAt(archiveDto.getFinishedAt());
        archive.setReview(archiveDto.getReview());

        archivesRepository.save(archive);
    }
}
