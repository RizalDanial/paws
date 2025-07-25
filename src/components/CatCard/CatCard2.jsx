import React from 'react';
import TinderCard from 'react-tinder-card';
import './CatCard.css';

const CatCard = ({ cat, onSwipe, style }) => {
  return (
    <div className='wrapper'>
      <TinderCard
        className="swipe-card"
        onSwipe={(dir) => onSwipe(dir, cat)}
        preventSwipe={['up', 'down']}
        swipeThreshold={50}
        animationDuration={300}
      >
        <div
          className="cat-card"
          style={style}
        >
          <img
            src={cat.url}
            alt="Cute cat"
            className="cat-image"
            onError={(e) => {
              e.target.src = `https://cataas.com/cat?${cat.id || Math.random()}&width=400&height=600`;
            }}
          />
        </div>
      </TinderCard>
    </div>
  );
};

export default CatCard;