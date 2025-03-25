import React, { useState } from 'react';
import { Paper, Typography, Box, Chip, LinearProgress, Accordion, AccordionSummary, AccordionDetails, Divider, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import InfoIcon from '@mui/icons-material/Info';
// import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
// import ShieldIcon from '@mui/icons-material/Shield';
// import ScienceIcon from '@mui/icons-material/Science';
// import EcoIcon from '@mui/icons-material/Eco';
// import LinkIcon from '@mui/icons-material/Link';
import { 
    ExpandMoreIcon, 
    InfoIcon, 
    TipsAndUpdatesIcon, 
    ShieldIcon, 
    ScienceIcon, 
    EcoIcon, 
    LinkIcon 
  } from './IconSubstitutes';

const ResultCard = ({ result }) => {
  const [expanded, setExpanded] = useState('info');
  const theme = useTheme();
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  // Get remedy from result or use empty object if not available
  const remedy = result.remedy || {};

  // Function to get gradient color based on confidence
  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return '#388e3c'; // High confidence - green
    if (confidence >= 0.7) return '#fbc02d'; // Medium confidence - yellow
    return '#e53935'; // Low confidence - red
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
          mt: 4,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(46, 125, 50, 0.1)',
          position: 'relative',
          overflow: 'hidden'
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
            color: theme.palette.primary.main, 
            fontWeight: 'bold',
            pt: 1,
            mb: 3
          }}
        >
          Analysis Results
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 4,
          background: 'linear-gradient(to bottom, rgba(200, 230, 201, 0.2), rgba(255, 255, 255, 0))',
          borderRadius: 2,
          p: 3
        }}>
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box 
            sx={{ 
                border: '1px solid #e0e0e0', 
                borderRadius: 2, 
                p: 0.5, 
                backgroundColor: 'white',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                mb: 2,
                width: '300px', // Fixed width
                height: '170px', // Fixed height
                mx: 'auto',  // Center the box
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden' // Prevent overflow
            }}
            >
            <img 
                src={`http://localhost:5000${result.image_url}`} 
                alt="Analyzed leaf" 
                style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain', 
                borderRadius: 6
                }} 
            />
            </Box>
              
              <Chip 
                label={`${result.top_predictions[0].class}`}
                color="primary"
                sx={{ 
                  fontSize: '1rem', 
                  py: 2, 
                  px: 1, 
                  fontWeight: 'bold',
                  boxShadow: '0 2px 8px rgba(46, 125, 50, 0.2)'
                }}
              />
            </motion.div>
          </Box>
          
          <Box sx={{ flex: 1.2 }}>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.primary.main
                }}
              >
                <ScienceIcon sx={{ mr: 1 }} /> Diagnosis
              </Typography>
              
              <Typography 
                variant="body1" 
                gutterBottom 
                sx={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: 'text.primary',
                  mb: 3
                }}
              >
                {result.predicted_class}
              </Typography>
              
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.primary.main
                }}
              >
                <TipsAndUpdatesIcon sx={{ mr: 1 }} /> Confidence
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {confidence => {
                      if (confidence >= 0.9) return 'High Confidence';
                      if (confidence >= 0.7) return 'Medium Confidence';
                      return 'Low Confidence';
                    }}(result.confidence)
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {(result.confidence * 100).toFixed(1)}%
                  </Typography>
                </Box>
                
                <LinearProgress 
                  variant="determinate" 
                  value={result.confidence * 100} 
                  sx={{ 
                    height: 10, 
                    borderRadius: 5, 
                    mb: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    '& .MuiLinearProgress-bar': {
                      background: `linear-gradient(90deg, ${getConfidenceColor(result.confidence - 0.2)} 0%, ${getConfidenceColor(result.confidence)} 100%)`
                    }
                  }} 
                />
              </Box>
              
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.primary.main
                }}
              >
                <LinkIcon sx={{ mr: 1 }} /> Alternative Diagnoses
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {result.top_predictions.slice(1).map((pred, index) => (
                  <Chip 
                    key={index}
                    label={`${pred.class}: ${(pred.confidence * 100).toFixed(1)}%`}
                    variant="outlined"
                    size="medium"
                    sx={{
                      borderColor: 'rgba(46, 125, 50, 0.3)',
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.08)'
                      }
                    }}
                  />
                ))}
              </Box>
            </motion.div>
          </Box>
        </Box>

        {/* Treatment Recommendations */}
        {remedy && Object.keys(remedy).length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 3 }} />
            <Typography 
              variant="h5" 
              gutterBottom 
              align="center" 
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                mb: 3
              }}
            >
              Treatment Recommendations
            </Typography>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {remedy.info && (
                <Accordion 
                  expanded={expanded === 'info'} 
                  onChange={handleChange('info')}
                  sx={{ 
                    mb: 2,
                    borderRadius: '8px',
                    boxShadow: expanded === 'info' ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 2px 6px rgba(0, 0, 0, 0.05)',
                    '&:before': { display: 'none' },
                    border: '1px solid',
                    borderColor: expanded === 'info' ? 'rgba(46, 125, 50, 0.3)' : 'rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden'
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      backgroundColor: expanded === 'info' ? 'rgba(46, 125, 50, 0.08)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.05)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <InfoIcon sx={{ mr: 1.5, color: 'info.main' }} />
                      <Typography variant="subtitle1" fontWeight="medium">Information</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ lineHeight: 1.7 }}>{remedy.info}</Typography>
                  </AccordionDetails>
                </Accordion>
              )}
              
              {remedy.treatment && (
                <Accordion 
                  expanded={expanded === 'treatment'} 
                  onChange={handleChange('treatment')}
                  sx={{ 
                    mb: 2,
                    borderRadius: '8px',
                    boxShadow: expanded === 'treatment' ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 2px 6px rgba(0, 0, 0, 0.05)',
                    '&:before': { display: 'none' },
                    border: '1px solid',
                    borderColor: expanded === 'treatment' ? 'rgba(46, 125, 50, 0.3)' : 'rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden'
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      backgroundColor: expanded === 'treatment' ? 'rgba(46, 125, 50, 0.08)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.05)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TipsAndUpdatesIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
                      <Typography variant="subtitle1" fontWeight="medium">Treatment</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ lineHeight: 1.7 }}>{remedy.treatment}</Typography>
                  </AccordionDetails>
                </Accordion>
              )}
              
              {remedy.prevention && (
                <Accordion 
                  expanded={expanded === 'prevention'} 
                  onChange={handleChange('prevention')}
                  sx={{ 
                    mb: 2,
                    borderRadius: '8px',
                    boxShadow: expanded === 'prevention' ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 2px 6px rgba(0, 0, 0, 0.05)',
                    '&:before': { display: 'none' },
                    border: '1px solid',
                    borderColor: expanded === 'prevention' ? 'rgba(46, 125, 50, 0.3)' : 'rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden'
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      backgroundColor: expanded === 'prevention' ? 'rgba(46, 125, 50, 0.08)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.05)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ShieldIcon sx={{ mr: 1.5, color: '#f57c00' }} />
                      <Typography variant="subtitle1" fontWeight="medium">Prevention</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ lineHeight: 1.7 }}>{remedy.prevention}</Typography>
                  </AccordionDetails>
                </Accordion>
              )}
              
              {remedy.chemical_control && (
                <Accordion 
                  expanded={expanded === 'chemical'} 
                  onChange={handleChange('chemical')}
                  sx={{ 
                    mb: 2,
                    borderRadius: '8px',
                    boxShadow: expanded === 'chemical' ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 2px 6px rgba(0, 0, 0, 0.05)',
                    '&:before': { display: 'none' },
                    border: '1px solid',
                    borderColor: expanded === 'chemical' ? 'rgba(46, 125, 50, 0.3)' : 'rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden'
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      backgroundColor: expanded === 'chemical' ? 'rgba(46, 125, 50, 0.08)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.05)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ScienceIcon sx={{ mr: 1.5, color: '#5c6bc0' }} />
                      <Typography variant="subtitle1" fontWeight="medium">Chemical Control</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ lineHeight: 1.7 }}>{remedy.chemical_control}</Typography>
                  </AccordionDetails>
                </Accordion>
              )}
              
              {remedy.organic_control && (
                <Accordion 
                  expanded={expanded === 'organic'} 
                  onChange={handleChange('organic')}
                  sx={{ 
                    mb: 2,
                    borderRadius: '8px',
                    boxShadow: expanded === 'organic' ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 2px 6px rgba(0, 0, 0, 0.05)',
                    '&:before': { display: 'none' },
                    border: '1px solid',
                    borderColor: expanded === 'organic' ? 'rgba(46, 125, 50, 0.3)' : 'rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden'
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      backgroundColor: expanded === 'organic' ? 'rgba(46, 125, 50, 0.08)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.05)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EcoIcon sx={{ mr: 1.5, color: '#43a047' }} />
                      <Typography variant="subtitle1" fontWeight="medium">Organic Control</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ lineHeight: 1.7 }}>{remedy.organic_control}</Typography>
                  </AccordionDetails>
                </Accordion>
              )}
            </motion.div>
            
            {remedy.source_note && (
              <Box 
                sx={{ 
                  mt: 3, 
                  p: 2, 
                  bgcolor: 'rgba(46, 125, 50, 0.05)', 
                  borderRadius: 2,
                  border: '1px solid rgba(46, 125, 50, 0.1)'
                }}
              >
                <Typography variant="caption" color="text.secondary" fontStyle="italic">
                  {remedy.source_note}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

export default ResultCard;