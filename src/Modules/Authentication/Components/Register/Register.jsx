import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loading from '../../../../assets/Images/loading.gif'
import noProfilePic from '../../../../assets/Images/noProfilePic.png'
import { useEffect, useRef, useState } from 'react';
import { PASSWORD_VALIDATION } from '../../../../Services/VALIDATIONS.JS';
import { EMAIL_VALIDATION } from '../../../../Services/VALIDATIONS.JS';
import { PHONE_VALIDATION } from '../../../../Services/VALIDATIONS.JS';
import { REQUIRED_VALIDATION } from '../../../../Services/VALIDATIONS.JS';
import { CONFIRM_PASSWORD_VALIDATION } from '../../../../Services/VALIDATIONS.JS';
import { axiosInstance } from '../../../../Services/END_POINTS.JS';
import { USER_URLs } from '../../../../Services/END_POINTS.JS';


export default function Register() {
  let { register, handleSubmit, formState: { errors, isSubmitting }, watch, trigger } = useForm();

  const password = watch('password'); // Watching the original password

  let navigate = useNavigate();

  let appendToFormData = (data) => {
    let formData = new FormData();
    formData.append('userName', data.userName);
    formData.append('email', data.email);
    formData.append('country', data.country);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);
    formData.append('profileImage', data.profileImage);
    return formData;
  }

  let onSubmit = async (data) => {
    let userData = appendToFormData(data)

    try {
      let response = await axiosInstance.post(USER_URLs.register, userData);
      toast.success(response.data.message);
      navigate('/verify-account', { state: { email: data.email } });

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

  let fileInputRef = useRef();

  let handleClick = () => {
    fileInputRef.current.click();
  };


  const [imgPreview, setImgPreview] = useState(null);
  let handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        setImgPreview(URL.createObjectURL(file)); // create a temporary preview URL
      }
    }
  }

  return (
    <>
      <div className="auth-title-container mt-1">
        <h5 className='auth-title fw-bold'>Register</h5>
        <p className='auth-subtitle text-secondary'>Welcome Back! Please enter your details</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

          <div className="img-input rounded text-center w-30 m-auto" onClick={handleClick}>
            {imgPreview ? <img src={imgPreview} className='w-30 rounded-circle' /> : <img src={noProfilePic} alt='no img' className='rounded-circle w-30'/>}
            <p className='fw-medium mt-2'>Choose a <span className="theme-green-text">Profile Picture</span> to upload</p>

            <input {...register('profileImage')} ref={(e) => {
              fileInputRef.current = e; // store for manual click
              register("profileImage").ref(e); // give to RHF
            }} onChange={handleFileChange} type="file" hidden className='img-input' />
          </div>
        <div className="row">


          <div className="col-md-6">

            <div className="input-group mt-4 bg-light rounded-3">
              <div className="input-group-prepend">
                <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-mobile-screen fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
              </div>
              <input {...register('userName', REQUIRED_VALIDATION('Username'))} type="text" className="form-control border-0 bg-light" placeholder="UserName" aria-label="username" aria-describedby="basic-addon1" />
            </div>
            {errors.userName && <span className='text-danger'>{errors.userName.message}</span>}

            <div className="input-group mt-4 bg-light rounded-3">
              <div className="input-group-prepend">
                <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-earth-africa fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
              </div>
              <input {...register('country', REQUIRED_VALIDATION('Country'))} type="text" className="form-control border-0 bg-light" placeholder="Country" aria-label="country" aria-describedby="basic-addon1" />
            </div>
            {errors.country && <span className='text-danger'>{errors.country.message}</span>}

            <div className="input-group mt-3">
              <div className="input-group-prepend">
                <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
              </div>
              <input {...register('password', PASSWORD_VALIDATION)} type={showPass ? 'text' : 'password'} className="form-control border-0 bg-light mb-1" placeholder="New Password" aria-label="password" aria-describedby="basic-addon1" />
              <div className="pss-toggle">
                <button onMouseDown={(e) => e.preventDefault()} onMouseUp={(e) => e.preventDefault()} onClick={() => setShowPass(!showPass)} type='button' className="input-group-text py-2 border-0" id="basic-addon1">{showPass ? <i className="fa-solid fa-eye-slash fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i> : <i className="fa-solid fa-eye fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i>}</button>
              </div>
            </div>
            {errors.password && <span className='text-danger'>{errors.password.message}</span>}


          </div>

          <div className="col-md-6">
            <div className="input-group mt-4 bg-light rounded-3">
              <div className="input-group-prepend">
                <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-mobile-screen fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
              </div>
              <input {...register('email', EMAIL_VALIDATION)} type="text" className="form-control border-0 bg-light" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1" />
            </div>
            {errors.email && <span className='text-danger'>{errors.email.message}</span>}

            <div className="input-group mt-4 bg-light rounded-3">
              <div className="input-group-prepend">
                <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-phone fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
              </div>
              <input {...register('phoneNumber', PHONE_VALIDATION)} type="text" className="form-control border-0 bg-light" placeholder="Phone Number" aria-label="phoneNumber" aria-describedby="basic-addon1" />
            </div>
            {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}

            <div className="input-group mt-3">
              <div className="input-group-prepend">
                <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-lock fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
              </div>
              <input {...register('confirmPassword', CONFIRM_PASSWORD_VALIDATION(password))} type={showConfirmPass ? 'text' : 'password'} className="form-control border-0 bg-light mb-1" placeholder="Confirm Password" aria-label="password" aria-describedby="basic-addon1" />
              <div className="pss-toggle">
                <button onClick={() => setShowConfirmPass(!showConfirmPass)} type='button' className="input-group-text py-2 border-0" id="basic-addon2">{showConfirmPass ? <i className="fa-solid fa-eye-slash fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i> : <i className="fa-solid fa-eye fs-5 text-secondary py-2 px-2 border-start border-1 border-secondary"></i>}</button>
              </div>
            </div>
            {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}

          </div>
          

          <div className="links d-flex justify-content-end align-items-center">
            <Link to='/login' className='text-decoration-none fw-semibold mt-3 theme-green-text'>Login Now?</Link>
          </div>
        </div>

        <div className="text-center">
          <button disabled={isSubmitting} type='submit' className='btn auth-btn theme-green-bg w-75 mt-3 py-2 text-white fw-semibold fs-5'>Register <img src={loading} alt="loading" hidden={!isSubmitting} className='loading-img' /></button>
        </div>
      </form>
    </>
  )

}
