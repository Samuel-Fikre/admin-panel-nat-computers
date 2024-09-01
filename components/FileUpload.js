// components/FileUpload.js
import React, { useState } from 'react';
import { uploadFile } from '../utils/uploadFile';

const FileUpload = () => {
  const [fileURL, setFileURL] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const url = await uploadFile(file);
        setFileURL(url);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {fileURL && <a href={fileURL} target="_blank" rel="noopener noreferrer">Download File</a>}
    </div>
  );
};

export default FileUpload;
