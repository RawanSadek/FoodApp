import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'
import { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext/AuthContext';


export default function MasterLayout() {

    // let {loginData, logout} = useContext(AuthContext);

  return (
    <div className='d-flex'>
      <div className=''>
        <SideBar/>
      </div>
      <div className='w-100 p-4 page-content'>
        <Navbar />
      <Outlet />
      </div>
    </div>
  )
}
