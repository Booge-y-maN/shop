import * as React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select
} from '@mui/material';
import { Link } from 'react-router-dom';

// Country data with flag emojis
const countries = [
  { code: 'AL', name: 'Albania', flag: '🇦🇱' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'XK', name: 'Kosovo', flag: '🇽🇰' }
];

export default function SupplierSignUp() {
  const [country, setCountry] = React.useState('AL');

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
          Become A Supplier
        </Typography>

        {/* Location Field */}
        <Select
          fullWidth
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          variant="outlined"
          sx={{ mt: 1, mb: 2, textAlign: 'left' }}
        >
          {countries.map((c) => (
            <MenuItem key={c.code} value={c.code}>
              {c.flag} {c.name}
            </MenuItem>
          ))}
        </Select>

        {/* Social Sign Up */}
        <Typography variant="body2" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
          OR Continue with
        </Typography>

        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                py: 1,
                textTransform: 'none',
                color: '#DB4437',
                borderColor: '#DB4437',
                '&:hover': { borderColor: '#DB4437', backgroundColor: 'rgba(219, 68, 55, 0.04)' }
              }}
            >
              Google
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                py: 1,
                textTransform: 'none',
                color: '#4267B2',
                borderColor: '#4267B2',
                '&:hover': { borderColor: '#4267B2', backgroundColor: 'rgba(66, 103, 178, 0.04)' }
              }}
            >
              Facebook
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                py: 1,
                textTransform: 'none',
                color: '#0077B5',
                borderColor: '#0077B5',
                '&:hover': { borderColor: '#0077B5', backgroundColor: 'rgba(0, 119, 181, 0.04)' }
              }}
            >
              LinkedIn
            </Button>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>OR</Typography>
        </Divider>

        {/* Email Form */}
        <Box component="form" noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            size="small"
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
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
            Continue
          </Button>
        </Box>

        {/* Sign In Link */}
        <Typography variant="body2" sx={{ mt: 2, fontSize: '0.75rem' }}>
          Already have an account?{' '}
          <Link to="/supplier/login" style={{
            color: '#FF6A00',
            fontWeight: 600,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}