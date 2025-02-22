package yoon.bookproject.book_project_2025.service;

import org.springframework.stereotype.Service;
import yoon.bookproject.book_project_2025.dto.ArchiveDto;
import yoon.bookproject.book_project_2025.entity.Archives;
import yoon.bookproject.book_project_2025.entity.Members;
import yoon.bookproject.book_project_2025.repository.ArchivesRepository;
import yoon.bookproject.book_project_2025.repository.MembersRepository;

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
    public void addArchives(ArchiveDto archiveDto) {
        Members members = membersRepository.findById(archiveDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다."));


        Archives archives = new Archives();
        archives.setMembers(members); //Member 엔티티 설정
        archives.setIsbn(archiveDto.getIsbn());
        archives.setReadingStatus(archiveDto.getReadingStatus());
        archives.setCurrentPage(archiveDto.getCurrentPage());
        archives.setStartedAt(archiveDto.getStartedAt());
        archives.setFinishedAt(archiveDto.getFinishedAt());
        archives.setReview(archiveDto.getReview());

        archivesRepository.save(archives);
    }

    //아카이브 삭제
    public void deleteArchives(Long archiveId, Long memberId) {
        Archives archives = archivesRepository.findById(archiveId)
                .orElseThrow(() -> new RuntimeException("아카이브를 찾을 수 없습니다."));

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

    //아카이브 정보 수정
    public void updateArchive(Long archiveId, Long memberId, ArchiveDto archiveDto) {
        Archives archive = archivesRepository.findById(archiveId)
                .orElseThrow(() -> new RuntimeException("해당 아카이브를 찾을 수 없습니다."));

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
