import api from '.';
import { Archive } from '../types/Archive';

export const get = async () => {
  try {
    const response = await api.get('/archive/my');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('내 아카이브 조회 실패:', error);
    return { success: false, message: '내 아카이브를 가져오는데 실패했습니다.' };
  }
};

export const add = async (isbn: string) => {
  try {
    const response = await api.post('/archive/add', { isbn });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('아카이브 추가 실패:', error);
    return { success: false, message: '아카이브 추가에 실패했습니다.' };
  }
};

export const remove = async (isbn: string) => {
  try {
    console.log(isbn);
    const response = await api.delete(`/archive/${isbn}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('아카이브 삭제 실패:', error);
    return { success: false, message: '아카이브 삭제에 실패했습니다.' };
  }
};

export const modify = async (isbn: string, updatedData: Archive) => {
  try {
    const response = await api.put(`/archive/${isbn}`, updatedData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('아카이브 수정 실패:', error);
    return { success: false, message: '아카이브 수정에 실패했습니다.' };
  }
};
