import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import noDataImg from '../../../../assets/Images/nodata.png'
import axios from 'axios'
import { BASE_URL } from '../../../../Constants/END_POINTS.JSX'


export default function DeleteAlert({itemName}) {

  

  
  return (
    <>
      <img src={noDataImg} alt="no data" className='mb-3' />
          <h5>Delete This {itemName} ?</h5>
          <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </>
  )
}
