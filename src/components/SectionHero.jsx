import { Box, Paper, Typography, Container } from '@mui/material';
import { SearchBar } from './SearchBar';

export const SectionHero = ({ category, title, description, img }) => {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'blanco.main',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
      }}>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          height: '486px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
          backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.7), rgba(34, 34, 34, 0.7)), url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '0',
        }}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            gap: '35px',
          }}>
          <SearchBar />
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0',
              gap: '10px',
            }}>
            <Typography
              sx={{
                fontWeight: '400',
                fontSize: '18px',
                lineHeight: '24px',
                textAlign: 'start',
                color: 'blanco.main',
              }}>
              {category.toUpperCase()}
            </Typography>
            <Typography
              sx={{
                width: '240px',
                fontWeight: '500',
                fontSize: '28px',
                lineHeight: '33px',
                textAlign: 'start',
                color: 'blanco.main',
              }}>
              {title}
            </Typography>
            {description && (
              <Typography
                sx={{
                  width: '240px',
                  fontWeight: '400',
                  fontSize: '24px',
                  lineHeight: '32px',
                  textAlign: 'start',
                  color: 'blanco.main',
                }}>
                {description}
              </Typography>
            )}
          </Container>
        </Container>
      </Paper>
    </Box>
  );
};
