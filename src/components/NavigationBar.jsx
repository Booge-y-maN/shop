import * as React from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Badge, InputBase, useMediaQuery,
  Box, Divider, List, ListItem, ListItemText, Paper, Fade, ClickAwayListener,
  Avatar, Stack, Drawer, Container
} from '@mui/material';
import {
  Menu as MenuIcon, Search as SearchIcon, ShoppingCart as ShoppingCartIcon,
  Language as LanguageIcon, Person as PersonIcon, Category as CategoryIcon,
  KeyboardArrowDown as ArrowDownIcon, Facebook, Google, LinkedIn, Close as CloseIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar({ cartItemCount }) {
  const [hoverStates, setHoverStates] = React.useState({
    cart: false,
    account: false,
    categories: false
  });
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');
  const isSmallMobile = useMediaQuery('(max-width:480px)');
  const isLargeScreen = useMediaQuery('(min-width:1200px)');
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

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  return (
    <AppBar position="sticky" sx={{
      backgroundColor: 'background.paper',
      color: 'text.primary',
      boxShadow: 'none',
      borderBottom: 'none',
      borderColor: 'divider'
    }}>
      <Container maxWidth="xl" disableGutters>
        <Toolbar sx={{
          flexDirection: 'column',
          px: 0,
          py: 0.5
        }}>
          {/* Top Bar */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            mb: 0.5,
            px: { xs: 2, sm: 3, md: 0 }
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              minWidth: isMobile ? 'auto' : 'auto',
              flexShrink: 0
            }}>
              {isMobile && (
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setMobileMenuOpen(true)}
                  sx={{
                    mr: isSmallMobile ? 1 : 1.5,
                    p: isSmallMobile ? 0.75 : 1
                  }}
                >
                  <MenuIcon fontSize={isSmallMobile ? "medium" : "large"} />
                </IconButton>
              )}
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  fontWeight: 800,
                  fontSize: isSmallMobile ? '1.4rem' : isMobile ? '1.5rem' : isLargeScreen ? '2rem' : '1.75rem',
                  fontFamily: 'Montserrat, sans-serif',
                  background: 'linear-gradient(45deg, #FF6A00 30%, #FF9E00 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textDecoration: 'none',
                  '&:hover': { opacity: 0.9 },
                  whiteSpace: 'nowrap',
                  lineHeight: 1.2
                }}>
                Loremxyz
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{
                flex: 2,
                px: 3,
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Paper component="form" sx={{
                  p: '4px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '600px',
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
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: isSmallMobile ? 1 : 1.5,
              flexShrink: 0
            }}>
              {isMobile && (
                <IconButton
                  onClick={toggleMobileSearch}
                  sx={{
                    color: 'text.primary',
                    '&:hover': { backgroundColor: 'rgba(255,106,0,0.1)' },
                    p: isSmallMobile ? 0.75 : 1
                  }}>
                  <SearchIcon fontSize={isSmallMobile ? "medium" : "large"} />
                </IconButton>
              )}

              <IconButton sx={{
                color: 'text.primary',
                '&:hover': { backgroundColor: 'rgba(255,106,0,0.1)' },
                p: isSmallMobile ? 0.75 : 1,
                display: { xs: 'none', sm: 'flex' }
              }}>
                <LanguageIcon fontSize={isSmallMobile ? "medium" : "large"} />
              </IconButton>

              {/* Cart */}
              <Box
                onMouseEnter={() => !isMobile && handleHover('cart', true)}
                onMouseLeave={() => !isMobile && handleHover('cart', false)}
                onClick={() => isMobile && navigate('/cart')}
                sx={{ position: 'relative' }}
              >
                <IconButton sx={{
                  color: 'text.primary',
                  '&:hover': { backgroundColor: 'rgba(255,106,0,0.1)' },
                  p: isSmallMobile ? 0.75 : 1
                }}>
                  <Badge
                    badgeContent={cartItemCount}
                    color="primary"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: isSmallMobile ? '0.7rem' : '0.8rem',
                        height: isSmallMobile ? 18 : 20,
                        minWidth: isSmallMobile ? 18 : 20,
                      }
                    }}
                  >
                    <ShoppingCartIcon fontSize={isSmallMobile ? "medium" : "large"} />
                  </Badge>
                </IconButton>
              </Box>

              {/* Account */}
              <Box
                onMouseEnter={() => !isMobile && handleHover('account', true)}
                onMouseLeave={() => !isMobile && handleHover('account', false)}
                onClick={() => isMobile && navigate('/login')}
                sx={{ position: 'relative' }}
              >
                <IconButton sx={{
                  color: 'text.primary',
                  '&:hover': { backgroundColor: 'rgba(255,106,0,0.1)' },
                  p: isSmallMobile ? 0.75 : 1
                }}>
                  <PersonIcon fontSize={isSmallMobile ? "medium" : "large"} />
                </IconButton>
              </Box>

              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{
                  borderRadius: '20px',
                  px: isSmallMobile ? 1.5 : 2,
                  py: isSmallMobile ? 0.5 : 0.75,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: isSmallMobile ? '0.8rem' : isLargeScreen ? '0.95rem' : '0.85rem',
                  minWidth: 'unset',
                  whiteSpace: 'nowrap',
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

          {/* Mobile Search Bar */}
          {isMobile && mobileSearchOpen && (
            <Box sx={{
              width: '100%',
              px: 2,
              py: 1,
              display: { xs: 'block', md: 'none' }
            }}>
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
                  placeholder="Search products..."
                  inputProps={{ 'aria-label': 'search' }}
                  sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }}
                  autoFocus
                />
                <IconButton
                  onClick={toggleMobileSearch}
                  sx={{ p: '8px', color: 'text.secondary' }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
                <IconButton type="submit" sx={{ p: '8px', color: '#FF6A00' }}>
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Paper>
            </Box>
          )}

          {/* Categories & Products Bar */}
          <Box sx={{
            display: 'flex',
            justifyContent: isMobile ? 'flex-end' : 'space-between',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
            px: { xs: 2, md: 0 }
          }}>
            {!isMobile && (
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
                                  backgroundColor: 'rgba(255,106,0,0.1)'
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
            )}

            <Button
              component={Link}
              to="/become-a-supplier"
              sx={{
                color: '#FF6A00',
                textTransform: 'none',
                fontWeight: 800,
                fontSize: isSmallMobile ? '0.8rem' : isLargeScreen ? '1rem' : '0.9rem',
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                px: isSmallMobile ? 1 : 1.5,
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              }}>
              Become a Supplier
            </Button>
          </Box>
        </Toolbar>

        {/* Mobile Menu Drawer */}
        <Drawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={handleMobileMenuClose}
          sx={{
            '& .MuiDrawer-paper': {
              width: { xs: '280px', sm: '320px' },
              boxSizing: 'border-box',
            },
          }}
        >
          <Box sx={{
            p: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Menu
              </Typography>
              <IconButton onClick={handleMobileMenuClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <List>
                <ListItem
                  button
                  component={Link}
                  to="/shop"
                  onClick={handleMobileMenuClose}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255,106,0,0.1)'
                    },
                    borderRadius: '8px',
                    mb: 0.5
                  }}
                >
                  <ListItemText primary="All Products" />
                </ListItem>

                <ListItem
                  button
                  component={Link}
                  to="/become-a-supplier"
                  onClick={handleMobileMenuClose}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255,106,0,0.1)'
                    },
                    borderRadius: '8px',
                    mb: 0.5
                  }}
                >
                  <ListItemText primary="Become a Supplier" />
                </ListItem>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" sx={{
                  px: 2,
                  py: 1,
                  color: 'text.secondary',
                  fontWeight: 600
                }}>
                  Categories
                </Typography>

                {categories.map((category) => (
                  <ListItem
                    button
                    key={category.name}
                    component={Link}
                    to={category.path}
                    onClick={handleMobileMenuClose}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255,106,0,0.1)'
                      },
                      borderRadius: '8px',
                      mb: 0.5
                    }}
                  >
                    <ListItemText primary={category.name} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mt: 'auto', pt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                component={Link}
                to="/login"
                onClick={handleMobileMenuClose}
                sx={{
                  mb: 1,
                  py: 1,
                  background: 'linear-gradient(45deg, #FF6A00 30%, #FF9E00 90%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #E65A00 30%, #E68E00 90%)'
                  }
                }}
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="outlined"
                component={Link}
                to="/register"
                onClick={handleMobileMenuClose}
                sx={{
                  py: 1,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: '#FF6A00'
                  }
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Drawer>

        {/* Cart Hover Card */}
        {!isMobile && (
          <Fade in={hoverStates.cart} timeout={150}>
            <Paper
              sx={{
                position: 'fixed',
                top: '64px',
                right: '32px',
                zIndex: 1200,
                width: '360px',
                maxWidth: '360px',
                p: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px'
              }}
              onMouseEnter={() => handleHover('cart', true)}
              onMouseLeave={() => handleHover('cart', false)}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1.1rem' }}>
                Your Cart ({cartItemCount})
              </Typography>

              <Box sx={{
                minHeight: '120px',
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
                  mb: 1,
                  py: 1.25,
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
        )}

        {/* Account Hover Card */}
        {!isMobile && (
          <Fade in={hoverStates.account} timeout={150}>
            <Paper
              sx={{
                position: 'fixed',
                top: '64px',
                right: '120px',
                zIndex: 1200,
                width: '300px',
                maxWidth: '300px',
                p: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px'
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
                  <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: '0.95rem' }}>
                    Hello, Guest
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
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
                  py: 0.75,
                  borderColor: 'divider',
                  color: 'text.primary',
                  fontSize: '0.9rem',
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
                color: 'text.secondary',
                fontSize: '0.85rem'
              }}>
                or continue with
              </Typography>

              <Stack direction="row" spacing={1.5} sx={{ mb: 1.5 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    p: 0.75,
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: '#1877F2',
                      backgroundColor: 'rgba(24, 119, 242, 0.04)'
                    }
                  }}
                >
                  <Facebook sx={{ color: '#1877F2', fontSize: '1.25rem' }} />
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    p: 0.75,
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: '#DB4437',
                      backgroundColor: 'rgba(219, 68, 55, 0.04)'
                    }
                  }}
                >
                  <Google sx={{ color: '#DB4437', fontSize: '1.25rem' }} />
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    p: 0.75,
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: '#0A66C2',
                      backgroundColor: 'rgba(10, 102, 194, 0.04)'
                    }
                  }}
                >
                  <LinkedIn sx={{ color: '#0A66C2', fontSize: '1.25rem' }} />
                </Button>
              </Stack>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" sx={{
                textAlign: 'center',
                color: 'text.secondary',
                fontSize: '0.85rem'
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
        )}
      </Container>
    </AppBar>
  );
}

export default NavigationBar;