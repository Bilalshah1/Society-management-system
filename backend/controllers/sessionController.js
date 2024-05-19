const index = async(req, res) => {
    const session_id = req.query.session_id;
    console.log(`session index: ${session_id}`);
    res.send(`session index: ${session_id}`);
};

const sidebar = async (req, res) => {
  const data = {
    Members: { view: true, edit: true },
    CreateTable: true,
    tables: [
      { id: 1, title: 'Table 1', view: true, edit: true },
      { id: 2, title: 'Table 2', view: true, edit: true },
      { id: 3, title: 'Table 3', view: true, edit: true },
    ]
  };

  res.json(data); 
};

const sessionCreate = async (req, res) => {
  const newSession ={id: 0, name: '(new session)', description: ''}; 

  res.json(newSession); 
}

const sessionDelete = async (req, res) => {
  const {sessionId} = req.body; 
  
  console.log('delete request for ', sessionId); 
  res.sendStatus(200); 
}

const detail = async(req, res) => {
  const sessionId = req.query.sessionId; 
  const detail = {name: 'Session', description: 'hello'}; 


  res.json(detail); 
}

const detailUpdate = async(req, res) => {
  const {sessionId, detail} = req.body; 
  console.log(sessionId, detail); 

  res.sendStatus(200); 
}



module.exports = {
    index, 
    sidebar, 
    sessionCreate,
    sessionDelete, 
    detail, 
    detailUpdate
};
