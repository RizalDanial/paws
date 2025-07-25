import React, { useState, useEffect } from 'react';
import CatCard from "./components/CatCard/CatCard";
import Summary from "./components/Summary/Summary";
import './App.css';

const App = () => {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [dislikedCats, setDislikedCats] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Generate cat data
  useEffect(() => {
    const generateCats = () => {
      const catList = [];
      for (let i = 0; i < 15; i++) {
        // Use different image sizes based on screen size for better performance
        const imageWidth = screenSize.width > 768 ? 500 : 400;
        const imageHeight = screenSize.width > 768 ? 750 : 600;
        
        catList.push({
          id: i,
          url: `https://cataas.com/cat?${i}&width=${imageWidth}&height=${imageHeight}`,
        });
      }
      setCats(catList);
      setLoading(false);
    };

    generateCats();
  }, [screenSize.width]);

  const handleSwipe = (direction, cat) => {
    console.log('Swiped:', direction, cat.id);
    if (direction === 'right') {
      setLikedCats(prev => [...prev, cat]);
    } else if (direction === 'left') {
      setDislikedCats(prev => [...prev, cat]);
    }

    // Check if we've gone through all cats
    if (currentIndex >= cats.length - 1) {
      setShowSummary(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleButtonSwipe = (direction) => {
    const currentCat = cats[currentIndex];
    if (currentCat) {
      handleSwipe(direction, currentCat);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setLikedCats([]);
    setDislikedCats([]);
    setShowSummary(false);
  };

  const progress = cats.length > 0 ? ((currentIndex + 1) / cats.length) * 100 : 0;

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2 className="loading-text">Loading adorable cats...</h2>
          <p className="loading-subtext">Preparing your feline adventure! 🐱</p>
        </div>
      </div>
    );
  }

  if (showSummary) {
    return (
      <div className="app">
        <Summary 
          likedCats={likedCats}
          dislikedCats={dislikedCats}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1 className="app-title">Paws & Preferences 🐾</h1>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="progress-text">
            {currentIndex + 1} of {cats.length} cats
          </p>
        </div>
      </div>

      {/* Card Stack Container */}
      <div className="card-container">
        <div className="card-stack">
          {/* Background cards for stack effect */}
          {cats.slice(currentIndex + 1, currentIndex + 3).map((cat, index) => (
            <div
              key={cat.id}
              className="background-card"
              style={{
                zIndex: cats.length - currentIndex - index - 1,
                transform: `scale(${0.95 - index * 0.05}) translateY(${index * 8}px)`,
                opacity: 0.6 - index * 0.2
              }}
            >
              <img
                src={cat.url}
                alt="Upcoming cat"
                className="background-image"
                loading="lazy"
              />
            </div>
          ))}

          {/* Current active card */}
          {cats[currentIndex] && (
            <div className="active-card" style={{ zIndex: cats.length }}>
              <CatCard
                cat={cats[currentIndex]}
                onSwipe={handleSwipe}
              />
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions-container">
        <div className="action-buttons">
          <button
            className="action-button dislike-button"
            onClick={() => handleButtonSwipe('left')}
            disabled={!cats[currentIndex]}
            aria-label="Pass on this cat"
          >
            <span className="button-icon">👎</span>
            <span className="button-text">Pass</span>
          </button>
          
          <button
            className="action-button like-button"
            onClick={() => handleButtonSwipe('right')}
            disabled={!cats[currentIndex]}
            aria-label="Like this cat"
          >
            <span className="button-icon">❤️</span>
            <span className="button-text">Like</span>
          </button>
        </div>
        
        <p className="instructions">
          Swipe or tap to choose • ← Pass • Like →
        </p>
      </div>
    </div>
  );
};

export default App;