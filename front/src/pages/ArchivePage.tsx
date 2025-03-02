import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ArchivePage = () => {
  const archives = useSelector((state: RootState) => state.user.archives);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mt-8 mb-8">📚 내 아카이브</h1>

      {archives.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {archives.map((book) => (
            <p key={book.isbn}> {book.isbn} </p>
          ))}
        </div>
      ) : (
        <p className="text-center">저장된 책이 없습니다.</p>
      )}
    </div>
  );
};

export default ArchivePage;
