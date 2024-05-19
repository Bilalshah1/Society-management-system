import React from 'react'
import SessionIndex from './routes/session_index/session_index';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Session from './routes/session/session'
import Login from './routes/login/login';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Navigate to='/login'/>
  }, 
  {
    path: '/login', 
    element: <Login/>
  }, 
  {
    path: '/home', 
    element: <SessionIndex/>
  }, 
  {
    path: '/session', 
    element: <Session/>
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
