import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import '../styles/favourites.css';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import React, { useState, useEffect, useRef } from 'react';

const Swipe = () => {
	const [swipeList, setSwipeList] = useState([]);
	const [currentOverview, setCurrentOverview] = useState('');
	const [activeMovieId, setActiveMovieId] = useState(null);
	const swiperRef = useRef(null);
	const API_KEY = import.meta.env.VITE_API_KEY

	const topRated = async () => {
		try {
			const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`);
			const responseJson = await response.json();
			setSwipeList(responseJson.results);
			setCurrentOverview(responseJson.results[0]?.overview || '');
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	};

	useEffect(() => {
		topRated();
	}, []);

	const handleSlideChange = () => {
		if (swiperRef.current) {
			const activeIndex = swiperRef.current.swiper.realIndex;
			const activeMovie = swipeList[activeIndex];
			setActiveMovieId(activeMovie?.id || null);
			setCurrentOverview(activeMovie?.overview || '');
		}
	};

	const slideNextButton = () => {
		if (swiperRef.current) {
			swiperRef.current.swiper.slideNext();
		}
	};

	const slidePreviousButton = () => {
		if (swiperRef.current) {
			swiperRef.current.swiper.slidePrev();
		}
	};

	return (
		<div className='background'>
			<h1 className='heading'>Discovery</h1>
			<div className='discover-container'>
				<Swiper
					ref={swiperRef}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					effect={'coverflow'}
					grabCursor={true}
					centeredSlides={true}
					loop={true}
					spaceBetween={48}
					slidesPerView={1}
					navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
					pagination={{ clickable: true }}
					modules={[Autoplay]}
					onSlideChange={handleSlideChange}
				>
					{swipeList.map((movie) => (
						<SwiperSlide key={movie.id}>
							<img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
						</SwiperSlide>
					))}
					<div className='textbox'>
						<p>{currentOverview.substring(0, 100) + '...'}</p>
						{activeMovieId && (
							<Link className='discover-more-info' to={`./individuals/${activeMovieId}`}>
								More info
							</Link>
						)}
					</div>
					<div className='buttonwrap'>
						<button className='buttons' style={{ backgroundColor: '#f9f9f961' }} onClick={slidePreviousButton}>
							<SlArrowLeft />
						</button>
						<button className='buttons' style={{ backgroundColor: '#f9f9f961' }} onClick={slideNextButton}>
							<SlArrowRight />
						</button>
					</div>
				</Swiper>
			</div>
		</div>
	);
};

export default Swipe;
