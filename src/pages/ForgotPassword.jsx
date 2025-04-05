import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Link
} from '@mui/material';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('https://mern-stack-ecommerce-app-h5wb.onrender.com/api/auth/forgot-password', { email });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to send reset instructions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Box sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 1,
        p: 4,
        textAlign: 'center'
      }}>
        {/* Header */}
        <Typography variant="h5" component="h1" sx={{
          mb: 3,
          fontWeight: 700,
          background: 'linear-gradient(to right, #FF6A00, #FF9E00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Reset Your Password
        </Typography>

        {/* Description */}
        <Typography variant="body2" sx={{
          mb: 3,
          color: 'text.secondary',
          fontSize: '0.875rem'
        }}>
          Enter your email and we'll send you instructions to reset your password.
        </Typography>

        {/* Error/Success Messages */}
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        {success && (
          <Typography variant="body2" color="success.main" sx={{ mb: 2, textAlign: 'center' }}>
            Password reset instructions sent to your email!
          </Typography>
        )}

        {/* Form */}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            size="small"
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading || success}
            sx={{
              py: 1.5,
              borderRadius: 1,
              background: 'linear-gradient(to right, #FF6A00, #FF9E00)',
              '&:hover': {
                background: 'linear-gradient(to right, #E65A00, #E68E00)',
              },
              '&:disabled': {
                background: 'rgba(0, 0, 0, 0.12)'
              }
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : success ? (
              'Instructions Sent'
            ) : (
              'Send Reset Instructions'
            )}
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3 }} />

        {/* Back to Login Link */}
        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
          Remember your password?{' '}
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

export default ForgotPassword;