import api from '.';

export const refresh = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('리프레시 토큰이 없습니다.');
    }

    const response = await api.post('/members/refresh', { refreshToken });

    return response.data.accessToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    throw new Error('토큰 갱신에 실패했습니다. 다시 로그인하세요.');
  }
};
