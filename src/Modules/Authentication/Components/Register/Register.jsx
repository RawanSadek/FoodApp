
import { useForm } from 'react-hook-form';

export default function Register() {
  let { register, handleSubmit, formState: { errors } } = useForm();

  let onSubmit = (data) => {
    console.log(data)
  }

  return (

    <>
      <div className="auth-title-container my-3">
        <h5 className='auth-title fw-bold'>Register</h5>
        <p className='auth-subtitle text-secondary'>Welcome Back! Please enter your details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type='submit' className='btn auth-btn theme-green-bg w-100 my-4 py-2 text-white fw-semibold fs-5'>Register</button>

      </form>
    </>
  )

}
