import React, { useState } from 'react';

function OptionsMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDoubleClick = (e) => {
    e.preventDefault();
    const posX = e.clientX;
    const posY = e.clientY;
    setPosition({ x: posX, y: posY });
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <div onDoubleClick={handleDoubleClick} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {showMenu && (
        <div style={{ position: 'absolute', top: position.y, left: position.x, backgroundColor: 'white', border: '1px solid black', padding: '5px' }}>
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
          <button onClick={handleCloseMenu}>Close</button>
        </div>
      )}
    </div>
  );
}

export default OptionsMenu;
