const index = async (req, res) => {
  const { sessionId } = req.query;

  const tables = [

    { id: 1, name: 'Table 1' },
    { id: 2, name: 'Table 2' },
    { id: 3, name: 'Table 3' },
  ]
  res.json(tables)

}


const getData = async (req, res) => {
  const sessionId = req.query.sessionId;
  const userId = req.query.userId;

  const data =
  {
    name: ` `,
    editPermission: true,
    configuration: {
      filter: { attrib: '', val: '' },
      sort: { attrib: '', asc: true },
      expanded: false,
    },
    attribs: [
      { id: 0, name: 'Id', type: 'number', position: 0 },
      { id: 1, name: 'Name', type: 'text', position: 1 },
      { id: 2, name: 'Numbers', type: 'multi-value-number', position: 2 },
      { id: 3, name: 'Hostels', type: 'multi-select-text', position: 3, options: ['Hostel 1', 'Hostel 2', 'Hostel 3'] },
      { id: 4, name: 'Email Type', type: 'single-select-text', position: 4, options: ['Official Mail', 'Personal Mail'] },
    ],
    data: [
      {
        tupleId: 0,
        vals: [
          { attrib_id: 0, value: '1' },
          { attrib_id: 1, value: 'Boii' },
          { attrib_id: 2, value: ['123'] },
          { attrib_id: 3, value: ['Hostel 1'] },
          { attrib_id: 4, value: 'Personal Mail' },
        ]
      },
    ]
  };

  res.json(data);
};


const addTuplePost = async (req, res) => {


  const { attribs } = req.body;
  const newTuple = {
    tupleId: 1, //generating uuid
    vals: [],
  }

  //running insert query

  attribs.sort((a, b) => a.position - b.position).forEach(attrib => {
    newTuple.vals = [...newTuple.vals,
    { attrib_id: attrib.id, value: attrib.type.includes('multi') ? [] : '' }
    ]
  })

  console.log('new tuple generated', newTuple);
  res.send(newTuple);

};

const configUpdate = async (req, res) => {
  const { newConfiguration } = req.body;
  //update query to update the configuration of the table
}

const updateData = async (req, res) => {
  const { type, attribId, tupleId, value } = req.body;
  console.log(type, attribId, tupleId, value);

  res.send('ok');
  //different cases for a) single-value b) multi-value c) relations. 

};

const deleteData = async (req, res) => {
  const { attribId, tupleId, type, value } = req.body;
  console.log(attribId, tupleId, type, value);
  res.send('ok');
}


const deleteTuple = async (req, res) => {
  const { tupleId } = req.body;
  console.log('Detele tuple request', tupleId);

  res.send('ok');

}


const createTable = async (req, res) => {
  console.log("Create table route accessed");
  res.send("Create table route accessed");
};

const deleteTable = async (req, res) => {
  const {tableId }= req.body;
  console.log(`Delete table route accessed for table ID: ${tableId}`);
  res.sendStatus(200); 
};

const updateTable = async (req, res) => {
  console.log("Update table route accessed");
  res.send("Update table route accessed");
};

module.exports = {
  index, 
  configUpdate,
  getData,
  updateData,
  updateTable,
  createTable,
  deleteTable,
  addTuplePost,
  deleteData,
  deleteTuple
};
