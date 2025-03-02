import { useState, useEffect } from 'react';
import { API } from '../API';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');

  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) setIsAuthenticated(true);
  }, []);

  const handleSubmit = async () => {
    if (!username || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = isLogin
        ? await API.members.login(username, password)
        : await API.members.signup(username, password, nickname, phone);

      if (isLogin) {
        localStorage.setItem('accessToken', response.data.accessToken || '');
        setIsAuthenticated(true);
      }
      alert(`${isLogin ? '로그인' : '회원가입'} 성공`);
    } catch (error) {
      console.error(error);
      alert(`${isLogin ? '로그인' : '회원가입'} 요청에 실패했습니다.`);
    }
  };

  const handleLogout = async () => {
    if (!localStorage.getItem('accessToken')) return;

    try {
      await API.members.logout();

      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
      setUsername('');
      setPassword('');
      setNickname('');
      setPhone('');
      alert('로그아웃 되었습니다.');
    } catch (err) {
      console.error(err);
      alert('로그아웃 요청에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        {isAuthenticated ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">로그인 상태</h2>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-12">{isLogin ? '로그인' : '회원가입'}</h2>
            <input
              type="text"
              placeholder="아이디 입력"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="닉네임 입력"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="전화번호 입력"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </>
            )}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white mt-4 p-3 rounded-md hover:bg-blue-600 transition"
            >
              {isLogin ? '로그인' : '회원가입'}
            </button>
            <p className="mt-4 text-center text-gray-600">
              {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
              <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 ml-2 hover:underline">
                {isLogin ? '회원가입' : '로그인'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
