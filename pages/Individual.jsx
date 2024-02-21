import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/individuals.css';
import noImage from '../src/assets/no-image.png';
import { MdSmartDisplay } from 'react-icons/md';
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io';
import { addToFavorites, removeFromFavorites, getFavorites } from '../src/utilities/favorites';

const Individual = () => {
	const [movieDetails, setMovieDetails] = useState(null);
	const [credits, setCredits] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [trailerKey, setTrailerKey] = useState(null);
	const movieId = useParams().id;
	const mediaType = 'movie';
	const API_KEY = import.meta.env.VITE_API_KEY;

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${API_KEY}`)
			.then((res) => res.json())
			.then((json) => {
				setMovieDetails(json);
				fetchCredits(mediaType, movieId);
				fetchTrailerKey(mediaType, movieId);
			})
			.catch((error) => console.error('Error fetching movie details:', error));

		const storedFavorites = getFavorites();
		setFavorites(storedFavorites);
	}, [movieId, mediaType]);

	const fetchCredits = (mediaType, id) => {
		fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${API_KEY}`)
			.then((res) => res.json())
			.then((json) => setCredits(json.cast))
			.catch((error) => console.error('Error fetching credits:', error));
	};

	const fetchTrailerKey = (mediaType, id) => {
		fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${API_KEY}`)
			.then((res) => res.json())
			.then((json) => {
				const trailer = json.results.find((video) => video.type === 'Trailer');
				if (trailer) {
					setTrailerKey(trailer.key);
				}
			})
			.catch((error) => console.error('Error fetching trailer key:', error));
	};

	const playTrailer = () => {
		if (trailerKey) {
			window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
		} else {
			console.log('No trailer available');
		}
	};

	const toggleFavorite = () => {
		if (isFavorite(movieDetails, favorites)) {
			removeFromFavorites(movieDetails);
			setFavorites(favorites.filter((fav) => fav.id !== movieDetails.id));
		} else {
			addToFavorites(movieDetails);
			setFavorites([...favorites, movieDetails]);
		}
	};

	const isFavorite = (movie, favoritesList) => {
		return favoritesList.some((fav) => fav.id === movie.id);
	};

	return (
		<>
			{movieDetails && (
				<div className='img-container'>
					<img
						className='backdrop-img'
						src={movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}` : noImage}
						alt={movieDetails.title}
					/>
					<img
						className='individual-img'
						key={movieId}
						src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : noImage}
						alt={movieDetails.title}
					/>
					<div className='backdrop'></div>
					<div className='buttons-mobile'>
						<button className='trailer-button' onClick={playTrailer}>
							<MdSmartDisplay className='trailer-icon' />
						</button>
						<button className='add' onClick={toggleFavorite}>
							{isFavorite(movieDetails, favorites) ? <IoMdRemoveCircle /> : <IoMdAddCircle />}
						</button>
					</div>
					{movieDetails && (
						<div className='detail-desktop'>
							<div className='buttons-desktop'>
								<button className='trailer-button' onClick={playTrailer}>
									<MdSmartDisplay className='trailer-icon' />
								</button>
								<button className='add' onClick={toggleFavorite}>
									{isFavorite(movieDetails, favorites) ? <IoMdRemoveCircle /> : <IoMdAddCircle />}
								</button>
							</div>
							<h2 className='individual-heading'>{movieDetails.title}</h2>
							<p>
								<strong>Overview:</strong> {movieDetails.overview}
							</p>
							<p>
								<strong>Release Date:</strong> {movieDetails.release_date}
							</p>
							<p>
								<strong>Rating:</strong> {movieDetails.vote_average}
							</p>
							<Link to='/'>Go back to movies</Link>
						</div>
					)}
				</div>
			)}
			{movieDetails && (
				<div className='detail-mobile'>
					<h2 className='individual-heading'>{movieDetails.title}</h2>
					<p>
						<strong>Overview:</strong> {movieDetails.overview}
					</p>
					<p>
						<strong>Release Date:</strong> {movieDetails.release_date}
					</p>
					<p>
						<strong>Rating:</strong> {movieDetails.vote_average}
					</p>
					<Link to='/'>Go back to movies</Link>
				</div>
			)}
			<h2 className='heading'>Casting</h2>
			<div className='cast-section'>
				<div className='table-container'>
					<table className='cast-table'>
						<tbody>
							<tr>
								{credits.map((castMember) => (
									<td key={castMember.id} className='cast-item'>
										<img
											src={castMember.profile_path ? `https://image.tmdb.org/t/p/w200${castMember.profile_path}` : noImage}
											alt={castMember.name}
											className='cast-image'
										/>
										<span className='cast-name'>{castMember.name}</span>
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default Individual;
