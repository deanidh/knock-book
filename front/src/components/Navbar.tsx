import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-red-400 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Knock Book</h1>
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/reading" className="hover:underline">
            Reading
          </Link>
        </li>
        <li>
          <Link to="/archive" className="hover:underline">
            Archive
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
