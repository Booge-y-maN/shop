// home.jsx
import * as React from 'react';
import {
  Typography,
  Grid,
  Box,
  Container,
  Button,
  CircularProgress,
  Alert,
  Paper,
  styled,
  InputBase,
  IconButton
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import ProductCard from '../components/ProductCard';
import summerSaleImage from '../assets/images/summer-sale.jpg';
import techGadgetsImage from '../assets/images/tech-gadgets.jpg';
import trendingFashionImage from '../assets/images/trending-fashion.jpg';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css';

const StyledCarousel = styled(Carousel)({
  '& .Carousel-indicators-container': {
    bottom: '20px',
    '& button': {
      backgroundColor: 'white',
      opacity: 0.6,
      '&:hover': {
        opacity: 1,
      },
      '&.selected': {
        opacity: 1,
      },
    },
  },
});

function Home({ products, addToCart, error, loading }) {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const featuredProducts = React.useMemo(() => {
    if (products.length > 15) {
      const shuffledProducts = shuffleArray([...products]);
      return shuffledProducts.slice(0, 15);
    }
    return products;
  }, [products]);

  const [animatedCards, setAnimatedCards] = React.useState([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCards(featuredProducts.map((_, index) => index));
    }, 100);
    return () => clearTimeout(timer);
  }, [featuredProducts]);

  const bannerImages = [
    {
      url: summerSaleImage,
      title: 'Summer Sale - Up to 50% Off',
      description: 'Shop now for the best deals on summer essentials!',
    },
    {
      url: techGadgetsImage,
      title: 'New Tech Gadgets',
      description: 'Explore the latest in tech and gadgets.',
    },
    {
      url: trendingFashionImage,
      title: 'Trending Fashion',
      description: 'Discover the newest fashion trends for this season.',
    },
  ];

  return (
    <Box sx={{ my: 0 }}>
      {/* Search Bar */}
      <Box sx={{ 
        backgroundColor: 'background.paper',
        py: 2,
        px: { xs: 2, sm: 3 },
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
          <Paper component="form" sx={{
            p: '4px 16px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
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
        </Container>
      </Box>

      {/* Hero Section */}
      <Paper elevation={3} sx={{ borderRadius: 0, overflow: 'hidden', marginBottom: '2rem', border: 'none' }}>
        <StyledCarousel
          animation="slide"
          autoPlay={true}
          interval={2500}
          navButtonsAlwaysVisible={true}
          navButtonsProps={{
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              borderRadius: 0,
            },
          }}
          indicatorIconButtonProps={{
            style: {
              padding: '10px',
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              backgroundColor: '#fff',
            },
          }}
        >
          {bannerImages.map((item, i) => (
            <Box key={i} sx={{ position: 'relative' }}>
              <img
                src={item.url}
                alt={item.title}
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: '#fff',
                  padding: '30px',
                }}
              >
                <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#fff' }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#fff' }}>
                  {item.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </StyledCarousel>
      </Paper>

      {/* Featured Products Section */}
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          sx={{ my: 4, color: 'black', fontWeight: 700 }}
        >
          Featured Products
        </Typography>
        {error ? (
          <Alert severity="error">{error.message}</Alert>
        ) : loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {featuredProducts.map((product, index) => (
              <Grid
                item
                key={product._id}
                xs={12}
                sm={6}
                md={4}
                className={animatedCards.includes(index) ? 'product-card-animated' : ''}
              >
                <ProductCard product={product} addToCart={addToCart} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Button variant="contained" size="large" href="/shop">
          SHOW MORE
        </Button>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          backgroundColor: 'background.paper',
          py: 8,
          mt: 8,
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={6}>
            {/* Left Content */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontFamily: '"Montserrat", sans-serif',
                  background: 'linear-gradient(45deg, #FF6A00, #FFA726)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2,
                }}
              >
                Global Marketplace, Local Impact
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  mb: 4,
                  fontFamily: '"Lato", sans-serif',
                }}
              >
                Loremxyz connects millions of buyers with trusted suppliers worldwide. Our platform powers commerce across 200+ countries, offering an unparalleled selection of products to meet every need.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 1,
                  background: 'linear-gradient(45deg, #FF6A00, #FFA726)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #E65A00, #FF9800)',
                  },
                }}
              >
                Learn More
              </Button>
            </Grid>

            {/* Stats Right Side */}
            <Grid item xs={12} md={6}>
              <Grid container spacing={4}>
                {[
                  { value: '100M+', label: 'Quality Products' },
                  { value: '150K+', label: 'Trusted Suppliers' },
                  { value: '3,700+', label: 'Product Categories' },
                  { value: '200+', label: 'Global Markets' },
                ].map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        height: '100%',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        textAlign: 'center',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 3,
                        },
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 900,
                          fontSize: '2rem',
                          fontFamily: '"Playfair Display", serif',
                          mb: 1,
                          background: 'linear-gradient(90deg, #FF6A00, #FFA726)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: 'text.primary',
                          fontFamily: '"Lato", sans-serif',
                          fontWeight: 600,
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;