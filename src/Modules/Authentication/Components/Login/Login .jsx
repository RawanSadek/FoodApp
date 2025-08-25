import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import { AUTH_URLs } from '../../../../Constants/END_POINTS.JSX';
import loading from '../../../../assets/Images/loading.gif'
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext/AuthContext';
import { EMAIL_VALIDATION } from '../../../../Services/VALIDATIONS.JS';
import { REQUIRED_VALIDATION } from '../../../../Services/VALIDATIONS.JS';


export default function Login() {

  let {getLoginData} = useContext(AuthContext);

  let navigate = useNavigate();

  let { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

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

  let [showPass, setShowPass] = useState(false);

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
        <input {...register('email', EMAIL_VALIDATION)} type="text" className="form-control border-0 bg-light" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1" />
      </div>
      {errors.email && <span className='text-danger'>{errors.email.message}</span>}

      <div className="input-group mt-4 mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
        </div>
        <input {...register('password', REQUIRED_VALIDATION('Password'))} type={showPass?'text':'password'} className="form-control border-0 bg-light" placeholder="Password" aria-label="password" aria-describedby="basic-addon1" />
        <div className="pss-toggle">
          <button onMouseDown={(e)=>e.preventDefault()} onMouseUp={(e)=>e.preventDefault()} onClick={()=>setShowPass(!showPass)} type='button' className="input-group-text py-2 border-0" id="basic-addon1">{showPass?<i className="fa-solid fa-eye-slash fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i>:<i className="fa-solid fa-eye fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i>}</button>
        </div>
      </div>
      {errors.password && <span className='text-danger'>{errors.password.message}</span>}

      <div className="links d-flex justify-content-between align-items-center">
        <Link to='/register' className='text-decoration-none text-black fw-semibold'>Register Now?</Link>
        <Link to='/forgot-password' className='text-decoration-none theme-green-text fw-semibold'>Forgot Password?</Link>
      </div>

      <button disabled={isSubmitting} type='submit' className='btn auth-btn theme-green-bg w-100 my-4 py-2 text-white fw-semibold fs-5'>Login <img src={loading} alt="loading" hidden={!isSubmitting} className='loading-img'/></button>
    </form>
    </>

  )
}
