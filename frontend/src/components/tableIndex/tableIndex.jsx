import { state } from 'react'
import './tableIndex.css'

function Table({ title, attribs }) {
  return (
    <div className='table-model'>
      <div className='table-title'>{title}</div>
      <hr className='table-divider'></hr>
      <ul className='table-list'>
        {attribs.map((attrib) => {
          return (
            <li className='table-attrib'>{attrib}</li>
          );
        })}
      </ul>
    </div>
  )
}

function TableIndex({ }) {

  const tables = [
    {title: 'table 1', attribts: ['attrib 1', 'attrib 2', 'attrib 3']},
    {title: 'table 2', attribts: ['attrib 1', 'attrib 2', 'attrib 3']},
    {title: 'table 3', attribts: ['attrib 1', 'attrib 2', 'attrib 3']},
    {title: 'table 4', attribts: ['attrib 1', 'attrib 2', 'attrib 3']},
  ]
  
  return (
    <div className='table-index container-fluid p-3'>
      <p className='m-heading'>Tables</p> 
      
    </div>
  )
 

}
export default TableIndex; 