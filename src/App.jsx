import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import NotFound from './Modules/Shared/Components/NotFound/NotFound'
import Login from './Modules/Authentication/Components/Login/Login '
import Register from './Modules/Authentication/Components/Register/Register'
import ResetPassword from './Modules/Authentication/Components/ResetPassword/ResetPassword'
import ForgotPassword from './Modules/Authentication/Components/ForgotPassword/ForgotPassword'
import VerifyAccount from './Modules/Authentication/Components/VerifyAccount/VerifyAccount'
import AuthLayout from './Modules/Shared/Components/AuthLayout/AuthLayout'
import MasterLayout from './Modules/Shared/Components/MasterLayout/MasterLayout'
import Recipes from './Modules/Recipes/Components/RecipesList/Recipes'
import Categories from './Modules/Categories/Components/CategoriesList/CategoriesList'
import Users from './Modules/Users/Components/UsersList/Users'
import UserData from './Modules/Users/Components/UserData/UserData'
import Favourits from './Modules/Favourits/Components/FavList/Favourits'
import Home from './Modules/Dashboard/Components/Home/Home'
import { ToastContainer } from 'react-toastify'
import ProtectedRoutes from './Modules/Shared/Components/ProtectedRoutes/ProtectedRoutes'
import { jwtDecode } from 'jwt-decode'
import RecipesData from './Modules/Recipes/Components/RecipeData/RecipeData'
import ChangePassword from './Modules/Authentication/Components/ChangePassword/ChangePassword'

function App() {

  const [loginData, setLoginData] = useState();
  let getLoginData = ()=>{
    let encodedData = localStorage.getItem('token');
    let decodedData = jwtDecode(encodedData);
    setLoginData(decodedData);
  }

  useEffect(()=>{
    if(localStorage.getItem('token'))
      getLoginData();
  },[])

  const logout = ()=>{
    localStorage.removeItem('token');
    setLoginData(null);
    <Navigate to='/login'/>
  }


  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login getLoginData={getLoginData}/> },
        { path: 'login', element: <Login getLoginData={getLoginData} /> },
        { path: 'register', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'verify-account', element: <VerifyAccount /> },
        // { path: 'change-password', element: <ChangePassword /> }
      ]
    },
    {
      path: 'dashboard',
      element: <ProtectedRoutes loginData={loginData}><MasterLayout logout={logout} loginData={loginData}/></ProtectedRoutes>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home loginData={loginData}/> },
        { path: 'home', element: <Home loginData={loginData}/> },
        { path: 'recipes', element: <Recipes /> },
        { path: 'new-recipe', element: <RecipesData /> },
        { path: 'update-recipe/:id?', element: <RecipesData /> },
        { path: 'view-recipe/:id?', element: <RecipesData /> },
        { path: 'categories', element: <Categories /> },
        { path: 'users', element: <Users /> },
        { path: 'users/:id', element: <UserData /> },
        { path: 'favourits', element: <Favourits /> }
      ]
    }
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>

    </>
  )
}

export default App
