import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { API } from '../API';

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, nickname, phone } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      API.members.logout();
      dispatch(logout());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert('로그아웃 되었습니다.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('로그아웃 요청에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">내 정보</h2>

        <div className="mb-4">
          <p className="text-lg font-semibold">아이디:</p>
          <p className="text-gray-700">{username}</p>
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold">닉네임:</p>
          <p className="text-gray-700">{nickname}</p>
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold">전화번호:</p>
          <p className="text-gray-700">{phone}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
