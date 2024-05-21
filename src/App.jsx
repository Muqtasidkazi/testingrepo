import { useState, useRef, useEffect } from "react";
import "./App.css";
import Pdfconvertor from "./components/Pdfconvertor";

function App() {
  const [elmts] = useState([
    { title: "1", desc: "desc1" },
    { title: "2", desc: "desc1" },
    { title: "3", desc: "desc1" },
    { title: "4", desc: "desc1" },
    { title: "5", desc: "desc1" },
    { title: "6", desc: "desc1" },
  ]);

  const sliderRef = useRef(null);

  // useEffect(() => {
  //   const slider = sliderRef.current;
  //   let scrollAmount = 0;
  //   const autoScroll = () => {
  //     if (slider) {
  //       scrollAmount += 234;
  //       console.log(slider.clientWidth,'client')
  //       console.log(slider.scrollWidth)
  //       slider.scrollLeft = scrollAmount;
  //       if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
  //         slider.scrollLeft = 0; 
  //         scrollAmount = 0;
  //       }
  //     }
  //   };
  //   const interval = setInterval(autoScroll, 1000); 

  //   return () => clearInterval(interval);
  // }, []);

  function handleLeftArrow() {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -=sliderRef.current.clientWidth; // Adjust scroll value as needed
    }
  }

  function handleRightArrow() {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft +=sliderRef.current.clientWidth; // Adjust scroll value as needed
    }
  }

  return (
    <div className="slider-body">
      <button className="btn" onClick={handleLeftArrow}>
        left
      </button>
      <div className="slider-container" ref={sliderRef}>
        {elmts.map((item, index) => (
          <div key={index} className="slider-item">
            {item.title}
          </div>
        ))}
      </div>
      <button className="btn" onClick={handleRightArrow}>
        right
      </button>

      <Pdfconvertor/>
    </div>
  );
}

export default App;
