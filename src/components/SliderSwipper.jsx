import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import '../assets/styles/sliderCard.css';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

export const SliderSwipper = ({ imgs }) => {
  return (
    <>
      <CardMedia
        className="slider-container"
        sx={{
          margin: 'auto',
          objectFit: 'cover',
          borderRadius: '16px',
          height: 148,
          padding: '0px 16px',
        }}>
        <div className="container-images">
          <Swiper
            cssMode={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper ulSliderCard">
            <ArrowBackIosNewOutlinedIcon
              className="swiper-button-prev"
              style={{ color: 'white' }}
            />
            <ArrowForwardIosIcon
              className="swiper-button-next"
              style={{ color: 'white' }}
            />
            {imgs.map((img, index) => {
              return (
                <SwiperSlide
                  className="liSliderCard"
                  key={index}>
                  <img
                    className="imgSliderCard"
                    src={img}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '16px',
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </CardMedia>
    </>
  );
};
