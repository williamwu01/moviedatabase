import { addToFavorites,removeFromFavorites, getFavorites } from '../src/utilities/favorites';
import { useEffect, useState } from 'react';
import '/styles/movie.css';
import { IoMdAddCircle } from 'react-icons/io';
import { IoMdRemoveCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';
import noImage from '../src/assets/no-image.png';


const Movie = () => {
	const [movieList, setMovieList] = useState([]);
	const [selectedOption, setSelectedOption] = useState('popular');
	const [favorites, setFavorites] = useState([]);
	const API_KEY = import.meta.env.VITE_API_KEY

	const apiEndpoints = {
			popular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
			topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
			nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`,
			upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
	};

	const getMovie = () => {
			fetch(apiEndpoints[selectedOption])
					.then((res) => res.json())
					.then((json) => setMovieList(json.results));
	};

	useEffect(() => {
			getMovie();
			const storedFavorites = getFavorites(); // Load favorites from local storage
			setFavorites(storedFavorites);
	}, [selectedOption]);

	const handleOptionChange = (event) => {
			setSelectedOption(event.target.value);
	};

	const toggleFavorite = (movie) => {
			if (isFavorite(movie, favorites)) {
					removeFromFavorites(movie);
					setFavorites(favorites.filter((fav) => fav.id !== movie.id));
			} else {
					addToFavorites(movie);
					setFavorites([...favorites, movie]);
			}
	};

	const isFavorite = (movie, favoritesList) => {
			return favoritesList.some((fav) => fav.id === movie.id);
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
									const isFav = isFavorite(movie, favorites);
									return (
											<div className='movie-card' key={movie.id}>
													<img
															className='movies'
															key={movie.id}
															src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noImage}
															alt={movie.title}
													/>
													<div className='movie-info'>
															<h3>{movie.title}</h3>
															<p><strong>Rating:</strong> {movie.vote_average}</p>
															<p>{movie.overview.substring(0, 69) + '...'}</p>
															<button className="add" onClick={() => toggleFavorite(movie)}>
																	{isFav ? <IoMdRemoveCircle /> : <IoMdAddCircle />}
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