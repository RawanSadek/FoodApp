import React from 'react'
import userAvatar from '../../../../assets/Images/userAvatar.png'

export default function Navbar({ loginData }) {
  return (
    <>
      <nav className="navbar navbar-light bg-light navbar-expand-lg justify-content-between p-3 rounded-4">
        <div className="container-fluid">
          <a className="navbar-brand">Food App</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#UserInfo" aria-controls="UserInfo" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id='UserInfo'>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item me-4 d-flex">
                <img src={userAvatar} alt="user img" className="rounded-circle avatar-img" />
                <span className='me-5 nav-link'>{loginData?.userName}</span>
              </li>
              <li className="nav-item">
                <button className="btn nav-link p-0 border-0 bg-transparent">
                  <i className="fa-solid fa-bell"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>

      </nav>
    </>
  )
}
