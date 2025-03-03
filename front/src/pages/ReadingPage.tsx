import React, { useState } from 'react';
import { Archive } from '../types/Archive';
import { API } from '../API';
import { useDispatch } from 'react-redux';
import { updateArchive } from '../store/userSlice';

interface Props {
  book: Archive;
  onClose: () => void;
}

const ReadingPage: React.FC<Props> = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const [readingStatus, setReadingStatus] = useState(book.readingStatus ?? 'not_started');
  const [currentPage, setCurrentPage] = useState(book.currentPage ?? 0);
  const [startedAt, setStartedAt] = useState(book.startedAt ?? '');
  const [finishedAt, setFinishedAt] = useState(book.finishedAt ?? '');
  const [review, setReview] = useState(book.review ?? '');

  const handleSave = async () => {
    const updatedBook = {
      ...book,
      readingStatus,
      currentPage,
      startedAt,
      finishedAt,
      review,
    };

    console.log(updatedBook);

    try {
      await API.archives.update(book.archiveId, readingStatus, currentPage, startedAt, finishedAt, review);
      dispatch(updateArchive(updatedBook));
      alert('아카이브가 성공적으로 수정되었습니다.');
      onClose();
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full relative max-w-2xl">
      <button className="absolute top-2 right-2 text-gray-600 text-xl" onClick={onClose}>
        ✖
      </button>

      <img src={book.image} alt={book.title} className="w-full h-80 object-contain bg-gray-300 rounded-md mb-4" />

      <h2 className="text-2xl font-bold">{book.title}</h2>
      <p className="text-gray-600">{book.author}</p>
      <p className="mt-2 text-gray-500">{book.publisher}</p>

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

      <div className="grid grid-cols-2 gap-4 items-center mt-12">
        <label className="text-gray-700 font-semibold">읽기 상태</label>
        <select
          className="border rounded p-2"
          value={readingStatus}
          onChange={(e) => setReadingStatus(e.target.value as 'reading' | 'completed' | 'not_started')}
        >
          <option value="not_started">읽기 전</option>
          <option value="reading">읽는 중</option>
          <option value="completed">완독</option>
        </select>

        <label className="text-gray-700 font-semibold">현재 페이지</label>
        <input
          type="number"
          className="border rounded p-2"
          value={currentPage}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
        />

        <label className="text-gray-700 font-semibold">시작 날짜</label>
        <input
          type="date"
          className="border rounded p-2"
          value={startedAt}
          onChange={(e) => setStartedAt(e.target.value)}
        />

        <label className="text-gray-700 font-semibold">완료 날짜</label>
        <input
          type="date"
          className="border rounded p-2"
          value={finishedAt}
          onChange={(e) => setFinishedAt(e.target.value)}
        />

        <label className="text-gray-700 font-semibold">리뷰</label>
        <textarea
          className="border rounded p-2 col-span-1"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>

      {/* 저장 버튼 */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default ReadingPage;
