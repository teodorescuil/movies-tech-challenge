import React, {useEffect, useState} from 'react';
import {BASE_URL} from '../constants/urls';
import {DELAY_TIME} from '../constants/general';
import {useUnsubscribe} from '../hooks/use-unsubscribe';
import {setCacheData, getCachedData} from '../async-storage/async-storage';

const useSearchMovies = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const {isOffline} = useUnsubscribe();

    const fetchMovies = async (query, page) => {
        try {
            setIsLoading(true);

            if (isOffline) {
                const cachedData = await getCachedData(query, page);
                if (cachedData) {
                    setData(cachedData);
                    setHasMore(false);
                }
                return;
            }

            const searchUrl = `${BASE_URL}/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}&page=${page}`;
            const response = await fetch(searchUrl);
            const data = await response.json();

            setData(prevData => {
                let newData;
                if (page === 1) {
                    newData = data.results;
                } else {
                    const uniqueResults = data.results.filter(newMovie => 
                        !prevData.some(existingMovie => existingMovie.id === newMovie.id)
                    );
                    newData = [...prevData, ...uniqueResults];
                }
                setCacheData(query, page, newData);
                return newData;
            });

            setHasMore(data.page < data.total_pages);
            setError(null);
        } catch (error) {
            setError('There is an error at getting results');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = setTimeout(async () => {
            if (query === '') {
                setData([]);
            } else {
                setPage(1);
                const cachedData = await getCachedData(query, page);
                if (cachedData && isOffline) {
                    setData(cachedData);
                    setHasMore(false);
                } else {
                    fetchMovies(query, page);
                }
            }
        }, DELAY_TIME);

        return () => clearTimeout(fetchData);
    }, [query, isOffline]);

    const loadMore = () => {
        if (hasMore && !isLoading && !isOffline) {
            setPage(prevPage => {
                const nextPage = prevPage + 1;
                fetchMovies(query, nextPage);
                return nextPage;
            });
        }
      };

    return {query, setQuery, data, error, isLoading, loadMore, hasMore, page};
}

export default useSearchMovies;
