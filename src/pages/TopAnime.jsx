import { useState, useEffect } from 'react';
import TopAnimeList from '../components/TopAnimeList';

const query = `
query GetTopAnimePage($page: Int) {
  Page(page: $page, perPage: 24) {
    pageInfo { hasNextPage }
    media(type: ANIME, sort: SCORE_DESC) {
      id
      title { romaji english }
      coverImage { large }
      description
      averageScore
      genres
      format
      seasonYear
    }
  }
}
`;

const TopAnime = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { page } })
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
  }, [page]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
      {loading ? (
         <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div></div>
      ) : (
         <TopAnimeList 
            animeList={animeList} 
            page={page} 
            setPage={setPage} 
            hasNextPage={hasNextPage} 
         />
      )}
    </div>
  );
};

export default TopAnime;