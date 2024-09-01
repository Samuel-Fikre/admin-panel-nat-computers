'use client';

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";

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
        <div key={index} className="h-24">
          <img src={url} alt={`Uploaded ${index + 1}`} className="rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default ImageUpload;
