import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './Modules/Shared/Components/NotFound/NotFound'
import Login from './Modules/Authentication/Components/Login/Login '
import Register from './Modules/Authentication/Components/Register/Register'
import ResetPassword from './Modules/Authentication/Components/ResetPassword/ResetPassword'
import ForgotPassword from './Modules/Authentication/Components/ForgotPassword/ForgotPassword'
import VerifyAccount from './Modules/Authentication/Components/VerifyAccount/VerifyAccount'
import AuthLayout from './Modules/Shared/Components/AuthLayout/AuthLayout'
import MasterLayout from './Modules/Shared/Components/MasterLayout/MasterLayout'
import Recipes from './Modules/Recipes/Components/Recipes'
import Categories from './Modules/Categories/Components/Categories'
import Users from './Modules/Users/Components/Users'
import Favourits from './Modules/Favourits/Favourits'
import Home from './Modules/Dashboard/Components/Home'

function App() {
  const routes = createBrowserRouter([
    {
      path:'',
      element: <AuthLayout/>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Login/>},
        {path:'login', element: <Login/>},
        {path:'register', element: <Register/>},
        {path:'reset-password', element: <ResetPassword/>},
        {path:'forgot-password', element: <ForgotPassword/>},
        {path:'verify-account', element: <VerifyAccount/>}
      ]
    },
    {
      path:'dashboard',
      element: <MasterLayout/>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Home/>},
        {path:'home', element: <Home/>},
        {path:'recipes', element: <Recipes/>},
        {path:'categories', element: <Categories/>},
        {path:'users', element: <Users/>},
        {path:'favourits', element: <Favourits/>}
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
