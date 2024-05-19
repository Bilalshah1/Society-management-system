import data from './data.json' assert {type: 'json'};

export const sidebarFetch = (session_id, user_id) => {
  const roles = data.roles.filter((role) => role.sessionId === session_id && role.members.includes(user_id));

  const members = {
    view: roles.some((role) => role.membersSection.view),
    edit: roles.some((role) => role.membersSection.edit),
  };
  const createTable = roles.some((role) => role.createTable);

  const viewView = roles.reduce((view, role) => view.concat(role.views.view), [])
  const viewEdit = roles.reduce((view, role) => view.concat(role.views.edit), [])

  const views = viewView.map((viewId) => {
    return {
      viewId: viewId,
      title: data.views.find((view) => view.id === viewId).title,
      edit: viewEdit.some((id) => id === viewId)
    }
  });

  return {
    membersSection: members,
    createTable: createTable,
    views: views
  }
}

export const viewFetch = (viewId) => {
  return data.views.find((views) => views.id === viewId);

}

export const layoutFetch = (layoutId) => {

  const layout = data.layouts.find((layout) => layout.id === layoutId);

  const attribs = layout.attribs.map((attrib) => {
    const tableAttrib = data.attributes.find((tAttrib) => tAttrib.id === attrib.id);
    if (tableAttrib === undefined)
      return

    return {
      id: attrib.id,
      value: tableAttrib.title,
      type: tableAttrib.type,
      options: tableAttrib.options,
      position: attrib.position,
    }
  });

  const tupleAttribs = data.tuples.reduce((arr, tuple) => arr.concat(tuple.data.map(d => ({ tupldId: tuple.id, ...d }))), []);

  const rAttribs = layout.relationalAttribs.map((rAttrib) => {
    const relation = data.relations.find((relation) => relation.id === rAttrib.rId);
    const relatedAttrib = layout.tableId === relation.tableA ? relation.attribA : relation.attribB;

    return {
      id: relatedAttrib,
      value: layout.tableId === relation.tableA ? relation.titleA : relation.titleB,
      type: rAttrib.method == 'view' ? 'multi-select' : 'view-only',
      options: tupleAttribs.filter((d) => d.attribId === relatedAttrib).map(attrib => attrib.value),
      position: rAttrib.position,
    }

  })

  const tupleData = tupleAttribs.filter((tuple) => attribs.map(attrib => attrib.id).includes(tuple.attribId));

  const relationData = data.relationData.reduce((relatedData, rAttrib) => {

    const relation = data.relations.find((relation) => relation.id === rAttrib.rId);
    const con = layout.tableId === relation.tableA;
    const attribId = con ? relation.attribA : relation.attribB;
    const tupleId = con ? rAttrib.tupleIdA : rAttrib.tupldIdB;
    const tupleIdB = con ? rAttrib.tupleIdB : rAttrib.tupldIdA;

    const rValue = tupleAttribs.find(d => d.tupldId === tupleIdB && d.attribId === attribId).value;

    const index = relatedData.findIndex(rd => rd.tupleId === tupleId && rd.attribId === attribId);


    if (index != -1) {
      relatedData[index] = {
        ...relatedData[index],
        value: [...relatedData[index].value, rValue]
      }
      return relatedData;
    }
    return [...relatedData, {
      attribId: attribId,
      tupleId: tupleId,
      value: [rValue]
    }]
  }, [])


  return {
    title: layout.title,
    headers: attribs.concat(rAttribs),
    data: tupleData.concat(relationData)
  }
}

export const membersFetch = (sessionId) => {
  const roles = data.roles.filter(role => role.sessionId === sessionId);

  const rolesMembers = roles.map((role) => {

    const members = role.members.map(memberId => {
      const member = data.users.find((user) => user.id === memberId);
      if (member != undefined)
        return member;

    })

    return { ...role, members: members };
  })

  return rolesMembers
}

// console.
// layoutFetch(1);
console.log(JSON.stringify(layoutFetch(1).data, null, 2));