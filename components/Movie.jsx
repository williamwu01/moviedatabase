import {useEffect, useState} from 'react'
import '/styles/movie.css'

const Movie = () => {

	const [movieList,setMovieList] = useState([])

	const getMovie = () => {
		fetch("https://api.themoviedb.org/3/discover/movie?api_key=633f745f9c96b2a95d32f0c161fe6645")
		  .then(res => res.json())
			.then(json => setMovieList(json.results))
	}

	useEffect(() =>{
		getMovie()
	},[]);

	console.log(movieList)

	return (
		<div class="movie-container">
			{movieList.map((movie) =>{
				return (
				<img class="movies" key={movie.id} 
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
				alt={movie.title}/>
			)})}
		</div>
	)
}

export default Movie