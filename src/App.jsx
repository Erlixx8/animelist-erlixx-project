import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Season from './pages/Season';
import TopAnime from './pages/TopAnime';
import DetailAnime from './pages/DetailAnime'; 
import SearchPage from './pages/SearchPage'; 
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0b1622] text-gray-200 font-sans selection:bg-yellow-500 selection:text-black">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/season" element={<Season />} />
        <Route path="/top-100" element={<TopAnime />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/anime/:id" element={<DetailAnime />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;