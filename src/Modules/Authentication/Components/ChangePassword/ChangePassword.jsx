import { useLocation, useNavigate } from "react-router-dom";
import { CONFIRM_PASSWORD_VALIDATION } from "../../../../Services/VALIDATIONS.JS";
import { PASSWORD_VALIDATION } from "../../../../Services/VALIDATIONS.JS";
import { useForm } from "react-hook-form";
import logo from '../../../../assets/Images/logo.png'
import { useEffect, useState } from "react";
import loading from '../../../../assets/Images/loading.gif'
import { AUTH_URLs } from "../../../../Constants/END_POINTS.JSX";
import { toast } from "react-toastify";
import axios from "axios";


export default function ChangePassword() {

  const location = useLocation();

  let navigate = useNavigate();

  let { register, handleSubmit, formState: { errors, isSubmitting }, watch, trigger } = useForm();

  const newPassword = watch('newPassword');

  let onSubmit = async (data) => {
    // console.log(data)
    try {
      let response = await axios.put(AUTH_URLs.change, data, { headers: { authorization: localStorage.getItem('token') } });
      // console.log(response)
      toast.success(response.data.message);
      navigate('/login');

    } catch (error) {
      toast.error(error.response.data.additionalInfo.errors)
    }
  }

  let [showOldPass, setShowOldPass] = useState(false);
  let [showPass, setShowPass] = useState(false);
  let [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    if (watch('confirmPassword'))
      trigger('confirmPassword');
  }, [watch('password')])

  return (
    <>
      <div className='bg-white rounded-4 px-5'>
        <div className="logo text-center">
          <img src={logo} alt="logo" className='w-100' />
        </div>

        <div className="auth-title-container my-3">
          <h5 className='auth-title fw-bold'>Change Your Password</h5>
          <p className='auth-subtitle text-secondary'>Enter your details below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="input-group mt-3">
            <div className="input-group-prepend">
              <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
            </div>
            <input {...register('oldPassword', PASSWORD_VALIDATION)} type={showOldPass ? 'text' : 'password'} className="form-control border-0 bg-light mb-1" placeholder="Old Password" aria-label="old password" aria-describedby="basic-addon1" />
            <div className="pass-toggle">
              <button onMouseDown={(e) => e.preventDefault()} onMouseUp={(e) => e.preventDefault()} onClick={() => setShowOldPass(!showOldPass)} type='button' className="input-group-text border-0 rounded-start-0" id="basic-addon1">{showOldPass ? <i className="fa-solid fa-eye-slash fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i> : <i className="fa-solid fa-eye fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i>}</button>
            </div>
          </div>
          {errors.oldPassword && <span className='text-danger'>{errors.oldPassword.message}</span>}

          <div className="input-group mt-3">
            <div className="input-group-prepend">
              <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
            </div>
            <input {...register('newPassword', PASSWORD_VALIDATION)} type={showPass ? 'text' : 'password'} className="form-control border-0 bg-light mb-1" placeholder="New Password" aria-label="password" aria-describedby="basic-addon1" />
            <div className="pass-toggle">
              <button onMouseDown={(e) => e.preventDefault()} onMouseUp={(e) => e.preventDefault()} onClick={() => setShowPass(!showPass)} type='button' className="input-group-text rounded-start-0 border-0" id="basic-addon2">{showPass ? <i className="fa-solid fa-eye-slash fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i> : <i className="fa-solid fa-eye fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i>}</button>
            </div>
          </div>
          {errors.newPassword && <span className='text-danger'>{errors.newPassword.message}</span>}

          <div className="input-group mt-3">
            <div className="input-group-prepend">
              <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
            </div>
            <input {...register('confirmNewPassword', CONFIRM_PASSWORD_VALIDATION(newPassword))} type={showConfirmPass ? 'text' : 'password'} className="form-control border-0 bg-light mb-1" placeholder="Confirm New Password" aria-label="password" aria-describedby="basic-addon3" />
            <div className="pass-toggle">
              <button onMouseDown={(e) => e.preventDefault()} onMouseUp={(e) => e.preventDefault()} onClick={() => setShowConfirmPass(!showConfirmPass)} type='button' className="input-group-text rounded-start-0 border-0" id="basic-addon3">{showConfirmPass ? <i className="fa-solid fa-eye-slash fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i> : <i className="fa-solid fa-eye fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i>}</button>
            </div>
          </div>
          {errors.confirmNewPassword && <span className='text-danger'>{errors.confirmNewPassword.message}</span>}


          <button disabled={isSubmitting} type='submit' className='btn auth-btn theme-green-bg w-100 my-3 py-2 text-white fw-semibold fs-5'>Change Password <img src={loading} alt="loading" hidden={!isSubmitting} className='loading-img' /></button>
        </form >
      </div>




    </>
  )
}
