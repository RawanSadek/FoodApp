import React from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/Images/headerImg.svg'


export default function Recipes() {
  return (
    <div>
      <Header title={'Recipes Items'} desc={'You can now add your items that any user can order it from the Application and you can edit'} imgPath={headerImg}/>
    </div>
  )
}
