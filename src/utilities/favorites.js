export const getFavorites = () => {
    return localStorage.getItem('favorites') ? JSON.parse( localStorage.getItem('favorites') ) : [];
}

export const addToFavorites = ( movie ) => {
    const favorites = getFavorites();
    favorites.find( f => f.id === movie.id ) 
        ? null 
        : favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify( favorites ) );
    console.log( JSON.parse( localStorage.getItem('favorites') ) );
}

// export const removeFromFavorites = ( movie ) => {
//     const favorites = getFavorites();
//     const index = favorites.findIndex( f => f.id === movie.id );
//     index !== -1 ? favorites.splice( index, 1 ) : null;
//     localStorage.setItem('favorites', JSON.stringify( favorites ) );
//     console.log( JSON.parse( localStorage.getItem('favorites') ) );
// }
export const removeFromFavorites = (movie) => {
	const favorites = getFavorites();
	const updatedFavorites = favorites.filter(favMovie => favMovie.id !== movie.id);
	localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
	console.log('Favorites after removal:', updatedFavorites); // Log updated favorites
	return updatedFavorites; // Return the updated list of favorites
};

export const clearFavorites = () => {
    localStorage.removeItem('favorites' );
}