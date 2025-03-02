import { useState } from 'react';
import BookSearchedItem from '../components/BookSearchedItem';
import { BookSearched } from '../types/BookSearched';
import { API } from '../API';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<BookSearched[]>([]);

  const searchBooks = async () => {
    if (!query.trim()) return;

    try {
      const result = await API.books.search(query);
      setSearchResult(result);
    } catch (err) {
      console.error('도서 검색 중 오류 발생:', err);
      setSearchResult([]);
    }
  };

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
        <button onClick={searchBooks} className="mt-2 w-full  p-3  bg-blue-400 text-white rounded-md shadow-md">
          검색
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {searchResult.length > 0 ? (
          searchResult.map((book) => <BookSearchedItem key={book.isbn} book={book} />)
        ) : (
          <p className="text-center col-span-full">책을 검색해주세요.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
