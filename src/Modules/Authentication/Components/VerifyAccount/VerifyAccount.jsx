import React from 'react'
import logo from '../../../../assets/Images/logo.png'


export default function VerifyAccount() {
  return (
    <div className='authContainer vh-100'>
      <div className="container-fluid auth-overlay h-100">
        <div className="row vh-100 justify-content-center align-items-center ">
          <div className="col-md-5 bg-white rounded-4 p-5">
            <div className="logo text-center">
              <img src={logo} alt="logo" className='w-75' />
            </div>
            <div className="auth-title-container my-3">
              <h5 className='auth-title fw-bold'>Verify Account</h5>
              <p className='auth-subtitle text-secondary'>Please Enter Your Otp or Check Your Inbox</p>
            </div>

            <form >
              

              <button type='submit' className='btn auth-btn theme-green-bg w-100 my-4 py-2 text-white fw-semibold fs-5'>Send</button>
            </form>
          </div> 
        </div>
      </div>
    </div>
  )
}
