import React, { useState } from 'react';

function ImportData({id, type}) {
  //post command to udpate table or layout depending upon type

  const [val, setVal] = useState([
    {from: '', to: ''}
  ]);  

  const onBlur= (target, value) => {
    const newVal = [...val];
    newVal[target] = value; 
    onValChange(newVal); 
    setVal(newVal); 
  }

  return (
    <div className style={{top : position.y + 4 + 'px', left: position.x + 4 + px}}>

    </div>
  );
};

export default ImportData;