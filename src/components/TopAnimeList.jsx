import { Star, Clock, Calendar, Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const TopAnimeList = ({ animeList, link, page, setPage, hasNextPage }) => {
  
  return (
    <section className="mb-16">
       {/* Header */}
       <div className="flex items-center gap-3 mb-6 px-2">
         <Trophy className="text-yellow-500" size={24} />
         <div>
            <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">
              Top 100 All Time
            </h2>
            <p className="text-gray-400 text-[10px] md:text-xs mt-0.5">Highest rated by community</p>
         </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {animeList.map((anime, index) => {
          // Logika nomor urut: Jika di home (tidak ada page), mulai dari 1. Jika ada page, sesuaikan rumus.
          const actualRank = page ? ((page - 1) * 24) + index + 1 : index + 1;

          return (
            <Link 
              to={`/anime/${anime.id}`}
              key={anime.id} 
              className="flex items-center gap-3 bg-[#152232] p-2.5 rounded-lg border border-white/5 hover:border-yellow-500/30 transition-all duration-300 group hover:bg-[#1a2c42] relative overflow-hidden"
            >
              <div className="absolute -left-2 -top-4 text-5xl font-black text-white/5 select-none z-0">
                 #{actualRank}
              </div>

              <div className="flex flex-col items-center justify-center w-8 flex-shrink-0 z-10">
                 <span className={`text-lg font-black ${actualRank <= 3 ? 'text-yellow-500' : 'text-gray-500'} italic`}>
                   {actualRank}
                 </span>
              </div>

              <div className="w-12 h-16 md:w-14 md:h-20 flex-shrink-0 overflow-hidden rounded shadow-sm relative z-10 bg-black/50">
                <img 
                  src={anime.coverImage.large} 
                  alt={anime.title.romaji}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex flex-col flex-1 justify-center z-10 min-w-0">
                <div className="flex justify-between items-start">
                   <h3 className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1 leading-tight pr-2">
                     {anime.title.english || anime.title.romaji}
                   </h3>
                   <div className="flex items-center gap-1 text-yellow-500 text-[10px] font-bold bg-yellow-500/10 px-1.5 py-0.5 rounded flex-shrink-0">
                       <Star size={10} fill="currentColor"/>
                       <span>{anime.averageScore}%</span>
                   </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                   <p className="text-[10px] text-gray-500 truncate">
                     {anime.genres.slice(0, 3).join(' • ')}
                   </p>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                       <Clock size={10} />
                       <span>{anime.format}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                       <Calendar size={10} />
                       <span>{anime.seasonYear || '-'}</span>
                    </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      {/* === LOGIKA TOMBOL LOAD MORE vs PAGINATION === */}
      <div className="mt-8">
        {link ? (
          // KONDISI 1: Di HOME -> Tampilkan Tombol "Load More" (Link ke halaman full)
          <div className="text-center">
            <Link to={link} className="inline-flex items-center gap-2 px-8 py-3 bg-[#152232] border border-white/10 text-white rounded-full hover:bg-yellow-500 hover:text-[#0b1622] hover:border-yellow-500 transition-all uppercase font-bold text-xs tracking-[0.15em] shadow-lg shadow-black/20 group">
               Load More<ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>
        ) : (
          // KONDISI 2: Di Halaman Full -> Tampilkan Pagination
          <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
        )}
      </div>

    </section>
  );
};

export default TopAnimeList;