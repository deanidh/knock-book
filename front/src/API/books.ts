import api from '.';

export const search = async (keyword: string) => {
  try {
    const response = await api.get(`/book/search?keyword=${keyword}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('도서 검색 실패:', error);
    return { success: false, message: '도서 검색에 실패했습니다.' };
  }
};
