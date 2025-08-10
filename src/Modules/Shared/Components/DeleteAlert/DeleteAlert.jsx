import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import noDataImg from '../../../../assets/Images/nodata.png'
import axios from 'axios'
import { BASE_URL } from '../../../../Constants/END_POINTS.JSX'


export default function DeleteAlert({itemText, item, show, handleClose, url}) {

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  let deleteItem = async()=>{
    try {
      await axios.delete(`${BASE_URL}/${url}/${item.id}`);
      // await axios.get(`${BASE_URL}/${url}`);
      // console.log(response)
    } catch (error) {
      console.log(error)
    }
    handleClose()
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='border-0'>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <img src={noDataImg} alt="no data" className='mb-3'/>
          <h5>Delete This {itemText} ?</h5>
          <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
          </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-outline-danger text-danger bg-transparent fw-bold' variant="secondary" onClick={deleteItem}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
