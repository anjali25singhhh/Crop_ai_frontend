import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container, useTheme, useMediaQuery } from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ScienceIcon from '@mui/icons-material/Science';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" elevation={0} sx={{ 
      background: 'linear-gradient(90deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Container>
        <Toolbar sx={{ px: { xs: 0 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalFloristIcon sx={{ mr: 1, fontSize: 30 }} />
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 'bold',
                backgroundImage: 'linear-gradient(45deg, #ffffff, #d7f5d7)',
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0px 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              Crop Disease Detective
            </Typography>
          </Box>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', ml: 'auto' }}>
              <Button color="inherit" startIcon={<ScienceIcon />}>
                How It Works
              </Button>
              <Button color="inherit" startIcon={<HelpOutlineIcon />}>
                About
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;