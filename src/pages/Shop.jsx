import * as React from 'react';
import { Grid, Typography, Container, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import ProductCard from '../components/ProductCard';
import '../App.css';

function Shop({ products, addToCart, loading }) {
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [animatedCards, setAnimatedCards] = React.useState([]); // Track animated card indices
  const [visibleProducts, setVisibleProducts] = React.useState(15); // Number of products to show initially

  // Capitalize the first letter of each category
  const capitalizeCategory = category => category.charAt(0).toUpperCase() + category.slice(1);

  const uniqueCategories = Array.from(new Set(products.map(product => capitalizeCategory(product.category))));

  const filteredProducts = categoryFilter === 'all' ? products : products.filter(product => capitalizeCategory(product.category) === categoryFilter);

  const productsToShow = filteredProducts.slice(0, visibleProducts);

  const handleCategoryChange = event => {
    setCategoryFilter(event.target.value);
    setVisibleProducts(15); // Reset visible products when category changes
    setAnimatedCards([]); // Reset animations when category changes
  };

  React.useEffect(() => {
    // Add animation classes incrementally for visible product cards
    const timer = setTimeout(() => {
      setAnimatedCards(productsToShow.map((_, index) => index));
    }, 100);

    return () => clearTimeout(timer);
  }, [productsToShow]);

  // Infinite scroll logic
  React.useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      // Load more products when the user is near the bottom
      if (scrollTop + clientHeight >= scrollHeight - 100 && visibleProducts < filteredProducts.length) {
        setVisibleProducts(prev => prev + 15); // Load 15 more products
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleProducts, filteredProducts.length]);

  if (loading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ my: 2 }}>
        Shop
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="category-filter-label">Filter by Category</InputLabel>
        <Select labelId="category-filter-label" id="category-filter" value={categoryFilter} label="Filter by Category" onChange={handleCategoryChange}>
          <MenuItem value="all">All Categories</MenuItem>
          {uniqueCategories.map(category => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {productsToShow.map((product, index) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} className={animatedCards.includes(index) ? 'product-card-animated' : ''}>
            <ProductCard product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>

      {/* Show loading spinner when more products are being loaded */}
      {visibleProducts < filteredProducts.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default Shop;