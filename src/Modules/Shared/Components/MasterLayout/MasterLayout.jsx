import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

export default function MasterLayout({logout}) {
  return (
    <div className='d-flex'>
      <div className='w-25 vh-100 bg-info'>
        <Sidebar logout={logout}/>
      </div>
      <div className='w-100 bg-secondary'>
        <div className='bg-success'>navbar</div>
        <div className='bg-light'>header</div>
      <Outlet />
      </div>
    </div>
  )
}
