import Header from "../../../Shared/Components/Header/Header";
import headerImg from '../../../../assets/Images/headerImg.svg'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import noImg from '../../../../assets/Images/noImg.png'
import { Card } from "react-bootstrap";
import { Favs_URLs } from "../../../../Constants/END_POINTS.JSX";



export default function Favourits() {

  let [favList, setFavList] = useState([]);

  let getFavs = async () => {
    try {
      let response = await axios.get(`${Favs_URLs.all}`, { headers: { authorization: localStorage.getItem('token') } });
      setFavList(response.data.data)

    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!")
    }
  }


  useEffect(() => {
    getFavs();
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
      <Header title={'Favorite Items'} desc={'You can now add/remove your items from Your favourite list'} imgPath={headerImg} />

      <div className="row justify-content-around align-items-center my-4">

        {favList.map(item => (
          <div key={item.id} className="fav-recipe-container col-6 col-md-3 px-0">
            <div className="card-container mb-4">
              <Card className="w-100">
                <Card.Img variant="top" src={item?.recipe.imagePath ? `https://upskilling-egypt.com:3006/${item?.recipe.imagePath}` : noImg} />
                <Card.Body>
                  <Card.Title>{item?.recipe.name}</Card.Title>
                  <Card.Text>{item?.recipe.description}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        ))}


      </div>



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
