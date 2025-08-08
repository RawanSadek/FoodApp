import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function DeleteAlert() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-outline-danger text-danger' variant="secondary" onClick={handleClose}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
