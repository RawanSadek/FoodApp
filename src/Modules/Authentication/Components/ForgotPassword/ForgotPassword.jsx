
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AUTH_URLs } from '../../../../Constants/END_POINTS.JSX';
import { toast } from 'react-toastify';
import axios from 'axios';
import loading from '../../../../assets/Images/loading.gif'



export default function ForgotPassword() {
  let navigate = useNavigate();

  let { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  let onSubmit = async (data) => {
    // console.log(AUTH_URLs.login)
    try {
      let response = await axios.post(AUTH_URLs.forgot, data);
      console.log(response)
      toast.success(response?.data?.message);
      navigate('/reset-password', { state: { email: data.email } });  // should i do this? or store it in the local storage instead?

    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }

  return (
<><div className="auth-title-container my-3">
        <h5 className='auth-title fw-bold'>Forgot Your Password?</h5>
        <p className='auth-subtitle text-secondary'>No worries! Please enter your email and we will send a password reset link </p>
      </div>

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group mt-4 bg-light rounded-3">
        <div className="input-group-prepend">
          <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-mobile-screen fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
        </div>
        <input {...register('email', { required: 'Email is required!', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid Email!' } })} type="text" className="form-control border-0 bg-light" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1" />
      </div>
      {errors.email && <span className='text-danger'>{errors.email.message}</span>}

      <button disabled={isSubmitting}  type='submit' className='btn auth-btn theme-green-bg w-100 my-4 py-2 text-white fw-semibold fs-5'>Submit <img src={loading} alt="loading" hidden={!isSubmitting} className='loading-img'/></button>
    </form>
</>
  )
}
