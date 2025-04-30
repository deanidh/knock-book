import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) setIsAuth(true);
  }, []);

  return (
    <div className="h-full bg-gray-200 p-6 pr-0">
      <nav className="h-full rounded-2xl bg-gray-50 text-black py-6 px-4 flex-col flex justify-between items-center">
        <div className="flex flex-col gap-6">
          <Link className="text-2xl font-bold text-amber-400 px-6" to="/">
            BookHive
          </Link>
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              className={`flex justify-start p-3 rounded-xl gap-3 items-center ${
                location.pathname === '/'
                  ? 'bg-amber-300'
                  : 'hover:bg-amber-100'
              }`}
            >
              <img src="icon/home.png" className="w-5 h-5" />
              Home
            </Link>
            <Link
              to="/archive"
              className={`flex justify-start p-3 rounded-xl gap-3.5 items-center ${
                location.pathname === '/archive'
                  ? 'bg-amber-300'
                  : 'hover:bg-amber-100'
              }`}
            >
              <img src="icon/stack.png" className="w-4.5 h-4.5" />
              Archive
            </Link>
          </div>
        </div>
        <div>
          <Link to="/login" className=" flex gap-2 items-center">
            <img src="icon/power.png" className="w-5 h-5" />
            {isAuth ? 'Logout' : 'Login'}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
