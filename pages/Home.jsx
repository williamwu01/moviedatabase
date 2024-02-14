import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import Movie from '../components/Movie';
import Swipe from '../components/Swipe';
import '/styles/home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [search, setSearch] = useState(null);
	const navigate = useNavigate();
  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=633f745f9c96b2a95d32f0c161fe6645&query=${inputValue}`);
      const responseData = await response.json();

      if (responseData.total_results > 0) {
        const options = responseData.results.map((movie) => ({
          value: movie.id,
          label: movie.title,
        }));
        return { options };
      } else {
        return { options: [] };
      }
    } catch (error) {
      console.error(error);
      return { options: [] };
    }
  };

  const handleOnChange = (selectedOption) => {
		console.log(selectedOption);
		navigate(`/individuals/${selectedOption.value}`);
    setSearch(selectedOption);
  };

  const getOptionLabel = (option) => {
		// option.label;
		return option.label;
		
	}

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '50%',
      margin: '0 auto',
    }),
    container: (provided) => ({
      ...provided,
      backgroundColor: '#1a1a1a',
			zIndex:100,
    }),
		div: (provided) => ({
			...provided,
      zIndex:100,
		}),
		option: (provided) => ({
			...provided,
			color: 'black',
		}),
  };

  return (
    <>
      <AsyncPaginate
        className="search"
        placeholder="Search"
        debounce={1000}
        value={search}
        loadOptions={loadOptions}
        onChange={handleOnChange}
        getOptionLabel={getOptionLabel}
        isSearchable
        styles={customStyles}
      />
      <Swipe />
      <Movie />
    </>
  );
};

export default Home;

