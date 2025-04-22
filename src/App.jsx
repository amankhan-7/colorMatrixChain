import { useState, useEffect } from "react";
import "./App.css"; 

function App() {
  const [clicks, setClicks] = useState([]);
  const [animateOrange, setAnimateOrange] = useState(false);
  const [orange, setOrange] = useState([]);

  useEffect(() => {
    if (animateOrange && orange.length < 9) {
      const timer = setTimeout(() => {
        setOrange((prev) => [...prev, clicks[prev.length]]);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [orange, animateOrange, clicks]);

  const handleClick = (i) => {
    if (clicks.includes(i) || animateOrange) return;

    const updated = [...clicks, i];
    setClicks(updated);

    if (updated.length === 9) {
      setAnimateOrange(true);
    }
  };

  const getColor = (i) => {
    if (!clicks.includes(i)) return "default";
    if (animateOrange) {
      return orange.includes(i) ? "orange" : "green";
    }
    return "green";
  };
  const boxes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
  <div>
    <h1>ColorMatrix</h1>
      <div className="grid">  
      {boxes.map((i) => (
      <div
        key={i}
        onClick={() => handleClick(i)}
        className={`box ${getColor(i)}`}>
        {clicks.indexOf(i) + 1 || ""}
      </div>
      ))}
    </div>
  </div>
    
  );
}

export default App;
