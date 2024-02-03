import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Individual = ({ match }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const movieId = match.params.id;

  useEffect(() => {
    // Fetch individual movie details using the movieId
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=633f745f9c96b2a95d32f0c161fe6645`)
      .then((res) => res.json())
      .then((json) => setMovieDetails(json))
      .catch((error) => console.error('Error fetching movie details:', error));
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movieDetails.title}</h2>
      <p>Overview: {movieDetails.overview}</p>
      <p>Release Date: {movieDetails.release_date}</p>
      <p>Popularity: {movieDetails.popularity}</p>
      {/* Add more content based on the individual movie details */}
      <Link to="/">Go back to movies</Link>
    </div>
  );
};

export default Individual;