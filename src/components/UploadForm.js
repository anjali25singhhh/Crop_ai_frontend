import React, { useState } from 'react';
import { Paper, Typography, Button, Box, CircularProgress, useTheme, Grow, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import SpeedIcon from '@mui/icons-material/Speed';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import HealingIcon from '@mui/icons-material/Healing';

const UploadForm = ({ onUpload, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const theme = useTheme();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 3, 
          maxWidth: 800, 
          mx: 'auto', 
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(46, 125, 50, 0.1)',
          position: 'relative'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: 8, 
            background: 'linear-gradient(90deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)' 
          }} 
        />
        
        <Typography 
          variant="h5" 
          gutterBottom 
          align="center" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 2, 
            color: theme.palette.primary.main,
            pt: 1
          }}
        >
          Upload Leaf Image
        </Typography>
        
        <Typography 
          variant="body1" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 4 }}
        >
          Get instant plant disease diagnosis with our AI-powered detection system
        </Typography>
        
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
        >
          <Box 
            sx={{
              border: dragActive 
                ? `2px dashed ${theme.palette.primary.main}`
                : '2px dashed #c8e6c9',
              borderRadius: 3,
              p: 2,
              textAlign: 'center',
              backgroundColor: dragActive ? 'rgba(46, 125, 50, 0.05)' : '#f9fbf9',
              cursor: 'pointer',
              minHeight: 250,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: 'rgba(46, 125, 50, 0.05)'
              }
            }}
            onClick={() => document.getElementById('file-input').click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {preview ? (
              <Grow in={!!preview}>
                <Box sx={{ maxHeight: 350, overflow: 'hidden', borderRadius: 2 }}>
                  <img 
                    src={preview} 
                    alt="Preview" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: 350, 
                      objectFit: 'contain',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                    }} 
                  />
                </Box>
              </Grow>
            ) : (
              <>
                <Box 
                  sx={{ 
                    p: 2, 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(46, 125, 50, 0.1)', 
                    mb: 2 
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  Drag and drop or click to upload
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Supports JPG, PNG, JPEG (max 10MB)
                </Typography>
              </>
            )}
            
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </Box>

          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            disabled={!selectedFile || isLoading}
            size="large"
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <ImageSearchIcon />}
            sx={{ 
              py: 1.5, 
              fontWeight: 'bold',
              borderRadius: 2,
              background: 'linear-gradient(45deg, #1b5e20 0%, #2e7d32 100%)',
              boxShadow: '0 4px 14px rgba(46, 125, 50, 0.25)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1b5e20 30%, #2e7d32 90%)',
                boxShadow: '0 6px 14px rgba(46, 125, 50, 0.35)'
              }
            }}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Image'}
          </Button>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <SpeedIcon sx={{ fontSize: 36, color: theme.palette.primary.main, mb: 1 }} />
            <Typography variant="subtitle1" fontWeight="bold">Fast Analysis</Typography>
            <Typography variant="body2" color="text.secondary">Results in seconds</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <MonitorHeartIcon sx={{ fontSize: 36, color: theme.palette.primary.main, mb: 1 }} />
            <Typography variant="subtitle1" fontWeight="bold">Accurate Detection</Typography>
            <Typography variant="body2" color="text.secondary">AI-powered diagnosis</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <HealingIcon sx={{ fontSize: 36, color: theme.palette.primary.main, mb: 1 }} />
            <Typography variant="subtitle1" fontWeight="bold">Treatment Advice</Typography>
            <Typography variant="body2" color="text.secondary">Detailed recommendations</Typography>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default UploadForm;