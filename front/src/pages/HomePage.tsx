import { useState } from 'react';
import BookItem from '../components/BookItem';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const books = ['hello', 'hi'];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mt-8 mb-8">도서 검색</h1>
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border rounded-md shadow-md"
          placeholder="검색할 책의 정보를 입력하세요..."
        />
        <button
          onClick={() => console.log('hi')}
          className="mt-2 w-full  p-3  bg-blue-400 text-white rounded-md shadow-md"
        >
          검색
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {books.length > 0 ? (
          books.map((book) => <BookItem book={book} />)
        ) : (
          <p className="text-center col-span-full">검색된 책이 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
