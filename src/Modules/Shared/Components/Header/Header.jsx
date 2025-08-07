import React from 'react'
import girlImg from '../../../../assets/Images/girlImg.png'
import { useLocation } from 'react-router-dom'

export default function Header({title, desc, imgPath}) {

  let {pathname} = useLocation();
  return (
    <div className='row bg-success px-5 rounded-4 mt-3'>
      <div className="col-md-8 d-flex align-items-center text-white">
        <div>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      </div>
      <div className="col-md-4 text-end"><img src={pathname==='/dashboard' || pathname==='/dashboard/home'?girlImg:imgPath} alt="header img" /></div>
    </div>
  )
}
