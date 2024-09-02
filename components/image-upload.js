'use client';

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import Image from 'next/image';

const ImageUpload = ({ onUpload }) => {
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleUploadComplete = (res) => {
    const urls = res.map(file => file.url);
    setUploadedUrls(urls);
    if (onUpload) {
      onUpload(urls); // Pass the URLs to the parent component
    }
  };

  return (
    <div>
      <UploadButton 
        endpoint='imageUploader'
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />

      {uploadedUrls.length > 0 && uploadedUrls.map((url, index) => (
        <div key={index} className="h-24 relative">
          <Image 
            src={url} 
            alt={`Uploaded ${index + 1}`} 
            layout="fill" // Adjust layout as needed
            objectFit="cover" // Adjust objectFit as needed
            className="rounded-lg" 
          />
        </div>
      ))}
    </div>
  );
};

export default ImageUpload;
