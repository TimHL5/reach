import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UniversitiesPage from './pages/UniversitiesPage';
import UniversityDetailPage from './pages/UniversityDetailPage';
import GetMatchedPage from './pages/GetMatchedPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/get-matched" element={<GetMatchedPage />} />
      <Route path="/universities" element={<UniversitiesPage />} />
      <Route path="/universities/:slug" element={<UniversityDetailPage />} />
    </Routes>
  );
}

export default App;
