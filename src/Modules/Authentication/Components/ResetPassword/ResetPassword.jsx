
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import loading from '../../../../assets/Images/loading.gif'
import { useEffect, useState } from 'react';
import { REQUIRED_VALIDATION } from '../../../../Services/VALIDATIONS.JS';
import { PASSWORD_VALIDATION } from '../../../../Services/VALIDATIONS.JS';
import { CONFIRM_PASSWORD_VALIDATION } from '../../../../Services/VALIDATIONS.JS';
import { axiosInstance } from '../../../../Services/END_POINTS.JS';
import { USER_URLs } from '../../../../Services/END_POINTS.JS';



export default function ResetPassword() {

  const location = useLocation();
  const email = location.state?.email;

  let navigate = useNavigate();

  let { register, handleSubmit, formState: { errors, isSubmitting }, watch, trigger } = useForm();

  const password = watch('password'); // Watching the original password

  let onSubmit = async (data) => {
    try {
      let response = await axiosInstance.post(USER_URLs.reset, data);
      console.log(response)
      toast.success(response.data.message);
      navigate('/login');

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  let [showPass, setShowPass] = useState(false);
  let [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    if (watch('confirmPassword'))
      trigger('confirmPassword');
  }, [watch('password')])

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
          <input disabled value={email} {...register('email')} type="text" className="form-control border-0 bg-light mb-1" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
          </div>
          <input {...register('seed', REQUIRED_VALIDATION('OTP'))} type="text" className="form-control border-0 bg-light mb-1" placeholder="OTP" aria-label="seed" aria-describedby="basic-addon1" />
        </div>
        {errors.seed && <span className='text-danger'>{errors.seed.message}</span>}

        <div className="input-group mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
          </div>
          <input {...register('password', PASSWORD_VALIDATION)} type={showPass ? 'text' : 'password'} className="form-control border-0 bg-light" placeholder="New Password" aria-label="password" aria-describedby="basic-addon1" />
          <div className="pss-toggle">
            <button onClick={() => setShowPass(!showPass)} type='button' className="input-group-text py-2 border-0 rounded-start-0" id="basic-addon1">{showPass ? <i className="fa-solid fa-eye-slash fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i> : <i className="fa-solid fa-eye fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i>}</button>
          </div>
        </div>
        {errors.password && <span className='text-danger'>{errors.password.message}</span>}

        <div className="input-group mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
          </div>
          <input {...register('confirmPassword', CONFIRM_PASSWORD_VALIDATION(password))} type={showConfirmPass ? 'text' : 'password'} className="form-control border-0 bg-light" placeholder="Confirm New Password" aria-label="password" aria-describedby="basic-addon1" />
          <div className="pss-toggle">
            <button onMouseDown={(e) => e.preventDefault()} onMouseUp={(e) => e.preventDefault()} onClick={() => setShowConfirmPass(!showConfirmPass)} type='button' className="input-group-text py-2 border-0 rounded-start-0" id="basic-addon2">{showConfirmPass ? <i className="fa-solid fa-eye-slash fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i> : <i className="fa-solid fa-eye fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i>}</button>
          </div>
        </div>
        {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}


        <button disabled={isSubmitting} type='submit' className='btn auth-btn theme-green-bg w-100 my-3 py-2 text-white fw-semibold fs-5'>Reset Password <img src={loading} alt="loading" hidden={!isSubmitting} className='loading-img' /></button>
      </form >
    </>


  )
}
