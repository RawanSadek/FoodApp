import logo from '../../../../assets/Images/logo.png'
import { Outlet } from 'react-router-dom'
import loading from '../../../../assets/Images/loading.gif'

export default function AuthLayout() {
  return (
    <div className='authContainer vh-100 position-relative'>
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
 
      {/* <div className="loading-overlay d-flex align-items-center justify-content-center">
        <img src={loading} alt="loading" className=''/>
      </div> */}
    </div>
  )
}
