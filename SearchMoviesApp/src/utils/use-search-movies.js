import React, {useEffect, useState, useCallback} from 'react';
import {BASE_URL} from '../constants/urls';
import {DELAY_TIME} from '../constants/general';

const useSearchMovies = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const fetchMovies = async (query, page) => {
        try {
            setIsLoading(true);
            const searchUrl = `${BASE_URL}/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}&page=${page}`;
            const response = await fetch(searchUrl);
            const data = await response.json();

            setData(prevData => {
                if (page === 1) {
                    return data.results;
                } else {
                    const uniqueResults = data.results.filter(newMovie => 
                        !prevData.some(existingMovie => existingMovie.id === newMovie.id)
                    );
                    return [...prevData, ...uniqueResults];
                }
            });

            setHasMore(data.page < data.total_pages);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = setTimeout(() => {
            if (query === '') {
                setData([]);
            } else {
                setPage(1);
                fetchMovies(query, page);
            }
        }, DELAY_TIME);

        return () => clearTimeout(fetchData);
    }, [query]);

    const loadMore = () => {
        if (hasMore && !isLoading) {
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
