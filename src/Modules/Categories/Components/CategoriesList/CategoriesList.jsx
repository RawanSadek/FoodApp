import React, { useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/Images/headerImg.svg'
import { Button, Dropdown, Modal, Pagination, Table } from 'react-bootstrap'
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

  let [noOfPages, setNoOfPages] = useState([]);

  let [isLoading, setIsLoading] = useState(true);

  let [categList, setCategList] = useState([]);

  let getCategList = async (name, pageNumber) => {
    try {
      setIsLoading(true);
      let response = await getCategories(name, 5, pageNumber);
      setCategList(response.data.data);
      setNoOfPages(Array(response.data.totalNumberOfPages).fill().map((_, index) => index + 1));
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!")
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getCategList(nameSearchValue, 1);
  }, [])


  {/* Delete confirmation */ }
  let [show, setShow] = useState(false);
  let [categId, setCategId] = useState(null);

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

  const handleCategoryEditShow = (name, id) => {
    setTitle('Edit')
    reset({ name });
    setCategoryShow(true);
    setCategId(id);
  }

  let { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  let onSubmit = async (data) => {
    try {
      if (categId) {
        await axios.put(`${Categ_URLs.all}/${categId}`, data, { headers: { authorization: localStorage.getItem('token') } });
        toast.success('Category Name updated successfully');
      }
      else {
        await axios.post(Categ_URLs.all, data, { headers: { authorization: localStorage.getItem('token') } });
        toast.success('Category created successfully');
      }
      // reset();
      setCategId(null)
      getCategList(nameSearchValue, activePage);
      handleCategoryClose();
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!")
    }
  }

  let [isDeleting, setIsDeleting] = useState(false);

  let deleteCategory = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`${Categ_URLs.all}/${categId}`, { headers: { authorization: localStorage.getItem('token') } });
      setIsDeleting(false);
      toast.success('Item deleted successfully');
      getCategList(nameSearchValue, activePage);
      setCategId(null)
      // console.log(nameSearchValue)
      handleClose();
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!")
    }
  }

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <span style={{ cursor: 'pointer' }} onClick={(e) => {
      onClick(e);
    }}>
      <i className="fa-solid fa-ellipsis"></i>
    </span>
  ));

  const [activePage, setActivePage] = useState(1); // default first page

  const handleClick = (pageNumber) => {
    setActivePage(pageNumber);
    getCategList(nameSearchValue, pageNumber);
  };


  let [nameSearchValue, setNameSearchValue] = useState('');

  let getSearchValue = (input) => {
    setNameSearchValue(input.target.value);
    getCategList(input.target.value, 1);
    setActivePage(1);
  }


  return (
    <>
      <Header title={'Categories Item'} desc={'You can now add your items that any user can order it from the Application and you can edit'} imgPath={headerImg} />

      <div className="d-flex justify-content-between align-items-center py-4">
        <div>
          <h5 className='m-0'>Categories Table Details</h5>
          <p className='m-0'>You can check all details</p>
        </div>
        <button onClick={handleCategoryShow} className='btn auth-btn theme-green-bg text-white px-4'>Add New Category</button>
      </div>

      <div className="search-inputs border border-1 mb-4 px-3 py-2 rounded-3">
        <i className="fa-solid fa-magnifying-glass text-secondary me-2"></i>
        <input onChange={getSearchValue} type="text" placeholder='Search by Name' className='border-0' />
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
            {isLoading &&
              <tr>
                <td colSpan="4">
                  <img src={loading} alt="loading" className='mt-3' />
                </td>
              </tr>}

            {!isLoading && categList.length === 0 &&
              <tr>
                <td colSpan="4">
                  <NoData />
                </td>
              </tr>
            }

            {!isLoading && categList.map((item) => (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
                <td>{new Date(item?.creationDate).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom"></Dropdown.Toggle>
                    <Dropdown.Menu className='rounded-4 border-0 shadow-sm'>
                      {/* <Dropdown.Item className='action-item'><i className="fa-regular fa-eye me-2 text-success"></i>View</Dropdown.Item> */}
                      <Dropdown.Item onClick={() => handleCategoryEditShow(item?.name, item?.id)} className='action-item'><i className="fa-regular fa-pen-to-square me-2 text-success"></i>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleShow(item?.id)} className='action-item'><i className="fa-regular fa-trash-can me-2 text-success"></i>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>

        {/* Pagination */}
        <div className='mt-5 d-flex justify-content-center'>
          <Pagination hidden={noOfPages.length === 0}>
            <Pagination.First onClick={() => handleClick(1)} disabled={activePage === 1} data-bs-toggle="tooltip" data-bs-placement="right" title="First page" />
            <Pagination.Prev onClick={() => handleClick(activePage - 1)} disabled={activePage === 1} data-bs-toggle="tooltip" data-bs-placement="right" title="Previous page" />
            {noOfPages.map((page) => (
              <Pagination.Item key={page} active={page === activePage} onClick={() => handleClick(page)}>{page}</Pagination.Item>

            ))}
            <Pagination.Next onClick={() => handleClick(activePage + 1)} disabled={activePage === noOfPages.length} data-bs-toggle="tooltip" data-bs-placement="right" title="Next page" />
            <Pagination.Last onClick={() => handleClick(noOfPages[noOfPages.length - 1])} disabled={activePage === noOfPages.length} data-bs-toggle="tooltip" data-bs-placement="right" title="Last page" />
          </Pagination>
        </div>

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
