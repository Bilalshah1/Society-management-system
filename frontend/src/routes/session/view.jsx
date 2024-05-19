import React from 'react'
import { useState } from 'react'
// import Table from '../../components/table_layout/table_layout';
import './view.css'
import Table from '../../components/table_layout/table';

function View(props) {

  const { id, selectContent } = props.propsObject;

  return (

    <>
      <div className='view-wrapper' >
        <div className='view-title'>
          {`Table ${id}`}
        </div>
        <Table id={id} selectContent={selectContent} />
      </div>
    </>
  )
}

export default View 
