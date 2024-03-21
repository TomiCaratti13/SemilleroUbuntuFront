import SearchIcon from '@mui/icons-material/Search';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

export const SearchBar = ({ color = 'blanco.main' }) => {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const savedSearchInput = localStorage.getItem('searchInput');
    if (savedSearchInput) {
      setSearchInput(savedSearchInput);
    }
  }, []);

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      window.location.href = `/buscar/${searchInput.trim()}`;
    } else {
      localStorage.removeItem('searchInput');
    }
  };

  return (
    <>
      <Box
        className="searchBar"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          bgcolor: color,
          borderRadius: '50px',
          height: '56px',
          justifyContent: 'start',
          alignItems: 'center',
          padding: '0 16px',
          '& .MuiButton-root': {
            border: 'none',
            backgroundColor: 'transparent',
            minWidth: '24px',
            borderRadius: '50%',
            color: 'negro.main',
          },
        }}>
        <Button
          onClick={handleSearch}
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SearchIcon />
        </Button>
        <input
          id="searchBar"
          style={{
            width: '100%',
            height: '100%',
            padding: '0 16px',
            borderRadius: '50px',
            border: 'none',
            backgroundColor: 'transparent',
          }}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
          onChange={event => {
            setSearchInput(event.target.value);
            localStorage.setItem('searchInput', event.target.value);
            console.log(searchInput);
          }}
          value={searchInput}
          type="text"
          placeholder="Buscar Microemprendimientos"
        />
      </Box>
    </>
  );
};
