import React from 'react'

export default function Navbar({loginData}) {
  return (
    <div className='row bg-light p-3 rounded-4'>
      <div className="col-md-8">Food App</div>
      <div className="col-md-4 text-end">
        <img src="" alt="user img" />
        <span className='ms-2 me-5'>{loginData?.userName}</span>
        <i class="fa-solid fa-bell"></i>
      </div>
    </div>
  )
}
