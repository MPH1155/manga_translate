import React, { useState, JSX } from 'react';
import { Container, Box, Typography, Button, ThemeProvider, CardMedia, Card, Icon, AppBar, Toolbar } from '@mui/material';
import { ImageUpload } from './components/ImageUpload.tsx';
import { TranslationResult } from './components/TranslationResult.tsx';
import { translateImage } from './services/translationService.ts';
import { ProgressDisplay } from './components/ProgressDisplay.tsx';
import { color, motion } from 'framer-motion';
import 'img-comparison-slider';
import './font.css';
import theme from './theme.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DownloadIcon from '@mui/icons-material/Download';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import './slider.css'




function App() {
  const [translatedImage, setTranslatedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [showSubmissionBox, setShowSubmissionBox] = useState(true);

  const handleUpload = async (file: File, language: string) => {
    setLoading(true);
    setProgress(0);
    setStatus('Starting translation...');
    try {
      const result = await translateImage(file, language, ({ progress, status }) => {
        setProgress(progress);
        setStatus(status);
      });
      if (result) {
        setTranslatedImage(URL.createObjectURL(result));
        setShowSubmissionBox(false); // Hide submission box on success
      } else {
        setStatus('Translation failed: No result');
      }
    } catch (error) {
      console.error('Translation failed:', error);
      setStatus('Translation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTranslateNextPage = () => {
    setTranslatedImage(null);
    setShowSubmissionBox(true);
  };

  const handleScrollToTranslator = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const element = document.getElementById('translator');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDownloadImage = () => {
    if (translatedImage) {
      const link = document.createElement('a');
      link.href = translatedImage;
      link.download = 'translated-image.png'; // Specify the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar 
      position='fixed' 
      sx={{ 
        top: 0,
        background: 'linear-gradient(to bottom, #1a1a1a, transparent)', 
        boxShadow: 'none', 
        padding: 1,
        zIndex: 10
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo on the left */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '5%' }}>
        <a 
          href="/" 
          style={{ 
            display: 'flex',            
            alignItems: 'center',       
            textDecoration: 'none', 
            color: 'white' 
          }}
        >
            <img src="/logo/logo.png" alt="Logo" style={{ height: '40px' }} />
            <Typography variant="h6" sx={{ fontFamily: 'SF Pro Display', fontWeight: 'bold', fontSize: '1.5rem', marginLeft: '10px' }}>
              Manga Translator
            </Typography>
          </a>
        </Box>
        {/* Navigation items */}
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', fontFamily: 'SF Pro Display', fontWeight: 'bold', marginRight: '5%' }}>
        <Button 
          variant='contained' 
          onClick={handleScrollToTranslator}
          size='medium'
          sx={{  
            background: 'linear-gradient(90deg, #2962ff 33%, #d500f9)', 
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(90deg,rgb(49, 23, 250) 33%, #d500f9)',
              color: 'white',
            },
            }}
        >
          Try Now
        </Button>
          <a href="/faq" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="body1" sx={{ cursor: 'pointer' }}>
              FAQ
            </Typography>
          </a>
          <Typography variant="body1" sx={{ cursor: 'pointer' }}>
            Login
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
      <Container maxWidth="md" 
        sx={{ 
          backgroundColor: 'background.default', // Use theme background color
          minHeight: '100vh',
          minWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflow: 'hidden',
          padding: 0,
          
          position : 'relative',
          backgroundImage: 'url(/backgroundImage/background-transformed-cropped.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'right',
        }}
      >
        
        {/* Fade layer overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, black, transparent)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <Box sx={{ maxWidth: 'md', padding: 0, marginLeft: '10%', marginBottom:'5%', zIndex: 1 }}>
          <Typography variant='h1' component='h1' gutterBottom align='left' sx={{fontFamily: 'SF Pro Display', fontWeight: 'bold', fontSize: '6rem'}}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Translate First
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
              style={{marginTop : 7}}
            >
              Then Immerse
            </motion.div>
          </Typography>
          <Typography variant='body1' align='left' sx={{fontFamily: 'SF Pro Display', fontWeight: 'normal', fontSize: '1.5rem'}}>
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
            >
              Don't let language barriers and slow releases keep you from your favourite manga. <br />Translate, read, and stay ahead—instantly.
            </motion.div>
          </Typography>
          <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
            >
              <Button 
                variant='contained' 
                onClick={handleScrollToTranslator}
                size='large'
                sx={{ 
                  mt: 2, 
                  background: 'linear-gradient(90deg, #2962ff 33%, #d500f9)', 
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(90deg,rgb(49, 23, 250) 33%, #d500f9)',
                    color: 'white',
                  },
                  }}
              >
                Get Started for free
              </Button>
            </motion.div>
            <Box 
              sx={{
                position: 'absolute',
                bottom: '7%',
                left: '48.5%',
                transform: 'translateX(-50%)',
                animation: 'bounce 2.5s infinite',
                '@keyframes bounce': {
                  '0%, 100%': {
                    transform: 'translateY(0)',
                  },
                  '50%': {
                    transform: 'translateY(-10px)',
                  },
                  
                },
              }}
            > 
              <KeyboardArrowDownIcon sx={{ fontSize: 48, color: 'white' }} />
            </Box>
        </Box>
      </Container>
      
      <Container
        id="beforeAfter"
        maxWidth="md" 
        sx={{ 
          backgroundColor: 'background.default', 
          minHeight: '110vh',
          minWidth: '100%',
          display: 'flex',
          flexDirection: 'row', // set layout to horizontal
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          paddingTop: '5%',
          paddingBottom: '5%',
          
        }}
      >
        <Box sx={{ width: '45%', padding: 0, marginLeft: '5%', }}>
          <Typography 
            variant='h2' 
            component='h2' 
            gutterBottom 
            align='left' 
            sx={{ fontFamily: 'SF Pro Display', fontWeight: 'bold', fontSize: '6rem' }}
          >
            Where Manga Transcends Boundaries
          </Typography>
          <Typography 
            variant='body1' 
            align='left' 
            sx={{ fontFamily: 'SF Pro Display', fontWeight: 'normal', fontSize: '1.5rem' }}
          >
            Experience lightning-fast, fully automatic translation powered by deep learning models.
            Our innovative tool performs OCR, inpainting, and translation in seconds, letting you dive into your favourite manga without delay.
          </Typography>
        </Box>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-end', // Use flex-end to align children to the right
            padding: 0, 
            marginRight: '5%', // Remove right margin to align to the webpage's right edge
            marginLeft: '5%',
            width: '35%',
          }}
        >
          <img-comparison-slider class="custom-animated-handle coloured-slider">
            <figure slot="first" className="before">
              <img src="/images/before.jpg" alt="Original manga" style={{ width: '100%', height: 'auto' }} />
              <figcaption>Before</figcaption>
            </figure>
            <figure slot="second" className="after">
              <img src="/images/after.png" alt="Translated manga" style={{ width: '100%', height: 'auto' }} />
              <figcaption>After</figcaption>
            </figure>
            <svg slot="handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
              <path stroke="#000" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#000" vector-effect="non-scaling-stroke"></path>
            </svg>
          </img-comparison-slider>
        </Box>
      </Container>
      <Container
        id="demo"
        maxWidth="md" 
        sx={{ 
          backgroundColor: 'background.default',
          minHeight: '110vh',
          minWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          margin: 0,
        }}
      >
        
        <Typography 
          variant="h3" 
          component="h3" 
          gutterBottom 
          align="center" 
          sx={{ fontFamily: 'SF Pro Display', fontWeight: 'bold', fontSize: '6rem' }}
        >
          Effortless Manga <br/> Immersion
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ fontFamily: 'SF Pro Display', fontWeight: 'normal', fontSize: '1.5rem' }}
        >
          Experience instantaneous translations that empower you to dive deeper into captivating manga narratives <br/>Fast, Accurate, and Effortless.
        </Typography>
        <div
          style={{ 
            width: '80%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginTop: 20,
            marginBottom: 20,
            background: 'linear-gradient(223.94deg, #00bce6 8.32%, #2962ff 49.61%, #d500f9 90.41%)',
            border: '3px solid #0000',
            backgroundClip: 'initial',
            backgroundOrigin: 'border-box',
            boxShadow: '-1.83px 2.51px 15.54px 0 #7339fd80, 0 -.91px 13.71px 0 #01bde680',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <video
            src="/demoVideo/demo.mp4"
            autoPlay
            loop
            muted
            style={{ width: '100%', display: 'block', borderRadius: '10px' }}
          />
        </div>
      </Container>
      
      <Container 
        id="translator"
        maxWidth="md" 
        sx={{ 
          backgroundColor: 'rgb(26, 26, 26)', 
          minHeight: '100vh',
          minWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
        }}
      >
        {(!translatedImage && showSubmissionBox) && <ImageUpload onUpload={handleUpload} />}
          {loading && <ProgressDisplay progress={progress} status={status} />}
          {translatedImage && (
            <>
              <TranslationResult imageUrl={translatedImage} />
              <Box 
                sx={{ 
                  mt: 2,
                  mb: 4,
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center',
                }} 
              >
              <Button variant='outlined' size='large' color='secondary' onClick={handleTranslateNextPage} sx={{ mt: 2 }}>
                Translate Next Page
              </Button>
              <Button variant='outlined' size='large' color='secondary' sx={{ mt: 2, ml: 2 }} onClick={handleDownloadImage}>
                <Icon component={DownloadIcon} sx={{ fontSize: 22, mr: 1 }} />
                Download Image
              </Button>
              </Box>
            </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
