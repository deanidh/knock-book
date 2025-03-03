import React from 'react';
import { Archive } from '../types/Archive';

interface Props {
  book: Archive;
  onClose: () => void;
}

const ReadingPage: React.FC<Props> = ({ book, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center p-32">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full relative max-w-2xl">
        <button className="absolute top-2 right-2 text-gray-600 text-xl" onClick={onClose}>
          ✖
        </button>

        <img src={book.image} alt={book.title} className="w-full h-80 object-contain bg-gray-300 rounded-md mb-4" />

        <h2 className="text-2xl font-bold">{book.title}</h2>
        <p className="text-gray-600">{book.author}</p>
        <p className="mt-2 text-gray-500">{book.publisher}</p>
        <p className="mt-2 text-gray-500">읽기 상태: {book.readingStatus}</p>
        <p className="mt-2 text-gray-500">현재 페이지: {book.currentPage ?? '없음'}</p>
        <p className="mt-2 text-gray-500">시작 날짜: {book.startedAt ?? '없음'}</p>
        <p className="mt-2 text-gray-500">완료 날짜: {book.finishedAt ?? '없음'}</p>
        <p className="mt-2 text-gray-500">리뷰: {book.review ?? '없음'}</p>

        {book.link && (
          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-blue-500 hover:underline"
          >
            상세 정보 보기 →
          </a>
        )}
      </div>
    </div>
  );
};

export default ReadingPage;
