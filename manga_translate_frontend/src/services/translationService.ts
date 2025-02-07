
const API_URL = 'http://localhost:5003';

interface TranslationProgress {
  progress: number;
  status: string;
}

// const stageProgressMapping: { [key: string]: number } = {
//   'upload': 10,
//   'pending': 20,
//   'detection': 30,
//   'ocr': 40,
//   'mask-generation': 50,
//   'inpainting': 60,
//   'upscaling': 70,
//   'translating': 80,
//   'rendering': 90,
//   'finished': 100,
// };

const statusMapping: { [key: string]: string } = {
  'upload': 'Uploading image',
  'pending': 'Processing image',
  'detection': 'Detecting texts',
  'ocr': 'Extracting texts with OCR',
  'mask-generation': 'Generating text mask',
  'inpainting': 'Running inpainting',
  'upscaling': 'Running upscaling',
  'translating': 'Translating texts',
  'rendering': 'Rendering translated texts',
  'finished': 'Downloading image',
};

export const translateImage = async (file: File, language: string, onProgress: (progress: TranslationProgress) => void) => {
  // Create form data and post to the server backend endpoint server/main.py
  const formData = new FormData();
  formData.append('image', file);
  formData.append('config', JSON.stringify({
    "detector": {
        "detector": "default",
        "detection_size": 1536
    },
    "render": {
        "direction": "auto"
    },
    "translator": {
        "translator": "offline",
        "target_lang": language
    }
  }));


  const response = await fetch(`${API_URL}/translate/with-form/image/stream`, {
    method: 'POST',
    body: formData
  });

  const reader = response.body?.getReader();
  let buffer = new Uint8Array();
  let currentStatus = '';

  while (true && reader) {
    const { done, value } = await reader.read();
    if (done) break;

    // Combine with existing buffer
    const newBuffer = new Uint8Array(buffer.length + value.length);
    newBuffer.set(buffer);
    newBuffer.set(value, buffer.length);
    buffer = newBuffer;

    // Process chunks
    while (buffer.length >= 5) {
      const dataSize = new DataView(buffer.buffer).getUint32(1, false);
      const totalSize = 5 + dataSize;
      if (buffer.length < totalSize) break;

      const statusCode = buffer[0];
      const data = buffer.slice(5, totalSize);
      const decoder = new TextDecoder('utf-8');

      switch (statusCode) {
        case 0: // Final result
          return new Blob([data], { type: 'image/png' });
        case 1: // Progress update
          const status = decoder.decode(data);
          if (statusMapping[status]) {
            currentStatus = statusMapping[status];
            onProgress({
              progress: 0,
              status: currentStatus
            });
          }
          break;
        case 2: // Error
          throw new Error(decoder.decode(data));
        case 3: // Queue position
          onProgress({
            progress: 0,
            status: `Queued (Position: ${decoder.decode(data)})`
          });
          break;
        case 4: // Waiting for translator
          onProgress({
            progress: 0,
            status: 'Waiting for translator...'
          });
          break;
      }
      buffer = buffer.slice(totalSize);
    }
  }
};