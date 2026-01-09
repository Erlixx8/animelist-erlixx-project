import { useState, useEffect } from 'react';
import AnimeGrid from '../components/AnimeGrid';
import Pagination from '../components/Pagination';

const SEASON_QUERY = `
query GetSeasonAnime($page: Int) {
  Page(page: $page, perPage: 24) {
    pageInfo {
      hasNextPage
      lastPage
    }
    # Perhatikan: isAdult: false & status: RELEASING (Tayang Musim Ini)
    media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC, isAdult: false) {
      id
      title { romaji english }
      coverImage { large }
      averageScore
      genres
      format
      seasonYear
      studios(isMain: true) { nodes { name } }
      nextAiringEpisode { episode timeUntilAiring }
    }
  }
}
`;

const Season = () => {
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);

    fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        query: SEASON_QUERY, 
        variables: { page } 
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.data) {
        setAnimeList(data.data.Page.media);
        setHasNextPage(data.data.Page.pageInfo.hasNextPage);
        setLastPage(data.data.Page.pageInfo.lastPage);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [page]);

  return (
    <div className="min-h-screen bg-[#0b1622] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-8 border-b border-white/10 pb-4">
          <h1 className="text-3xl font-black text-white uppercase tracking-wide">
            Popular This Season
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Anime that are currently airing right now.
          </p>
        </div>

        {/* Content */}
        {loading ? (
           <div className="flex justify-center py-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
           </div>
        ) : (
           <>
             <AnimeGrid title="" animeList={animeList} />
             <Pagination 
                page={page} 
                setPage={setPage} 
                hasNextPage={hasNextPage} 
                lastPage={lastPage}
             />
           </>
        )}
        
      </div>
    </div>
  );
};

export default Season;