const fs = require('fs')

const data = {
  users: [
    { name: 'user A', id: 1, },
    { name: 'user B', id: 2, },
    { name: 'user C', id: 3, },
  ],
  views: [
    {
      id: 1,
      title: 'Both Layouts',
      layouts: [1, 2]
    },
    {
      id: 2,
      title: 'Participants',
      layouts: [1, 2]
    },
    {
      id: 3,
      title: 'Hostel Allocation',
      layouts: [1, 2]
    },
  ],

  roles: [
    {
      id: 1,
      sessionId: 1,
      title: 'Ec',
      color: 'cyan',
      members: [1],

      membersSection: { view: true, edit: true },
      createTable: true,
      views: { view: [1, 2, 3], edit: [1, 2, 3] },
      tables: { view: [1, 2], edit: [1, 2] },
    },
    {
      id: 2,
      sessionId: 1,
      title: 'Members',
      color: 'red',
      members: [1],

      membersSection: { view: true, edit: true },
      createTable: true,
      views: { view: [2, 3], edit: [2, 3] },
      tables: { view: [1, 2], edit: [] },
    }
  ],

  tables: [
    { id: 1, sessionId: 1, title: 'Participants' }, 
    { id: 2, sessionId: 1, title: 'Hostels' }
  ],

  attributes: [
    { id: 1, tableId: 1, title: 'reg', type: 'number', options: null },
    { id: 2, tableId: 1, title: 'name', type: 'text', options: null },
    { id: 3, tableId: 1, title: 'type', type: 'single-select', options: ['ambassador', 'normal'] },
    { id: 4, tableId: 2, title: 'hostel no.', type: 'multi-select', options: ['hostel 11', 'hostel 12'] }
    
  ],

  tuples: [
    {
      id: 1,
      tableId: 1,  
      data: [
        { attribId: 1, value: '1' },
        { attribId: 2, value: 'jane' },
        { attribId: 3, value: 'normal' },
      ]
    },
    {
      id: 2,
      tableId: 1, 
      data: [
        { attribId: 1, value: '2' },
        { attribId: 2, value: 'doe' },
        { attribId: 3, value: 'ambassador' },
      ]
    }, 
    {
      id: 3, 
      tableId: 2, 
      data: [
        {attribId: 4, value: 'hostel 11'}, 
      ]
    }, 
    {
      id: 4, 
      tableId: 2, 
      data: [
        {attribId: 4, value: 'hostel 12'}, 
      ]
    }
  ],

  relations: [
    { id: 1, tableA: 1, tableB: 2, titleA: 'Hostel No.', titleB: 'Participants', attribA: 4, attribB: 1},
  ],

  relationData: [
    { id: 1, rId: 1, tupleIdA: 1, tupleIdB: 3 },
    { id: 2, rId: 1, tupleIdA: 2, tupleIdB: 3 },
    { id: 3, rId: 1, tupleIdA: 2, tupleIdB: 4 },
  ],

  layouts: [
    {
      id: 1,
      title: 'Participants',
      tableId: 1,
      sortBy: 1,
      attribs: [
        { id: 1, position: 1 },
        { id: 2, position: 2 },
        { id: 3, position: 3 },
      ],
      relationalAttribs: [
        { rId: 1, position: 4, method: 'view' },
      ]
    },
    {
      id: 2,
      title: 'Hostel',
      tableId: 1,
      attribs: [
        { id: 4, position: 1 },
      ],
      referenceAttribs: [
        { rId: 1, position: 2, method: 'view' },
      ]
    },
  ]
}

fs.writeFileSync('data.json', JSON.stringify(data));