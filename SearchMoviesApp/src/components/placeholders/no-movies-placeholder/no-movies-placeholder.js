import React from 'react';
import {View, Text} from 'react-native';
import styles from './no-movies-placeholder-styles';

function NoMoviesPlaceholder() {
    return (
        <View style={styles.container}>
            <Text style={styles.placeholder}>There are no movies based on your search &#128519;</Text>
        </View>
    )
}

export default NoMoviesPlaceholder;
