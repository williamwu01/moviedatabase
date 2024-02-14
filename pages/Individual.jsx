import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/individuals.css';
// import { params } from 'react-router-dom';

const Individual = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const movieId = useParams().id;

  useEffect(() => {
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
			<div className='img-container' style={{width: "100%", height: '100%', position: 'relative'}}>
				<img className='backdropimg' style={{width: "100%", height: '100%'}} src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`} alt={movieDetails.title} />
				<div className='backdrop' style={{position: 'absolute', top: "0", right:"0",}}>
				</div>
			</div>
      <h2>{movieDetails.title}</h2>
      <p>Overview: {movieDetails.overview}</p>
      <p>Release Date: {movieDetails.release_date}</p>
      <p>Popularity: {movieDetails.popularity}</p>
      <img key={movieId} src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
      {/* Add more content based on the individual movie details */}
      <Link to="/">Go back to movies</Link>
    </div>
  );
};

export default Individual;