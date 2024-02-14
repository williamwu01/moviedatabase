import { addToFavorites } from '../src/utilities/favorites';
import { useEffect, useState } from 'react';
import '/styles/movie.css';
import { IoMdAddCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';
import noImage from '../src/assets/no-image.png';

const Movie = () => {
    const [movieList, setMovieList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('popular'); // Default selected option

    const apiEndpoints = {
        popular: 'https://api.themoviedb.org/3/movie/popular?api_key=633f745f9c96b2a95d32f0c161fe6645',
        topRated: 'https://api.themoviedb.org/3/movie/top_rated?api_key=633f745f9c96b2a95d32f0c161fe6645',
        nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing?api_key=633f745f9c96b2a95d32f0c161fe6645',
        upcoming: 'https://api.themoviedb.org/3/movie/upcoming?api_key=633f745f9c96b2a95d32f0c161fe6645'
    };

    const getMovie = () => {
        fetch(apiEndpoints[selectedOption])
            .then((res) => res.json())
            .then((json) => setMovieList(json.results));
    };

    useEffect(() => {
        getMovie();
    }, [selectedOption]); // Fetch data when the selected option changes

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            <div>
                <select className='heading' value={selectedOption} onChange={handleOptionChange}>
                    <option value='popular'>Popular</option>
                    <option value='topRated'>Top Rated</option>
                    <option value='nowPlaying'>Now Playing</option>
                    <option value='upcoming'>Upcoming</option>
                </select>
            </div>
            <div className='movie-container'>
                {movieList.map((movie) => {
                    return (
                        <div className='movie-card' key={movie.id}>
                            <img
                                className='movies'
                                key={movie.id}
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : noImage // Replace 'default image 
                                }
                                alt={movie.title}
                            />
                            <div className='movie-info'>
                                <h3>{movie.title}</h3>
                                <p><strong>Rating:</strong> {movie.vote_average}</p>
                                <p>{movie.overview.substring(0, 69) + '...'}</p>
                                <button className="add" onClick={() => { addToFavorites(movie) }}>
                                    <IoMdAddCircle />
                                </button>
                                <Link className="button" to={`./individuals/${movie.id}`}>more info</Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Movie;