import React, { useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/Images/headerImg.svg'
import { Button, Dropdown, Modal, Table } from 'react-bootstrap'
import DeleteAlert from '../../../Shared/Components/DeleteAlert/DeleteAlert';
import NoData from '../../../Shared/Components/NoData/NoData';
import { Categ_URLs } from '../../../../Constants/END_POINTS.JSX';
import { useEffect } from 'react';
import axios from 'axios';
import loading from '../../../../assets/Images/loading.gif'
import { toast } from 'react-toastify';
import deleting from '../../../../assets/Images/deleting.gif'
import { useForm } from 'react-hook-form';
import { getCategories } from '../../../ApiCalls/ApiCalls';


export default function Categories() {

  let [isLoading, setIsLoading] = useState(true);

  let [categList, setCategList] = useState([]);
  let getCategList = async() => {
    try {
      let response =  await getCategories(10,1);
      setCategList(response.data.data);
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getCategList();
  }, [])


  {/* Delete confirmation */ }
  let [show, setShow] = useState(false);
  let [categId, setCategId] = useState(0);

  let [title, setTitle] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setCategId(id);
  }

  {/* Add new Category */ }
  let [categoryShow, setCategoryShow] = useState(false);

  const handleCategoryClose = () => setCategoryShow(false);
  const handleCategoryShow = () => {
    setTitle('Add')
    reset({ name: '' });
    setCategoryShow(true);
  }

  const handleCategoryEditShow = (name,id) => {
    setTitle('Edit')
    reset({ name });
    setCategoryShow(true);
    setCategId(id);
  }

  let { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  let onSubmit = async (data) => {
    try {
      if(categId){
        await axios.put(`${Categ_URLs.all}/${categId}`,data, { headers: { authorization: localStorage.getItem('token') } });
        toast.success('Category Name updated successfully');
      }
      else{
        await axios.post(Categ_URLs.all, data, { headers: { authorization: localStorage.getItem('token') } });
        toast.success('Category created successfully');
      }
      // reset();
      setCategId(null)
      getCategList();
      handleCategoryClose();
    } catch (error) {
      toast.error(error)
    }
  }

  let [isDeleting, setIsDeleting] = useState(false);

  let deleteCategory = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`${Categ_URLs.all}/${categId}`, { headers: { authorization: localStorage.getItem('token') } });
      setIsDeleting(false);
      toast.success('Item deleted successfully');
      getCategList();
      handleClose();
    } catch (error) {
      console.log(error)
    }
  }

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <span style={{ cursor: 'pointer' }} onClick={(e) => {
      onClick(e);
    }}>
      <i className="fa-solid fa-ellipsis"></i>
    </span>
  ));

  return (
    <>
      <Header title={'Categories Item'} desc={'You can now add your items that any user can order it from the Application and you can edit'} imgPath={headerImg} />

      <div className="d-flex justify-content-between align-items-center py-4">
        <div>
          <h5 className='m-0'>Categories Table Details</h5>
          <p className='m-0'>You can check all details</p>
        </div>
        <button onClick={handleCategoryShow} className='btn btn-success px-4'>Add New Category</button>
      </div>

      <div className="data-table">
        <Table striped className='table-borderless'>
          <thead>
            <tr className="text-center">
              <th className="rounded-start-3 bg-lightgrey border-0 py-3">ID</th>
              <th className='bg-lightgrey border-0 py-3'>Name</th>
              <th className='bg-lightgrey border-0 py-3'>Creation Date</th>
              <th className='bg-lightgrey border-0 rounded-end-3 py-3'>Actions</th>
            </tr>
          </thead>

          <tbody className='text-center'>
            {isLoading ?
              <tr>
                <td colSpan="4">
                  <img src={loading} alt="loading" className='mt-3' />
                </td>
              </tr> :
              categList.length === 0 ?
                <tr>
                  <td colSpan="4">
                    <NoData />
                  </td>
                </tr>
                :
                categList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.creationDate}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom"></Dropdown.Toggle>
                        <Dropdown.Menu className='rounded-4 border-0 shadow-sm'>
                          {/* <Dropdown.Item className='action-item'><i className="fa-regular fa-eye me-2 text-success"></i>View</Dropdown.Item> */}
                          <Dropdown.Item onClick={() => handleCategoryEditShow(item.name,item.id)} className='action-item'><i className="fa-regular fa-pen-to-square me-2 text-success"></i>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleShow(item.id)} className='action-item'><i className="fa-regular fa-trash-can me-2 text-success"></i>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </Table>
      </div>

      {/* Delete confirmation */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='border-0'>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <DeleteAlert itemName={'category'} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteCategory} disabled={isDeleting} className='btn btn-outline-danger text-danger bg-transparent fw-bold' variant="secondary">
            Delete this item
            <img src={deleting} alt="loading" hidden={!isDeleting} className='loading-img ms-3' />
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit new category */}
      <Modal show={categoryShow} onHide={handleCategoryClose}>
        <Modal.Header closeButton className='border-0'>
          {`${title} Category`}
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className=' p-5'>
            <input disabled={isSubmitting} type="text" className='form-control bg-light' placeholder='Category Name'
              {...register('name', { required: 'Category name is required!' })} />
            {errors.name && <span className='text-danger'>{errors.name.message}</span>}
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' disabled={isSubmitting} className='btn theme-green-bg auth-btn text-white px-4' variant="secondary">
              Save
              <img src={loading} alt="loading" hidden={!isSubmitting} className='loading-img ms-3' />
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}
