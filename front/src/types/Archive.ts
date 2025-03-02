export interface Archive {
  archiveId: string;
  memberId: string | null;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  image: string;
  link: string | null;
  readingStatus: 'reading' | 'completed' | 'not_started';
  currentPage: number | null;
  startedAt: string | null;
  finishedAt: string | null;
  review: string | null;
}
