import axios from 'axios';

const API_KEY = '33124313-fcb6e610751c26554528545c8';
const OPTIONS = 'image_type=photo&orientation=horizontal';
export const PER_PAGE = 12;
axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchImages = async (query, page) => {
  const response = await axios(
    `/?q=${query}&page=${page}&key=${API_KEY}&${OPTIONS}&per_page=${PER_PAGE}`
  );

  return response.data;
};
