import React, {useRef} from 'react';
import {FlatList, SafeAreaView, TextInput, ActivityIndicator, Text, View} from 'react-native';

import useSearchMovies from '../../hooks/use-search-movies';
import Movie from '../../components/movie/movie';
import {SEARCH_MOVIE_INPUT_PLACEHOLDER} from '../../constants/placeholders';
import {useUnsubscribe} from '../../hooks/use-unsubscribe';

import NoMoviesPlaceholder from '../../components/placeholders/no-movies-placeholder/no-movies-placeholder';
import ErrorPlaceholder from '../../components/placeholders/error-placeholder/error-placeholder';

import styles from './movies-styles';

function Movies() {
    const moviesListRef = useRef(null);
    const {query, setQuery, data, isLoading, error, loadMore, hasMore, page} = useSearchMovies();
    const {isOffline} = useUnsubscribe();

    const renderLoadMoreButton = () => {
        if (hasMore && page > 1 && isLoading) {
            return <ActivityIndicator />;
        }
        if (hasMore && !isLoading) {
            return <View style={styles.placeholderContainer}><Text style={styles.loadMoreText}>Loading more...</Text></View>;
        }
    }

    if (error && !isOffline) {
        return <ErrorPlaceholder errorMessage={error} />;
    }

    return (
        <SafeAreaView styles={styles.container}>
            {isOffline && <View style={styles.placeholderContainer}><Text style={styles.offlineText}>Offline mode: Showing cached results</Text></View>}
            <TextInput
                style={styles.input}
                placeholder={SEARCH_MOVIE_INPUT_PLACEHOLDER}
                value={query}
                onChangeText={setQuery}
            />
            {isLoading && page === 1 ? <ActivityIndicator /> : (
                <FlatList
                    ref={moviesListRef}
                    contentContainerStyle={{ paddingBottom: 150 }}
                    ListEmptyComponent={<NoMoviesPlaceholder />}
                    ListFooterComponent={renderLoadMoreButton}
                    ListFooterComponentStyle={styles.loadMoreButton}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Movie
                            title={item.title}
                            year={item.release_date.split('-')[0]}
                            imagePath={item.poster_path}
                        />
                    )}
                    onEndReached={hasMore ? loadMore : null}
                    onEndReachedThreshold={0.5}
                />
            )}
        </SafeAreaView>
    )
}

export default Movies;
