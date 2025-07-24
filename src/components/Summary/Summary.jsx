// Summary.jsx
const Summary = ({ likedCats }) => {
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        You liked {likedCats.length} cats!
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
        }}
      >
        {likedCats.map((cat, index) => (
          <img
            key={index}
            src={cat.url}
            alt="Liked cat"
            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', width: '100%', height: 192, objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Summary;
