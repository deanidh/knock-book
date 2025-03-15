import { useState } from 'react';
import { API } from '../API';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');

  const [isLogin, setIsLogin] = useState(true);

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
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        const archives = await API.archives.get();

        dispatch(
          login({
            username: username,
            nickname: nickname,
            phone: phone,
            archives: archives,
          })
        );
      }
      alert(`${isLogin ? '로그인' : '회원가입'} 성공`);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(`${isLogin ? '로그인' : '회원가입'} 요청에 실패했습니다.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-12">{isLogin ? '로그인' : '회원가입'}</h2>
        <input
          type="text"
          placeholder="아이디 입력"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
        />
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="닉네임 입력"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
            />
            <input
              type="text"
              placeholder="전화번호 입력"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
            />
          </>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-amber-400 text-black mt-4 p-3 rounded-md hover:bg-amber-600 transition"
        >
          {isLogin ? '로그인' : '회원가입'}
        </button>
        <p className="mt-4 text-center text-gray-600">
          {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
          <button onClick={() => setIsLogin(!isLogin)} className="text-amber-600 ml-2 hover:underline">
            {isLogin ? '회원가입' : '로그인'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
