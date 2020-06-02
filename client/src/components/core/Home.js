import React, { useState, useEffect } from 'react';
import { getMovies } from './coreapicalls';
const ShowMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const loadAllMovies = () => {
    getMovies().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setMovies(data);
      }
    });
  };
  useEffect(() => {
    loadAllMovies();
  }, []);
  return (
    <section className='container'>
      <div className='card-group'>
        <div className='row'>
          {movies.map((movie, index) => {
            return (
              <div key={index} className='col-4 mb-4'>
                <img
                  className='card-img-top'
                  src={movie.imageurl}
                  alt='image not found'
                />

                <div className='card-body'>
                  <h3 className='card-title'>{movie.name}</h3>
                  <p className='card-text'>{movie.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShowMovies;
