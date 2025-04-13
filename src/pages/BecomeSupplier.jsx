import * as React from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Country data with flag emojis
const countries = [
  { code: '', name: 'Select your country', flag: '' },
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
  const [country, setCountry] = React.useState('');
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    captcha: '',
    agreedToTerms: false
  });
  const [captchaText, setCaptchaText] = React.useState('');
  const [userCaptcha, setUserCaptcha] = React.useState('');

  // Generate a simple captcha on component mount
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(captcha);
    setUserCaptcha('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields are filled
    if (!country || !formData.email || !formData.password ||
        !formData.firstName || !formData.lastName ||
        !formData.agreedToTerms || userCaptcha !== captchaText) {
      alert('Please fill in all required fields, check the terms box, and complete the captcha correctly');
      return;
    }

    // If all validations pass, proceed with form submission
    console.log('Form submitted:', { country, ...formData });
    // Here you would typically send the data to your backend
  };

  const isFormValid = () => {
    return country && formData.email && formData.password &&
           formData.firstName && formData.lastName &&
           formData.agreedToTerms && userCaptcha === captchaText;
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
          mb: 3,
          fontWeight: 700,
          background: 'linear-gradient(to right, #FF6A00, #FF9E00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Sign up as a supplier
        </Typography>

        {/* Registration Form */}
        <Box component="form" noValidate onSubmit={handleSubmit}>
          {/* Location Field */}
          <Typography variant="subtitle2" sx={{ textAlign: 'left', mb: 1 }}>Company location:</Typography>
          <Select
            fullWidth
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            variant="outlined"
            sx={{ mb: 3, textAlign: 'left' }}
            displayEmpty
            required
          >
            {countries.map((c) => (
              <MenuItem key={c.code || 'empty'} value={c.code}>
                {c.flag} {c.name}
              </MenuItem>
            ))}
          </Select>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            size="small"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            size="small"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First name"
            name="firstName"
            autoComplete="given-name"
            size="small"
            value={formData.firstName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last name"
            name="lastName"
            autoComplete="family-name"
            size="small"
            value={formData.lastName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* Simple Captcha */}
          <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold', letterSpacing: '3px' }}>
              {captchaText}
            </Typography>
            <TextField
              fullWidth
              required
              label="Enter the text above"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              size="small"
            />
            <Button
              size="small"
              sx={{ mt: 1, fontSize: '0.75rem' }}
              onClick={generateCaptcha}
            >
              Refresh Captcha
            </Button>
          </Box>

          {/* Terms and conditions */}
          <FormControlLabel
            control={
              <Checkbox
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                color="primary"
                required
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                I agree to the{' '}
                <Link href="#" sx={{ color: '#FF6A00' }}>Free Membership Agreement</Link>,{' '}
                <Link href="#" sx={{ color: '#FF6A00' }}>Terms of Use</Link>, and{' '}
                <Link href="#" sx={{ color: '#FF6A00' }}>Privacy Policy</Link>{' '}
                of loremzy.com. I agree to receive more information about the platform's products and services.
              </Typography>
            }
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isFormValid()}
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: 1,
              background: 'linear-gradient(to right, #FF6A00, #FF9E00)',
              '&:hover': {
                background: 'linear-gradient(to right, #E65A00, #E68E00)',
              },
              '&:disabled': {
                background: '#e0e0e0',
                color: '#a0a0a0'
              }
            }}
          >
            Sign Up
          </Button>
        </Box>

        {/* Sign In Link */}
        <Typography variant="body2" sx={{ mt: 3, fontSize: '0.75rem' }}>
          Already have an account?{' '}
          <RouterLink to="/supplier/login" style={{
            color: '#FF6A00',
            fontWeight: 600,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}>
            Sign in
          </RouterLink>
        </Typography>
      </Box>
    </Container>
  );
}