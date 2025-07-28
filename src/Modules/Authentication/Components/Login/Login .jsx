import logo from '../../../../assets/Images/logo.png'
export default function Login () {
  return (
    <div className='authContainer vh-100'>
      <div className="container-fluid auth-overlay h-100">
        <div className="row vh-100 justify-content-center align-items-center ">
            <div className="col-md-5 bg-white rounded-3 p-3">
                <div className="logo text-center">
                  <img src={logo} alt="logo" className='w-50'/>
                </div>
                <div className="title">
                  <h5>Log In</h5>
                  <p className='text-secondary'>Welcome Back! Please enter your details</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
