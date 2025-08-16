import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"
import { AUTH_URLs } from "../../../../Constants/END_POINTS.JSX";
import { toast } from "react-toastify";
import axios from "axios";

export default function VerifyAccount() {

  let { state } = useLocation();
  // console.log(state.email);

  let navigate = useNavigate();

  let { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  let onSubmit = async (data) => {    
    try {
      let response = await axios.put(AUTH_URLs.verify, data);
      toast.success(response.data.message);
      navigate('/login');

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (

    <>
      <div className="auth-title-container my-3">
        <h5 className='auth-title fw-bold'>Verify Account</h5>
        <p className='auth-subtitle text-secondary'>Please Enter Your Otp  or Check Your Inbox</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} >

        <div className="input-group mt-4 bg-light rounded-3">
          <div className="input-group-prepend">
            <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-mobile-screen fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
          </div>
          <input defaultValue={state.email} disabled {...register('email')} type="text" className="form-control border-0 bg-light" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mt-4 bg-light rounded-3">
          <div className="input-group-prepend">
            <span className="input-group-text rounded-end-0 border-0 py-2" id="basic-addon1"><i className="fa-solid fa-mobile-screen fs-5 text-secondary py-2 pe-2 border-end border-1 border-secondary"></i></span>
          </div>
          <input {...register('code')} type="text" className="form-control border-0 bg-light" placeholder="OTP" aria-label="otp" aria-describedby="basic-addon1" />
        </div>

        <button type='submit' className='btn auth-btn theme-green-bg w-100 my-4 py-2 text-white fw-semibold fs-5'>Send</button>
      </form>
    </>

  )
}
