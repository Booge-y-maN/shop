import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NavigationBar from './components/NavigationBar';
import NavigationBar2 from './components/NavigationBar2'; // alternate nav bar

import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFoundPage from './pages/NotFoundPage';
import BecomeSupplier from './pages/BecomeSupplier';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2874f0',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

function App() {
  const location = useLocation();
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Use NavigationBar2 on these paths
  const showAltNavbar = ['/login', '/register', '/become-a-supplier'].includes(location.pathname);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://mern-stack-ecommerce-app-h5wb.onrender.com/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = product => {
    setCart([...cart, product]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Conditional NavBar */}
      {showAltNavbar ? (
        <NavigationBar2 />
      ) : (
        <NavigationBar cartItemCount={cart.length} />
      )}

      <Container>
        <Routes>
          <Route path="/" element={<Home products={products} loading={loading} addToCart={addToCart} />} />
          <Route path="/shop" element={<Shop products={products} addToCart={addToCart} loading={loading} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/become-a-supplier" element={<BecomeSupplier />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>

      {/* Optionally hide footer too */}
      {!showAltNavbar && <Footer />}
    </ThemeProvider>
  );
}

export default App;
