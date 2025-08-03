import React from 'react'

export default function Sidebar({logout}) {
  return (
    <div>
      <button onClick={logout} className='btn btn-danger'>logout</button>
    </div>
  )
}
