import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimeGrid from '../components/AnimeGrid';
import Pagination from '../components/Pagination';

// Query Dinamis menerima banyak variabel filter
const query = `
query SearchAnime($page: Int, $search: String, $genre: String, $season: MediaSeason, $seasonYear: Int, $format: MediaFormat) {
  Page(page: $page, perPage: 24) {
    pageInfo { hasNextPage }
    media(type: ANIME, sort: POPULARITY_DESC, search: $search, genre: $genre, season: $season, seasonYear: $seasonYear, format: $format) {
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

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  // Ambil nilai dari URL
  const keyword = searchParams.get('keyword') || undefined;
  const genre = searchParams.get('genre') || undefined;
  const year = searchParams.get('year') ? parseInt(searchParams.get('year')) : undefined;
  const season = searchParams.get('season') ? searchParams.get('season').toUpperCase() : undefined;
  const format = searchParams.get('format') ? searchParams.get('format').toUpperCase() : undefined;

  // Reset halaman ke 1 jika filter berubah
  useEffect(() => {
    setPage(1);
  }, [keyword, genre, year, season, format]);

  // Fetch Data
  useEffect(() => {
    setLoading(true);
    
    // Variabel untuk dikirim ke API
    const variables = {
      page,
      search: keyword,
      genre,
      seasonYear: year,
      season,
      format
    };

    fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    })
    .then(res => res.json())
    .then(data => {
      if (data.data) {
        setAnimeList(data.data.Page.media);
        setHasNextPage(data.data.Page.pageInfo.hasNextPage);
      }
      setLoading(false);
    })
    .catch(err => { console.error(err); setLoading(false); });
  }, [page, keyword, genre, year, season, format]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">
        Search Results {keyword && `for "${keyword}"`}
      </h2>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : animeList.length > 0 ? (
        <>
          <AnimeGrid title="" animeList={animeList} />
          <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
        </>
      ) : (
        <div className="text-center text-gray-400 py-20">
          No anime found matching your filters.
        </div>
      )}
    </div>
  );
};

export default SearchPage;