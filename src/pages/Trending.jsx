import { useState, useEffect } from 'react';
import AnimeGrid from '../components/AnimeGrid';
import Pagination from '../components/Pagination'; 

const query = `
query GetTrendingPage($page: Int) {
  Page(page: $page, perPage: 24) {
    pageInfo {
      hasNextPage
      lastPage
    }
    media(type: ANIME, sort: TRENDING_DESC) {
      id
      title { romaji english }
      coverImage { large extraLarge }
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

const Trending = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);       
  const [hasNextPage, setHasNextPage] = useState(true); 

  useEffect(() => {
    setLoading(true); 
    
    fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        query, 
        variables: { page: page } 
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.data) {
        setAnimeList(data.data.Page.media);
        setHasNextPage(data.data.Page.pageInfo.hasNextPage);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [page]); 

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
      {loading ? (
         <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div></div>
      ) : (
         <>
           <AnimeGrid title={`Trending Now `} animeList={animeList} />
           
           {/* Pasang Pagination di bawah */}
           <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
         </>
      )}
    </div>
  );
};

export default Trending;