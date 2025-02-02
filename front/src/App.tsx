import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReadingPage from './pages/ReadingPage';
import ArchivePage from './pages/ArchivePage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reading" element={<ReadingPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
