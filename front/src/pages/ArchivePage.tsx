import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Archive } from '../types/Archive';
import { useState } from 'react';
import ReadingPage from './ReadingPage';

const ArchivePage = () => {
  const archives = useSelector((state: RootState) => state.user.archives);
  // const archives: Archive[] = [
  //   {
  //     archiveId: '1',
  //     memberId: '123',
  //     isbn: '978-3-16-148410-0',
  //     title: 'Clean Code',
  //     author: 'Robert C. Martin',
  //     publisher: 'Prentice Hall',
  //     image: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788931021516.jpg',
  //     link: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788931021516.jpg',
  //     readingStatus: 'reading',
  //     currentPage: 120,
  //     startedAt: '2024-02-15',
  //     finishedAt: null,
  //     review: null,
  //   },
  //   {
  //     archiveId: '2',
  //     memberId: '123',
  //     isbn: '978-0-13-235088-4',
  //     title: 'The Pragmatic Programmer',
  //     author: 'Andrew Hunt, David Thomas',
  //     publisher: 'Addison-Wesley',
  //     image: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788931021516.jpg',
  //     link: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788931021516.jpg',
  //     readingStatus: 'completed',
  //     currentPage: null,
  //     startedAt: '2023-12-01',
  //     finishedAt: '2024-01-10',
  //     review: 'Great book for software craftsmanship!',
  //   },
  //   {
  //     archiveId: '3',
  //     memberId: '123',
  //     isbn: '978-1-4919-1889-0',
  //     title: 'You Don’t Know JS',
  //     author: 'Kyle Simpson',
  //     publisher: "O'Reilly Media",
  //     image: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788931021516.jpg',
  //     link: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788931021516.jpg',
  //     readingStatus: 'not_started',
  //     currentPage: null,
  //     startedAt: null,
  //     finishedAt: null,
  //     review: null,
  //   },
  //   {
  //     archiveId: '4',
  //     memberId: '123',
  //     isbn: '978-0-262-03384-8',
  //     title: 'Structure and Interpretation of Computer Programs',
  //     author: 'Harold Abelson, Gerald Jay Sussman',
  //     publisher: 'MIT Press',
  //     image: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788931021516.jpg',
  //     link: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788931021516.jpg',
  //     readingStatus: 'reading',
  //     currentPage: 45,
  //     startedAt: '2024-03-01',
  //     finishedAt: null,
  //     review: null,
  //   },
  //   {
  //     archiveId: '5',
  //     memberId: '123',
  //     isbn: '978-0-321-63536-5',
  //     title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
  //     author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
  //     publisher: 'Addison-Wesley',
  //     image: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788931021516.jpg',
  //     link: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788931021516.jpg',
  //     readingStatus: 'completed',
  //     currentPage: null,
  //     startedAt: '2023-10-05',
  //     finishedAt: '2023-12-20',
  //     review: 'Must-read for software developers!',
  //   },
  // ];

  const [selectedBook, setSelectedBook] = useState<Archive | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {archives.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {archives.map((book) => (
            <div
              key={book.archiveId}
              onClick={() => setSelectedBook(book)}
              className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col h-full"
            >
              <div className="bg-gray-300 flex justify-center items-center h-64">
                <img src={book.image} alt={book.title} className="max-h-full object-contain" />
              </div>

              <div className="p-4 flex flex-col flex-grow justify-between">
                <h2 className="text-lg font-semibold line-clamp-2">{book.title}</h2>
                <p className="text-gray-500">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">저장된 책이 없습니다.</p>
      )}

      {selectedBook && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center p-32">
          <ReadingPage book={selectedBook} onClose={() => setSelectedBook(null)} />
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
