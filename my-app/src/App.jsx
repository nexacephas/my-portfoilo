import { useState } from 'react';
import logo from './Assest/logo (1).webp';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = () => {
    if (!videoUrl) {
      setError('Please enter a YouTube link');
      return;
    }

    setLoading(true);
    setError('');

    // Allow the backend to stream the video for download
    setTimeout(() => {
      window.location.href = `http://localhost:5000/download?url=${encodeURIComponent(videoUrl)}`;
      setLoading(false);
    }, 1000); // simulate loading
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <span className="logo-text">Download IT</span>
      </div>

      <hr className="line" />

      <div className="download-options">
        <span className='opt-1'>Download YouTube Videos</span>
        <span>Convert YouTube to MP3</span>
        <span>Youtube to MP4 Converter</span>
        <span>English</span>
      </div>

      <hr className="line" />

      <div className="content-1">
        <h2 className="header-1">YouTube to MP4 Converter</h2>
        <p className="para-1">
          Effortlessly convert and download YouTube videos to MP4 format for free in high-definition quality.
        </p>

        <div className="download--section">
          <input
            type="text"
            placeholder='Paste YouTube link here'
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <button className='submit-btn' onClick={handleDownload}>
            {loading ? 'Loading...' : 'Convert'}
          </button>
        </div>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
  );
}

export default App;
