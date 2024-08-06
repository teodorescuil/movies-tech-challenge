import AsyncStorage from '@react-native-async-storage/async-storage';

const setCacheData = async (query, page, data) => {
	try {
		await AsyncStorage.setItem(`MovieSearch_${query}_${page}`, JSON.stringify(data));
	} catch (error) {
		console.error('Failed to cache results:', error);
	}
};

const getCachedData = async (query, page) => {
	try {
		const cachedData = await AsyncStorage.getItem(`MovieSearch_${query}_${page}`);
		return cachedData != null ? JSON.parse(cachedData) : null;
	} catch (error) {
		console.error('Failed to get cached results:', error);
		return null;
	}
};

export {setCacheData, getCachedData};
