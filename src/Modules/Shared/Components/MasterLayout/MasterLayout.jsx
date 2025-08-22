import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'
import { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext/AuthContext';


export default function MasterLayout() {

    let {loginData, logout} = useContext(AuthContext);

  return (
    <div className='d-flex'>
      <div className=''>
        <SideBar logout={logout}/>
      </div>
      <div className='w-100 p-4 page-content'>
        <Navbar loginData={loginData}/>
      <Outlet loginData={loginData}/>
      </div>
    </div>
  )
}
