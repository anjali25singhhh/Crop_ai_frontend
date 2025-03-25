import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { keyframes } from '@mui/system';
import {
  Avatar,
  Button,
  TextField,
  Paper,
  Grid,
  Link,
  FormControlLabel,
  Checkbox,
  Container,
  Card,
  CardContent,
  Tabs,
  Tab,
  Collapse,
  Alert,
  IconButton
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { EcoIcon, LinkIcon } from './components/IconSubstitutes';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import AgricultureIcon from '@mui/icons-material/Agriculture';

// Create a custom theme with enhanced colors and typography
const theme = createTheme({
  palette: {
    primary: {
      light: '#4caf50',
      main: '#2e7d32',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffb74d',
      main: '#f9a825',
      dark: '#f57f17',
      contrastText: '#fff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#263238',
      secondary: '#546e7a',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.1)',
          transition: '0.3s',
          '&:hover': {
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.15)',
          },
        },
      },
    },
  },
});

// Simple animations
const cloudMove = keyframes`
  0% { transform: translateX(-5%); }
  100% { transform: translateX(105%); }
`;

const gentleSway = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(3deg); }
  100% { transform: rotate(0deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Simple pulse animation for elements
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Background with farmers and agricultural elements
const FarmBackground = () => (
  <Box sx={{ 
    position: 'absolute', 
    width: '100%', 
    height: '100%', 
    overflow: 'hidden', 
    zIndex: -1 
  }}>
    {/* Subtle sky gradient */}
    <Box sx={{ 
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(180deg, rgba(200, 230, 201, 0.3) 0%, rgba(255, 255, 255, 0) 100%)',
    }} />
    
    {/* Farm fields at the bottom */}
    <Box sx={{ 
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '25%',
      background: 'linear-gradient(180deg, rgba(200, 230, 201, 0.2) 0%, rgba(200, 230, 201, 0.4) 100%)',
      borderTopLeftRadius: '100% 80%',
      borderTopRightRadius: '100% 80%',
    }}>
      {/* Field rows - very subtle */}
      {[...Array(8)].map((_, i) => (
        <Box key={`field-row-${i}`} sx={{
          position: 'absolute',
          bottom: `${i * 3}%`,
          left: 0,
          width: '100%',
          height: '1px',
          background: 'rgba(46, 125, 50, 0.1)',
        }} />
      ))}
    </Box>
    
    {/* Cloud */}
    <Box sx={{ 
      position: 'absolute',
      top: '10%',
      left: '0',
      width: '80px',
      height: '30px',
      background: 'rgba(255, 255, 255, 0.6)',
      borderRadius: '20px',
      animation: `${cloudMove} 60s linear infinite`,
      '&:before': {
        content: '""',
        position: 'absolute',
        top: '-15px',
        left: '10px',
        width: '35px',
        height: '35px',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        top: '-20px',
        left: '35px',
        width: '40px',
        height: '40px',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
      }
    }} />
    
    {/* Trees */}
    <Box sx={{ 
      position: 'absolute',
      bottom: '23%',
      right: '10%',
      width: '40px',
      height: '60px',
      background: 'rgba(46, 125, 50, 0.2)',
      borderRadius: '50% 50% 10% 10% / 60% 60% 10% 10%',
      animation: `${gentleSway} 8s ease-in-out infinite`,
      transformOrigin: 'bottom center',
    }} />
    <Box sx={{ 
      position: 'absolute',
      bottom: '22%',
      right: '15%',
      width: '30px',
      height: '45px',
      background: 'rgba(46, 125, 50, 0.15)',
      borderRadius: '50% 50% 10% 10% / 60% 60% 10% 10%',
      animation: `${gentleSway} 10s ease-in-out infinite`,
      animationDelay: '1s',
      transformOrigin: 'bottom center',
    }} />
    
    {/* Barn silhouette */}
    <Box sx={{
      position: 'absolute',
      bottom: '22%',
      left: '8%',
      width: '60px',
      height: '30px',
      background: 'rgba(183, 28, 28, 0.1)',
      borderRadius: '2px',
      '&:before': {
        content: '""',
        position: 'absolute',
        bottom: '100%',
        left: 0,
        width: '60px',
        height: '20px',
        background: 'rgba(183, 28, 28, 0.1)',
        clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
      }
    }} />
    
    {/* Simple farmer silhouette */}
    <Box sx={{
      position: 'absolute',
      bottom: '22%',
      left: '25%',
      width: '20px',
      height: '30px',
      background: 'rgba(62, 39, 35, 0.2)',
      borderRadius: '5px 5px 0 0',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '10px',
        height: '10px',
        background: 'rgba(62, 39, 35, 0.2)',
        borderRadius: '50%',
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '-10px',
        left: '0',
        width: '30px',
        height: '2px',
        background: 'rgba(62, 39, 35, 0.2)',
        transform: 'rotate(30deg)',
        transformOrigin: '0 0',
        animation: `${gentleSway} 3s ease-in-out infinite`,
      }
    }} />
    
    {/* Tractor silhouette */}
    <Box sx={{
      position: 'absolute',
      bottom: '22%',
      left: '60%',
      width: '30px',
      height: '15px',
      background: 'rgba(33, 33, 33, 0.1)',
      borderRadius: '3px',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: '-8px',
        left: '5px',
        width: '12px',
        height: '10px',
        background: 'rgba(33, 33, 33, 0.1)',
        borderRadius: '2px',
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '-3px',
        left: '5px',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'rgba(33, 33, 33, 0.1)',
        boxShadow: '15px 0 0 rgba(33, 33, 33, 0.1)',
      }
    }} />
    
    {/* Windmill silhouette */}
    <Box sx={{
      position: 'absolute',
      bottom: '25%',
      left: '40%',
      width: '5px',
      height: '35px',
      background: 'rgba(66, 66, 66, 0.1)',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-10px',
        width: '25px',
        height: '25px',
        clipPath: 'polygon(50% 50%, 0 0, 100% 0, 50% 50%, 100% 100%, 0 100%, 50% 50%, 0 50%, 100% 50%)',
        background: 'rgba(66, 66, 66, 0.1)',
        animation: `${gentleSway} 5s linear infinite`,
        transformOrigin: 'center center',
      }
    }} />
  </Box>
);

// Auth Context
const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = (userData) => {
    // In a real app, you would validate credentials here
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };
  
  const signup = (userData) => {
    // In a real app, you would create a new user here
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  // Check if user was previously logged in
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth context
const useAuth = () => React.useContext(AuthContext);

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

// Login/Signup Page
const AuthPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    setSuccess('');
  };
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Attempt login
    const result = login(loginData);
    if (result) {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!signupData.email || !signupData.password || !signupData.firstName || !signupData.lastName) {
      setError('Please fill in all fields');
      return;
    }
    
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Attempt signup
    const result = signup(signupData);
    if (result) {
      setSuccess('Account created successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setError('Error creating account');
    }
  };
  
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} sx={{ 
        minHeight: '100vh', 
        alignItems: 'center', 
        justifyContent: 'center',
        py: 4
      }}>
        {/* Left side - App info and benefits */}
        <Grid item xs={12} md={6} sx={{ 
          display: { xs: 'none', md: 'block' },
          animation: `${fadeIn} 1s ease-out`
        }}>
          <Box sx={{ p: 3, maxWidth: '500px', mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Avatar sx={{ 
                bgcolor: 'primary.main', 
                width: 56, 
                height: 56,
                animation: `${pulse} 3s infinite`
              }}>
                <AgricultureIcon fontSize="large" />
              </Avatar>
              <Typography variant="h4" component="h1" sx={{ ml: 2, fontWeight: 700 }}>
                CropCare
              </Typography>
            </Box>
            
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
              Your complete solution for healthier crops and higher yields
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                { 
                  icon: <EcoIcon color="primary" fontSize="large" />,
                  title: 'Sustainable Farming',
                  description: 'Monitor soil conditions, optimize water usage, and make data-driven decisions for sustainable farming practices.'
                },
                { 
                  icon: <LocalFloristIcon color="primary" fontSize="large" />,
                  title: 'Crop Health Analysis',
                  description: 'Early disease detection and AI-powered recommendations to keep your crops flourishing throughout the season.'
                },
                { 
                  icon: <AgricultureIcon color="primary" fontSize="large" />,
                  title: 'Yield Optimization',
                  description: 'Track growth patterns and receive actionable insights to maximize your harvest and profitability.'
                }
              ].map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Card sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    animation: `${fadeIn} 0.8s ease-out`,
                    animationDelay: `${0.3 * index}s`,
                    animationFillMode: 'both'
                  }}>
                    <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                      {item.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="div" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        
        {/* Right side - Auth forms */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            maxWidth: 450, 
            mx: 'auto', 
            p: { xs: 2, sm: 4 },
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            animation: `${fadeIn} 0.8s ease-out`,
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
                  {tabValue === 0 ? 'Sign In' : 'Create Account'}
                </Typography>
              </Box>
              
              {/* Error/Success Messages */}
              <Collapse in={!!error || !!success}>
                {error && (
                  <Alert 
                    severity="error"
                    action={
                      <IconButton 
                        aria-label="close" 
                        color="inherit" 
                        size="small"
                        onClick={() => setError('')}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert 
                    severity="success"
                    action={
                      <IconButton 
                        aria-label="close" 
                        color="inherit" 
                        size="small"
                        onClick={() => setSuccess('')}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {success}
                  </Alert>
                )}
              </Collapse>
              
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="fullWidth" 
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
              >
                <Tab label="Sign In" />
                <Tab label="Sign Up" />
              </Tabs>
              
              {/* Login Form */}
              {tabValue === 0 && (
                <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2" onClick={(e) => {
                        e.preventDefault();
                        setTabValue(1);
                      }}>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              )}
              
              {/* Signup Form */}
              {tabValue === 1 && (
                <Box component="form" onSubmit={handleSignupSubmit} sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={signupData.firstName}
                        onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive updates via email."
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="#" variant="body2" onClick={(e) => {
                        e.preventDefault();
                        setTabValue(0);
                      }}>
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

// Footer component
const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        mt: 4, 
        textAlign: 'center',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
      }}
    >
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 0.5
        }}
      >
        Made with <FavoriteIcon fontSize="small" sx={{ color: '#e91e63', fontSize: '0.875rem' }} /> for healthier crops
      </Typography>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Box 
          sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <FarmBackground />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <Box sx={{ flex: 1 }}>
                      <Home />
                    </Box>
                    <Footer />
                  </>
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;