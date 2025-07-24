import { useEffect, useState } from "react";
import CatCard from "./components/CatCard";
import Summary from "./components/Summary";

const TOTAL_CATS = 10;

function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchedCats = Array.from({ length: TOTAL_CATS }, (_, i) => ({
      id: i,
      url: `https://cataas.com/cat?${i}`,
    }));
    setCats(fetchedCats);
  }, []);

  const handleSwipe = (direction, cat) => {
    console.log("Swiped:", direction, "Cat id:", cat.id);

    if (direction === "right") {
      setLikedCats((prev) => [...prev, cat]);
    } else if (direction === "left") {
      console.log("Disliked:", cat.id);
    }

    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= cats.length) {
        setFinished(true);
      }
      return nextIndex;
    });
  };

  console.log("Render:", {
    currentIndex,
    likedCatsCount: likedCats.length,
    finished,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "50%",
          position: "relative",
        }}
      >
        {!finished ? (
          cats
            .slice(currentIndex)
            .reverse()
            .map((cat, index) => (
              <CatCard key={cat.id} cat={cat} onSwipe={handleSwipe} />
            ))
        ) : (
          <Summary likedCats={likedCats} />
        )}
      </div>
    </div>
  );
}

export default App;
