import { useState } from 'react';
import BookSearchedItem from '../components/BookSearchedItem';
import { BookSearched } from '../types/BookTypes';
import { API } from '../API';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<BookSearched[]>([
    {
      title: '클린 코드',
      author: '로버트 C. 마틴',
      publisher: '인사이트',
      link: 'https://product.kyobobook.co.kr/detail/S000001032980',
      isbn: '9788989975035',
      image: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966260959.jpg',
      description: '애자일 소프트웨어 장인 정신을 담은 클린 코드 작성 가이드',
    },
    {
      title: '참을 수 없는 존재의 가벼움',
      author: '밀란 쿤데라',
      publisher: '민음사',
      link: 'https://product.kyobobook.co.kr/detail/S000000619722',
      isbn: '9788968480011',
      image: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788937437564.jpg',
      description: '자바스크립트 핵심 개념을 깊이 있게 다룬 바이블',
    },
    {
      title: '리팩터링',
      author: '마틴 파울러',
      publisher: '위키북스',
      link: 'https://product.kyobobook.co.kr/detail/S000001810241',
      isbn: '9788998139766',
      image: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791162242742.jpg',
      description: '코드 품질을 높이고 유지보수를 쉽게 만드는 리팩터링 기법',
    },
  ]);

  const searchBooks = async () => {
    if (!query.trim()) return;

    try {
      const response = await API.books.search(query);

      if (response.success) {
        setSearchResult(response.data || []);
      } else {
        console.error('도서 검색 실패:', response.message);
        setSearchResult([]);
      }
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
<<<<<<< HEAD
        <button
          onClick={() => console.log('hi')}
          className="mt-2 w-full  p-3  bg-blue-400 text-white rounded-md shadow-md"
        >
=======
        <button onClick={searchBooks} className="mt-2 w-full  p-3  bg-blue-400 text-white rounded-md shadow-md">
>>>>>>> dev
          검색
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6">
<<<<<<< HEAD
        {books.length > 0 ? (
          books.map((book) => <BookItem book={book} />)
=======
        {searchResult.length > 0 ? (
          searchResult.map((book) => <BookSearchedItem key={book.isbn} book={book} />)
>>>>>>> dev
        ) : (
          <p className="text-center col-span-full">검색된 책이 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
