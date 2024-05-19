import React, { useState } from 'react';

function DisplayBox() {
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [endX, setEndX] = useState(null);
  const [endY, setEndY] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    setStartX(startX);
    setStartY(startY);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const endX = e.clientX;
      const endY = e.clientY;
      setEndX(endX);
      setEndY(endY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const displayBoxStyle = {
    position: 'absolute',
    border: '1px solid black',
    backgroundColor: 'blue',
    opacity: '10%',
    zIndex: 999,
    pointerEvents: 'none', // Allow mouse events to pass through the display box
  };

  const renderDisplayBox = () => {
    if (startX !== null && startY !== null && endX !== null && endY !== null) {
      const width = Math.abs(endX - startX);
      const height = Math.abs(endY - startY);
      const left = Math.min(startX, endX);
      const top = Math.min(startY, endY);

      return (
        <div
          style={{
            ...displayBoxStyle,
            left: left + 'px',
            top: top + 'px',
            width: width + 'px',
            height: height + 'px',
          }}
        />
      );
    }
    return null;
  };

  return (
    <div
      style={{ width: '100vh', height: '100vh', position: 'relative' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {renderDisplayBox()}
    </div>
  );
}

export default DisplayBox;
