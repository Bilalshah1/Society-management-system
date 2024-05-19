const index = async (req, res) => {
  // const userName = req.query.userName;
  // const sessionId = req.query.sessionId;

  // console(userId, sessionId);

  const data = {
    editPermission: false,
    roles: [
      {
        id: 1,
        name: 'Admin',
        color: 'green',

        membersPermission: { view: true, edit: true },
        createTable: true,
        tablesPermission: { view: [1, 2], edit: [1, 2] },
        members: ['name 1', 'name 2', 'name 3', 'name 4', 'name 5']
      },
      {
        id: 2,
        name: 'Custom role 1',
        color: 'cyan',

        membersPermission: { view: true, edit: true },
        createTable: true,
        tablesPermission: { view: [1, 2], edit: [1, 2] },
        members: ['name 1', 'name 2', 'name 3',]
      },
      {
        id: 3,
        name: 'Custome role 2',
        color: 'red',

        membersPermission: { view: true, edit: true },
        createTable: true,
        tablesPermission: { view: [1, 2], edit: [1, 2] },
        members: ['name 1', 'name 2']

      },
      {
        id: 4,
        name: 'Custome role 3',
        color: 'orange',
        membersPermission: { view: true, edit: true },
        createTable: true,
        tablesPermission: { view: [1, 2], edit: [1, 2] },
        members: ['name 1', 'name 2', 'name 3',]
      },
    ],
    members: [
      'member 2',
      'member 3',
      'member 4',
      'member 5',
      'member 5',
      'member 5',
      'member 5',
      'member 5',
      'member 5',
    ]

  }
  res.json(data);
};



const deleteRole = async (req, res) => {

  const { roleId } = req.body;
  console.log('delete role ', roleId);

  res.json({ canDelete: true });
}

const updateRole = async (req, res) => {
  // const roleId = req.params.role_id;
  const { roleId, role } = req.body;
  console.log('role ', roleId, ' changed to ', role);

  res.sendStatus(200)

};

const createRole = async (req, res) => {

  console.log('Create role request'); 
  const newRole = {
    id: 5,//generate uuid
    name: '(role)',
    color: 'green',

    membersPermission: { view: false, edit: false },
    createTable: false,
    tablesPermission: { view: [], edit: [] },
    members: []
  };
  res.json(newRole); 

};


module.exports = {
  createRole, 
  updateRole,
  deleteRole,
  index
};