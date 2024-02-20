import React, { useState, useEffect } from 'react';
import { appTitles } from '../globals/globals';
import { removeFromFavorites, getFavorites } from '../src/utilities/favorites';
// import { IoMdAddCircle } from 'react-icons/io';
import { IoMdRemoveCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';
import noImage from '../src/assets/no-image.png';

const Favourite = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
		useEffect(() => {
			document.title = `Favourites`;
	}, []);

    useEffect(() => {
        const favorites = getFavorites();
        setFavoriteMovies(favorites);
    }, []);

    const handleRemoveFromFavorites = (movie) => {
        const updatedFavorites = removeFromFavorites(movie);
        setFavoriteMovies(updatedFavorites); // Update the state with the new list of favorite movies
    };

    return (
        <main>
            <div>
                <h1 className='heading'>Favourites</h1>
            </div>
						<div className='movie-container'>
                {favoriteMovies.length === 0 ? ( // Check if the favoriteMovies array is empty
                    <p className='error'>Sorry you have no favourited movies. Return to the <Link to="/">home page</Link> to add a favourite movie.</p>
                ) : (
                    favoriteMovies.map((movie) => {
                        return (
                            <div className='movie-card' key={movie.id}>
                                <img className='movies' key={movie.id} 
																src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noImage} 
																alt={movie.title} />
                                <div className='movie-info'>
                                    <h3>{movie.title}</h3>
                                    <p></p>
                                    <p>{movie.overview.substring(0, 69) + '...'}</p>
                                    <button
                                        className='add'
                                        onClick={() => {
                                            handleRemoveFromFavorites(movie);
                                        }}
                                    >
                                        <IoMdRemoveCircle />
                                    </button>
                                    <Link className='button' to={`/individuals/${movie.id}`}>
                                        more info
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </main>
    );
};

export default Favourite;