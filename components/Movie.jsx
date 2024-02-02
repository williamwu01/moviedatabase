import { useEffect, useState } from 'react';
import '/styles/movie.css';
import { IoMdAddCircle } from 'react-icons/io';

const Movie = () => {
  const [movieList, setMovieList] = useState([]);

  const getMovie = () => {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=633f745f9c96b2a95d32f0c161fe6645')
      .then((res) => res.json())
      .then((json) => setMovieList(json.results));
  };

  useEffect(() => {
    getMovie();
  }, []);

  const AddIcon = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <IoMdAddCircle
        style={{
          fontSize: '3em',
          color: isHovered ? '#00FF00' : '#6a59ff',
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          transition: 'color 300ms ease-in-out',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
  };

  return (
    <div className="movie-container">
      {movieList.map((movie) => {
        return (
          <div className="movie-card" key={movie.id}>
            <img className="movies" key={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.overview.substring(0, 69) + '...'}</p>
              <button>
                <a href="">more info</a>
              </button>
              <AddIcon />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Movie;