import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import '../styles/favourites.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import React, { useState, useEffect } from 'react';

const Swipe = () => {
	const [swipeList, setSwipeList] = useState([]);
	const [swiperInstance, setSwiperInstance] = useState(null);
	const [currentOverview, setCurrentOverview] = useState('');

	const topRated = async () => {
		try {
			const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=633f745f9c96b2a95d32f0c161fe6645')
			const responseJson = await response.json();
			setSwipeList(responseJson.results)
			setCurrentOverview(responseJson.results[0]?.overview || '');
		} catch (err) {
			console.error('Error fetching data:', err)
		}
	};

	useEffect(() => {
		topRated();
	}, []);

	const slideNextButton = () => {
		if (swiperInstance) {
			swiperInstance.slideNext();
		}
	};

	const slidePreviousButton = () => {
		if (swiperInstance) {
			swiperInstance.slidePrev();
		}
	};

	const handleSlideChange = () => {
		if (swiperInstance) {
			const activeIndex = swiperInstance.activeIndex;
			const activeMovie = swipeList[activeIndex];
			setCurrentOverview(activeMovie?.overview || '');
		}
	};

	return (
		<div className='background'>
			<h1 className='heading'>Discovery</h1>
			<Swiper
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
				onSwiper={(swiper) => setSwiperInstance(swiper)}
				onSlideChange={handleSlideChange}
			>
				{swipeList.map((movie) => (
					<SwiperSlide key={movie.id}>
						<img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
					</SwiperSlide>
				))}
				<div className="buttonwrap">
					<button className='buttons' onClick={slidePreviousButton}>
						<SlArrowLeft />
					</button>
					<button className='buttons' onClick={slideNextButton}>
						<SlArrowRight /> 
					</button> 
				</div>
			</Swiper>
			<div className='textbox'>
				<p>{currentOverview.substring(0, 350) + '...'}</p>
			</div>
		</div>
	);
};

export default Swipe;