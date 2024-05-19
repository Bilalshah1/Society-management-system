import {createBrowserRouter, Redirect} from 'react-router-dom' 
import Session  from './session/session' 
import TableCreateRoute from './table_create/table_create_route'
const router = createBrowserRouter([
    {
        element: () => {
            return (<Redirect to='/session' />);
        }, 
        path: '/', 
    },
    {
        element: <Session/>, 
        path: '/session', 
    },
    {
        element: <Session/>, 
        path: '/session', 
    },
    {
        element: <Session/>, 
        path: '/session/views/:view_id', 
    },
    {
        element: <TableCreateRoute/>, //also handles ReferenceTable with different navigations 
        path: '/table/create', 
    },
    {
        element: <TableCreateRoute/>, 
        path: '/table/create', 
    },
])