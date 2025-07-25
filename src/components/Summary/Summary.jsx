import React from 'react';
import './Summary.css';

const Summary = ({ likedCats, dislikedCats, onRestart }) => {
  const totalCats = likedCats.length + dislikedCats.length;
  const likePercentage = totalCats > 0 ? Math.round((likedCats.length / totalCats) * 100) : 0;

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h2 className="summary-title">Your Cat Preferences! 🐱</h2>
        <div className="stats-container">
          <div className="stat-item liked">
            <div className="stat-icon">❤️</div>
            <div className="stat-text">
              <span className="stat-number">{likedCats.length}</span>
              <span className="stat-label">cats loved</span>
            </div>
          </div>
          <div className="stat-item disliked">
            <div className="stat-icon">👎</div>
            <div className="stat-text">
              <span className="stat-number">{dislikedCats.length}</span>
              <span className="stat-label">cats passed</span>
            </div>
          </div>
        </div>
        <div className="percentage-bar">
          <div className="percentage-fill" style={{ width: `${likePercentage}%` }}></div>
          <span className="percentage-text">{likePercentage}% liked</span>
        </div>
      </div>

      {likedCats.length > 0 && (
        <div className="liked-cats-section">
          <h3 className="section-title">Your Favorite Cats ❤️</h3>
          <div className="cats-grid">
            {likedCats.map((cat, index) => (
              <div key={cat.id || index} className="cat-thumbnail">
                <img
                  src={cat.url}
                  alt={`Liked cat ${index + 1}`}
                  className="thumbnail-image"
                  onError={(e) => {
                    e.target.src = `https://cataas.com/cat?${cat.id || Math.random()}&width=200&height=200`;
                  }}
                />
                <div className="thumbnail-overlay">
                  <div className="heart-icon">❤️</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {likedCats.length === 0 && (
        <div className="no-likes-section">
          <div className="no-likes-icon">😿</div>
          <h3 className="no-likes-title">No cats captured your heart?</h3>
          <p className="no-likes-text">
            Don't worry, there are millions of adorable cats out there! 
            Try again to find your perfect feline match.
          </p>
        </div>
      )}

      <button className="restart-button" onClick={onRestart}>
        <span className="button-icon">🔄</span>
        Try Again
      </button>
    </div>
  );
};

export default Summary;