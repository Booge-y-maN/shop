import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Link
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://mern-stack-ecommerce-app-h5wb.onrender.com/api/auth/register', { name, email, password });
      const token = response.data.token;
      localStorage.setItem('MERNEcommerceToken', token);
      window.location.href = '/';
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors.map(error => error.msg).join(', ');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.msg || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <Box sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 1,
        p: 3,
        textAlign: 'center'
      }}>
        {/* Header */}
        <Typography variant="h5" component="h1" sx={{
          mb: 2,
          fontWeight: 700,
          background: 'linear-gradient(to right, #FF6A00, #FF9E00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Create Your Account
        </Typography>

        {/* Social Sign Up */}
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
          Continue with
        </Typography>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          mb: 2
        }}>
          <Button
            variant="outlined"
            sx={{
              minWidth: 0,
              px: 2,
              textTransform: 'none',
              color: '#DB4437',
              borderColor: '#DB4437',
              '&:hover': { borderColor: '#DB4437', backgroundColor: 'rgba(219, 68, 55, 0.04)' }
            }}
          >
            <GoogleIcon fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            sx={{
              minWidth: 0,
              px: 2,
              textTransform: 'none',
              color: '#4267B2',
              borderColor: '#4267B2',
              '&:hover': { borderColor: '#4267B2', backgroundColor: 'rgba(66, 103, 178, 0.04)' }
            }}
          >
            <FacebookIcon fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            sx={{
              minWidth: 0,
              px: 2,
              textTransform: 'none',
              color: '#0077B5',
              borderColor: '#0077B5',
              '&:hover': { borderColor: '#0077B5', backgroundColor: 'rgba(0, 119, 181, 0.04)' }
            }}
          >
            <LinkedInIcon fontSize="small" />
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>OR</Typography>
        </Divider>

        {/* Error Message */}
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        {/* Email Form */}
        <Box component="form" noValidate onSubmit={handleRegister}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            size="small"
            value={name}
            onChange={e => setName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            size="small"
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            size="small"
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            size="small"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleToggleConfirmPasswordVisibility}
                    edge="end"
                    size="small"
                  >
                    {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 1,
              py: 1,
              borderRadius: 1,
              background: 'linear-gradient(to right, #FF6A00, #FF9E00)',
              '&:hover': {
                background: 'linear-gradient(to right, #E65A00, #E68E00)',
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
          </Button>
        </Box>

        {/* Sign In Link */}
        <Typography variant="body2" sx={{ mt: 2, fontSize: '0.75rem' }}>
          Already have an account?{' '}
          <Link
            component={RouterLink}
            to="/login"
            sx={{
              color: '#FF6A00',
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Register;