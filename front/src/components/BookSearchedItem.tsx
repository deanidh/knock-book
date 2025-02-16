import { BookSearched } from '../types/BookTypes';

interface Props {
  book: BookSearched;
}

const BookSearchedItem: React.FC<Props> = ({ book }) => {
  return (
    <div className="flex items-center bg-white shadow-md p-4 rounded-lg">
      <img src={book.image} alt={book.title.toString()} className="w-32 h-48 object-cover rounded-md mr-8" />

      <div>
        <h2 className="text-lg font-semibold">{book.title}</h2>
        <p className="text-gray-600 mb-4">{book.author}</p>
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
    </div>
  );
};

export default BookSearchedItem;
