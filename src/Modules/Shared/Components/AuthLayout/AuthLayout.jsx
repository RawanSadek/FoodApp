import logo from '../../../../assets/Images/logo.png'
import { Outlet, useLocation } from 'react-router-dom'

export default function AuthLayout() {

  const location = useLocation();

  const isRegister = location.pathname === "/register";
  return (
    <div className='authContainer  position-relative'>
      <div className="container-fluid auth-overlay h-100">
        <div className="row min-vh-100 justify-content-center align-items-center ">
          <div className={`${isRegister ? "col-md-8" : "col-md-5"} bg-white rounded-4 px-5 py-4`}>
            <div className="logo text-center">
              <img src={logo} alt="logo" className={`${isRegister? 'w-30':'w-75'}`} />
            </div>
            
            <Outlet />

          </div>
        </div>
      </div>
    </div>
  )
}
