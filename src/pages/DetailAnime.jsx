import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, Calendar, Clock, PlayCircle } from 'lucide-react'; 

const query = `
query GetAnimeDetails($id: Int) {
  Media(id: $id) {
    id
    title { romaji english native }
    coverImage { extraLarge large }
    bannerImage
    description
    averageScore
    genres
    format
    status
    season
    seasonYear
    episodes
    duration
    
    studios(isMain: true) { nodes { name } }
    
    # RELASI (Prequel/Sequel)
    relations {
      edges {
        relationType
        node {
          id
          title { romaji }
          format
          status
          # UBAH DISINI: Ganti 'medium' jadi 'large' biar tidak error & lebih HD
          coverImage { large }
        }
      }
    }

    # KARAKTER
    characters(sort: ROLE, perPage: 6) {
      edges {
        role
        node {
          name { full }
          image { medium }
        }
        voiceActors(language: JAPANESE, sort: RELEVANCE) {
          name { full }
          image { medium }
        }
      }
    }

    trailer { id site }
  }
}
`;

const DetailAnime = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper: Strip HTML
  const stripHtml = (html) => {
    if (!html) return "No description available.";
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  useEffect(() => {
    window.scrollTo(0, 0); 
    setLoading(true);
    
    fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { id: parseInt(id) } })
    })
    .then(res => res.json())
    .then(data => {
      setAnime(data.data.Media);
      setLoading(false);
    })
    .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1622] text-yellow-500">
       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
    </div>
  );

  if (!anime) return <div className="min-h-screen bg-[#0b1622] flex items-center justify-center text-white">Anime not found.</div>;

  return (
    <div className="min-h-screen bg-[#0b1622] text-gray-200 font-sans pb-20">
      
      {/* === 1. BANNER HEADER === */}
      <div className="relative w-full h-[300px] md:h-[450px]">
        {anime.bannerImage ? (
           <img src={anime.bannerImage} alt="Banner" className="w-full h-full object-cover opacity-60" />
        ) : (
           <div className="w-full h-full bg-[#152232] flex items-center justify-center text-gray-600">No Banner Available</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1622] via-[#0b1622]/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 -mt-32 relative z-10">
        
        {/* === 2. SIDEBAR (KIRI) === */}
        <div className="md:col-span-3 lg:col-span-3 flex flex-col gap-6">
          {/* Poster Image */}
          <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/50 border-4 border-[#152232] aspect-[2/3]">
            <img src={anime.coverImage.extraLarge} alt="Cover" className="w-full h-full object-cover" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-[#0b1622] font-black py-3 rounded-lg transition-all shadow-lg shadow-yellow-500/20 hover:-translate-y-1">
              <Heart size={20} fill="black" className="text-black"/> Add to List
            </button>
            <button className="flex items-center justify-center gap-2 bg-[#152232] border border-white/10 hover:bg-white/10 text-white font-bold py-3 rounded-lg transition-all">
              <Star size={20} className="text-yellow-500" /> Favorite
            </button>
          </div>

          {/* Sidebar Info Data */}
          <div className="bg-[#152232] p-5 rounded-xl text-sm space-y-4 shadow-lg border border-white/5">
            <div>
               <p className="font-bold text-white mb-1">Format</p>
               <p className="text-gray-400">{anime.format}</p>
            </div>
            <div>
               <p className="font-bold text-white mb-1">Episodes</p>
               <p className="text-gray-400">{anime.episodes || 'Unknown'} Eps</p>
            </div>
            <div>
               <p className="font-bold text-white mb-1">Status</p>
               <p className={`font-bold ${anime.status === 'RELEASING' ? 'text-green-400' : 'text-yellow-500'}`}>
                 {anime.status}
               </p>
            </div>
            <div>
               <p className="font-bold text-white mb-1">Season</p>
               <p className="text-gray-400 capitalize">{anime.season} {anime.seasonYear}</p>
            </div>
            <div>
               <p className="font-bold text-white mb-1">Studios</p>
               <p className="text-[#3db4f2] hover:underline cursor-pointer">{anime.studios?.nodes[0]?.name || '-'}</p>
            </div>
            <div>
               <p className="font-bold text-white mb-1">Genres</p>
               <div className="flex flex-wrap gap-2 mt-2">
                 {anime.genres.map(g => (
                   <span key={g} className="bg-[#0b1622] border border-white/10 px-2 py-1 rounded text-xs text-gray-300 hover:text-white hover:border-white/30 transition-colors cursor-default">{g}</span>
                 ))}
               </div>
            </div>
          </div>
        </div>


        {/* === 3. MAIN CONTENT (KANAN) === */}
        <div className="md:col-span-9 lg:col-span-9 pt-10 md:pt-36 space-y-10">
          
          {/* Header Title */}
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
              {anime.title.english || anime.title.romaji}
            </h1>
            <p className="text-lg text-gray-400 font-medium italic mb-6">
              {anime.title.native}
            </p>
            
            {/* Score & Rating */}
            <div className="flex items-center gap-4 mb-6">
               <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded text-yellow-500 font-black text-sm">
                  <Star size={16} fill="currentColor"/> {anime.averageScore}% Score
               </div>
               <div className="flex items-center gap-1.5 text-gray-400 text-sm font-bold">
                  <Calendar size={16} /> {anime.seasonYear || 'N/A'}
               </div>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base bg-[#152232]/50 p-6 rounded-xl border border-white/5">
              {stripHtml(anime.description)}
            </p>
          </div>

          {/* Relations (Prequel, Sequel, dll) */}
          {anime.relations.edges.length > 0 && (
            <section className="animate-fade-in-up">
              <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-yellow-500 pl-3">Relations</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {anime.relations.edges.map((rel, idx) => (
                  <Link to={`/anime/${rel.node.id}`} key={idx} className="group cursor-pointer bg-[#152232] rounded-lg overflow-hidden border border-white/5 hover:border-yellow-500/50 hover:-translate-y-1 transition-all shadow-lg">
                    <div className="h-32 overflow-hidden relative">
                       {/* FIX: Ganti medium -> large */}
                       <img 
                         src={rel.node.coverImage.large} 
                         alt={rel.node.title.romaji}
                         className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                       />
                       <div className="absolute bottom-0 left-0 bg-yellow-500 text-[#0b1622] text-[10px] font-black px-2 py-0.5 uppercase tracking-wider">
                         {rel.relationType.replace('_', ' ')}
                       </div>
                    </div>
                    <div className="p-3">
                       <p className="text-xs font-bold text-white line-clamp-1 group-hover:text-yellow-500 transition-colors">{rel.node.title.romaji}</p>
                       <p className="text-[10px] text-gray-400 mt-1">{rel.node.format} • {rel.node.status}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Characters */}
          {anime.characters.edges.length > 0 && (
            <section className="animate-fade-in-up delay-100">
              <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-yellow-500 pl-3">Characters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {anime.characters.edges.map((char, idx) => (
                  <div key={idx} className="bg-[#152232] rounded-lg p-3 flex justify-between items-center border border-white/5 hover:border-yellow-500/30 hover:bg-[#1a2c42] transition-all">
                    
                    {/* Karakter (Kiri) */}
                    <div className="flex items-center gap-3">
                      <img src={char.node.image.medium} className="w-12 h-12 rounded object-cover bg-black/50" alt={char.node.name.full} />
                      <div>
                        <p className="text-sm font-bold text-white line-clamp-1">{char.node.name.full}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">{char.role}</p>
                      </div>
                    </div>

                    {/* VA (Kanan - Jika ada) */}
                    {char.voiceActors[0] && (
                       <div className="flex items-center gap-3 text-right">
                         <div>
                           <p className="text-sm font-bold text-white line-clamp-1">{char.voiceActors[0].name.full}</p>
                           <p className="text-xs text-gray-400">JAPANESE</p>
                         </div>
                         <img src={char.voiceActors[0].image.medium} className="w-12 h-12 rounded object-cover bg-black/50" alt={char.voiceActors[0].name.full} />
                       </div>
                    )}

                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Trailer */}
          {anime.trailer && anime.trailer.site === "youtube" && (
            <section className="animate-fade-in-up delay-200">
              <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-yellow-500 pl-3 flex items-center gap-2">
                 Trailer <PlayCircle size={18} className="text-red-500"/>
              </h3>
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-white/5 bg-black">
                <iframe 
                  src={`https://www.youtube-nocookie.com/embed/${anime.trailer.id}`} 
                  title="Trailer" 
                  className="w-full h-full" 
                  allowFullScreen 
                  loading="lazy"
                />
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default DetailAnime;