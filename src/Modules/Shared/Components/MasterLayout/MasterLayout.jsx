import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'

export default function MasterLayout() {

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
