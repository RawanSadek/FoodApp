import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/Images/headerImg.svg'
import { Dropdown, Table } from 'react-bootstrap'
import NoData from '../../../Shared/Components/NoData/NoData'
import loading from '../../../../assets/Images/loading.gif'
import axios from 'axios'
import { Recipes_URLs } from '../../../../Constants/END_POINTS.JSX'
import recipeImg1 from '../../../../assets/Images/recipeImg1.jpg'
import recipeImg2 from '../../../../assets/Images/recipeImg2.jpg'
import DeleteAlert from '../../../Shared/Components/DeleteAlert/DeleteAlert'



export default function Recipes() {

  // const [showDelete, setShowDelete] = useState(false);


  const recipesImgs = [recipeImg1, recipeImg2]

  let [isLoading, setIsLoading] = useState(true);

  let [recipesList, setRecipesList] = useState([]);
  let getRecipesList = async () => {
    try {
      let response = await axios.get(`${Recipes_URLs.all}/?pageSize=5&pageNumber=1`, { headers: { authorization: localStorage.getItem('token') } })
      setRecipesList(response.data.data);
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getRecipesList();
  }, [])


  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <span style={{ cursor: 'pointer' }} onClick={(e) => {
      onClick(e);
    }}>
      <i className="fa-solid fa-ellipsis"></i>
    </span>
  ));
  return (
    <>
      <Header title={'Recipes Items'} desc={'You can now add your items that any user can order it from the Application and you can edit'} imgPath={headerImg} />

      <div className="d-flex justify-content-between align-items-center py-4">
        <div>
          <h5 className='m-0'>Recipe Table Details</h5>
          <p className='m-0'>You can check all details</p>
        </div>
        <button className='btn btn-success px-4'>Add New Item</button>
      </div>


      <div className="data-table">
        <Table striped className='table-borderless'>
          <thead>
            <tr className="text-center">
              <th className="rounded-start-3 bg-lightgrey border-0 py-3">Name</th>
              <th className='bg-lightgrey border-0 py-3'>Image</th>
              <th className='bg-lightgrey border-0 py-3'>Price</th>
              <th className='bg-lightgrey border-0 py-3'>Description</th>
              <th className='bg-lightgrey border-0 py-3'>Tag</th>
              <th className='bg-lightgrey border-0 py-3'>Category</th>
              <th className='bg-lightgrey border-0 rounded-end-3 py-3'>Actions</th>
            </tr>
          </thead>

          <tbody className='text-center'>
            {isLoading ?
              <tr>
                <td colSpan="7">
                  <img src={loading} alt="loading" className='mt-3' />
                </td>
              </tr> :
              recipesList.length === 0 ?
                <tr>
                  <td colSpan="7">
                    <NoData />
                  </td>
                </tr>
                :
                recipesList.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <img src={item.imagePath} alt="img" className='rounded-3'
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = recipesImgs[index % 2];
                        }}
                        style={{ width: '60px', height: '60px' }}
                      />
                    </td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.tag.name}</td>
                    <td>{item.category[0].name}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom"></Dropdown.Toggle>
                        <Dropdown.Menu className='rounded-4 border-0 shadow-sm'>
                          <Dropdown.Item className='action-item'><i className="fa-regular fa-eye me-2 text-success"></i>View</Dropdown.Item>
                          <Dropdown.Item className='action-item'><i className="fa-regular fa-pen-to-square me-2 text-success"></i>Edit</Dropdown.Item>
                          <Dropdown.Item className='action-item'
                            onClick={() => {
                              setSelectedItem(item);
                              setShowDelete(true);
                            }} >
                            <i className="fa-regular fa-trash-can me-2 text-success"></i>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </Table>
      </div>

      <DeleteAlert
        itemText={'item'}
        item={selectedItem}
        show={showDelete}
        handleClose={() => setShowDelete(false)}
        url={'recipe'}
      />
    </>
  )
}
