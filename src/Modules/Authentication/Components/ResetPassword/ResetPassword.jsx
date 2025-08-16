
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AUTH_URLs } from '../../../../Constants/END_POINTS.JSX';
import { useLocation, useNavigate } from 'react-router-dom';
import loading from '../../../../assets/Images/loading.gif'
import { useState } from 'react';



export default function ResetPassword() {

  const location = useLocation();
  const email = location.state?.email;

  let navigate = useNavigate();

  let { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();

  const password = watch('password'); // Watching the original password

  let onSubmit = async (data) => {
    console.log(data)
    try {
      let response = await axios.post(AUTH_URLs.reset, data);
      console.log(response)
      toast.success(response.data.message);
      navigate('/login');

    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }

      let [showPass, setShowPass] = useState(false);


  return (
    <>
      <div className="auth-title-container my-3">
        <h5 className='auth-title fw-bold'>Reset Password</h5>
        <p className='auth-subtitle text-secondary'>Please Enter Your Otp or Check Your Inbox</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mt-3 bg-light rounded-3">
          <div className="input-group-prepend">
            <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-regular fa-envelope fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
          </div>
          <input disabled value={email} type="text" className="form-control border-0 bg-light mb-1" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" />
        </div>
        {/* {errors.email && <span className='text-danger'>{errors.email.message}</span>} */}

        <div className="input-group mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
          </div>
          <input {...register('seed', { required: 'OTP is required!' })} type="text" className="form-control border-0 bg-light mb-1" placeholder="OTP" aria-label="seed" aria-describedby="basic-addon1" />
        </div>
        {errors.seed && <span className='text-danger'>{errors.seed.message}</span>}

        <div className="input-group mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
          </div>
          <input {...register('password', { required: 'Password is required!', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{6,}$/, message: 'The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long' } })} type="password" className="form-control border-0 bg-light mb-1" placeholder="New Password" aria-label="password" aria-describedby="basic-addon1" />
        </div>
        {errors.password && <span className='text-danger'>{errors.password.message}</span>}

        <div className="input-group mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
          </div>
          <input {...register('confirmPassword', { required: 'Please confirm your password', validate: (value) => value === password || 'Passwords must match' })} type={showPass?'text':'password'} className="form-control border-0 bg-light mb-1" placeholder="Confirm New Password" aria-label="password" aria-describedby="basic-addon1" />
          <div className="pss-toggle">
            <button onClick={() => setShowPass(!showPass)} type='button' className="input-group-text py-2 border-0" id="basic-addon1">{showPass ? <i className="fa-solid fa-eye-slash fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i> : <i className="fa-solid fa-eye fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i>}</button>
          </div>
        </div>
        {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}


        <button disabled={isSubmitting} type='submit' className='btn auth-btn theme-green-bg w-100 my-3 py-2 text-white fw-semibold fs-5'>Reset Password <img src={loading} alt="loading" hidden={!isSubmitting} className='loading-img' /></button>
      </form>
    </>


  )
}
