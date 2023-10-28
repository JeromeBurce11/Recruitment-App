import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Attendance  from './pages/attendance/Attendance';
import Dashboard from './pages/Dashboard';
import Employee  from './pages/Employee';

import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';

import AddApplicant from  './components/AddApplicant';
import EditApplicant from './components/EditApplicant';
import {extendTheme, ChakraProvider } from '@chakra-ui/react'

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/dashboard',
        element : <Dashboard></Dashboard>
    },
    {
        path : '/employee',
        element : <Employee></Employee>
    },
    {
        path : '/attendance',
        element : <Attendance></Attendance>
    },
    {
        path : '/add-applicant',
        element : <AddApplicant></AddApplicant>
    },
    {
        path : '/applicant/:id',
        element : <EditApplicant></EditApplicant>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    }
   
])
const colors = {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  }
  
  const theme = extendTheme({ colors })
export default function App() {
  return (
    <main>
        <ChakraProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
        </ChakraProvider>
    </main>
  )
}
