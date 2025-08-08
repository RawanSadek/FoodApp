import React, { useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/Images/headerImg.svg'
import { Button, ButtonGroup, Dropdown, Table } from 'react-bootstrap'
import DeleteAlert from '../../../Shared/Components/DeleteAlert/DeleteAlert';
import NoData from '../../../Shared/Components/NoData/NoData';
import { Categ_URLs } from '../../../../Constants/END_POINTS.JSX';
import { useEffect } from 'react';
import axios from 'axios';


export default function Categories() {

  let [categList, setCategList] = useState([]);
  let getCategList = async () => {
    try {
      let response = await axios.get(`${Categ_URLs.all}/?pageSize=5&pageNumber=1`, { headers: { authorization: localStorage.getItem('token') } })
      setCategList(response.data.data);
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getCategList();
  }, [])

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <span style={{ cursor: 'pointer' }} onClick={(e) => {
      onClick(e);
    }}>
      <i class="fa-solid fa-ellipsis"></i>
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
        <button className='btn btn-success px-4'>Add New Category</button>
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
            {categList.length === 0 ?
              <tr>
                <td colSpan="4">
                  <NoData />
                </td>
              </tr>
              :
              categList.map((item)=>(
                <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.creationDate}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom"></Dropdown.Toggle>
                    <Dropdown.Menu className='rounded-4 border-0 shadow-sm'>
                      <Dropdown.Item className='action-item'><i className="fa-regular fa-eye me-2 text-success"></i>View</Dropdown.Item>
                      <Dropdown.Item className='action-item'><i className="fa-regular fa-pen-to-square me-2 text-success"></i>Edit</Dropdown.Item>
                      <Dropdown.Item className='action-item'><i class="fa-regular fa-trash-can me-2 text-success"></i>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
              ))
            }
          </tbody>
        </Table>
      </div>

    </>
  )
}
