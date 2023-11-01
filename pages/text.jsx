import axios from 'axios';
import { useState } from 'react';

function FileUploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const accessToken = typeof window !== 'undefined' && localStorage.getItem('accessToken');
    const photoData = new FormData();

    if (selectedFile) {
      photoData.append('files', selectedFile);

      axios
        .post('http://103.49.169.89:30912/api/v1.0/files', photoData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setProgress(progress);
          },
        })
        .then((response) => {
          // Handle the response from the server here
          console.log(response.data);
        })
        .catch((error) => {
          // Handle errors here
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>Upload Progress: {progress}%</div>
    </div>
  );
}

export default FileUploadComponent;
