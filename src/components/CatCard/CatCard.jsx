import react from 'react';
import TinderCard from 'react-tinder-card';
import './CatCard.css';

const CatCard = ({ cat, onSwipe, style }) => {
  return (
    <div className='wrapper'>
    <TinderCard
      className="w-full h-full "
      onSwipe={(dir) => onSwipe(dir, cat)}
      preventSwipe={['up', 'down']}
      swipeThreshold={50}       // easier to swipe
      animationDuration={300}   // faster swipe animation
    >
      <div
        className="w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden flex items-center justify-center"
        style={style}  // <- apply style here, NOT on TinderCard
      >
        <img
          src={cat.url}
          alt="Cute cat"
          className="w-full h-full object-cover"
        />
      </div>
    </TinderCard>
    </div>
  );
};

export default CatCard;
