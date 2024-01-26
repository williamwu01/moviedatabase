import { MOVIE_API, movieOptions } from "../api";
import { useState, useEffect } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import Movie from '../components/Movie';

const Home = () => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(`${MOVIE_API}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, movieOptions);
      const responseData = await response.json();

      // Check if 'data' is an array before using map
      const options = Array.isArray(responseData.data)
        ? responseData.results.map((movie) => ({
            value: movie.id,
            label: movie.title,
          }))
        : [];

      return { options };
    } catch (error) {
      console.error(error);
      return { options: [] }; 
    }
  };

	const handleOnChange = (selectedOption) => {
		setSearch(selectedOption)
	}

	const getOptionLabel = (option) => option.label;

	// useEffect(() => {
	// 	let mediaQuery = window.matchMedia('(min-width: 525px)');
	// 	mediaQuery.addEventListener('change', isDesktop);

	// 	return () => {
  //     mediaQuery.removeEventListener('change', isDesktop);
  //   }
	// }, [])
	
  return (
		<>
    <AsyncPaginate
      placeholder="Search for trending movies"
      debounce={1000}
      value={search}
      loadOptions={loadOptions}
			onChange={handleOnChange}
    />
		<Movie/>
		</>
  );
};

export default Home;

// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzNmNzQ1ZjljOTZiMmE5NWQzMmYwYzE2MWZlNjY0NSIsInN1YiI6IjY1YWYwNGNkODQ4ZWI5MDEwYTk5ZmU1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TKrkvAtivm1zoYQaVeIQiHpaQUk2VrcK1WTT6bjBZPk
