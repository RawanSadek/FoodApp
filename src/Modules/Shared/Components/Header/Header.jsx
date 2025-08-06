import React from 'react'
import girlImg from '../../../../assets/Images/girlImg.png'

export default function Header() {
  return (
    <div className='row bg-success px-5 rounded-4 mt-3'>
      <div className="col-md-8 d-flex align-items-center text-white">
        <div>
          <h3>title</h3>
          <p>description</p>
        </div>
      </div>
      <div className="col-md-4 "><img src={girlImg} alt="" /></div>
    </div>
  )
}
