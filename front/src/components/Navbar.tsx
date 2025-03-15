import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';

const Navbar = () => {
  const isAuth = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <nav className="bg-black text-amber-400 p-4 flex justify-between itmes-center">
      <Link to="/">
        <h1 className="text-2xl font-bold">BookHive</h1>
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/archive" className="hover:underline">
          Archive
        </Link>
        {isAuth ? (
          <Link to="/my" className="hover:underline">
            MyPage
          </Link>
        ) : (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
