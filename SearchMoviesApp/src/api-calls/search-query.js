import axios from 'axios';
import {TMDB_API_KEY} from '@env';
import {BASE_URL} from '../constants/urls';


const searchMovies = async (query, page) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
		params: {
			query,
			api_key: TMDB_API_KEY,
			page,
		}
	});
  return response.data;
};

export {searchMovies};
