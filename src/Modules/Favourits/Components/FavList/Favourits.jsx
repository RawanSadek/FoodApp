import Header from "../../../Shared/Components/Header/Header";
import headerImg from '../../../../assets/Images/headerImg.svg'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import noImg from '../../../../assets/Images/noImg.png'
import { Button, Card, Modal } from "react-bootstrap";
import loading from '../../../../assets/Images/loading.gif'
import NoData from "../../../Shared/Components/NoData/NoData";
import DeleteAlert from "../../../Shared/Components/DeleteAlert/DeleteAlert";
import deleting from '../../../../assets/Images/deleting.gif'
import { axiosInstance } from "../../../../Services/END_POINTS.JS";
import { Favs_URLs } from "../../../../Services/END_POINTS.JS";



export default function Favourits() {

  let [isLoading, setIsLoading] = useState(false);

  let [favList, setFavList] = useState([]);

  let getFavs = async () => {
    setIsLoading(true);
    try {
      let response = await axiosInstance.get(Favs_URLs.all);
      setFavList(response.data.data);

    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!")
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getFavs();
  }, [])


  let [show, setShow] = useState(false);
  let [favItem, setFavItem] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setShow(true);
    setFavItem(item);
  }

  let [isDeleting, setIsDeleting] = useState(false);

  let removeFromFavs = async () => {
    try {
      setIsDeleting(true)
      await axiosInstance.delete(Favs_URLs.removeFav(favItem.id));
      getFavs();
      
      toast.success(`${favItem.recipe.name} removed from favourits`);
    } catch (error) {
      toast.error(error.response?.data.message || "Something went wrong!")
    }
    setIsDeleting(false);
    handleClose();
  }

  return (
    <>
      <Header title={'Favorite Items'} desc={'You can now add/remove your items from Your favourite list'} imgPath={headerImg} />

      <div className="row justify-content-around align-items-center my-5">

        {isLoading && <img src={loading} alt="loading" className='mt-5 w-25' />}

        {!isLoading && favList?.length === 0 && <NoData />}

        {!isLoading && favList?.map(item => (
          <div key={item.id} className="fav-recipe-container col-6 col-md-4 px-0">
            <div className="card-container mb-4 position-relative">
              <i onClick={() => handleShow(item)} className="fa-solid fa-heart text-danger bg-white py-1 border border-2 border-black pointer fav-icon rounded-3" data-bs-toggle="tooltip" data-bs-placement="right" title="Remove from favourits"></i>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='border-0'>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <DeleteAlert itemName={'recipe'} />
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={isDeleting} className='btn btn-outline-danger text-danger bg-transparent fw-bold' variant="secondary" onClick={removeFromFavs}>
            Remove this item
            <img src={deleting} alt="loading" hidden={!isDeleting} className='loading-img ms-3' />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
