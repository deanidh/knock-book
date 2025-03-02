import { useState, useEffect } from 'react';
import { BookSearched } from '../types/BookSearched';
import { API } from '../API';

interface Props {
  book: BookSearched;
}

const BookSearchedItem: React.FC<Props> = ({ book }) => {
  const [isArchived, setIsArchived] = useState(false);

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const archives = await API.archives.get();
        // const archivedBooks = archives.data.map((item: Archive) => item.isbn);
        // setIsArchived(archivedBooks.includes(book.isbn));
        console.log(archives);
      } catch (err) {
        console.error('아카이브 확인 실패:', err);
      }
    };
    fetchArchives();
  }, [book.isbn]);

  const toggleArchive = async () => {
    try {
      let response;
      if (isArchived) {
        response = await API.archives.remove(book.isbn);
      } else {
        response = await API.archives.add(book.isbn, book.title, book.author, book.publisher, book.image, book.link);
      }

      if (response.success) {
        setIsArchived(!isArchived);
      } else {
        alert(response.message || '아카이브 변경에 실패했습니다.');
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
        {isArchived ? '⭐' : '☆'}
      </button>
    </div>
  );
};

export default BookSearchedItem;
