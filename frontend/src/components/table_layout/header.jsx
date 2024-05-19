import './table_layout.css'
import { React, useRef, useState, useEffect } from 'react'
import Select from '../selectOption/selectOption'
import '../../assets/theme.css'

function Header({ configuration, setConfiguration, selectContent, data }) {

  const [selectPos, setSelectPos] = useState({ x: 0, y: 0 });
  const [filterSelect, setFilterSelect] = useState(false);

  const onImport = () => {
    selectContent({ content_type: 'Import', props: { setContentType: selectContent, type: 'Layout', id: 1 } })
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.filter')) {
        setFilterSelect(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const onFilterClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setSelectPos({ x: rect.x - 20, y: rect.y + 50 });
    setFilterSelect(true);
  }

  return (
    <>
      <div className='container-fluid row mb-3 ml-3'>
        {/* <div className='col' style={{width: '100%'}}></div> */}
        <div className={`header-button ${configuration.filter.attrib === '' && configuration.filter.val === '' ? '' : 'selected'}`}
          onClick={(e) => onFilterClick(e)}>Filter</div>

        <div className={`header-button ${configuration.expanded ? 'selected' : ''}`}
          onClick={() => setConfiguration({ ...configuration, expanded: !configuration.expanded })}>Expand</div>

        <div className='header-button ' onClick={(e) => onImport(e)}>Import </div>
        <div className='header-button '>Export</div>
      </div>
      {filterSelect && <Filter attribs={data.attribs} position={selectPos} setFilterSelect={setFilterSelect} configuration={configuration} setConfiguration={setConfiguration} />}
    </>
  )
}

function Filter({ position, attribs, setFilterSelect, configuration, setConfiguration }) {
  const [select, setSelect] = useState(false);
  const [selectPos, setSelectPos] = useState({ x: 0, y: 0 });
  const [filter, setFilter] = useState(configuration.filter);

  const onClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setSelectPos({ x: rect.x + 200, y: rect.y });
    setSelect(true);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.select')) {
        setSelect(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.select')) {
        setConfiguration
        setSelect(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onEnter = (e) => {
    if (e.key == 'Enter') {
      setFilterSelect(false);
      setFilter({...filter, val: e.target.value}); 
      setConfiguration({...configuration, filter: filter});
    
    }
    else if (e.key == 'Escape') {
      setFilterSelect(false);
    }
  }
  const onButton = (e) => {
    setFilterSelect(false);
    setFilter({...filter, val: e.target.value}); 
    setConfiguration({ ...configuration, filter: filter });

  }

  return (
    <div className='filter' style={{ top: position.y + 'px', left: position.x + 'px' }}>
      <div className='filter-input-select m-primary' style={{ cursor: 'pointer' }} onClick={(e) => onClick(e)}>{filter.attrib}</div>

      {select && <Select position={selectPos} onSelectValue={(val) => setFilter({ attrib: val, val: '' })}
        list={attribs.map(attrib => attrib.name)} />}

      <input id='fif' className='filter-input-select' defaultValue={configuration.filter.val} autoComplete='off'
        onBlur={(e) => setFilter({ ...filter, val: e.target.value } )}
        onKeyDown={(e) => onEnter(e)}></input>

      <div className='m-button pl-2 mt-1' style={{ width: '88px' }}
        onClick={(e) => onButton(e)} >Select Filter</div>

    </div>

  )
}
export default Header;  