import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import React, { useState, useEffect } from 'react';

const Swipe = () => {
	const [swipeList, setSwipeList] = useState([]);
	const [swiperInstance, setSwiperInstance] = useState(null);

	const topRated = () => {
		fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=633f745f9c96b2a95d32f0c161fe6645')
			.then((res) => res.json())
			.then((json) => setSwipeList(json.results))
			.catch((error) => console.error('Error fetching data:', error));
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

	return (
		<div className='background'>
			<h1 className='heading'>Top Rated</h1>
			<Swiper
				effect={'coverflow'}
				grabCursor={true}
				centeredSlides={true}
				loop={true}
				spaceBetween={50}
				slidesPerView={3}
				navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
				pagination={{ clickable: true }}
				onSwiper={(swiper) => setSwiperInstance(swiper)}
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
		</div>
	);
};

export default Swipe;
