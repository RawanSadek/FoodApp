import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/Images/headerImg.svg'
import { Button, Dropdown, Modal, Pagination, Table } from 'react-bootstrap'
import NoData from '../../../Shared/Components/NoData/NoData'
import loading from '../../../../assets/Images/loading.gif'
import axios from 'axios'
import { Recipes_URLs } from '../../../../Constants/END_POINTS.JSX'
import noImg from '../../../../assets/Images/noImg.png'
import DeleteAlert from '../../../Shared/Components/DeleteAlert/DeleteAlert'
import deleting from '../../../../assets/Images/deleting.gif'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../../../ApiCalls/ApiCalls';
import { Tags_URLs } from '../../../../Constants/END_POINTS.JSX'
import { AuthContext } from '../../../../Contexts/AuthContext/AuthContext'
import { Favs_URLs } from '../../../../Constants/END_POINTS.JSX'



export default function Recipes() {

  let { loginData } = useContext(AuthContext);

  let navigate = useNavigate();

  let [isLoading, setIsLoading] = useState(true);
  let [imgLoading, setImgLoading] = useState(true);

  let [recipesList, setRecipesList] = useState([]);
  let [noOfPages, setNoOfPages] = useState([]);
  let getRecipesList = async (name, tag, categ, pageNumber) => {
    try {
      setIsLoading(true);
      let response = await axios.get(`${Recipes_URLs.all}/?name=${name}&tagId=${tag}&categoryId=${categ}&pageSize=5&pageNumber=${pageNumber}`, { headers: { authorization: localStorage.getItem('token') } })
      setRecipesList(response.data.data);
      setNoOfPages(Array(response.data.totalNumberOfPages).fill().map((_, index) => index + 1));

    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!")
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getRecipesList(nameSearchValue, tagSearchValue, categSearchValue, activePage);
    getCategs();
    getTags();

    if (loginData?.userGroup == 'SystemUser')
      getFavs();

  }, [])


  let [show, setShow] = useState(false);
  let [recipeId, setRecipeId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setRecipeId(id);
  }

  let [isDeleting, setIsDeleting] = useState(false);

  let deleteRecipe = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`${Recipes_URLs.all}/${recipeId}`, { headers: { authorization: localStorage.getItem('token') } });
      setIsDeleting(false);
      toast.success('Item deleted successfully');
      getRecipesList(nameSearchValue, tagSearchValue, categSearchValue, activePage);
      handleClose();

    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!")
    }
  }

  let [favsLoading, setFavsLoading] = useState(false);

  let addToFavs = async (recipe) => {
    try {
      setFavsLoading(true);
      await axios.post(`${Favs_URLs.all}`, { recipeId: recipe?.id }, { headers: { authorization: localStorage.getItem('token') } });
      getFavs();
      setFavsLoading(false);
      toast.success(`${recipe.name} added to favourits`);

    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!")
    }
  }

  let removeFromFavs = async (recipe) => {
    let favItem = favList.find(fav => fav.recipe.id === recipe?.id);
    try {
      setFavsLoading(true);
      await axios.delete(`${Favs_URLs.all}/${favItem.id}`, { headers: { authorization: localStorage.getItem('token') } });
      getFavs();
      setFavsLoading(false);
      toast.success(`${recipe.name} removed from favourits`);
      // getRecipesList(nameSearchValue, tagSearchValue, categSearchValue, activePage);
      // handleClose();

    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!")
    }
  }


  let [favList, setFavList] = useState([]);

  let getFavs = async () => {
    try {
      let response = await axios.get(`${Favs_URLs.all}`, { headers: { authorization: localStorage.getItem('token') } });
      // console.log(response.data.data)
      setFavList(response.data.data)

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
    getRecipesList(nameSearchValue, tagSearchValue, categSearchValue, page);
    setImgLoading(true);
  };


  let [categories, setCategories] = useState([]);
  let getCategs = async () => {
    let response = await getCategories('', 9999, 1);
    setCategories(response.data.data);
  }

  let [tags, setTags] = useState([]);
  let getTags = async () => {
    let response = await axios.get(Tags_URLs.all, { headers: { authorization: localStorage.getItem('token') } });
    setTags(response.data);
  }


  let [nameSearchValue, setNameSearchValue] = useState('');
  let [tagSearchValue, setTagSearchValue] = useState('');
  let [categSearchValue, setCategSearchValue] = useState('');

  let getNameSearchValue = (input) => {
    setNameSearchValue(input.target.value);
    getRecipesList(input.target.value, tagSearchValue, categSearchValue, 1);
    setActivePage(1);
  }

  let getTagSearchValue = (selection) => {
    setTagSearchValue(selection.target.value);
    getRecipesList(nameSearchValue, selection.target.value, categSearchValue, 1);
    setActivePage(1);
  }

  let getCategSearchValue = (selection) => {
    setCategSearchValue(selection.target.value);
    getRecipesList(nameSearchValue, tagSearchValue, selection.target.value, 1);
    setActivePage(1);
  }

  return (
    <>
      <Header title={'Recipes Items'} desc={'You can now add your items that any user can order it from the Application and you can edit'} imgPath={headerImg} />

      <div className="d-flex justify-content-between align-items-center py-4">
        <div>
          <h5 className='m-0'>Recipe Table Details</h5>
          <p className='m-0'>You can check all details</p>
        </div>
        <button onClick={() => navigate('/dashboard/new-recipe')} hidden={loginData?.userGroup == 'SystemUser'} className='btn theme-green-bg text-white auth-btn px-5 py-2'>Add New Recipe</button>
      </div>

      <div className="search-inputs row justify-content-between align-items-center">
        <div className="search-name col-12 col-md-7 border border-1 mb-4 px-3 py-2 rounded-3">
          <i className="fa-solid fa-magnifying-glass text-secondary me-2"></i>
          <input onChange={getNameSearchValue} type="text" placeholder='Search by Name' className='border-0' />
        </div>

        <div className="search-tags col-6 col-md-2 border border-1 mb-4 px-3 py-2 rounded-3">
          <select onChange={getTagSearchValue} name="tags" id="tags" className='w-100 border-0'>
            <option value="" >Search by Tag</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
        </div>

        <div className="search-categs col-6 col-md-2 border border-1 mb-4 px-3 py-2 rounded-3">
          <select onChange={getCategSearchValue} name="categories" id="categories" className='w-100 border-0'>
            <option value="">Search by Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

      </div>

      <div className="data-table position-relative">
        {favsLoading && <div className='loading-overlay'></div>}
        <Table striped className='table-borderless'>
          <thead>
            <tr className="text-center">
              <th className="rounded-start-3 bg-lightgrey border-0 py-3">ID</th>
              <th className="bg-lightgrey border-0 py-3">Name</th>
              <th className='bg-lightgrey border-0 py-3'>Image</th>
              <th className='bg-lightgrey border-0 py-3'>Price</th>
              <th className='bg-lightgrey border-0 py-3'>Description</th>
              <th className='bg-lightgrey border-0 py-3'>Tag</th>
              <th className='bg-lightgrey border-0 py-3'>Category</th>
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

            {!isLoading && recipesList.length === 0 &&
              <tr>
                <td colSpan="8">
                  <NoData />
                </td>
              </tr>}

            {!isLoading && recipesList.map((item) => (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
                <td>
                  {imgLoading && <img src={loading} alt="loading" hidden={!imgLoading} className='loading-img ms-3' />}
                  <img src={`https://upskilling-egypt.com:3006/${item?.imagePath}`} hidden={imgLoading} alt="img" className='rounded-3'
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = noImg;
                    }}
                    onLoad={() => setImgLoading(false)}
                    style={{ width: '60px', height: '60px' }}
                  />

                </td>
                <td>{item?.price}</td>
                <td>{item?.description}</td>
                <td>{item?.tag.name}</td>
                <td>{item?.category[0]?.name}</td>
                <td>
                  {loginData?.userGroup == 'SuperAdmin' ?
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom"></Dropdown.Toggle>
                      <Dropdown.Menu className='rounded-4 border-0 shadow-sm'>
                        <Dropdown.Item onClick={() => navigate(`/dashboard/view-recipe/${item?.id}`, { state: { view: true } })} className='action-item'><i className="fa-regular fa-eye me-2 text-success"></i>View</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate(`/dashboard/update-recipe/${item?.id}`)} className='action-item'><i className="fa-regular fa-pen-to-square me-2 text-success"></i>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShow(item?.id)} className='action-item'><i className="fa-regular fa-trash-can me-2 text-success"></i>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    : <>
                      <i onClick={() => navigate(`/dashboard/view-recipe/${item?.id}`, { state: { view: true } })} className="fa-regular fa-eye me-2 text-success pointer" data-bs-toggle="tooltip" data-bs-placement="right" title="View"></i>
                      {favList.some(fav => fav.recipe.id === item?.id) ? <i onClick={() => removeFromFavs(item)} className="fa-solid fa-heart me-2 text-danger pointer" data-bs-toggle="tooltip" data-bs-placement="right" title="Remove from favourits"></i>
                        : <i onClick={() => addToFavs(item)} className="fa-regular fa-heart me-2 text-success pointer" data-bs-toggle="tooltip" data-bs-placement="right" title="Add to favourits"></i>
                      }
                    </>}
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
          <DeleteAlert itemName={'recipe'} />
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={isDeleting} className='btn btn-outline-danger text-danger bg-transparent fw-bold' variant="secondary" onClick={deleteRecipe}>
            Delete this item
            <img src={deleting} alt="loading" hidden={!isDeleting} className='loading-img ms-3' />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
