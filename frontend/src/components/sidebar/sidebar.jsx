import React, { useEffect, useState } from 'react';
import '../../assets/theme.css'
import './sidebar.css'
import LoginSignUp from '../login/login';
import { ContextMenu, onContextClick } from '../context_menu/context_menu';
import axios from 'axios';
import config from '../../../config';
import '../../components/login/login.css'
import { Navigate } from 'react-router-dom';

function SidebarItem({ title, condition, select, newContent }) {

  return (
    <li className="nav-item " style={{ color: '#bdbdbd', fontWeight: 'bold' }}>
      <a className={`nav-link${condition ? ' active' : ''}`} data-toggle="pill" onClick={() => select(newContent)} role="tab">
        {title}
      </a>
    </li>
  )
}
function Create(props) {

  return (
    <li className="nav-item">
      <p className='nav-link m-create m-secondary' onClick={() => props.select({ content_type: 'TableCreate', props: {} })} role="tab">
        + Create Table
      </p>
    </li>
  )
}

function SidebarView(props) {

  const [showCm, setShowCm] = useState(false);
  const [cmPos, setCmPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleClickOutsideEditRole = (e) => {
      if (!e.target.closest('.context-menu')) {
        setShowCm(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutsideEditRole);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideEditRole);
    };
  }, []);

  return (
    <>
      <ContextMenu position={cmPos} show={showCm} options={[{ name: 'delete', onClick: () => { props.deleteTable(props.id); setShowCm(false) } }]} />
      <li className="nav-item mb-1">
        <a className={`m-primary nav-link${props.item.id == props.selected ? ' active' : ''}`} data-toggle="pill"
          onClick={() => props.select({ content_type: 'View', props: { id: props.item.id, selectContent: props.select } })} role="tab"
          onContextMenu={(e) => onContextClick(e, setShowCm, setCmPos, 90)}
        >
          {props.item.title}
        </a>
      </li>
    </>
  )
}


function Sidebar({userName, title, selectContent, selected, }) {
  const [login, setLogin] = useState(false);
  const [showCm, setShowCm] = useState(false);
  const [cmPos, setCmPos] = useState({ x: 0, y: 0 });
  const [nav, setNavigate] = useState('');
  const [edit, setEdit] = useState(false);

  const params = new URLSearchParams(window.location.search); 
  const sessionId = params.get('sessionId');  


  const cmOptions = [
    { name: 'Home', onClick: () => setNavigate(`/home?userId=${userName}`) },
    { name: 'Switch Account', onClick: () => { setLogin(true); setShowCm(false) } },
    { name: 'Logout', onClick: () => { setNavigate('/login') } },
  ]
  const [data, setData] = useState({
    Members: { view: false, edit: false },
    CreateTable: false,
    tables: [

    ]
  });

  const deleteTable = async (id) => {
    await axios.post(`${config.backend}/table/delete`, { tableId: id });
    setData({ ...data, tables: data.tables.filter(table => table.id != id) });
  }


  useEffect(() => {
    fetch('http://localhost:5000/api/session/sidebar')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])



  useEffect(() => {
    const handleClickOutsideEditRole = (e) => {
      if (!e.target.closest('.login')) {
        setLogin(false);
        setEdit(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideEditRole);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideEditRole);
    };
  }, []);


  useEffect(() => {
    const handleClickOutsideEditRole = (e) => {
      if (!e.target.closest('.context-menu')) {
        setShowCm(false)

      }
    };
    document.addEventListener('mousedown', handleClickOutsideEditRole);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideEditRole);
    };
  }, []);

  if (nav != '')
    return <Navigate to={nav} />

  return (
    <>
      <ContextMenu position={cmPos} show={showCm} options={cmOptions} />
      {
        login && <LoginSignUp />
      }
      {
        edit && <Edit sessionId={sessionId} setEdit={setEdit}/>
      }
      <div className='col-sm-2 p-3 sb '>

        <div className={`container-fluid row box-name p-0 d-flex align-items-center`} >
          <div className='title mb-3 mt-2 ml-0 pl-0' onClick={() => selectContent({ content_type: 'Welcome', props: {} })}>{title}</div>
          <i className="role-edit fas fa-pencil-alt m-primary col justify-content-end" style={{ fontSize: 'small' }} onClick={() => setEdit(true)} />
        </div>

        <ul className="nav flex-column nav-pills " id="pills-tab" role="tablist">
          {
            data.Members.view &&
            <SidebarItem title='Members' condition={selected.content_type == 'Members'}
              select={selectContent} newContent={{ content_type: 'Members', props: {} }} />
          }


          <hr className='pl-0 ml-0' style={{ border: '1px solid #fefefe90', width: '100%', overflow: 'none' }}></hr>

          <div className='sidebar-table-list'>
            {data.tables.map((listItem) => {
              return <SidebarView key={listItem.title} id={listItem.id} deleteTable={deleteTable} item={listItem} selected={selected.props.id === undefined ? -1 : selected.props.id} select={selectContent} />
              // return <SidebarItem key={listItem.title} item={listItem} selected = {props.selected.props.id === undefined? -1 : props.selected.props.id} select={props.selectContent}/>
            })}
            {
              data.CreateTable && <Create select={selectContent} />
            }
          </div>
          <div className='user-name m-primary container-fluid pl-4 row d-flex align-items-center'
            onContextMenu={(e) => onContextClick(e, setShowCm, setCmPos, 0, -120)}>
            <i className='far fa-user p-2 pr-0'></i>
            <div className=''>{userName}</div>
          </div>
        </ul>
      </div>

    </>
  )

}

function Edit({ sessionId, setEdit }) {

  const [session, setSession] = useState({ name: 'hello', description: '' });

  useEffect(() => {
    fetch(`${config.backend}/session/detail`)
    .then(res => res.json())
    .then(data => {
      setSession(data); 
    })
  }, [])

  const onSubmit = async() => {
    await axios.post(`${config.backend}/session/detail/update`, {sessionId: sessionId, detail : session}); 
    setEdit(false);   
  }

  return (
    <>
      <div className='login pt-3'>

        <input className={`m-primary  login-input`} placeholder='Name'
          value={session.name} onChange={(e) => setSession({ ...session, name: e.target.value })}></input>
        <input className='m-primary login-input mb-4' placeholder='Description'
          value={session.description} onChange={(e) => setSession({ ...session, description: e.target.value })}></input>

        <div className='container-fluid row p-0 m-0' autoSelect='off'>
          <div className='col-sm-8'></div>
          <div className='col-sm-4 m-button pl-3' onClick={() => onSubmit()}>Change</div>

        </div>

      </div>
      <div className='login-background' style={{ opacity: '30%' }}></div>

    </>
  )
}
export default Sidebar 