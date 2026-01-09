import { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import AnimeGrid from '../components/AnimeGrid';
import TopAnimeList from '../components/TopAnimeList';
import Pagination from '../components/Pagination';

const HOME_QUERY = `
query GetHomePageData {
  trending: Page(page: 1, perPage: 10) {
    # Tambahkan isAdult: false
    media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
      id
      title { romaji english }
      coverImage { large extraLarge }
      bannerImage
      description
      averageScore
      genres
      format
      duration
      seasonYear
      studios(isMain: true) { nodes { name } }
      nextAiringEpisode { episode timeUntilAiring }
    }
  }
  popularSeason: Page(page: 1, perPage: 10) {
    # Tambahkan isAdult: false
    media(type: ANIME, sort: POPULARITY_DESC, status: RELEASING, isAdult: false) {
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
  top100: Page(page: 1, perPage: 10) {
    # Tambahkan isAdult: false
    media(type: ANIME, sort: SCORE_DESC, isAdult: false) {
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

const SEARCH_QUERY = `
query SearchAnime($page: Int, $search: String, $genre: String, $season: MediaSeason, $seasonYear: Int, $format: MediaFormat) {
  Page(page: $page, perPage: 24) {
    pageInfo { 
      hasNextPage 
      lastPage      
    }
    # Tambahkan isAdult: false agar hasil search bersih
    media(type: ANIME, sort: POPULARITY_DESC, search: $search, genre: $genre, season: $season, seasonYear: $seasonYear, format: $format, isAdult: false) {
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

const Home = () => {
  // State Data
  const [homeData, setHomeData] = useState({ trending: [], popularSeason: [], top100: [] });
  const [heroAnime, setHeroAnime] = useState(null);
  
  // State Search & Filters
  const [filters, setFilters] = useState({ keyword: '', genre: '', year: '', season: '', format: '' });
  const [searchResult, setSearchResult] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [searchHasNextPage, setSearchHasNextPage] = useState(false);
  const [searchLastPage, setSearchLastPage] = useState(1);
  
  // Loading States
  const [loadingHome, setLoadingHome] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Ref
  const isFirstRender = useRef(true);
  const isFilterActive = filters.keyword || filters.genre || filters.year || filters.season || filters.format;

  // === EFFECT 1: Fetch Home Data ===
  useEffect(() => {
    fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: HOME_QUERY })
    })
    .then(res => res.json())
    .then(response => {
      if (response.data) {
        const { trending, popularSeason, top100 } = response.data;
        setHeroAnime(trending.media[0]); 
        setHomeData({
          trending: trending.media.slice(1), 
          popularSeason: popularSeason.media,
          top100: top100.media
        });
      }
      setLoadingHome(false);
    })
    .catch(err => { console.error(err); setLoadingHome(false); });
  }, []);

  // === EFFECT 2: Reset Halaman saat Filter Berubah ===
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setSearchPage(1);
  }, [filters]); 

  // === EFFECT 3: Fetch Search Data ===
  useEffect(() => {
    if (!isFilterActive) return; 

    const fetchData = () => {
      setLoadingSearch(true);
      
      const variables = {
        page: searchPage,
        search: filters.keyword || undefined,
        genre: filters.genre || undefined,
        seasonYear: filters.year ? parseInt(filters.year) : undefined,
        season: filters.season ? filters.season.toUpperCase() : undefined,
        format: filters.format ? filters.format.toUpperCase() : undefined,
      };

      fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: SEARCH_QUERY, variables })
      })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setSearchResult(data.data.Page.media);
          setSearchHasNextPage(data.data.Page.pageInfo.hasNextPage);
          setSearchLastPage(data.data.Page.pageInfo.lastPage || 1); 
        } else {
           setSearchResult([]);
        }
        setLoadingSearch(false);
      })
      .catch(err => { 
        console.error(err); 
        setSearchResult([]);
        setLoadingSearch(false); 
      });
    };

    const delay = filters.keyword ? 500 : 0; 
    const timer = setTimeout(() => { fetchData(); }, delay);
    return () => clearTimeout(timer);

  }, [filters, searchPage, isFilterActive]);


  if (loadingHome) return (
    <div className="min-h-screen bg-[#0b1622] text-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
    </div>
  );

  return (
    <>
      <Hero anime={heroAnime} />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-48 pb-12 min-h-screen">
        
        <Filters filters={filters} setFilters={setFilters} />
        
        {isFilterActive ? (
          <div className="animate-fade-in">
             <div className="flex items-end gap-3 mb-8">
                <h2 className="text-2xl font-bold text-white">Search Results</h2>
                <span className="text-gray-400 text-sm mb-1">
                  Page {searchPage} of {searchLastPage}
                </span>
             </div>

             {loadingSearch ? (
                <div className="flex justify-center py-20 min-h-[400px]">
                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                </div>
             ) : searchResult.length > 0 ? (
                <>
                  <AnimeGrid title="" animeList={searchResult} />
                  <Pagination 
                     page={searchPage} 
                     setPage={setSearchPage} 
                     hasNextPage={searchHasNextPage}
                     lastPage={searchLastPage} 
                  />
                </>
             ) : (
                <div className="text-center py-20 text-gray-400 border border-white/5 rounded-xl bg-[#152232]">
                   <p className="text-xl font-bold text-white mb-2">No Results Found</p>
                   <p>Try adjusting your filters to find what you're looking for.</p>
                </div>
             )}
          </div>

        ) : (
          <div className="animate-fade-in">
            <AnimeGrid 
              title="Trending Now" 
              animeList={homeData.trending} 
              link="/trending" 
            />
            <AnimeGrid 
              title="Popular This Season" 
              animeList={homeData.popularSeason} 
              link="/season" 
            />
            <TopAnimeList 
              animeList={homeData.top100} 
              link="/top-100" 
            />
          </div>
        )}

      </div>
    </>
  );
};

export default Home;