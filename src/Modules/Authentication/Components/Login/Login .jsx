import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../../assets/Images/logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import { AUTH_URLs } from '../../../../Constants/END_POINTS.JSX';

export default function Login({getLoginData}) {

  let navigate = useNavigate();

  let { register, handleSubmit, formState: { errors } } = useForm();

  let onSubmit = async (data) => {
    // console.log(AUTH_URLs.login)
    try {
      let response = await axios.post(AUTH_URLs.login, data);
      localStorage.setItem('token', response.data.token);
      // console.log(response.data.token)
      getLoginData();
      toast.success('Welcome to the Food App!');
      navigate('/dashboard');

    } catch (error) {
      toast.error('Wrong Email or Password!')
      console.log(error)
    }
  }

  return (
    <>
    <div className="auth-title-container my-3">
        <h5 className='auth-title fw-bold'>Log In</h5>
        <p className='auth-subtitle text-secondary'>Welcome Back! Please enter your details</p>
      </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group mt-4 bg-light rounded-3">
        <div className="input-group-prepend">
          <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-mobile-screen fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
        </div>
        <input {...register('email', { required: 'Email is required!', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid Email!' } })} type="text" className="form-control border-0 bg-light" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1" />
      </div>
      {errors.email && <span className='text-danger'>{errors.email.message}</span>}

      <div className="input-group mt-4 mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
        </div>
        <input {...register('password', { required: 'Password is required!' })} type="password" className="form-control border-0 bg-light" placeholder="Password" aria-label="password" aria-describedby="basic-addon1" />
      </div>
      {errors.password && <span className='text-danger'>{errors.password.message}</span>}

      <div className="links d-flex justify-content-between align-items-center">
        <Link to='/register' className='text-decoration-none text-black fw-semibold'>Register Now?</Link>
        <Link to='/forgot-password' className='text-decoration-none theme-green-text fw-semibold'>Forgot Password?</Link>
      </div>

      <button type='submit' className='btn auth-btn theme-green-bg w-100 my-4 py-2 text-white fw-semibold fs-5'>Login</button>
    </form>
    </>

  )
}
