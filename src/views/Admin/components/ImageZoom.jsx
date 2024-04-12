import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const ImageZoom = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = event => {
    event.stopPropagation();
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrevious = event => {
    event.stopPropagation();
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleImageClick = event => {
    event.stopPropagation();
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 9999,
      }}
      onClick={onClose}>
      <Box
        sx={{
          position: 'relative',
          maxHeight: '80%',
          maxWidth: '80%',
        }}>
        <img
          src={
            images[currentIndex].cloudinaryUrl ||
            URL.createObjectURL(images[currentIndex])
          }
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          onClick={handleImageClick}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '-45px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}>
          <IconButton
            onClick={handlePrevious}
            style={{
              visibility: currentIndex > 0 ? 'visible' : 'hidden',
              color: 'white',
            }}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6">
            {currentIndex + 1}/{images.length}
          </Typography>
          <IconButton
            onClick={handleNext}
            style={{
              visibility:
                currentIndex < images.length - 1 ? 'visible' : 'hidden',
              color: 'white',
            }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
