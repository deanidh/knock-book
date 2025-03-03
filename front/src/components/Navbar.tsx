import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) setIsAuth(true);
  }, []);

  return (
    <nav className="bg-black text-amber-400 p-4 flex justify-between">
      <h1 className="text-2xl font-bold">BookHive</h1>
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
