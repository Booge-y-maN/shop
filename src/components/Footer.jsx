import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f9fa', // Light gray background
        color: '#333', // Dark text for contrast
        padding: '3rem 0',
        marginTop: '2rem',
        borderTop: '1px solid #e0e0e0', // Subtle border for separation
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: '1rem', color: '#FF6A00' }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.6 }}>
              Explore our platform for the best deals, trending products, and a seamless shopping experience. Your satisfaction is our priority.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: '1rem', color: '#FF6A00' }}>
              Quick Links
            </Typography>
            <Box>
              <Link
                href="/"
                color="inherit"
                underline="none"
                sx={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  color: '#555',
                  '&:hover': { color: '#FF6A00' },
                }}
              >
                Home
              </Link>
              <Link
                href="/shop"
                color="inherit"
                underline="none"
                sx={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  color: '#555',
                  '&:hover': { color: '#FF6A00' },
                }}
              >
                Shop
              </Link>
              <Link
                href="/cart"
                color="inherit"
                underline="none"
                sx={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  color: '#555',
                  '&:hover': { color: '#FF6A00' },
                }}
              >
                Cart
              </Link>
            </Box>
          </Grid>

          {/* Contact Information Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: '1rem', color: '#FF6A00' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', marginBottom: '0.5rem' }}>
              Tech Lead: Anthony Joshua
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', marginBottom: '0.5rem' }}>
              Email:{' '}
              <Link
                href="mailto:loremxyz@mail.com"
                color="inherit"
                sx={{ textDecoration: 'underline', color: '#555', '&:hover': { color: '#FF6A00' } }}
              >
                loremxyz@mail.com
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', marginBottom: '0.5rem' }}>
              Phone: +1 (123) 456-7890
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              Address: 123 Product St, Suite 500, Los Angeles, CA 90001
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          sx={{
            textAlign: 'center',
            borderTop: '1px solid #e0e0e0', // Subtle border for separation
            marginTop: '2rem',
            paddingTop: '1.5rem',
          }}
        >
          <Typography variant="body2" sx={{ color: '#555' }}>
            © {new Date().getFullYear()} Loremxyz. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;