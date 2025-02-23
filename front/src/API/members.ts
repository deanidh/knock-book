import api from '.';

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/member/login', { username, password });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('로그인 실패:', error);
    return { success: false, message: '로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.' };
  }
};

export const signup = async (username: string, password: string, nickname: string, phone: string) => {
  console.log(username);
  try {
    const response = await api.post('/member/signup', { username, password, nickname, phone });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('회원가입 실패:', error);
    return { success: false, message: '회원가입에 실패했습니다. 입력 정보를 확인하세요.' };
  }
};

export const logout = async () => {
  console.log('hi');
  try {
    await api.post('/member/logout');
    localStorage.removeItem('token');
    return { success: true };
  } catch (error) {
    console.error('로그아웃 실패:', error);
    return { success: false, message: '로그아웃에 실패했습니다.' };
  }
};
