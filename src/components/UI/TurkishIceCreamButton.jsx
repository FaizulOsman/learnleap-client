import React, { useState } from "react";

const TurkishIceCreamButton = () => {
  const distanceBetween = (p1x, p1y, p2x, p2y) => {
    const dx = p1x - p2x;
    const dy = p1y - p2y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleMouseMove = (event) => {
    const radius = Math.max(
      buttonRef.current.offsetWidth * 0.75,
      buttonRef.current.offsetHeight * 0.75,
      100
    );

    const bx =
      buttonRef.current.parentNode.offsetLeft +
      buttonRef.current.offsetLeft +
      buttonRef.current.offsetWidth / 2;
    const by =
      buttonRef.current.parentNode.offsetTop +
      buttonRef.current.offsetTop +
      buttonRef.current.offsetHeight / 2;

    const dist = distanceBetween(event.clientX, event.clientY, bx, by);
    const angle = Math.atan2(event.clientY - by, event.clientX - bx);

    const ox = -1 * Math.cos(angle) * Math.max(radius - dist, 0);
    const oy = -1 * Math.sin(angle) * Math.max(radius - dist, 0);

    const rx = oy / 2;
    const ry = -ox / 2;

    setButtonStyles({
      transition: "all 0.1s ease",
      transform: `translate(${ox}px, ${oy}px) rotateX(${rx}deg) rotateY(${ry}deg)`,
      boxShadow: `0px ${Math.abs(oy)}px ${
        (Math.abs(oy) / radius) * 40
      }px rgba(0,0,0,0.15)`,
    });
  };

  const handleButtonKeyDown = (event) => {
    event.preventDefault();
  };

  const buttonRef = React.createRef();
  const [buttonStyles, setButtonStyles] = useState({});

  return (
    <div className="flex justify-center items-center">
      <div className="turkishIceCreamBtnWrapper">
        <button
          className="turkishIceCreamBtn bg-green-500 text-white px-2 py-[2px] block border-0"
          ref={buttonRef}
          style={buttonStyles}
          onKeyDown={handleButtonKeyDown}
          onMouseMove={handleMouseMove}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
};

export default TurkishIceCreamButton;
