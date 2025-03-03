import api from '.';

export const search = async (keyword: string) => {
  try {
    const response = await api.get(`/book/search?keyword=${keyword}`);
    return response.data;
  } catch (error) {
    console.error('도서 검색 실패:', error);
    throw new Error('도서 검색에 실패했습니다.');
  }
};
