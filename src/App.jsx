import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [elmts] = useState([
    { title: "1", desc: "desc1" },
    { title: "2", desc: "desc1" },
    { title: "3", desc: "desc1" },
    { title: "4", desc: "desc1" },
    { title: "5", desc: "desc1" },
    { title: "6", desc: "desc1" },
    { title: "7", desc: "desc1" },
    { title: "8", desc: "desc1" },
  ]);

  const sliderRef = useRef(null);
  const [onPausedTeam, setOnPausedTeam] = useState(false);

  const handleLeftHorizontalScroll = (scrollOffset, sliderRef) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += scrollOffset;
    }
  };

  // const [first, setfirst] = useState(second)
  let scrollAmount = 0;
  const handleRightHorizontalScroll = (scrollOffset, sliderRef) => {
    const TeamSlider = sliderRef.current;
    scrollAmount += scrollOffset;
    if (sliderRef.current) {
      console.log(scrollAmount);
      sliderRef.current.scrollLeft += scrollAmount;
      console.log(scrollAmount, "scrollAmount");
    } 
    if(scrollAmount >= TeamSlider.scrollWidth - TeamSlider.clientWidth){
      sliderRef.current.scrollLeft = 0;
    }
  };

  const handleMouseEnter = () => {
    setOnPausedTeam(true);
  };

  const handleMouseLeave = () => {
    setOnPausedTeam(false);
  };

  useEffect(() => {
    let screenWidth = window.screen.width;
    const TeamSlider = sliderRef.current;
    let scrollAmount = 0;

    const autoScroll = () => {
      if (TeamSlider && !onPausedTeam && screenWidth > 991) {
        const itemWidth = TeamSlider.querySelector(".slider-item").clientWidth;
        scrollAmount += itemWidth;
        console.log(scrollAmount);
        TeamSlider.scrollLeft = scrollAmount;
        if (scrollAmount >= TeamSlider.scrollWidth - TeamSlider.clientWidth) {
          sliderRef.current.scrollLeft += 380;
          setTimeout(() => {
            TeamSlider.scrollLeft = 0;

            scrollAmount = 0;
          }, 1500);
        }
      }
    };
    const interval = setInterval(autoScroll, 1500);

    return () => clearInterval(interval);
  }, [onPausedTeam]);

  return (
    <div
      className="slider-body"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="btn"
        onClick={() => handleLeftHorizontalScroll(-380, sliderRef)}
      >
        left
      </button>
      <div className="slider-container" ref={sliderRef}>
        {elmts.map((item, index) => (
          <div key={index} className="slider-item">
            {item.title}
          </div>
        ))}
      </div>
      <button
        className="btn"
        onClick={() => handleRightHorizontalScroll(380, sliderRef)}
      >
        right
      </button>
    </div>
  );
}

export default App;
