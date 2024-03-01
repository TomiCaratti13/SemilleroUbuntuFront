import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/sliderCard.css';
import CardMedia from '@mui/material/CardMedia';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Block } from '@mui/icons-material';

export const SliderCard = ({ imgs }) => {
	const listRef = useRef();
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const listNode = listRef.current;
		const imgNode = listNode.querySelectorAll('li > img')[currentIndex];

		if (imgNode) {
			imgNode.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center',
			});
		}
	}, [currentIndex]);

	const scrollToImage = (direction) => {
		if (direction === 'prev') {
			setCurrentIndex((curr) => {
				const isFirstSlide = curr === 0;
				return isFirstSlide ? imgs.length - 1 : curr - 1;
			});
		} else {
			setCurrentIndex((curr) => {
				const isLastSlide = curr === imgs.length - 1;
				return isLastSlide ? 0 : curr + 1;
			});
		}
	};

	const goToSlide = (slideIndex) => {
		setCurrentIndex(slideIndex);
	};
	return (
		<CardMedia
			className="slider-container"
			sx={{
				margin: 'auto',
				objectFit: 'cover',
				borderRadius: 4,
				height: 128,
				width: 304,
			}}>
			<ArrowBackIosNewOutlinedIcon
				className="leftArrow"
				onClick={() => scrollToImage('prev')}
			/>
			<ArrowForwardIosIcon
				className="rightArrow"
				onClick={() => scrollToImage('next')}
			/>
			<div className="container-images">
				<ul
					className="ulSliderCard"
					ref={listRef}>
					{imgs.map((img, index) => {
						return (
							<li
								className="liSliderCard"
								key={index}>
								<img
									className="imgSliderCard"
									src={img}
									width={500}
									height={280}
								/>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="dots-container divSliderCard">
				{imgs.map((_, idx) => (
					<div
						key={idx}
						className={`dot-container-item ${
							idx === currentIndex ? 'active' : ''
						}`}
						onClick={() => goToSlide(idx)}>
						&#8226;
					</div>
				))}
			</div>
		</CardMedia>
	);
};
