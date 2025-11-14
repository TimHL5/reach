import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import UniversitiesPage from './pages/UniversitiesPage';
import UniversityDetailPage from './pages/UniversityDetailPage';
import GetMatchedPage from './pages/GetMatchedPage';
import MyCollegesPage from './pages/MyCollegesPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-matched" element={<GetMatchedPage />} />
        <Route path="/universities" element={<UniversitiesPage />} />
        <Route path="/universities/:slug" element={<UniversityDetailPage />} />
        <Route path="/my-colleges" element={<MyCollegesPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
