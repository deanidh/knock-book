export interface Archive {
  archiveId: number;
  memberId: number;
  isbn: string;
  readingStatus: string;
  currentPage: number;
  startedAt: string;
  finishedAt: string;
  review: string;
}
