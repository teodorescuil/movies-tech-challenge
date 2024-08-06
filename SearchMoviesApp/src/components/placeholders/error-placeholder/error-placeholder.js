import React from 'react';
import {View, Text} from 'react-native';
import styles from './error-placeholder-styles';

function ErrorPlaceholder() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Oops!</Text>
            <Text style={styles.subtitle}>There is an error! Please try again later!</Text>
        </View>
    )
}

export default ErrorPlaceholder;
