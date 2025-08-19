import { Link } from 'react-router-dom'
import logo from '../../../../assets/Images/logo.png'
export default function NotFound() {
  return (
    <div className="notfound-container vh-100 py-4 px-5">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="text d-flex align-items-center h-50 ms-5">
        <div>
          <h2 className='fw-bolder fs-1'>Oops....</h2>
          <h4 className='theme-green-text mb-4'>Page not found </h4>
          <p>This Page doesn't exist or was removed! <br/> We suggest you  back to home.</p>
          <Link to='/dashboard/home'><button className='btn auth-btn theme-green-bg text-white mt-5 w-100'><i className="fa-solid fa-arrow-left"></i> Back To <br/> Home</button></Link>
        </div>
      </div>
    </div>
  )
}
