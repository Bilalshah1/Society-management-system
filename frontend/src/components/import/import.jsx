import { React, useState, useEffect } from 'react';
import '../../assets/theme.css'
import './import.css'
import Select from '../selectOption/selectOption';

function Headers({ onSubmit, headerList, defaultVal }) {
  const [val, setVal] = useState(defaultVal);
  const [select, setSelect] = useState(false);
  const [selectPos, setSelecPos] = useState({ x: 0, y: 0 });

  const onSelect = (target, value) => {
    var newVal = { ...val };
    newVal[target] = value;
    setVal(newVal);
    onSubmit(newVal);
  }

  const toggleSelectMenu = (e) => {

    e.preventDefault();
    // console.log({x: e.eventX, y: e.eventY + 40}) 
    // setSelecPos({x: e.clientX, y: e.clientY + 20 });
    const rect = e.target.getBoundingClientRect();

    setSelecPos({ x: rect.x - 20, y: rect.y + 50 });
    setSelect(true);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.import-input-select') && !e.target.closest('.select') || e.key == 'Escape') {
        setSelect(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='container-fluid' style={{marginBottom:'0.75rem'}}>
        <div className='row pl-4' >

          <div id='from' className='import-input-select col-sm-3 m-secondary contianer-fluid' onClick={(e) => toggleSelectMenu(e)}>
            <div className={`${val.header === '' ? 'm-secondary' : 'm-primary'} p-2 col-sm-10`}>
              {val.header === '' ? 'Header' : val.header}
            </div>

          </div>
          {select && <Select list={headerList} position={selectPos} onSelectValue={(val) => onSelect('header', val)} />}

          <input id='from' autoComplete='off' className='import-input col-sm-2 ml-4' placeholder='From' onBlur={(e) => onSelect('from', e.target.value)}></input>
          <input id='to' autoComplete='off' className='import-input col-sm-2 ml-4' placeholder='to' onBlur={(e) => onSelect('to', e.target.value)}></input>
        </div>

      </div>
    </>
  )
}

function Import(props) {

 const { setContent, type, id } = props.propsObject;  

  const list = ['hello', 'world']
  return (
    <div className='import-wrapper col-sm-12'>
      <div className='upload'>
        <div className='m-button'>
          Upload
        </div>
      </div>
      <div className='m-heading mt-4'>Import Data</div>

      <div className='m-primary import-label m-4'>Headers</div>
      <Headers defaultVal={{ header: '', to: '', from: '' }} onSubmit={(val) => console.log(val)} headerList={list} />
      <Headers defaultVal={{ header: '', to: '', from: '' }} onSubmit={(val) => console.log(val)} headerList={list} />
      <Headers defaultVal={{ header: '', to: '', from: '' }} onSubmit={(val) => console.log(val)} headerList={list} />
      <div className='m-button m-3 mt-4 ml-4' style={{width: '55px'}}>Import</div> 
      {/* <Data list={list} /> */}
    </div>
  );
};

export default Import;