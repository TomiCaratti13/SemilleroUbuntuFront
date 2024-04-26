import SearchIcon from '@mui/icons-material/Search';
import { Box, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const SearchBar = ({ color = 'blanco.main' }) => {
  const inputRef = useRef();
  const { search } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(search || '');

  const handleSearch = () => {
    // if (searchInput?.trim() !== '') {
    navigate(`/buscar/${searchInput?.trim()}`);
    // }
  };
  useEffect(() => {
    if (location.pathname.includes('/buscar')) {
      handleSearch();
      inputRef.current.focus();
    }
    if (location.pathname === '/') {
      navigate(`/`);
      inputRef.current.focus();
    }
  }, [searchInput]);

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
          onClick={() => {
            setSearchInput(inputRef.current.value);
            handleSearch();
          }}
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
          ref={inputRef}
          id="searchBar"
          style={{
            width: '100%',
            height: '100%',
            padding: '0 12px',
            borderRadius: '50px',
            border: 'none',
            backgroundColor: 'transparent',
          }}
          onKeyDown={e => {
            if ((e.key === 'Enter' || e.key === 'Delete')&& searchInput?.trim() !== '') {
              handleSearch();
            }
          }}
          onChange={e => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
          type="text"
          placeholder="Buscar Microemprendimientos"
        />
      </Box>
    </>
  );
};
