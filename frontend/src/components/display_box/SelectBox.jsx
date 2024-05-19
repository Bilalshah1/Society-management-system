// import React, { useState } from 'react';

// export const selectMouseDown = (e, selectBox, setSelectBox) => {
//   e.preventDefault();
//   setSelectBox({ start: { x: e.clientX, y: e.clientY }, end: selectBox.end, isDragging: true })
// };

// export const selectMouseMove = (e, selectBox, setSelectBox) => {
//   if (selectBox.isDragging)
//     setSelectBox({ start: selectBox.start, end: { x: e.clientX, y: e.clientY }, isDragging: true });
// };

// export const selectMouseUp = (e, setLastSelection, selectBox, setSelectBox) => {
//   setLastSelection(selectBox);
//   setSelectBox({ start: { x: null, y: null }, end: { x: null, y: null }, isDragging: false })
// };

// const displayBoxStyle = {
//   position: 'absolute',
//   border: '1px solid black',
//   backgroundColor: 'blue',
//   // opacity: '10%',
//   zIndex: 999,
//   pointerEvents: 'none', // Allow mouse events to pass through the display box
// };

// export const SelectBox = ({ box }) => {
//   if (box.start.x !== null && box.start.y !== null && box.end.x !== null && box.end.y !== null) {
//     const width = Math.abs(box.end.x - box.start.x);
//     const height = Math.abs(box.end.y - box.start.y);
//     const left = Math.min(box.start.x, box.end.x - 100);
//     const top = Math.min(box.start.y, box.end.y);

//     return (
//       <div
//         style={{
//           ...displayBoxStyle,
//           left: left + 'px',
//           top: top + 'px',
//           width: width + 'px',
//           height: height + 'px',
//         }}
//       />
//     );
//   }
//   return null;
// };


