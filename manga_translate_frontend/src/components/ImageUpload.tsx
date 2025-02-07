import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paper, Typography, Box, Button, MenuItem, Select, FormControl, InputLabel, Icon } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import theme from '../theme';

interface ImageUploadProps {
  onUpload: (file: File, language: string) => void;
}

const languages = [
  { code: 'CHT', name: '繁體中文' },
  { code: 'CHS', name: '简体中文' },
  { code: 'ENG', name: 'English' },
  { code: 'JPN', name: '日本語' },
  { code: 'KOR', name: '한국어' },
  { code: 'VIN', name: 'Tiếng Việt' },
  { code: 'CSY', name: 'čeština' },
  { code: 'NLD', name: 'Nederlands' },
  { code: 'FRA', name: 'français' },
  { code: 'DEU', name: 'Deutsch' },
  { code: 'HUN', name: 'magyar nyelv' },
  { code: 'ITA', name: 'italiano' },
  { code: 'PLK', name: 'polski' },
  { code: 'PTB', name: 'português' },
  { code: 'ROM', name: 'limba română' },
  { code: 'RUS', name: 'русский язык' },
  { code: 'ESP', name: 'español' },
  { code: 'TRK', name: 'Türk dili' },
  { code: 'IND', name: 'Indonesia' },
];

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>(languages[0].code);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  });

  const handleUpload = () => {
    if (file) {
      onUpload(file, language);
    }
  };

  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        Width: '100vw', 
        Height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <Paper 
        {...getRootProps()} 
        sx={{ p: 3, 
          cursor: 'pointer', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '70vw',
          height: '50vh',
          maxWidth: '900px',
          border: '3px dashed grey',
          borderRadius: '13px',
          }} 
      >
        <input {...getInputProps()} data-testid="image-upload-input"/>
        {preview ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
            <Typography variant="h6" sx={{fontFamily: 'SF Pro Display', fontWeight: 'normal'}}>Selected image:</Typography>
            <img data-testid="preview-image" src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }}/>
          </Box>
        ) : (
          <>
            <Icon component={FileUploadIcon} sx={{ fontSize: 48 }} />
            <Typography variant="h6" sx={{fontFamily: 'SF Pro Display', fontWeight: 'normal'}}>
              Drag & drop a manga page here, or click to select
            </Typography>
          </>
        )}
      </Paper>
      {preview && (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
          <FormControl sx={{ mt: 2, minWidth: 120, mr: 2}}>
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
              labelId="language-select-label"
              value={language}
              onChange={(e) => setLanguage(e.target.value as string)}
              label="Language"
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" color="secondary" onClick={handleUpload} sx={{ mt: 2, fontFamily: 'SF Pro Display', fontWeight: 'normal'}}>
            Translate
          </Button>
        </Box>
      )}
    </Box>
  );
};