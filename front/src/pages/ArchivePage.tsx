import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Archive } from '../types/Archive';
import { useState } from 'react';
import ReadingPage from './ReadingPage';

const ArchivePage = () => {
  const archives = useSelector((state: RootState) => state.user.archives);

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
        <div
          className="fixed inset-0 bg-black/30 flex justify-center items-center "
          onClick={() => setSelectedBook(null)}
        >
          <ReadingPage book={selectedBook} onClose={() => setSelectedBook(null)} />
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
