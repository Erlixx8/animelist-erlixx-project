import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState(''); 
  
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trending', path: '/trending' },
    { name: 'Season', path: '/season' },
    { name: 'Top 100', path: '/top-100' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-[#0b1622]/80 backdrop-blur-lg shadow-lg border-b border-white/5 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* === 1. LOGO (UPDATED WITH BRANDING) === */}
        <Link to="/" className="flex items-center gap-2 group z-50 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-9 h-9 bg-yellow-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-yellow-500/20">
             <span className="text-[#0b1622] font-black text-xl">A</span>
          </div>
          <div className="flex flex-col leading-none hidden sm:block">
            <h1 className="text-xl font-black text-white tracking-tight group-hover:text-yellow-500 transition-colors">
              ANIME<span className="text-yellow-500 group-hover:text-white">LIST</span>
            </h1>
            {/* Tagline by Erlixx */}
            <span className="text-[0.6rem] font-bold text-gray-500 tracking-[0.2em] uppercase group-hover:text-white transition-colors mt-0.5">
               by Erlixx
            </span>
          </div>
        </Link>

        {/* === 2. DESKTOP MENU (Centered) === */}
        <div className="hidden md:flex items-center gap-8 bg-[#0b1622]/50 px-6 py-2 rounded-full border border-white/5 backdrop-blur-md absolute left-1/2 -translate-x-1/2">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name}
                to={item.path} 
                className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-yellow-500 relative py-1 ${
                  isActive ? 'text-yellow-500' : 'text-gray-400'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.8)]"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* === 3. RIGHT ICONS & SEARCH === */}
        <div className="flex items-center gap-4">
          
          {/* SEARCH INPUT (Desktop) */}
          <div className="hidden md:block relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-[#152232] text-sm text-white border border-white/10 rounded-full pl-10 pr-4 py-1.5 focus:outline-none focus:border-yellow-500/50 focus:w-48 w-32 transition-all duration-300 placeholder:text-gray-500"
            />
          </div>

          {/* SEARCH ICON (Mobile) */}
          <Link to="/search" className="md:hidden text-gray-400 hover:text-white transition-colors">
             <Search size={20} />
          </Link>

          {/* Notifications */}
          <button className="text-gray-400 hover:text-yellow-500 transition-colors relative">
             <Bell size={20} />
             <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0b1622]"></span>
          </button>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-600 p-[1px] cursor-pointer hidden sm:block">
             <div className="w-full h-full rounded-full bg-[#152232] flex items-center justify-center text-white overflow-hidden">
                <User size={16} />
             </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-300 hover:text-white transition-transform active:scale-95" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* === 4. MOBILE MENU DROPDOWN === */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#0b1622]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-6 space-y-4 flex flex-col items-center">
          
          {/* Mobile Input Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search anime..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-white/5 text-white text-sm border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 transition-all"
            />
          </div>

          {/* Links */}
          {navLinks.map((item) => {
             const isActive = location.pathname === item.path;
             return (
              <Link 
                key={item.name}
                to={item.path} 
                className={`w-full text-center py-3 text-sm font-black uppercase tracking-widest transition-all ${
                  isActive 
                  ? 'text-yellow-500 bg-white/5 rounded-xl border border-white/5' 
                  : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
             );
          })}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;