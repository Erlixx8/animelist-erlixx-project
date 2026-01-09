import { Star, PlayCircle, Calendar, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnimeGrid = ({ title, animeList, link }) => {

  const getAiringString = (episodeData) => {
    if (!episodeData) return null;
    const days = Math.ceil(episodeData.timeUntilAiring / (60 * 60 * 24));
    return `Ep ${episodeData.episode} in ${days}d`;
  };

  return (
    <section className="mb-16 animate-fade-in">
      <div className="flex items-end justify-between mb-8 px-2">
        <div className="flex flex-col gap-1">
           <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide flex items-center gap-3">
             <span className="bg-gradient-to-t from-yellow-600 to-yellow-400 w-1.5 h-8 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.6)]"></span>
             {title}
           </h2>
        </div>
        
        {link && (
          <Link to={link} className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-white uppercase tracking-[0.2em] transition-all flex items-center gap-2 group border border-white/5 hover:border-yellow-500/50 bg-[#152232] px-4 py-2 rounded-full">
            View All <span className="group-hover:translate-x-1 text-yellow-500 transition-transform">→</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8">
        {animeList.map((anime) => {
           const airingString = getAiringString(anime.nextAiringEpisode);
           const studioName = anime.studios?.nodes[0]?.name || "Unknown";
           
           const hasScore = anime.averageScore !== null && anime.averageScore !== undefined;

           return (
            <Link 
              to={`/anime/${anime.id}`} 
              key={anime.id} 
              className="group relative block w-full aspect-[2/3] rounded-2xl overflow-hidden bg-[#152232] shadow-xl shadow-black/50 ring-1 ring-white/5 hover:ring-yellow-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-yellow-500/10"
            >
              
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={anime.coverImage.large} 
                  alt={anime.title.romaji}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1622] via-[#0b1622]/20 to-transparent opacity-90" />
                
                <div className="absolute inset-0 bg-[#0b1622]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]" />
              </div>

              <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
                 
                 {hasScore ? (
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-lg group-hover:bg-yellow-500 group-hover:text-black group-hover:border-yellow-500 transition-colors">
                        <Star size={10} fill="currentColor" /> 
                        {anime.averageScore}%
                    </div>
                 ) : (
                    <div className="flex items-center gap-1 bg-blue-500/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                        <TrendingUp size={10} /> NEW
                    </div>
                 )}

                 {airingString && (
                    <div className="flex items-center gap-1 bg-yellow-500 text-[#0b1622] text-[9px] font-black px-2 py-1 rounded-md shadow-lg shadow-yellow-500/20">
                       ON AIR
                    </div>
                 )}
              </div>

              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                 <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-4 group-hover:bg-yellow-500 group-hover:text-black group-hover:border-yellow-500 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <PlayCircle size={32} fill="currentColor" strokeWidth={1.5} />
                 </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-4 z-20 flex flex-col justify-end">
                
                <div className="flex items-center justify-between mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                   <span className="text-[10px] font-bold text-[#3db4f2] uppercase tracking-wider line-clamp-1 max-w-[60%]">
                     {studioName}
                   </span>
                   {airingString ? (
                      <span className="text-[9px] font-bold text-gray-300">{airingString}</span>
                   ) : (
                      <span className="text-[9px] font-bold text-gray-400">{anime.seasonYear || 'TBA'}</span>
                   )}
                </div>

                
                <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300 drop-shadow-md mb-1">
                  {anime.title.english || anime.title.romaji}
                </h3>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <div className="overflow-hidden">
                    <div className="pt-2 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 border-t border-white/10 mt-2">
                       <span className="text-[9px] font-bold bg-white/10 px-2 py-0.5 rounded text-gray-300 flex items-center gap-1">
                          <Clock size={10} /> {anime.format}
                       </span>
                       {anime.genres[0] && (
                         <span className="text-[9px] font-bold border border-white/20 px-2 py-0.5 rounded text-gray-300">
                           {anime.genres[0]}
                         </span>
                       )}
                    </div>
                  </div>
                </div>

              </div>
            </Link>
           );
        })}
      </div>
    </section>
  );
};

export default AnimeGrid;