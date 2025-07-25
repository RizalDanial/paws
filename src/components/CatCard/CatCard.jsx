import React, { useState, useEffect } from 'react';

const CatCard = ({ cat, onSwipe }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset state when cat changes
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
    setStartPos({ x: 0, y: 0 });
    setImageLoaded(false);
  }, [cat.id]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    
    const threshold = 120;
    
    if (Math.abs(position.x) > threshold) {
      const direction = position.x > 0 ? 'right' : 'left';
      onSwipe(direction, cat);
    } else {
      // Snap back
      setPosition({ x: 0, y: 0 });
    }
    
    setIsDragging(false);
  };

  // Global event listeners
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMove = (e) => handlePointerMove(e);
      const handleGlobalUp = () => handlePointerUp();
      
      document.addEventListener('mousemove', handleGlobalMove);
      document.addEventListener('mouseup', handleGlobalUp);
      document.addEventListener('touchmove', handleGlobalMove);
      document.addEventListener('touchend', handleGlobalUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMove);
        document.removeEventListener('mouseup', handleGlobalUp);
        document.removeEventListener('touchmove', handleGlobalMove);
        document.removeEventListener('touchend', handleGlobalUp);
      };
    }
  }, [isDragging, startPos, position]);

  const rotation = position.x * 0.05;
  const opacity = Math.max(0.3, 1 - Math.abs(position.x) * 0.003);

  return (
    <div
      className="cat-card"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        opacity: opacity,
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        touchAction: 'none',
        userSelect: 'none',
        width: '100%',
        height: '100%',
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'white'
      }}
      onMouseDown={handlePointerDown}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        setIsDragging(true);
        setStartPos({ x: touch.clientX, y: touch.clientY });
        e.preventDefault();
      }}
    >
      {!imageLoaded && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          background: '#f8f9fa'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e3e3e3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '15px'
          }}></div>
          <p>Loading cat...</p>
        </div>
      )}
      <img
        src={cat.url}
        alt="Adorable cat"
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: imageLoaded ? 'block' : 'none'
        }}
        onLoad={() => setImageLoaded(true)}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      />
      
      {/* Swipe indicators */}
      {Math.abs(position.x) > 50 && (
        <>
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',
              fontSize: '2rem',
              fontWeight: 'bold',
              padding: '15px 25px',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)',
              border: '3px solid #4CAF50',
              background: 'rgba(76, 175, 80, 0.9)',
              color: 'white',
              opacity: position.x > 50 ? Math.min((position.x - 50) / 70, 1) : 0
            }}
          >
            ❤️ LIKE
          </div>
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '20px',
              transform: 'translateY(-50%)',
              fontSize: '2rem',
              fontWeight: 'bold',
              padding: '15px 25px',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)',
              border: '3px solid #f44336',
              background: 'rgba(244, 67, 54, 0.9)',
              color: 'white',
              opacity: position.x < -50 ? Math.min((Math.abs(position.x) - 50) / 70, 1) : 0
            }}
          >
            👎 PASS
          </div>
        </>
      )}
    </div>
  );
};

export default CatCard;