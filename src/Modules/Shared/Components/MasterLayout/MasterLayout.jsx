import React from 'react'
import { Sidebar } from 'react-pro-sidebar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <div className='d-flex'>
      <div className='w-25 vh-100 bg-info'>
        sidebar
        <Sidebar />
      </div>
      <div className='w-100 bg-secondary'>
        <div className='bg-success'>navbar</div>
        <div className='bg-light'>header</div>
      <Outlet />
      </div>
    </div>
  )
}
