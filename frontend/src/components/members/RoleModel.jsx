import { React, useEffect, useState } from 'react'
import Select from '../selectOption/selectOption';
import './Members.css'
import '../../assets/theme.css'
import config from '../../../config';
import axios from 'axios';
import { ContextMenu, onContextClick } from '../context_menu/context_menu';

function RoleModel({ open, setOpen, canEdit, role, sessionId, userId, updateRole }) {

  //api/roles/:role_id/permissionj

  const [fetched, setFetched] = useState(false);
  const [tables, setTables] = useState([]);

  const [showViewCm, setShowViewCm] = useState(false);
  const [showEditCm, setShowEditCm] = useState(false);

  const [viewCmPos, setViewCmPos] = useState({ x: 0, y: 0 });
  const [editCmPos, setEditCmPos] = useState({ x: 0, y: 0 });

  useState(() => {

    fetch(`${config.backend}/table/index?sessionId=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setTables(data);
      })
  }, [])



  const stables = [
    { id: 1, name: 'Table 1' },
    { id: 2, name: 'Table 2' },
    { id: 3, name: 'Table 3' },
  ];

  const onUpdate = () => {
    //api/role/update/:role_id
    setOpen(false);
  }

  const colors = ['green', 'cyan', 'red', 'orange'];

  const [colorPos, setColorPos] = useState({ x: 0, y: 0 });
  const [colorSelect, setColorSelect] = useState(false);

  const [viewSelect, setViewSelect] = useState(false);
  const [editSelect, setEditSelect] = useState(false);

  const [viewSelectedItems, setViewSelectedItems] = useState([]);
  const [editSelectedItems, setEditSelectedItems] = useState([]);

  const onColorClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setColorPos({ x: rect.x - 298, y: rect.y });
    setColorSelect(true);
  }

  const onOtherSelect = (input) => {
    if (!canEdit)
      return;
    if (input === 'member_view') {
      if (role.membersPermission.view)
        updateRole(role.id, { ...role, membersPermission: { view: !role.membersPermission.view, edit: false } });
      else
        updateRole(role.id, { ...role, membersPermission: { ...role.membersPermission, view: !role.membersPermission.view } });

    }

    else if (input === 'member_edit' && role.membersPermission.view)
      updateRole(role.id, { ...role, membersPermission: { ...role.membersPermission, edit: !role.membersPermission.edit } });
    else if (input === 'create_table')
      updateRole(role.id, { ...role, createTable: !role.createTable });
  }

  const handleItemClick = (id, ctrlKey, shiftKey, selectedItems, setSelectedItems) => {
    let newSelectedItems;
    if (ctrlKey) {
      if (selectedItems.includes(id)) {
        newSelectedItems = selectedItems.filter(itemId => itemId !== id);
      } else {
        newSelectedItems = [...selectedItems, id];
      }
    }
    else if (shiftKey) {
      const min = Math.min(...selectedItems);
      newSelectedItems = id <= Math.min(...selectedItems) ?
        Array(min - id + 1).fill().map((_, index) => index + id) :
        Array(id - min + 1).fill().map((_, index) => index + min)
    }
    else {
      newSelectedItems = [id];
    }

    setSelectedItems(newSelectedItems);
  };

  const onViewSelect = (val) => {
    const tableId = tables.find(table => table.name === val).id;
    if (!role.tablesPermission.view.includes(tableId))
      updateRole(role.id, { ...role, tablesPermission: { ...role.tablesPermission, view: [...role.tablesPermission.view, tableId] } });
  }
  const onEditSelect = (val) => {
    const tableId = tables.find(table => table.name === val).id;
    if (!role.tablesPermission.edit.includes(tableId))
      updateRole(role.id, { ...role, tablesPermission: { ...role.tablesPermission, edit: [...role.tablesPermission.edit, tableId] } });
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.role-box') && !e.target.closest('.select') && !e.target.closest('.context-menu')) {
        setViewSelectedItems([]);
        setEditSelectedItems([]);
        setViewSelect(false);
        setEditSelect(false);
        setShowEditCm(false);
        setViewCmPos(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.select') && !e.target.closest('.context-menu')) {
        setColorSelect(false);
        setShowEditCm(false);
        setShowViewCm(false);

      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  const deleteViewTables = () => {
    if (!canEdit || viewSelectedItems.length === 0)
      return
    updateRole(role.id, {
      ...role, tablesPermission:
      {
        view: role.tablesPermission.view.filter((_, idx) => !viewSelectedItems.includes(idx)),
        edit: role.tablesPermission.edit.filter((_, idx) => !viewSelectedItems.includes(idx)),
      }
    })
  }

  const deleteEditTables = () => {
    if (!canEdit || editSelectedItems.length === 0)
      return
    updateRole(role.id, {
      ...role, tablesPermission:
      {
        view: role.tablesPermission.view,
        edit: role.tablesPermission.edit.filter((_, idx) => !editSelectedItems.includes(idx)),
      }
    })
  }

  if (open)

    return (
      <>
        {
          canEdit && <ContextMenu position={viewCmPos} show={showViewCm} options={[{ name: 'delete', onClick: deleteViewTables }]} />

        }
        {
          canEdit && <ContextMenu position={editCmPos} show={showEditCm} options={[{ name: 'delete', onClick: deleteEditTables }]} />
        }
        <div className='role-model'>
          <div className='container-fluid row d-flex align-items-center mb-3'>
            <div className='m-primary role-heading col-sm-3' >Name</div>
            <input className='m-primary role-model-input col-sm-4' disabled={canEdit ? 'off' : 'on'} defaultValue={role.name}
              onBlur={(e) => updateRole(role.id, { ...role, name: e.target.value })}></input>
          </div>

          <div className='container-fluid row d-flex align-items-center mb-4'>
            <div className='m-primary role-heading col-sm-3' >Color</div>
            <div className='m-primary role-model-input col-sm-4' onClick={(e) => onColorClick(e)}>{role.color}</div>
            {colorSelect && canEdit && <Select clear={false} position={colorPos} list={colors} onSelectValue={(val) => updateRole(role.id, { ...role, color: val })} />}
          </div>

          <div className='container-fluid row d-flex align-items-center mb-4'>
            <div className='m-primary role-heading col-sm-3'>Other</div>

            <div className={`role-button ${!role.membersPermission.view ? '' : 'selected'}`}
              onClick={() => onOtherSelect('member_view')}>View Members</div>

            <div className={`role-button ${!role.membersPermission.edit ? '' : 'selected'}`}
              onClick={() => onOtherSelect('member_edit')}>Edit Members</div>

            <div className={`role-button ${!role.createTable ? '' : 'selected'}`}
              onClick={() => onOtherSelect('create_table')}>Create Table</div>
          </div>

          <div className='container-fluid row mt-5 mb-5'>
            <div className='col'>
              <div className='m-primary role-heading  ml-3 mb-2' style={{ fontWeight: '500', fontSize: '17px' }}>View Table</div>
              <div className='role-box col-sm-12 ' onContextMenu={(e) => onContextClick(e, setShowViewCm, setViewCmPos)}>
                {
                  role.tablesPermission.view.map((tableId, idx) => {
                    const name = tables.find(table => table.id === tableId).name;
                    return (
                      <div className={`box-item ${viewSelectedItems.includes(idx) ? 'm-primary' : 'm-secondary'}`}
                        onClick={(e) => handleItemClick(idx, e.ctrlKey, e.shiftKey, viewSelectedItems, setViewSelectedItems)}>{name}</div>
                    )
                  })
                }
              </div>
              {
                canEdit &&
                (viewSelect ? <Select clear={false} list={tables.map(table => table.name)}
                  onSelectValue={(val) => onViewSelect(val)} /> :
                  <p className='add-member mt-2' style={{ marginBottom: '0' }} onClick={() => setViewSelect(true)} >+Add</p>)
              }

            </div>

            <div className='col'>
              <div className='m-primary role-heading  ml-3 mb-2' style={{ fontWeight: '500', fontSize: '17px' }}>Edit Table</div>

              <div className='role-box col-sm-12 ' onContextMenu={(e) => onContextClick(e, setShowEditCm, setEditCmPos)}>
                {
                  role.tablesPermission.edit.map((tableId, idx) => {
                    const name = tables.find(table => table.id === tableId).name;
                    return (
                      <div className={`box-item ${editSelectedItems.includes(idx) ? 'm-primary' : 'm-secondary'}`}
                        onClick={(e) => handleItemClick(idx, e.ctrlKey, e.shiftKey, editSelectedItems, setEditSelectedItems)}>{name}</div>
                    )
                  })
                }
              </div>
              {
                canEdit &&
                (editSelect ? <Select clear={false} list={tables.filter(table => role.tablesPermission.view.includes(table.id)).map(table => table.name)}
                  onSelectValue={(val) => onEditSelect(val)} /> :
                  <p className='add-member mt-2' style={{ marginBottom: '0' }} onClick={() => setEditSelect(true)} >+Add</p>)
              }

            </div>
          </div>
          {
            canEdit &&
            <div className='m-button role-update' onClick={() => onUpdate()}>Update</div>
          }

        </div>
        <div className='role-model-background'></div>
      </>
    )

  return (<></>)
}
export default RoleModel;