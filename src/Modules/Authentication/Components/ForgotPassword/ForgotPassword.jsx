import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import loading from '../../../../assets/Images/loading.gif'
import { axiosInstance } from '../../../../Services/END_POINTS.JS';
import { USER_URLs } from '../../../../Services/END_POINTS.JS';



export default function ForgotPassword() {
  let navigate = useNavigate();

  let { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  let onSubmit = async (data) => {
    try {
      let response = await axiosInstance.post(USER_URLs.forgot, data);
      console.log(response)
      toast.success(response?.data?.message);
      navigate('/reset-password', { state: { email: data.email } });

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
