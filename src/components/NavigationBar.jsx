import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  useMediaQuery,
  Box,
  CircularProgress,
  Popover,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category'; // Added for All categories
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchResults from './SearchResults';
import { debounce } from 'lodash';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

function NavigationBar({ cartItemCount }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState(null);
  const [isSearchExpanded, setIsSearchExpanded] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('En-US');
  const [isPersonHovered, setIsPersonHovered] = React.useState(false);
  const [isCartHovered, setIsCartHovered] = React.useState(false);
  const searchBarRef = React.useRef(null);
  const searchResultsRef = React.useRef(null);
  const personCardRef = React.useRef(null);
  const personIconRef = React.useRef(null);
  const cartCardRef = React.useRef(null);
  const cartIconRef = React.useRef(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');

  React.useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('MERNEcommerceToken');
      setIsLoggedIn(!!token);
    };
    checkToken();
    const interval = setInterval(checkToken, 2000);

    return () => clearInterval(interval);
  }, []);

  // Handle mouse leave for person card
  React.useEffect(() => {
    const handlePersonMouseLeave = (event) => {
      if (
        personCardRef.current &&
        !personCardRef.current.contains(event.relatedTarget) &&
        personIconRef.current &&
        !personIconRef.current.contains(event.relatedTarget)
      ) {
        setIsPersonHovered(false);
      }
    };

    if (personCardRef.current) {
      personCardRef.current.addEventListener('mouseleave', handlePersonMouseLeave);
    }

    return () => {
      if (personCardRef.current) {
        personCardRef.current.removeEventListener('mouseleave', handlePersonMouseLeave);
      }
    };
  }, [isPersonHovered]);

  // Handle mouse leave for cart card
  React.useEffect(() => {
    const handleCartMouseLeave = (event) => {
      if (
        cartCardRef.current &&
        !cartCardRef.current.contains(event.relatedTarget) &&
        cartIconRef.current &&
        !cartIconRef.current.contains(event.relatedTarget)
      ) {
        setIsCartHovered(false);
      }
    };

    if (cartCardRef.current) {
      cartCardRef.current.addEventListener('mouseleave', handleCartMouseLeave);
    }

    return () => {
      if (cartCardRef.current) {
        cartCardRef.current.removeEventListener('mouseleave', handleCartMouseLeave);
      }
    };
  }, [isCartHovered]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  const handleSearchResultClick = () => {
    setSearchResults([]);
  };

  const handleLogout = () => {
    localStorage.removeItem('MERNEcommerceToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const debouncedSearch = React.useCallback(
    debounce(async query => {
      if (query.trim() === '') {
        setSearchResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(`https://mern-stack-ecommerce-app-h5wb.onrender.com/api/search?q=${query}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  React.useEffect(() => {
    const handleClickOutside = event => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageClick = event => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageSelect = language => {
    setSelectedLanguage(language);
    handleLanguageClose();
  };

  const handleSearchIconClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handlePersonHover = () => {
    setIsPersonHovered(true);
  };

  const handleCartHover = () => {
    setIsCartHovered(true);
  };

  const handleSignInClick = () => {
    setIsPersonHovered(false);
    navigate('/login');
  };

  const handleViewCart = () => {
    setIsCartHovered(false);
    navigate('/cart');
  };

  const handleCheckout = () => {
    setIsCartHovered(false);
    navigate('/checkout');
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'white',
          height: 'auto',
          justifyContent: 'center',
          boxShadow: 'none',
          '& .logo-link': {
            textDecoration: 'none',
            color: '#FF6A00',
            fontWeight: '800',
            fontSize: '2rem',
            fontFamily: '"Montserrat", sans-serif',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            background: 'linear-gradient(to right, #FF6A00, #FF9E00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
            '&:hover': {
              textShadow: '1px 1px 5px rgba(0,0,0,0.2)',
            }
          },
          '& .search-bar': {
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: '25px',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            width: isSearchExpanded ? '300px' : '40px',
            transition: 'width 0.3s ease',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          },
          '& .search-bar input': {
            marginLeft: '0.5rem',
            border: 'none',
            outline: 'none',
            color: 'black',
            backgroundColor: 'transparent',
            width: '100%',
            display: isSearchExpanded ? 'block' : 'none',
          },
          '& .active': {
            textDecoration: 'underline',
            fontWeight: 'bold',
          },
        }}
      >
        <Toolbar sx={{ flexDirection: 'column', alignItems: 'flex-start', paddingTop: '8px' }}>
          {isMobile ? (
            <>
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/" className="logo-link">
                    Loremxyz
                  </Link>
                </Typography>
              </Box>
              <Menu id="mobile-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose} component={Link} to="/">
                  Home
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/shop">
                  Shop
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/cart">
                  Cart
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Box sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1px'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" component="div">
                    <Link to="/" className="logo-link">
                      Loremxyz
                    </Link>
                  </Typography>
                </Box>

                <form className="search-bar" ref={searchBarRef} onSubmit={e => e.preventDefault()}>
                  <IconButton onClick={handleSearchIconClick} sx={{ color: 'black' }}>
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    placeholder="Search for a product..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ width: '100%' }}
                  />
                  {loading && (
                    <CircularProgress
                      size={20}
                      sx={{
                        color: 'black',
                        marginLeft: '10px',
                      }}
                    />
                  )}
                </form>

                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }} onClick={handleLanguageClick}>
                    <LanguageIcon sx={{ color: 'black' }} />
                    <Typography variant="body1" sx={{ color: 'black', fontSize: '0.875rem' }}>
                      {selectedLanguage}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: 'flex', alignItems: 'center' }}
                    onMouseEnter={handleCartHover}
                    ref={cartIconRef}
                  >
                    <IconButton color="inherit">
                      <Badge badgeContent={cartItemCount} color="secondary">
                        <ShoppingCartIcon sx={{ color: 'black' }} />
                      </Badge>
                    </IconButton>
                  </Box>

                  {isLoggedIn ? (
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
                      onClick={handleLogout}
                      ref={personIconRef}
                    >
                      <PersonIcon sx={{ color: 'black' }} />
                    </Box>
                  ) : (
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
                      onMouseEnter={handlePersonHover}
                      ref={personIconRef}
                    >
                      <PersonIcon sx={{ color: 'black' }} />
                    </Box>
                  )}

                  <Button
                    component={Link}
                    to="/register"
                    sx={{
                      backgroundColor: '#FF6A00',
                      borderRadius: '25px',
                      color: 'white',
                      fontSize: '0.875rem',
                      padding: '0.5rem 1.5rem',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#E65A00',
                      },
                    }}
                  >
                    Sign up
                  </Button>
                </Box>
              </Box>

              <Box sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                marginBottom: '1px'
              }}>
                <Box sx={{ display: 'flex', gap: '24px' }}>
                  <Link
                    to="/categories"
                    style={{
                      color: 'black',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      fontFamily: '"Poppins", sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    <CategoryIcon fontSize="small" />
                    All categories
                  </Link>
                  <Link
                    to="/shop"
                    style={{
                      color: 'black',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      fontFamily: '"Poppins", sans-serif',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    All products
                  </Link>
                </Box>

                <Box
                  sx={{
                    visibility: (isPersonHovered || isCartHovered) ? 'hidden' : 'visible',
                  }}
                >
                  <Link
                    to="/become-a-supplier"
                    style={{
                      color: '#FF6A00',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      fontFamily: '"Poppins", sans-serif',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Become a Supplier
                  </Link>
                </Box>
              </Box>
            </>
          )}
        </Toolbar>

        {searchResults.length > 0 && searchBarRef.current && (
          <Box
            ref={searchResultsRef}
            sx={{
              position: 'absolute',
              top: searchBarRef.current.getBoundingClientRect().bottom + 'px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              backgroundColor: 'white',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '300px',
            }}
          >
            <SearchResults results={searchResults} onResultClick={handleSearchResultClick} setSearchResults={setSearchResults} />
          </Box>
        )}

        {isPersonHovered && !isLoggedIn && (
          <Box
            ref={personCardRef}
            sx={{
              position: 'absolute',
              top: '100px',
              right: '20px',
              zIndex: 10,
              backgroundColor: 'white',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '250px',
              p: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Welcome to Loremxyz
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mb: 1,
                backgroundColor: '#FF6A00',
                '&:hover': {
                  backgroundColor: '#E65A00',
                },
              }}
              onClick={handleSignInClick}
            >
              Sign in
            </Button>
            <Typography variant="body2" sx={{ mb: 1 }}>
              or continue with
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <IconButton
                sx={{ color: '#DB4437' }}
                component={Link}
                to="/google-auth"
                onClick={() => setIsPersonHovered(false)}
              >
                <GoogleIcon />
              </IconButton>
              <IconButton
                sx={{ color: '#4267B2' }}
                component={Link}
                to="/facebook-auth"
                onClick={() => setIsPersonHovered(false)}
              >
                <FacebookIcon />
              </IconButton>
            </Box>
          </Box>
        )}

        {isCartHovered && (
          <Box
            ref={cartCardRef}
            sx={{
              position: 'absolute',
              top: '100px',
              right: '100px',
              zIndex: 10,
              backgroundColor: 'white',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '300px',
              p: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
              Your Cart ({cartItemCount})
            </Typography>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100px',
              mb: 2
            }}>
              {cartItemCount > 0 ? (
                <Typography>Your cart items would appear here</Typography>
              ) : (
                <Typography>Your cart is empty</Typography>
              )}
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography fontWeight="bold">${(cartItemCount * 19.99).toFixed(2)}</Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mb: 1,
                backgroundColor: '#FF6A00',
                '&:hover': {
                  backgroundColor: '#E65A00',
                },
              }}
              onClick={handleViewCart}
            >
              View Cart
            </Button>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderColor: '#FF6A00',
                color: '#FF6A00',
                '&:hover': {
                  borderColor: '#E65A00',
                  color: '#E65A00',
                },
              }}
              onClick={handleCheckout}
              disabled={cartItemCount === 0}
            >
              Checkout
            </Button>
          </Box>
        )}
      </AppBar>
    </>
  );
}

export default NavigationBar;