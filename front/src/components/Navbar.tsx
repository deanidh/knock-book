import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';

const Navbar = () => {
  const isAuth = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <nav className="bg-black text-amber-400 p-4 flex justify-between">
      <Link to="/">
        <h1 className="text-2xl font-bold">BookHive</h1>
      </Link>
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/archive" className="hover:underline">
            Archive
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">
            {isAuth ? 'Logout' : 'Login'}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
