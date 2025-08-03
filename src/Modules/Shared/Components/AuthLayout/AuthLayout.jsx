import logo from '../../../../assets/Images/logo.png'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className='authContainer vh-100'>
      <div className="container-fluid auth-overlay h-100">
        <div className="row vh-100 justify-content-center align-items-center ">
          <div className="col-md-5 bg-white rounded-4 px-5 py-4">
            <div className="logo text-center">
              <img src={logo} alt="logo" className='w-75' />
            </div>
            
            <Outlet />

          </div>
        </div>
      </div>
    </div>
  )
}
