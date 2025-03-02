import { BookSearched } from '../types/BookSearched';
import { API } from '../API';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addArchive, removeArchive } from '../store/userSlice';

interface Props {
  book: BookSearched;
}

const BookSearchedItem: React.FC<Props> = ({ book }) => {
  const dispatch = useDispatch();
  const archives = useSelector((state: RootState) => state.user.archives);
  const currentArchive = archives.find((archive) => archive.isbn === book.isbn);

  const toggleArchive = async () => {
    try {
      if (currentArchive) {
        await API.archives.remove(currentArchive.archiveId);
        dispatch(removeArchive(currentArchive.archiveId));
      } else {
        const response = await API.archives.add(
          book.isbn,
          book.title,
          book.author,
          book.publisher,
          book.image,
          book.link
        );
        dispatch(addArchive(response.data));
      }
    } catch (err) {
      console.error('아카이브 변경 실패:', err);
      alert('아카이브 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex items-center bg-white shadow-md p-4 rounded-lg">
      <img src={book.image} alt={book.title} className="w-32 h-48 object-cover rounded-md mr-8" />

      <div className="flex-grow">
        <h2 className="text-lg font-semibold">{book.title}</h2>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-gray-500 text-sm">{book.publisher}</p>
        <p className="text-gray-500 text-sm line-clamp-2">{book.description}</p>

        <a
          href={book.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          자세히 보기
        </a>
      </div>

      {/* ✅ 아카이브 버튼 */}
      <button onClick={toggleArchive} className="ml-4 text-xl">
        {currentArchive ? '⭐' : '☆'}
      </button>
    </div>
  );
};

export default BookSearchedItem;
