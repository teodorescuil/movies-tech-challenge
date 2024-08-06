import React from 'react';
import {View, Text} from 'react-native';
import styles from './error-placeholder-styles';
import PropTypes from 'prop-types';

function ErrorPlaceholder({errorMessage}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Oops!</Text>
            <Text style={styles.subtitle}>{errorMessage}</Text>
        </View>
    )
}

ErrorPlaceholder.propTypes = {
    errorMessage: PropTypes.string
}

export default ErrorPlaceholder;
