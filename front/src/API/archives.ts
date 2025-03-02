import api from '.';

export const get = async () => {
  try {
    const response = await api.get('/archive/my');
    return response.data;
  } catch (error) {
    console.error('내 아카이브 조회 실패:', error);
    throw new Error('내 아카이브를 가져오는데 실패했습니다.');
  }
};

export const add = async (
  isbn: string,
  title: string,
  author: string,
  publisher: string,
  image: string,
  link: string
) => {
  try {
    const response = await api.post('/archive/add', { isbn, title, author, publisher, image, link });
    return response.data;
  } catch (error) {
    console.error('아카이브 추가 실패:', error);
    throw new Error('아카이브 추가에 실패했습니다.');
  }
};

export const remove = async (isbn: string) => {
  try {
    console.log(isbn);
    const response = await api.delete(`/archive/${isbn}`);
    return response.data;
  } catch (error) {
    console.error('아카이브 삭제 실패:', error);
    throw new Error('아카이브 삭제에 실패했습니다.');
  }
};

export const modify = async (
  isbn: string,
  readingStatus: string,
  currentPage: number,
  startedAt: string,
  finishedAt: string,
  review: string
) => {
  try {
    const response = await api.put(`/archive/${isbn}`, { readingStatus, currentPage, startedAt, finishedAt, review });
    return response.data;
  } catch (error) {
    console.error('아카이브 수정 실패:', error);
    throw new Error('아카이브 수정에 실패했습니다.');
  }
};
