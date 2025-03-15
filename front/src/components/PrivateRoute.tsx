import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuth = useSelector((state: RootState) => state.user.isLoggedIn);

  if (!isAuth) {
    alert('로그인 후 이용해주세요.');
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
