import { UniversityExplorer } from '../components/universities/UniversityExplorer';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <UniversityExplorer />
      <Footer />
    </div>
  );
}
