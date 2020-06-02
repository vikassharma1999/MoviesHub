import API from '../../backend';
import axios from 'axios';
export const getMovies = () => {
  return fetch(`${API}/movies`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const AddMovies = async (movieData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(movieData);

  try {
    const res = await axios.post(`${API}/movies`, body, config);
    return res.json();
  } catch (err) {
    return err;
  }
};
