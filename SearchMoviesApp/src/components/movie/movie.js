import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import {IMAGE_PLACEHOLDER} from '../../constants/placeholders'
import {URL_MOVIE_IMAGE} from '../../constants/urls';
import styles from './movie-styles';

const Movie = ({title, year, imagePath}) => (
  	<View style={styles.container}>
    	<Image source={{ uri: imagePath ? `${URL_MOVIE_IMAGE}${imagePath}` : IMAGE_PLACEHOLDER}} style={styles.image} />
    	<View style={styles.info}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.year}>{year}</Text>
    	</View>
  	</View>
);

export default memo(Movie);
