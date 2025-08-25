import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import loading from '../../../../assets/Images/loading.gif'
import { toast } from 'react-toastify';
import noUserImg from '../../../../assets/Images/noUserImg.png'
import { Form } from 'react-bootstrap';
import { axiosInstance } from '../../../../Services/END_POINTS.JS';
import { USER_URLs } from '../../../../Services/END_POINTS.JS';

export default function UserData() {

  let params = useParams();

  let [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();

  let [userDetails, setUserDetails] = useState(null);
  let getUserDetails = async () => {
    try {
      let response = await axiosInstance.get(USER_URLs.getUserDetails(params.id));
      console.log(response.data)
      setUserDetails(response.data)
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!")
    }
    setIsLoading(false);

  }

  useEffect(() => {
    if (params.id)
      getUserDetails();
  }, []);

  return (
    <>
      <div className="recipes-header py-4 px-5 mt-4 rounded-4 d-flex justify-content-between align-items-center">
        <div>
          <h4>View the <span className='theme-green-text'>Users</span> !</h4>
          <p>you can now view the users easily using the table and form ,<br /> click here and sill it with the table !</p>
        </div>
        <button onClick={() => navigate('/dashboard/users')} className='btn auth-btn theme-green-bg text-white px-5 py-2'>All Users <i className="fa-solid fa-arrow-right text-white"></i></button>
      </div>

      {isLoading && params.id ? <div className='text-center mt-5'><img src={loading} alt="loading" className='mt-5' /></div>
        :
        <Form className='w-75 m-auto p-5'>
          <Form.Group className="mb-3">
            <Form.Control defaultValue={userDetails?.userName} disabled type="text" className='bg-light' />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control defaultValue={userDetails?.email} disabled type="text" className='bg-light' />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control defaultValue={userDetails?.country} disabled type="text" className='bg-light' />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control defaultValue={userDetails?.phoneNumber} disabled type="text" className='bg-light' />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control defaultValue={userDetails?.group.name} disabled type="text" className='bg-light' />
          </Form.Group>

          <Form.Group className="img-input-container rounded pt-2 text-center">
            {userDetails?.imagePath ? <img src={`https://upskilling-egypt.com:3006/${userDetails?.imagePath}`} className='w-25 rounded-circle' /> : <img src={noUserImg} alt='no img' className='rounded-circle' />}
            <p className='fw-medium mt-3'>Profile Picture</p>

            <Form.Control disabled type="file" hidden className='img-input' />
          </Form.Group>
        </Form>
      }
    </>
  )
}
