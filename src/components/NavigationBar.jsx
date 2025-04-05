import * as React from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Badge, InputBase, useMediaQuery,
  Box, Divider, List, ListItem, ListItemText, Paper, Fade, ClickAwayListener,
  Avatar, Stack
} from '@mui/material';
import {
  Menu as MenuIcon, Search as SearchIcon, ShoppingCart as ShoppingCartIcon,
  Language as LanguageIcon, Person as PersonIcon, Category as CategoryIcon,
  KeyboardArrowDown as ArrowDownIcon, Facebook, Google, LinkedIn
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar({ cartItemCount }) {
  const [hoverStates, setHoverStates] = React.useState({
    cart: false,
    account: false,
    categories: false
  });
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();

  const categories = [
    { name: 'Electronics', path: '/category/electronics' },
    { name: 'Clothing', path: '/category/clothing' },
    { name: 'Home & Garden', path: '/category/home-garden' },
    { name: 'Books', path: '/category/books' },
    { name: 'Toys', path: '/category/toys' },
    { name: 'Sports', path: '/category/sports' },
  ];

  const handleHover = (element, isHovering) => {
    setHoverStates(prev => ({ ...prev, [element]: isHovering }));
  };

  return (
    <AppBar position="sticky" sx={{
      backgroundColor: 'background.paper',
      color: 'text.primary',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    }}>
      <Toolbar sx={{ flexDirection: 'column', px: 0, py: 0.5 }}>
        {/* Top Bar */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          mb: 0.5,
          px: { xs: 2, md: 0 }
        }}>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component={Link} to="/"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontFamily: 'Montserrat, sans-serif',
                background: 'linear-gradient(45deg, #FF6A00 30%, #FF9E00 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textDecoration: 'none',
                '&:hover': { opacity: 0.9 }
              }}>
              Loremxyz
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ flex: 2, px: 3 }}>
              <Paper component="form" sx={{
                p: '4px 16px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '40px',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
                '&:hover': { borderColor: '#FF6A00' }
              }}>
                <InputBase
                  placeholder="Search 100M+ products..."
                  inputProps={{ 'aria-label': 'search' }}
                  sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }}
                />
                <IconButton type="submit" sx={{ p: '8px', color: '#FF6A00' }}>
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Paper>
            </Box>
          )}

          <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 1.5
          }}>
            <IconButton sx={{
              color: 'text.primary',
              '&:hover': { backgroundColor: 'rgba(255,106,0,0.1)' }
            }}>
              <LanguageIcon fontSize="medium" />
            </IconButton>

            {/* Cart */}
            <Box onMouseEnter={() => handleHover('cart', true)} onMouseLeave={() => handleHover('cart', false)}>
              <IconButton sx={{
                color: 'text.primary',
                '&:hover': { backgroundColor: 'rgba(255,106,0,0.1)' }
              }}>
                <Badge badgeContent={cartItemCount} color="primary">
                  <ShoppingCartIcon fontSize="medium" />
                </Badge>
              </IconButton>
            </Box>

            {/* Account */}
            <Box onMouseEnter={() => handleHover('account', true)} onMouseLeave={() => handleHover('account', false)}>
              <IconButton sx={{
                color: 'text.primary',
                '&:hover': { backgroundColor: 'rgba(255,106,0,0.1)' }
              }}>
                <PersonIcon fontSize="medium" />
              </IconButton>
            </Box>

            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                borderRadius: '20px',
                px: 3,
                py: 1,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                background: 'linear-gradient(45deg, #FF6A00 30%, #FF9E00 90%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #E65A00 30%, #E68E00 90%)'
                }
              }}>
              Sign Up
            </Button>
          </Box>
        </Box>

        {/* Categories & Products Bar */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          px: { xs: 2, md: 0 }
        }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <ClickAwayListener onClickAway={() => handleHover('categories', false)}>
              <Box>
                <Button
                  onMouseEnter={() => handleHover('categories', true)}
                  startIcon={<CategoryIcon />}
                  endIcon={<ArrowDownIcon fontSize="small" />}
                  sx={{
                    color: 'text.primary',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    px: 1,
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  All Categories
                </Button>

                <Fade in={hoverStates.categories} timeout={150}>
                  <Paper sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    zIndex: 10,
                    width: '250px',
                    maxHeight: '400px',
                    overflow: 'auto',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <List dense>
                      {categories.map((category) => (
                        <ListItem
                          button
                          key={category.name}
                          component={Link}
                          to={category.path}
                          onClick={() => handleHover('categories', false)}
                          sx={{
                            '&:hover': {
                              backgroundColor: 'transparent'
                            },
                            color: 'text.primary',
                            py: 1
                          }}>
                          <ListItemText
                            primary={category.name}
                            primaryTypographyProps={{
                              fontWeight: 500,
                              fontSize: '0.9rem'
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Fade>
              </Box>
            </ClickAwayListener>

            <Button
              component={Link}
              to="/shop"
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                px: 1,
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              }}>
              All Products
            </Button>
          </Box>

          <Button
            component={Link}
            to="/become-a-supplier"
            sx={{
              color: '#FF6A00',
              textTransform: 'none',
              fontWeight: 800,
              fontSize: '0.9rem',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.5px',
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}>
            Become a Supplier
          </Button>
        </Box>

        {/* Cart Hover Card */}
        <Fade in={hoverStates.cart} timeout={150}>
          <Paper
            sx={{
              position: 'absolute',
              top: '100%',
              right: 0,
              zIndex: 10,
              width: '320px',
              p: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid',
              borderColor: 'divider'
            }}
            onMouseEnter={() => handleHover('cart', true)}
            onMouseLeave={() => handleHover('cart', false)}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Your Cart ({cartItemCount})
            </Typography>

            <Box sx={{
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}>
              {cartItemCount > 0 ? (
                <Typography>Your cart items would appear here</Typography>
              ) : (
                <Typography>Your cart is empty</Typography>
              )}
            </Box>

            <Divider sx={{ my: 1.5 }} />

            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}>
              <Typography variant="body1">Subtotal:</Typography>
              <Typography variant="body1" fontWeight={700}>
                ${(cartItemCount * 19.99).toFixed(2)}
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/cart"
              variant="contained"
              fullWidth
              sx={{
                mb: 1.5,
                py: 1.5,
                background: 'linear-gradient(45deg, #FF6A00 30%, #FF9E00 90%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #E65A00 30%, #E68E00 90%)'
                }
              }}>
              Go to Checkout
            </Button>
          </Paper>
        </Fade>

        {/* Account Hover Card */}
        <Fade in={hoverStates.account} timeout={150}>
          <Paper
            sx={{
              position: 'absolute',
              top: '100%',
              right: 80,
              zIndex: 10,
              width: '280px',
              p: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid',
              borderColor: 'divider'
            }}
            onMouseEnter={() => handleHover('account', true)}
            onMouseLeave={() => handleHover('account', false)}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              gap: 1.5
            }}>
              <Avatar sx={{
                width: 40,
                height: 40,
                backgroundColor: 'rgba(255,106,0,0.1)',
                color: '#FF6A00'
              }}>
                <PersonIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  Hello, Guest
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in for better experience
                </Typography>
              </Box>
            </Box>

            <Button
              component={Link}
              to="/login"
              fullWidth
              variant="outlined"
              sx={{
                mb: 1.5,
                textTransform: 'none',
                py: 1,
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': {
                  borderColor: '#FF6A00',
                  backgroundColor: 'rgba(255,106,0,0.1)'
                }
              }}>
              Login
            </Button>

            <Typography variant="body2" sx={{
              textAlign: 'center',
              my: 1.5,
              color: 'text.secondary'
            }}>
              or continue with
            </Typography>

            <Stack direction="row" spacing={1.5} sx={{ mb: 1.5 }}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  p: 1,
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: '#1877F2',
                    backgroundColor: 'rgba(24, 119, 242, 0.04)'
                  }
                }}
              >
                <Facebook sx={{ color: '#1877F2' }} />
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  p: 1,
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: '#DB4437',
                    backgroundColor: 'rgba(219, 68, 55, 0.04)'
                  }
                }}
              >
                <Google sx={{ color: '#DB4437' }} />
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  p: 1,
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: '#0A66C2',
                    backgroundColor: 'rgba(10, 102, 194, 0.04)'
                  }
                }}
              >
                <LinkedIn sx={{ color: '#0A66C2' }} />
              </Button>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Typography variant="body2" sx={{
              textAlign: 'center',
              color: 'text.secondary'
            }}>
              New customer?{' '}
              <Link
                to="/register"
                style={{
                  color: '#FF6A00',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Start here
              </Link>
            </Typography>
          </Paper>
        </Fade>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;