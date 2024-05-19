import { useState, useEffect } from "react";
import './Members.css'
import '../../assets/theme.css'
// import { selectMouseDown, selectMouseUp, selectMouseMove, SelectBox } from "../display_box/SelectBox";
import '../../assets/colors.css'
import Select from '../selectOption/selectOption'
import RoleModel from "./RoleModel";
import '../../../config'
import config from "../../../config";
import axios from "axios";
import { ContextMenu, onContextClick, hideContext } from '../context_menu/context_menu'

function Box({ role, allMembers, edit, deleteRole, updateRole, sessionId, userId }) {

	const [roleModel, setRoleModel] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const [addMember, setAddMember] = useState(false);
	const [memberList, setMemberList] = useState(role.members);
	const [newMember, setNewMember] = useState(null);
	const [contextPos, setContextPos] = useState({ x: 0, y: 0 });
	const [showContext, setShowContext] = useState(false);

	const [showContextHead, setShowContextHead] = useState(false);
	const [contextPosHead, setContextPosHead] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const effect = async () => {

			if (newMember == null)
				return;

			setMemberList([...memberList, newMember]);

			updateRole(role.id, { ...role, members: memberList });
			setNewMember(null);
		}
		effect();

	}, [newMember, memberList])

	const onMemberDelete = () => {
		console.log(selectedItems); 
		if (selectedItems.length === 0 || !edit)
			return

		setMemberList(role.members.filter((_, idx) => !selectedItems.includes(idx)))
		setSelectedItems([]);

		console.log((_, idx) => !selectedItems.includes(idx))	
		updateRole(role.id, { ...role, members: role.members.filter((_, idx) => !selectedItems.includes(idx)) });
		setShowContext(false);
	}

	const handleItemClick = (id, ctrlKey, shiftKey) => {
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

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (!e.target.closest('.box') && !e.target.closest('.context-menu')|| e.key == 'Escape') {
				setSelectedItems([]);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const handleClickOutsideAddMember = (e) => {
			if ((!e.target.closest('.add-member') && !e.target.closest('.select')) || e.key == 'Escape') {
				setAddMember(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutsideAddMember);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideAddMember);
		};
	}, []);

	useEffect(() => {
		const handleClickOutsideEditRole = (e) => {
			if (!e.target.closest('.role-model') && !e.target.closest('.context-menu') && !e.target.closest('.select') || e.key == 'Escape') {
				setRoleModel(false);
				setShowContext(false);
				setShowContextHead(false); 
			}
		};
		document.addEventListener('mousedown', handleClickOutsideEditRole);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideEditRole);
		};
	}, []);


	return (
		<>

			<ContextMenu position={contextPos} show={showContext} options={[{ name: 'delete', onClick:onMemberDelete }]} />
			<ContextMenu position={contextPosHead} show={showContextHead} options={[{ name: 'delete role', onClick: () => { deleteRole(role.id); setShowContextHead(false) } }]} />
			<RoleModel role={role} canEdit={edit} open={roleModel} setOpen={(val) => setRoleModel(val)} updateRole={updateRole} sessionId={sessionId} userId={userId} />

			<div className="col">
				<div className={`container-fluid row box-name c-${role.color} d-flex align-items-center`} onContextMenu={(e) => edit && onContextClick(e, setShowContextHead, setContextPosHead)} >
					<div>{role.name}</div>
					<i className="role-edit fas fa-pencil-alt col justify-content-end" style={{ fontSize: 'small' }} onClick={() => setRoleModel(true)} />
				</div>

				<ul className={`box c-border-${role.color}`} onContextMenu={(e) => onContextClick(e, setShowContext, setContextPos)}>
					{memberList.map((member, index) => {
						return (
							<div className={`box-item ${selectedItems.includes(index) ? 'm-primary' : 'unselected'}`} onClick={(e) => handleItemClick(index, e.ctrlKey, e.shiftKey)}>
								{member}
							</div>
						)
					})}
				</ul>

				{
					edit &&
						addMember ? <Select list={allMembers} onSelectValue={setNewMember} clear={false} /> :
						<p className="add-member" onClick={(e) => setAddMember(true)}>+Add</p>
				}
			</div>
		</>
	)
}

function Members() {


	const params = new URLSearchParams(window.location.search);
	const userId = params.get('userId');
	const sessionId = params.get('sessionId');

	const [roles, setRoles] = useState([]);
	const [editPermission, setEditPermission] = useState(false);
	const [members, setMembers] = useState([]);

	useEffect(() => {
		fetch(`${config.backend}/role/index`)
			.then((res) => res.json())
			.then((data) => {
				setRoles(data.roles);
				setEditPermission(data.editPermission);
				setMembers(data.members);
			})
	}, [])


	const deleteRole = async (id) => {
		console.log(id);
		const canDelete = await axios.post(`${config.backend}/role/delete`, { roleId: id });
		if (canDelete)
			setRoles(roles.filter(role => role.id != id));
	}

	const onCreateRole = async () => {
		const newRole = await axios.post(`${config.backend}/role/create`); 
		console.log(newRole.data);
		setRoles([...roles, newRole.data]);
	} 

	const updateRolePermission = async (id, newRole) => {
		const idx = roles.findIndex(role => role.id === id);
		const newRoles = [...roles];
		newRoles[idx] = newRole;

		await axios.post(`${config.backend}/role/update`, {roleId: id, role: newRole}); 
		console.log(newRole);
		setRoles(newRoles);

	}

	return (
		<div className="participants">
			{/* <SelectBox box={selectBox}/> */}
			<div className="m-heading">Members</div>
			<div style={{ width: `${(roles.length + 1)* 25}%` }}>
				<div className="container-fluid" >
					<div className="row">
						{
							roles.map((role) => (<Box role={role} edit={editPermission} allMembers={members} deleteRole={deleteRole} updateRole={updateRolePermission}
								sessionId={sessionId} userId={userId} />))
						}
						<div className="create-box col " onClick={() => onCreateRole()}>+Create</div>
					</div>
				</div>

			</div>
		</div>
	)

}
export default Members; 