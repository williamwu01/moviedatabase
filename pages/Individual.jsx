import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/individuals.css';
import noImage from '../src/assets/no-image.png';
import { MdSmartDisplay } from 'react-icons/md';
import { IoMdAddCircle } from 'react-icons/io';
import { addToFavorites } from '../src/utilities/favorites';

const Individual = () => {
	const [movieDetails, setMovieDetails] = useState(null);
	const [credits, setCredits] = useState([]);
	const [trailerKey, setTrailerKey] = useState(null); // State to store trailer key
	const movieId = useParams().id;
	const mediaType = 'movie';

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=633f745f9c96b2a95d32f0c161fe6645`)
			.then((res) => res.json())
			.then((json) => {
				setMovieDetails(json);
				fetchCredits(mediaType, movieId); // Fetch credits after getting movie details
				fetchTrailerKey(mediaType, movieId); // Fetch trailer key after getting movie details
			})
			.catch((error) => console.error('Error fetching movie details:', error));
	}, [movieId, mediaType]);

	const fetchCredits = (mediaType, id) => {
		fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=633f745f9c96b2a95d32f0c161fe6645`)
			.then((res) => res.json())
			.then((json) => setCredits(json.cast))
			.catch((error) => console.error('Error fetching credits:', error));
	};

	const fetchTrailerKey = (mediaType, id) => {
		fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=633f745f9c96b2a95d32f0c161fe6645`)
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
					<button className='trailer-button' onClick={playTrailer}>
						<MdSmartDisplay className='trailer-icon' />
					</button>
					<button
						className='add'
						onClick={() => {
							addToFavorites(movieDetails);
						}}
					>
						<IoMdAddCircle />
					</button>
				</div>
			)}
			{movieDetails && (
				<div className='detail'>
					<h2 className='individual-heading'>{movieDetails.title}</h2>
					<p>Overview: {movieDetails.overview}</p>
					<p>Release Date: {movieDetails.release_date}</p>
					<p>Popularity: {movieDetails.popularity}</p>
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
