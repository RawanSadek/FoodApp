import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'
import Header from '../Header/Header'

export default function MasterLayout({logout, loginData}) {
  return (
    <div className='d-flex'>
      <div className=''>
        <SideBar logout={logout}/>
      </div>
      <div className='w-100 p-4 page-content'>
        <Navbar loginData={loginData}/>
        {/* <Header /> */}
      <Outlet loginData={loginData}/>
      </div>
    </div>
  )
}
