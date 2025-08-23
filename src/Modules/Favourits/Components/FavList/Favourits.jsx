import Header from "../../../Shared/Components/Header/Header";
import headerImg from '../../../../assets/Images/headerImg.svg'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


export default function Favourits() {

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


  useEffect(() => {
    getFavs();
    getCategs();
    getTags();

  }, [])
  
  // let [nameSearchValue, setNameSearchValue] = useState('');
  // let [tagSearchValue, setTagSearchValue] = useState('');
  // let [categSearchValue, setCategSearchValue] = useState('');

  // let getNameSearchValue = (input) => {
  //   setNameSearchValue(input.target.value);
  //   // getRecipesList(input.target.value, tagSearchValue, categSearchValue, 1);
  //   setActivePage(1);
  // }

  // let getTagSearchValue = (selection) => {
  //   setTagSearchValue(selection.target.value);
  //   // getRecipesList(nameSearchValue, selection.target.value, categSearchValue, 1);
  //   setActivePage(1);
  // }

  // let getCategSearchValue = (selection) => {
  //   setCategSearchValue(selection.target.value);
  //   // getRecipesList(nameSearchValue, tagSearchValue, selection.target.value, 1);
  //   setActivePage(1);
  // }

  return (
    <>
      <Header title={'Favorite Items'} desc={'You can now add/remove your items in Your favourite list'} imgPath={headerImg} />

      {/* <div className="search-inputs row justify-content-between align-items-center mt-4">
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

      </div> */}



      {/* Delete confirmation */}
      {/* <Modal show={show} onHide={handleClose}>
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
      </Modal> */}
    </>
  )
}
