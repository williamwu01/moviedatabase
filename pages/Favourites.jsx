import React, { useState, useEffect } from 'react';
import { appTitles } from '../globals/globals';
import { removeFromFavorites, getFavorites } from '../src/utilities/favorites';
import { IoMdAddCircle } from 'react-icons/io';
import { IoMdRemoveCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Favourite = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const favorites = getFavorites();
        setFavoriteMovies(favorites);
    }, []);

    const handleRemoveFromFavorites = (movie) => {
        const updatedFavorites = removeFromFavorites(movie);
        setFavoriteMovies(updatedFavorites); // Update the state with the new list of favorite movies
    };

    return (
        <>
            <div>
                <h1 className='heading'>Popular</h1>
            </div>
            <div className='movie-container'>
                {favoriteMovies.map((movie) => {
                    return (
                        <div className='movie-card' key={movie.id}>
                            <img className='movies' key={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
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
                                <Link className='button' to={`./individuals/${movie.id}`}>
                                    more info
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Favourite;