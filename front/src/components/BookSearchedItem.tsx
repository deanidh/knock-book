import { BookSearched } from '../types/BookSearched';
import { API } from '../API';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addArchive, removeArchive } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

interface Props {
  book: BookSearched;
}

const BookSearchedItem: React.FC<Props> = ({ book }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.user.isLoggedIn);
  const archives = useSelector((state: RootState) => state.user.archives);
  const currentArchive = archives.find((archive) => archive.isbn === book.isbn);

  const toggleArchive = async () => {
    if (!isAuth) {
      const confirmLogin = window.confirm(
        '아카이브에 담기 위해서는 로그인이 필요합니다. \n로그인 페이지로 이동하시겠습니까?'
      );

      if (confirmLogin) {
        navigate('/login');
      }

      return;
    }

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
        console.log(response);
        dispatch(addArchive(response));
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
