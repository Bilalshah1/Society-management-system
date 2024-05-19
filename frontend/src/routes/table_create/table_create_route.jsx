import React from 'react'
import { useState } from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import './table_create.css'
import TableCreate from './table_create'

function TableCreateRoute() {

  const onSelectView = (selectedView) => {
    //reroute to session and pass the selected view id 
  }

  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <Sidebar key='list' title='Session 1' selected={selected} selectView={onSelectView} />
          <TableCreate />
        </div>

      </div>
    </>
  )
}

export default TableCreateRoute 
