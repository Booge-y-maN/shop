import * as React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Badge, Box, Paper, Fade,
  ClickAwayListener, Button
} from '@mui/material';
import {
  Menu as MenuIcon, ShoppingCart as ShoppingCartIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar({ cartItemCount }) {
  const [hoverCart, setHoverCart] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <AppBar position="sticky" sx={{
      backgroundColor: 'background.paper',
      color: 'text.primary',
      boxShadow: 'none',
      borderBottom: 'none'
    }}>
      <Toolbar sx={{ flexDirection: 'row', justifyContent: 'space-between', px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton edge="start" color="inherit" onClick={() => setMobileMenuOpen(true)}>
            <MenuIcon />
          </IconButton>
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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton sx={{ color: 'text.primary' }}>
            <LanguageIcon fontSize="medium" />
          </IconButton>

          <Box
            onMouseEnter={() => setHoverCart(true)}
            onMouseLeave={() => setHoverCart(false)}
            sx={{ position: 'relative' }}
          >
            <IconButton sx={{ color: 'text.primary' }}>
              <Badge badgeContent={cartItemCount} color="primary">
                <ShoppingCartIcon fontSize="medium" />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>

      {/* Cart Hover Card */}
      <Fade in={hoverCart} timeout={150}>
        <Paper
          sx={{
            position: 'fixed',
            top: '64px',
            right: { xs: '16px', md: '32px' },
            zIndex: 1200,
            width: { xs: 'calc(100% - 32px)', sm: '360px' },
            maxWidth: '360px',
            p: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px'
          }}
          onMouseEnter={() => setHoverCart(true)}
          onMouseLeave={() => setHoverCart(false)}
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

          <Button
            component={Link}
            to="/cart"
            variant="contained"
            fullWidth
            sx={{
              py: 1.25,
              background: 'linear-gradient(45deg, #FF6A00 30%, #FF9E00 90%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #E65A00 30%, #E68E00 90%)'
              }
            }}
          >
            Go to Checkout
          </Button>
        </Paper>
      </Fade>
    </AppBar>
  );
}

export default NavigationBar;