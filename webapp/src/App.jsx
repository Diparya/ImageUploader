
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch uploaded images from the backend
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://192.168.146.135:3000/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    
    fetchImages();
  }, []);

  return (
    <div>
      <h1>Uploaded Images</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map(image => (
          <div key={image.id} style={{ margin: '10px' }}>
            <img
              src={`http://192.168.146.135:3000/${image.filepath}`}
              alt={image.filename}
              style={{ width: '200px', height: '200px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
