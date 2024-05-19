import React from 'react'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Sidebar from '../../components/sidebar/sidebar'
import View from './view'
import Welcome from './welcome'
import TableCreate from '../table_create/table_create'
import Members from '../../components/members/Members'
import TableIndex from '../../components/tableIndex/tableIndex'
import Import from '../../components/import/import'
import './session.css'

const contentCash = {content_typ: 'Welcome', props: {}};
const ContentList = {
  View: (key, props) => <View key={key} propsObject={props} />,
  Welcome: (key, props) => <Welcome key={key} />,
  TableCreate: (key, props) => <TableCreate key={key}/>, 
  TableIndex: (key, props) => (<TableIndex key={key}/>), 
  Members: (key, props) => (<Members key={key}/>), 
  Import: (key, props) => (<Import key={key} propsObject={props}/>), 
  // Schema: (key, props) => (<Schema key={key}/>), 
  // Settings: (key, props) => (<TableCreate key={key}/>), 
};

function Session() {

  const {search} = useLocation(); 
  const params = new URLSearchParams(search); 
  const sessionId = params.get('sessionId'); 
  // console.log(sessionId); 

  const [currentContent, setCurrentContent] = useState({ content_type: 'Welcome', props: {} });
  const Content = ContentList[currentContent.content_type]


  // const setContent = (newContent) =>
  //   contentCash = newContent; 
  //   setCurrentContent(newContent);
  // }
  // const setContent
  return (
    <>
      <div className='session-wrapper container-fluid'>
        <div className='row'>
          <Sidebar key='list' userName={'hello_friend'} sesssionId={1} title='Session 1' selected={currentContent} selectContent={setCurrentContent} />
          <div className='content-wrapper col-sm-10 p-0'>
            {Content('content', currentContent.props)}
          </div>
        </div>

      </div>
    </>
  )
}

export default Session 
