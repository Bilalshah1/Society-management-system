import { useState, react, useEffect } from 'react'
import './table_create.css'
import '../../assets/theme.css'
import Select from '../../components/selectOption/selectOption'

function Attribs({ attrib, attribs, setAttrib }) {
  const type = [
    'text', 'number', 'multi-value-number', 'multi-value-text', 'multi-select-text', 'multi-select-number', 'single-select-text', 'single-select-number'
  ]

  const [select, setSelect] = useState(false);
  const [selectPos, setSelectPos] = useState({ x: 0, y: 0 });
  const [value, setValue] = useState(attrib.value);

  const onSelect = (e) => {
    const rect = e.target.getBoundingClientRect();
    setSelectPos({ x: rect.x, y: rect.y + 50 });
    setSelect(true);
  }

  const onBlur = (e) => {
    if (!attribs.includes(e.target.value)) {
      setAttrib('value', e.target.value);
      setValue(e.target.value)
    }
    else
      setValue('');

  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.table-create-select-sm') && !e.target.closest('.select')) {
        setSelect(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  return (
    <>
      <div className='row' style={{ marginBottom: '0.75rem' }}>
        <div style={{ width: '2rem' }}></div>
        <div className='col-sm-4 p-0'>
          <input type="text" autoComplete='off' className="table-create-input table-create-input-sm"
            placeholder='Name' value={value} onBlur={(e) => onBlur(e)} onChange={(e) => setValue(e.target.value)}></input>
        </div>
        <div className='col-sm-4 p-0'>
          <div className={`table-create-select-sm ${attrib.type === '' ? 'm-secondary' : 'm-primary'}`} onClick={e => onSelect(e)}>
            {attrib.type === '' ? 'Type' : attrib.type}
          </div>
          {
            select && <Select position={selectPos} list={type} onSelectValue={(val) => setAttrib('type', val)} />
          }
        </div>
      </div>
    </>
  )

}

function RelationalAttrib({ relationalAttrib, relationAttribs, currentRelations, setRelationAttrib }) {

  const [select, setSelect] = useState({
    relation: { view: false, pos: { x: 0, y: 0 } },
    agg: { view: false, pos: { x: 0, y: 0 } },
  });
  const [value, setValue] = useState(relationalAttrib.name);
  const [agg, setAgg] = useState([]);


  const onSelect = (target, e) => {
    const rect = e.target.getBoundingClientRect();
    const newSelect = { ...select };
    newSelect[target].view = true;
    newSelect[target].pos = { x: rect.x, y: rect.y + 50 };
    setSelect(newSelect);
  }

  const onBlur = (e) => {
    if (!relationAttribs.includes(e.target.value)) {
      setRelationAttrib('value', e.target.value);
      setValue(e.target.value)
    }
    else
      setValue('');

  }

  const onRelationSelect = (val) => {
    const currentRelation = currentRelations.find(relation => relation.name === val);
    currentRelation.type.includes('text') ? setAgg(['list']) :
      setAgg(['list', 'sum', 'average', 'min', 'max']);
    currentRelation.type === '' ? setAgg('') : null;
    setRelationAttrib('relation', val);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.table-create-select-sm') && !e.target.closest('.select')) {
        const newSelect = { ...select };
        newSelect.relation.view = false;
        newSelect.agg.view = false;
        setSelect(newSelect);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  return (
    <>
      <div className='row' style={{ marginBottom: '0.75rem' }}>
        <div style={{ width: '2rem' }}></div>
        <div className='col-sm-3 p-0'>
          <input type="text" autoComplete='off' className="table-create-input table-create-input-sm"
            placeholder='Name' value={value} onBlur={(e) => onBlur(e)} onChange={(e) => setValue(e.target.value)}></input>
        </div>

        <div className='col-sm-3 p-0'>
          <div className={`table-create-select-sm ${relationalAttrib.relation === '' ? 'm-secondary' : 'm-primary'}`} onClick={e => onSelect('relation', e)}>
            {relationalAttrib.relation === '' ? 'relation' : relationalAttrib.relation}
          </div>
          {
            select.relation.view && <Select position={select.relation.pos} list={currentRelations.map(relation => relation.name)}
              onSelectValue={(val) => onRelationSelect(val)} />
          }
        </div>

        <div className='col-sm-3 p-0'>
          <div className={`table-create-select-sm ${relationalAttrib.relation === '' ? 'disabled' : ''} ${relationalAttrib.agg === '' || relationalAttrib.relation === '' ? 'm-secondary' : 'm-primary'}`}
            onClick={e => onSelect('agg', e)}>
            {relationalAttrib.agg === '' || relationalAttrib.relation === '' ? 'function' : relationalAttrib.agg}
          </div>
          {
            select.agg.view && <Select position={select.agg.pos} list={agg} onSelectValue={(val) => setRelationAttrib('agg', val)} />
          }
        </div>
      </div>
    </>
  )


}
function Relations({ relation, setRelation, currentAttribs, currentRelations, index, changeTwoWay }) {

  //api/Table/index?session_id=id
  const Tables = [
    'Table 1',
    'Table 2',
    'Table 3'
  ]

  //api/Attrib/?table_id=id

  const aAttribs = [
    { id: 0, name: 'Id', type: 'number', position: 0 },
    { id: 1, name: 'Name', type: 'text', position: 1 },
    { id: 2, name: 'Numbers', type: 'multi-value-number', position: 2 },
    { id: 3, name: 'Hostels', type: 'multi-select-text', position: 3, options: ['Hostel 1', 'Hostel 2', 'Hostel 3'] },
    { id: 4, name: 'Email Type', type: 'single-select-text', position: 4, options: ['Official Mail', 'Personal Mail'] },
  ];


  const [select, setSelect] = useState({
    table: { show: false, pos: { x: 0, y: 0 } },
    attrib: { show: false, pos: { x: 0, y: 0 } },
    currentAttrib: { show: false, pos: { x: 0, y: 0 } },
  })

  const [name, setName] = useState(relation.name);
  const updateName = (e) => {
    console.log(currentRelations);
    if (!currentRelations.includes(e.target.value)) {
      setRelation('name', e.target.value);
      setName(e.target.value)
    }
    else
      setName('');
  }
  const onSelect = (target, e) => {
    const rect = e.target.getBoundingClientRect();
    var newSelect = { ...select };
    newSelect[target].show = true;
    newSelect[target].pos = { x: rect.x, y: rect.y + 50 };
    setSelect(newSelect);
  }

  const onAttribUpdate = (val) => {
    const attrib = aAttribs.find(attrib => attrib.name.trim() === val.trim());
    setRelation('attrib', val);
    setRelation('type', attrib.type);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.table-create-select-sm') && !e.target.closest('.select')) {
        var newSelect = { ...select };
        newSelect.table.show = false;
        newSelect.attrib.show = false;
        newSelect.currentAttrib.show = false;
        setSelect(newSelect);

      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  return (
    <>
      <div className='row' style={{ marginBottom: '0.75rem' }}>

        <div style={{ width: '2rem' }}></div>
        <div className='col-sm-4 pl-0'>
          <input type="text" autoComplete='off' className="table-create-input-sm" style={{width: '100%'}} placeholder='Name'
            value={name} onBlur={(e) => updateName(e)} onChange={(e) => setName(e.target.value)}></input>
        </div>

        <div className='col-sm-2 p-0'>
          <div className={`table-create-select-sm ${relation.table === '' ? 'm-secondary' : 'm-primary'}`} onClick={(e) => onSelect('table', e)} >
            {relation.table === '' ? 'Table' : relation.table}
          </div>
          {
            select.table.show &&
            <Select position={select.table.pos} list={Tables} onSelectValue={(val) => setRelation(val)} />
          }
        </div>

        <div className='col-sm-2 p-0'>
          <div className={`table-create-select-sm ${relation.attrib === '' ? 'm-secondary' : 'm-primary'}`}
            onClick={(e) => onSelect('attrib', e)}>
            {relation.attrib === '' ? 'on' : relation.attrib}
          </div>
          {
            select.attrib.show &&
            <Select position={select.attrib.pos} list={aAttribs.map(attrib => attrib.name)} onSelectValue={(val) => onAttribUpdate(val)} />
          }
        </div>
        <div className='col-sm-2 p-0'>
          <div className={`table-create-select-sm ${relation.currentAttrib === null ? 'disabled' : ''} ${relation.currentAttrib === '' || relation.currentAttrib === null ? 'm-secondary' : 'm-primary'}`}
            onClick={(e) => relation.currentAttrib!= null && onSelect('currentAttrib', e)}>
            {relation.currentAttrib === '' || relation.currentAttrib === null ? 'ref attrib' : relation.currentAttrib}
          </div>
          {
            select.currentAttrib.show &&
            <Select position={select.currentAttrib.pos} list={currentAttribs} onSelectValue={(val) => setRelation('currentAttrib', val)} />
          }
        </div>


        <div className='p-0 center-vertically'>
          <label className='m-primary table-checkbox-container'>
            <input type="checkbox" defaultChecked={relation.currentAttrib != null} onChange={(e) => changeTwoWay(e, index)} />
            <span className='table-checkbox-checkmark'></span>
            {/* <div className='info-box'>Two way relation</div> */}

          </label>
        </div>

      </div>

      {
        // relation.currentAttrib ===  ? <></> :
        true ? <></> :
          <div className='row mb-3'>
            <div style={{ width: '3rem' }}></div>
            <div className='col-sm-6 p-0'></div>
            <div className='col-sm-3 p-0'>
              <input type="text" autoComplete='off' className="table-create-input-sm" placeholder='on' defaultValue={relation.currentAttrib} ></input>
            </div>
          </div>
      }
    </>
  )
}
function TableCreate({ propsObject }) {

  // const {sessionId} = propsObject;
  const sessionId = 1;

  const [name, setName] = useState('');
  const [attribs, setAttribs] = useState([
    { value: '', type: '' },
    { value: '', type: '' },
    { value: '', type: '' },
  ]);

  const [relations, setRelations] = useState([
    { table: '', name: '', attrib: '', type: '', currentAttrib: null },
    { table: '', name: '', attrib: '', type: '', currentAttrib: '' },
    { table: '', name: '', attrib: '', type: '', currentAttrib: null },
  ]);

  const [relationalAttribs, setRelationalAttribs] = useState([
    { name: '', relation: '', agg: '' },
    { name: '', relation: '', agg: '' },
    { name: '', relation: '', agg: '' },
  ])


  const onCreate = () => {
    //api/tables/create?session_id=session_id

  }
  const addAttrib = () => {
    setAttribs([...attribs, { value: '', type: '' }]);
  };

  const addRelation = () => {
    const newRow = { table: '', name: '', attrib: '', type: '', currentAttrib: null };
    setRelations([...relations, newRow]);
  };

  const addRelationAttrib = () => {
    const newRow = { name: '', relation: '', agg: '' };
    setRelationalAttribs([...relationalAttribs, newRow])
  }

  const changeTwoWay = (e, index) => {
    var tempRelations = [...relations];
    tempRelations[index].currentAttrib = e.target.checked ? '' : null;
    // console.log(tempRelations);
    setRelations(tempRelations);
  }
  return (
    <div className='table-create-wrapper'>
      <div className='container-fluid mt-5 pl-4'>
        <form className='mb-5'>
          <div className='row'>
            <label forHtml='TableName' className='m-primary table-create-label col-sm-2 mb-1'>Table Name</label>
            <div className='col-sm-10'>
              <input type="text" autoComplete='off' className="col-sm-6 table-create-input-sm" defaultValue={name} id="TableName" onBlur={(e) => setName(e.target.value)}></input>
            </div>
          </div>
        </form>

        <p className='m-primary table-create-label' >Attributes</p>

        <form className='mb-3'>
          {
            attribs.map((attrib, idx) => {
              const setAttrib = (target, val) => {
                // if(target === 'value' && attribs.map(attrib => attrib.value).includes(val))
                //   return; 

                var newAttribs = [...attribs];
                newAttribs[idx][target] = val;
                setAttribs(newAttribs);
              }
              return (<Attribs attrib={attrib} attribs={attribs.map(attrib => attrib.value.trimStart().trimEnd()).filter(attrib => attrib != '')} setAttrib={setAttrib} />);
            })
          }

        </form>
        <p className='table-create col-sm-1 ml-3 mb-5' onClick={() => addAttrib()}>+Add</p>

        <p className='m-primary table-create-label mb-3' >Relations</p>
        <form className=''>
          {
            relations.map((relation, index) => {
              const setRelation = (target, value) => {
                var newRelations = [...relations];
                newRelations[index][target] = value;
                setRelations(newRelations);
                console.log(relations);
              }
              return (<Relations sessionId={sessionId} relation={relation} index={index}
                currentRelations={relations.map(relation => relation.name.trimStart().trimEnd()).filter(relation => relation != '')}
                currentAttribs={attribs.map(attrib => attrib.value.trimEnd().trimStart()).filter(attrib => attrib != '')}
                setRelation={setRelation} changeTwoWay={changeTwoWay} />)
            })
          }

          <p className='table-create col-sm-1 ml-3 mb-5' onClick={() => addRelation()}>+Add</p>
        </form>

        <p className='m-primary table-create-label' >Relatonal Attributes</p>

        <form className='mb-3'>
          {
            relationalAttribs.map((rAttrib, idx) => {
              const setRelationalAttrib = (target, val) => {

                var newAttribs = [...relationalAttribs];
                newAttribs[idx][target] = val;
                setRelationalAttribs(newAttribs);
              }
              return (<RelationalAttrib relationalAttrib={rAttrib} relationAttribs={relationalAttribs.map(attrib => attrib.name.trim()).filter(attrib => attrib != '')}
                currentRelations={relations} setRelationAttrib={setRelationalAttrib} />);
            })
          }

        </form>
        <p className='table-create col-sm-1 ml-3 mb-5' onClick={() => addRelationAttrib()}>+Add</p>

      </div>
      <div className='container-fluid row d-flex justify-content-end'>
        <div className='m-button table-create-button' onClick={() => onCreate()}>Create</div>

      </div>
    </div>
  )


}

export default TableCreate;