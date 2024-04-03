import SearchIcon from '@mui/icons-material/Search';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ color = 'blanco.main' }) => {
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      localStorage.setItem('searchInput', searchInput.trim());
      navigate(`/buscar/${searchInput.trim()}`);
    } else {
      localStorage.removeItem('searchInput');
    }
  };

  useEffect(() => {
    const savedSearchInput = localStorage.getItem('searchInput');
    if (savedSearchInput) {
      setSearchInput(savedSearchInput);
    }
  }, []);

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
          // onKeyDown={event => {
          //   if (event.key === 'Enter' || event.key === "Delete") {
          //     handleSearch();
          //   }
          // }}
          onChange={event => {
            setSearchInput(event.target.value);
            handleSearch();
            localStorage.setItem('searchInput', event.target.value);
          }}
          value={searchInput}
          type="text"
          placeholder="Buscar Microemprendimientos"
        />
      </Box>
    </>
  );
};
