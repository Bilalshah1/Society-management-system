import React, { useState, useRef } from 'react';
import '../../assets/theme.css'
import './selectOption.css'
function Select({ list, position, onSelectValue, clear = true}) {

  const [filteredList, setFilteredList] = clear ? useState([...list, 'clear']) : useState(list);

  const onUpdate = () => {
    const newList = list.filter((item) => item.toLowerCase().includes(inputRef.current.value.toLowerCase()));
    clear? setFilteredList([...newList, 'clear']) : setFilteredList(newList);
  }

  
  const inputRef = useRef(null);

  const onEnter = (e) => {
    if(e.key == 'Enter')
      onSubmit(e);
  }  
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('onSubit');
    if (filteredList.length == 0)
      return
    if (filteredList[0] === 'clear' && clear) {
      onSelectValue('');
      return;
    }
    onSelectValue(filteredList[0]);
  }

  const style = position === undefined ? { position: 'inherit' } : { top: position.y + 'px', left: position.x + 'px' };
  return (
    <div className='m-primary select m-background-dark' style={style}>
        <input ref={inputRef} type="text" autoFocus autoComplete='off' onKeyDown={(e) => onEnter(e)}className="select-input" onChange={() => onUpdate()} />

      <div className='select-list'>
        <ul className='pl-0'>
          {filteredList.map((option) => {
            return (<li className='select-list-item m-secondary' style={option === 'clear' && clear ? { color: '#fa6262' } : {}}
              onClick={() => option === 'clear' && clear ? onSelectValue('') : onSelectValue(option)}>{option}</li>)
          })}
        </ul>

      </div>
    </div>
  );
}

export default Select;
