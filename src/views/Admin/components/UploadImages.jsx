import React, { useRef } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useSnackbar } from 'notistack';

export const UploadImages = ({ images, setImages, direction }) => {
  //Manejar alertas
  const { enqueueSnackbar } = useSnackbar();
  const handleAlert = (mensaje, color) => {
    enqueueSnackbar(mensaje, {
      variant: color,
    });
  };

  const handleUploadImage = e => {
    if (e.target.files && images.length <= 2) {
      const selectedImages = Array.from(e.target.files);
      if (selectedImages.every(file => file.size <= 3000000)) {
        for (let i = 0; i < selectedImages.length; i++) {
          if (images.some(image => image.name === selectedImages[i].name)) {
            handleAlert('Imágen ya existente', 'warning');
            return;
          }
        }
        setImages([...images, ...selectedImages]);
        handleAlert('Imágen subida correctamente', 'success');
      } else {
        handleAlert('Cada imágenes debe ser de 3MB o menos', 'error');
      }
    } else {
      handleAlert('Puedes seleccionar hasta 3 imágenes', 'error');
    }
  };

  const handleRemove = index => {
    setImages(images.filter((_, i) => i !== index));
  };

  const fileInputRef = useRef(null);
  const handleEdit = index => {
    const tempFileInput = document.createElement('input');
    tempFileInput.type = 'file';
    tempFileInput.onchange = e => {
      if (e.target.files && e.target.files.length === 1) {
        const file = e.target.files[0];
        if (file.size <= 3000000) {
          if (
            images.some((image, i) => i !== index && image.name === file.name)
          ) {
            handleAlert('Imágen ya existente', 'warning');
            return;
          }
          const newImages = [...images];
          newImages[index] = file;
          setImages(newImages);
          handleAlert('Imágen editada correctamente', 'success');
        } else {
          handleAlert('Cada imágen debe ser de 3MB o menos', 'error');
        }
      }
    };
    tempFileInput.click();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-end',
      }}>
      {images.length < 3 && (
        <Button
          component="label"
          sx={{
            width: '160px',
            gap: '10px',
            padding: '0 20px',
            height: '40px',
            my: '10px',
            justifyContent: 'space-between',
            borderRadius: '100px',
            color: 'blanco.main',
            backgroundColor: 'azul.main',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'azul.main',
            },
          }}>
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.5 11V14H2.5V11H0.5V14C0.5 15.1 1.4 16 2.5 16H14.5C15.6 16 16.5 15.1 16.5 14V11H14.5ZM3.5 5L4.91 6.41L7.5 3.83V12H9.5V3.83L12.09 6.41L13.5 5L8.5 0L3.5 5Z"
              fill="#FDFDFE"
            />
          </svg>
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: '14px',
              lineHeight: '20px',
              textAlign: 'center',
            }}>
            Subir imágen
          </Typography>
          <input
            type="file"
            hidden
            multiple
            onChange={handleUploadImage}
          />
        </Button>
      )}
      {images.length === 0 && (
        <Typography
          sx={{
            fontFamily: 'Lato',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '16px',
            width: '160px',
            textWrap: 'wrap',
          }}>
          *Requerida al menos una imagen <br /> Hasta 3 imágenes. Máximo 3Mb
          cada una
        </Typography>
      )}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { direction } || 'column',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              width: '100%',
              position: 'relative',
              maxWidth: '400px',
            }}>
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              style={{
                width: '100%',
                maxHeight: direction == 'row' ? '120px' : '148px',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                display: 'flex',
                gap: '4px',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '24px',
                  height: '24px',
                  bgcolor: '#00000060',
                  borderRadius: '50%',
                }}
                onClick={() => handleEdit(index)}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.60103 4.68255L9.31648 5.398L2.2708 12.4437H1.55534V11.7282L8.60103 4.68255ZM11.4006 0.000976562C11.2062 0.000976562 11.004 0.0787435 10.8563 0.226501L9.43314 1.64964L12.3494 4.5659L13.7725 3.14276C14.0758 2.83947 14.0758 2.34954 13.7725 2.04625L11.9528 0.226501C11.7973 0.0709668 11.6028 0.000976562 11.4006 0.000976562ZM8.60103 2.48174L0 11.0828V13.999H2.91626L11.5173 5.398L8.60103 2.48174Z"
                    fill="#FDFDFE"
                  />
                </svg>
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '24px',
                  height: '24px',
                  bgcolor: '#00000060',
                  borderRadius: '50%',
                }}
                onClick={() => handleRemove(index)}>
                <svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.42857 5.5V13.8333H2.57143V5.5H9.42857ZM8.14286 0.5H3.85714L3 1.33333H0V3H12V1.33333H9L8.14286 0.5ZM11.1429 3.83333H0.857143V13.8333C0.857143 14.75 1.62857 15.5 2.57143 15.5H9.42857C10.3714 15.5 11.1429 14.75 11.1429 13.8333V3.83333Z"
                    fill="#FDFDFE"
                  />
                </svg>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
