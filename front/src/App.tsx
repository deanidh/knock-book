import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import { useEffect } from 'react';
import { setArchives } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { API } from './API';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const archives = await API.archives.get();
        dispatch(setArchives(archives));
      } catch (error) {
        console.error('아카이브 가져오기 실패:', error);
      }
    };

    fetchArchives();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
