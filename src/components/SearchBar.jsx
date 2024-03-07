import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';

export const SearchBar = () => {
  return (
    <>
      <Box
        className="searchBar"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          bgcolor: 'blanco.main',
          borderRadius: '50px',
          height: '56px',
          justifyContent: 'start',
          alignItems: 'center',
          padding: '0 16px',
        }}>
        <label
          htmlFor="searchBar"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SearchIcon />
        </label>
        <input
          id="searchBar"
          style={{
            width: '100%',
            height: '100%',
            padding: '0 16px',
            borderRadius: '50px',
            border: 'none',
          }}
          type="text"
          placeholder="Buscar Microemprendimientos"
        />
      </Box>
    </>
  );
};
