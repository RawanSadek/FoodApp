import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/Images/headerImg.svg'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import noUserImg from '../../../../assets/Images/noUserImg.png'
import { Button, Dropdown, Modal, Pagination, Table } from 'react-bootstrap';
import loading from '../../../../assets/Images/loading.gif'
import DeleteAlert from '../../../Shared/Components/DeleteAlert/DeleteAlert';
import deleting from '../../../../assets/Images/deleting.gif'
import NoData from '../../../Shared/Components/NoData/NoData'
import axios from 'axios';
import { BASE_USER } from '../../../../Constants/END_POINTS.JSX';
import { toast } from 'react-toastify';


export default function Users() {

  let navigate = useNavigate();

  let [isLoading, setIsLoading] = useState(true);
  let [imgLoading, setImgLoading] = useState(true);

  let [usersList, setUsersList] = useState([]);
  let [noOfPages, setNoOfPages] = useState([]);

  let getUsersList = async (userName, email, country, groups, pageNumber) => {
    try {
      setIsLoading(true);
      let response = await axios.get(`${BASE_USER}/?userName=${userName}&email=${email}&country=${country}&groups=${groups}&pageSize=5&pageNumber=${pageNumber}`, { headers: { authorization: localStorage.getItem('token') } })
      setUsersList(response.data.data);
      setNoOfPages(Array(response.data.totalNumberOfPages).fill().map((_, index) => index + 1));
      
    } catch (error) {
      toast.error(error.response.data.message || 'Something wrong happen!')
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getUsersList(userNameSearchValue, emailSearchValue, countrySearchValue, groupSearchValue, 1);
  }, [])

  let [show, setShow] = useState(false);
  let [userId, setUserId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setUserId(id);
  }

  let [isDeleting, setIsDeleting] = useState(false);

  let deleteUser = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`${BASE_USER}/${userId}`, { headers: { authorization: localStorage.getItem('token') } });
      setIsDeleting(false);
      handleClose();
      getUsersList(userNameSearchValue, emailSearchValue, countrySearchValue, groupSearchValue, activePage);
      toast.success('User deleted successfully');

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

  const handleClick = (page) => {
    setActivePage(page);
    getUsersList(userNameSearchValue, emailSearchValue, countrySearchValue, groupSearchValue, page);
    setImgLoading(true)
  };


  const start = Math.max(1, activePage - 2);
  const end = Math.min(noOfPages[noOfPages.length - 1], activePage + 2);

  const pageNumbers = [];
  for (let page = start; page <= end; page++) {
    pageNumbers.push(
      <Pagination.Item
        key={page}
        active={page === activePage}
        onClick={() => handleClick(page)}
      >
        {page}
      </Pagination.Item>
    );
  }
  // console.log(pageNumbers)


  let [userNameSearchValue, setUserNameSearchValue] = useState('');
  let [emailSearchValue, setEmailSearchValue] = useState('');
  let [countrySearchValue, setCountrySearchValue] = useState('');
  let [groupSearchValue, setGroupSearchValue] = useState('');

  let getUserNameSearchValue = (input) => {
    setUserNameSearchValue(input.target.value);
    getUsersList(input.target.value, emailSearchValue, countrySearchValue, groupSearchValue, 1);
    setActivePage(1);
  }

  let getEmailSearchValue = (input) => {
    setEmailSearchValue(input.target.value);
    getUsersList(userNameSearchValue, input.target.value, countrySearchValue, groupSearchValue, 1);
    setActivePage(1);
  }

  let getCountrySearchValue = (input) => {
    setCountrySearchValue(input.target.value);
    getUsersList(userNameSearchValue, emailSearchValue, input.target.value, groupSearchValue, 1);
    setActivePage(1);
  }

  let getGroupSearchValue = (selection) => {
    setGroupSearchValue(selection.target.value);
    getUsersList(userNameSearchValue, emailSearchValue, countrySearchValue, selection.target.value, 1);
    setActivePage(1);
  }


  return (
    <>
      <Header title={'Users List'} desc={'You can now add your items that any user can order it from the Application and you can edit'} imgPath={headerImg} />

      <div className=" py-4">
        <h5 className='m-0'>Users Table Details</h5>
        <p className='m-0'>You can check all details</p>
      </div>

      <div className="search-inputs row justify-content-between align-items-center">

        <div className="search-nam col-12 col-md-3 border border-1 mb-4 px-3 py-2 rounded-3">
          <i className="fa-solid fa-magnifying-glass text-secondary me-2"></i>
          <input onChange={getUserNameSearchValue} type="text" placeholder='Search by Username' className='border-0' />
        </div>

        <div className="search-email col-12 col-md-3 border border-1 mb-4 px-3 py-2 rounded-3">
          <i className="fa-solid fa-magnifying-glass text-secondary me-2"></i>
          <input onChange={getEmailSearchValue} type="text" placeholder='Search by Email' className='border-0' />
        </div>

        <div className="search-country col-12 col-md-3 border border-1 mb-4 px-3 py-2 rounded-3">
          <i className="fa-solid fa-magnifying-glass text-secondary me-2"></i>
          <input onChange={getCountrySearchValue} type="text" placeholder='Search by Country' className='border-0' />
        </div>

        <div className="search-tags col-6 col-md-2 border border-1 mb-4 px-3 py-2 rounded-3">
          <select onChange={getGroupSearchValue} name="group" id="group" className='w-100 border-0'>
            <option value="" >Search by country</option>
            <option value="1">Admin</option>
            <option value="2">System User</option>
          </select>
        </div>

      </div>

      <div className="data-table">
        <Table striped className='table-borderless'>
          <thead>
            <tr className="text-center">
              <th className="rounded-start-3 bg-lightgrey border-0 py-3">ID</th>
              <th className="bg-lightgrey border-0 py-3">User Name</th>
              <th className="bg-lightgrey border-0 py-3">Image</th>
              <th className='bg-lightgrey border-0 py-3'>Email</th>
              <th className='bg-lightgrey border-0 py-3'>Phone Number</th>
              <th className='bg-lightgrey border-0 py-3'>Country</th>
              <th className='bg-lightgrey border-0 py-3'>Group Name</th>
              <th className='bg-lightgrey border-0 rounded-end-3 py-3'>Actions</th>
            </tr>
          </thead>

          <tbody className='text-center'>
            {isLoading &&
              <tr>
                <td colSpan="8">
                  <img src={loading} alt="loading" className='mt-3' />
                </td>
              </tr>}

            {!isLoading && usersList.length === 0 &&
              <tr>
                <td colSpan="8">
                  <NoData />
                </td>
              </tr>
            }
            {!isLoading && usersList.map((user) => (
              <tr key={user?.id}>
                <td>{user?.id}</td>
                <td>{user?.userName}</td>
                <td>
                  {imgLoading && <img src={loading} alt="loading" hidden={!imgLoading} className='loading-img ms-3' />}
                  <img src={`https://upskilling-egypt.com:3006/${user?.imagePath}`} hidden={imgLoading} alt="img" className='rounded-circle'
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = noUserImg;
                    }}
                    onLoad={() => setImgLoading(false)}
                    style={{ width: '50px', height: '50px' }}
                  />

                </td>
                <td>{user?.email}</td>
                <td>{user?.phoneNumber}</td>
                <td>{user?.country}</td>
                <td>{user?.group.name}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom"></Dropdown.Toggle>
                    <Dropdown.Menu className='rounded-4 border-0 shadow-sm'>
                      <Dropdown.Item onClick={() => navigate(`/dashboard/users/${user?.id}`)} className='action-item'><i className="fa-regular fa-eye me-2 text-success"></i>View</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleShow(user?.id)} className='action-item'><i className="fa-regular fa-trash-can me-2 text-success"></i>Delete</Dropdown.Item>
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
            {start > 1 &&
              <>
                <Pagination.Item onClick={() => handleClick(1)}>1</Pagination.Item>
                <Pagination.Ellipsis disabled />
              </>
            }

            {pageNumbers}

            {end < noOfPages.length &&
              <>
                <Pagination.Ellipsis disabled />
                <Pagination.Item onClick={() => handleClick(noOfPages[noOfPages.length - 1])}>{noOfPages[noOfPages.length - 1]}</Pagination.Item>
              </>
            }
            {/* <Pagination.Ellipsis /> */}
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
          <DeleteAlert itemName={'User'} />
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={isDeleting} className='btn btn-outline-danger text-danger bg-transparent fw-bold' variant="secondary" onClick={deleteUser}>
            Delete this item
            <img src={deleting} alt="loading" hidden={!isDeleting} className='loading-img ms-3' />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
