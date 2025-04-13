import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        py: 6,
        borderTop: 'none',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(to right, #FF6A00, #FF9E00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              Loremxyz
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 2 }}>
              Your premier destination for quality products and exceptional shopping experiences.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton aria-label="Facebook" color="primary">
                <Facebook />
              </IconButton>
              <IconButton aria-label="Twitter" color="primary">
                <Twitter />
              </IconButton>
              <IconButton aria-label="Instagram" color="primary">
                <Instagram />
              </IconButton>
              <IconButton aria-label="LinkedIn" color="primary">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary'
              }}
            >
              Shop
            </Typography>
            <Box>
              {['All Products', 'New Arrivals', 'Best Sellers', 'Discounts'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  variant="body2"
                  sx={{
                    display: 'block',
                    mb: 1,
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'none'
                    }
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary'
              }}
            >
              Help
            </Typography>
            <Box>
              {['Contact Us', 'FAQs', 'Shipping', 'Returns'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  variant="body2"
                  sx={{
                    display: 'block',
                    mb: 1,
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'none'
                    }
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Information Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary'
              }}
            >
              Contact
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Email color="primary" sx={{ mr: 1, fontSize: 20 }} />
              <Link
                href="mailto:contact@loremxyz.com"
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'none'
                  }
                }}
              >
                contact@loremxyz.com
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Phone color="primary" sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                +1 (123) 456-7890
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
              <LocationOn color="primary" sx={{ mr: 1, fontSize: 20, mt: 0.5 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                123 Commerce Street, Suite 500<br />
                Los Angeles, CA 90001
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section - Removed the divider that was here */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            pt: 4
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: { xs: 1, sm: 0 } }}>
            © {currentYear} Loremxyz. All rights reserved.
          </Typography>
          <Box>
            <Link
              href="#"
              variant="body2"
              sx={{
                color: 'text.secondary',
                mr: 2,
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'none'
                }
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              variant="body2"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'none'
                }
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;