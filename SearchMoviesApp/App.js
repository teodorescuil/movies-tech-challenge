import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Movies from './src/screens/movies/movies'

export default function App() {
	return (
		<View style={styles.container}>
			<Movies />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
});
