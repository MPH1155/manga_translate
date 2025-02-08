import React from 'react';
import { Container, Typography, Box, AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const handleScrollToTranslator = (event: React.MouseEvent<HTMLButtonElement>, navigate: any) => {
  event.preventDefault();
  // Navigate to the root page
  navigate("/");
  // Wait a short time to allow the root page to render, then scroll to the translator element
  setTimeout(() => {
    const element = document.getElementById('translator');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
};

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
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
          href={process.env.PUBLIC_URL + '/#/'}
          style={{ 
            display: 'flex',            
            alignItems: 'center',       
            textDecoration: 'none', 
            color: 'white' 
          }}
        >
            <img src={process.env.PUBLIC_URL + '/logo/logo.png'} alt="Logo" style={{ height: '40px' }} />
            <Typography variant="h6" sx={{ fontFamily: 'SF Pro Display', fontWeight: 'bold', fontSize: '1.5rem', marginLeft: '10px' }}>
              Manga Translator
            </Typography>
          </a>
        </Box>
        {/* Navigation items */}
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', fontFamily: 'SF Pro Display', fontWeight: 'bold', marginRight: '5%' }}>
        <Button 
          variant='contained' 
          onClick={(e) => handleScrollToTranslator(e, navigate)}
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
          <a href={process.env.PUBLIC_URL + '/#/faq'} style={{ textDecoration: 'none', color: 'white' }}>
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
        minHeight: '100vh',
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        overflow: 'hidden',
        padding: 0,
      }}>
      <Box sx={{ maxWidth: '60%', padding: 0, mt: '10%', ml: '7%', mb: '10%', zIndex: 1, color: 'white' }}>
        <Typography variant="h1" gutterBottom sx={{fontFamily: 'SF Pro Display', fontWeight: 'bold', fontSize: '6rem'}}>
          FAQ
        </Typography>
        <Typography variant="body1" sx={{fontFamily: 'SF Pro Display', fontWeight: 'bold', fontSize: '1.5rem'}}>
          1. How accurate are the translations?<br/>
          Answer:<br/>
          Our translations are powered by deep learning models trained on manga-specific terminology and cultural nuances. While we achieve high accuracy for most mainstream genres, highly stylized dialogue (e.g., archaic language, slang) may require minor manual adjustments.<br/>
          <br/>


          2. Which languages do you support?<br/>
          Answer:<br/>
          We currently support translations between Japanese ↔ English, Korean ↔ English, with plans to finetune custom models to increase translation quality of languages like Chinese, Spanish, French, and German.<br/>
          <br/>


          3. What file formats can I upload?<br/>
          Answer:<br/>
          We accept JPEG, PNG, and PDF files. For best results, ensure images are high-resolution (300+ DPI) and free of motion blur or heavy shadows.<br/>
          <br/>


          4. How does the "OCR + Inpainting" process work?<br/>
          Answer:<br/>
          Our tool first extracts text from your manga page using Optical Character Recognition (OCR). It then seamlessly reconstructs the text area (inpainting) to blend with the original artwork before overlaying the translated text in a manga-style font.<br/>
          <br/>


          5. Is my uploaded manga data stored or shared?<br/>
          Answer:<br/>
          No. Files are processed in real-time and deleted immediately after translation. We never store, share, or use your data for training purposes.<br/>
          <br/>


          6. Can I edit the translated text after processing?<br/>
          Answer:<br/>
          Currently, manual text editing is not available. However, we're actively developing an online editor to let users customize text placement, fonts, and dialogue bubbles. Stay tuned for updates!<br/>
          <br/>


          7. Why does my uploaded page take time to process?<br/>
          Answer:<br/>
          Processing times vary based on page complexity (e.g., dense text, intricate artwork). Most pages translate in under 10 seconds, but high-resolution PDFs with 50+ pages may take 1-2 minutes.<br/>
          <br/>


          8. Is this tool free to use?<br/>
          Answer:<br/>
          We offer 50 free translations/month for unregistered users. Premium plans (starting at $5/month) include unlimited translations, batch processing, and priority support.<br/>
          <br/>


          9. Can I translate unreleased/raw manga chapters?<br/>
          Answer:<br/>
          Yes! Our tool works on any uploaded manga page. However, we strictly prohibit distributing translated content without proper licensing.<br/>
          <br/>


          10. How can I deliver feedback about translations?<br/>
          Answer:<br/>
          Please email detailed feedback (including screenshots and descriptions of errors) to mangatranslator@gmail.com. Our team reviews submissions daily and uses them to improve accuracy in future model updates.<br/>
          <br/>

          <a href={process.env.PUBLIC_URL + '/#/'} style={{ textDecoration: 'underline', color: 'white',  }}>
              Back To Home Page
          </a>
        </Typography>
        
      </Box>
    </Container>
    </>
  );
};

export default FAQ;