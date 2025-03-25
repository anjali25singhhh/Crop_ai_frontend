import React, { useState } from 'react';
import { Container, Box, Typography, Button, CircularProgress, Alert, useTheme, Fade } from '@mui/material';
import axios from 'axios';
import UploadForm from '../components/UploadForm';
import ResultCard from '../components/ResultCard';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { motion } from 'framer-motion';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Home = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [showLoadingCard, setShowLoadingCard] = useState(false);
  const theme = useTheme();

  const handleUpload = async (file) => {
    setLoading(true);
    setError(null);
    setShowLoadingCard(true);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Show initial loading message
      setLoadingMessage("Analyzing leaf image..."); 
      
      // Artificial delay to show the loading state for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await axios.post('http://localhost:5000/api/predict', formData);
      
      // Update loading message
      setLoadingMessage("Fetching treatment information...");
      
      // Another artificial delay to show the second loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResult(response.data);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to analyze the image. Please try again or check if the server is running.');
    } finally {
      setLoading(false);
      setLoadingMessage("");
      setShowLoadingCard(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          py: 6,
          position: 'relative'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            align="center" 
            gutterBottom 
            color="primary"
            sx={{ 
              fontWeight: 'bold', 
              mb: 1,
              background: 'linear-gradient(90deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            Crop Disease Detective
          </Typography>
          
          <Typography 
            variant="h6" 
            align="center" 
            color="text.secondary" 
            paragraph 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto', 
              mb: 6,
              fontWeight: 'normal'
            }}
          >
            Upload a leaf image to instantly identify plant diseases and get accurate diagnoses powered by machine learning technology.
          </Typography>
        </motion.div>
        
        {/* Loading card that appears during processing */}
        {loading && showLoadingCard && (
          <Fade in={showLoadingCard}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                mb: 4,
                mt: 2,
                p: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(4px)',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(46, 125, 50, 0.1)',
              }}
            >
              <CircularProgress 
                size={60} 
                thickness={4}
                sx={{ 
                  mb: 3,
                  color: theme.palette.primary.main
                }} 
              />
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{
                  fontWeight: 'medium',
                  color: theme.palette.primary.main
                }}
              >
                {loadingMessage}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ maxWidth: 400, textAlign: 'center' }}
              >
                Our AI is analyzing your image to detect plant diseases and prepare treatment recommendations.
              </Typography>
            </Box>
          </Fade>
        )}
        
        {!result ? (
          <Box sx={{ position: 'relative' }}>
            <UploadForm onUpload={handleUpload} isLoading={loading} />
            
            {/* Info box below the upload form */}
            <Box 
              sx={{ 
                mt: 4, 
                p: 3, 
                borderRadius: 3, 
                backgroundColor: 'rgba(46, 125, 50, 0.05)',
                border: '1px solid rgba(46, 125, 50, 0.1)',
                display: 'flex',
                alignItems: 'flex-start',
                maxWidth: 800,
                mx: 'auto'
              }}
            >
              <HelpOutlineIcon 
                sx={{ 
                  mr: 2, 
                  mt: 0.5, 
                  color: theme.palette.primary.main 
                }} 
              />
              <Box>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  How to get the best results:
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  1. Take a clear, well-lit photo of the infected leaf or plant part
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  2. Make sure the diseased area is clearly visible in the frame
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  3. For best accuracy, avoid shadows and ensure the image is in focus
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResultCard result={result} />
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={handleReset}
                size="large"
                startIcon={<RestartAltIcon />}
                sx={{ 
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    backgroundColor: 'rgba(46, 125, 50, 0.05)'
                  }
                }}
              >
                Analyze Another Image
              </Button>
            </Box>
          </motion.div>
        )}
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mt: 3, 
              maxWidth: 800, 
              mx: 'auto',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
          >
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Home;