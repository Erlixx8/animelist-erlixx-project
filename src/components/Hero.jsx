import { Plus, Star, Calendar, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ anime }) => {
  if (!anime) return null;

  const stripHtml = (html) => {
    if (!html) return "";
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const siteBgColor = '#0b1622'; 

  return (
    <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden group">
      
      {/* === BACKGROUND === */}
      <div className="absolute inset-0">
        <img 
          src={anime.bannerImage || anime.coverImage.extraLarge} 
          alt={anime.title.romaji} 
          className="w-full h-full object-cover opacity-80 scale-105 group-hover:scale-100 transition-transform duration-[3000ms] ease-out"
        />
        <div className="absolute inset-0 bg-black/20" /> 
        
        {/* Gradient Bawah */}
        <div 
          className="absolute inset-0" 
          style={{ background: `linear-gradient(to top, ${siteBgColor} 0%, ${siteBgColor}dd 20%, transparent 50%)` }} 
        />
        
        {/* Gradient Samping */}
        <div 
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${siteBgColor}cc 0%, transparent 30%)` }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-end items-start text-left pb-4 md:pb-8">
        
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-2 animate-fade-in-up">
           <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500 text-[#0b1622] text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded shadow-lg">
              <Star size={10} fill="currentColor" /> #{anime.averageScore ? `Rank ${anime.averageScore}` : 'Trending'}
           </div>
           <div className="px-2 py-0.5 border border-white/20 bg-white/5 backdrop-blur-md text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded">
              {anime.format}
           </div>
           <div className="flex items-center gap-1 px-2 py-0.5 border border-white/20 bg-white/5 backdrop-blur-md text-gray-300 text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded">
              <Calendar size={10} /> {anime.seasonYear || 'N/A'}
           </div>
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-none mb-2 max-w-3xl drop-shadow-md animate-fade-in-up delay-100">
          <span className="line-clamp-2">
            {anime.title.english || anime.title.romaji}
          </span>
        </h1>

        <div className="flex flex-wrap gap-2 mb-3 text-xs font-bold text-yellow-500/90 uppercase tracking-wide animate-fade-in-up delay-150">
           {anime.genres.slice(0, 4).join(' • ')}
        </div>

        <p className="text-gray-300 text-xs md:text-sm max-w-lg line-clamp-2 mb-5 leading-relaxed drop-shadow-sm font-medium animate-fade-in-up delay-200 opacity-90">
          {stripHtml(anime.description)}
        </p>

        <div className="flex flex-wrap gap-3 animate-fade-in-up delay-300">
          <Link 
            to={`/anime/${anime.id}`}
            className="flex items-center gap-2 bg-white text-[#0b1622] hover:bg-yellow-500 px-6 py-2.5 rounded-full font-black transition-all duration-300 uppercase tracking-wider text-[10px] md:text-xs shadow-lg hover:-translate-y-0.5"
          >
            <PlayCircle size={16} strokeWidth={2.5} /> View Details
          </Link>
          
          <button className="flex items-center gap-2 bg-white/5 border border-white/20 text-white hover:bg-white/10 px-5 py-2.5 rounded-full font-bold transition-all duration-300 uppercase tracking-wider text-[10px] md:text-xs backdrop-blur-md group hover:-translate-y-0.5">
            <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" /> Add to List
          </button>
        </div>

      </div>
    </div>
  );
};

export default Hero;