import React from 'react'
import RecipesHeader from '../../../Shared/Components/RecipesHeader/RecipesHeader'
import { useLocation } from 'react-router-dom';

export default function RecipesData() {

  let location = useLocation();
  let text = location.state?.text;
  return (
    <>
      <RecipesHeader title={text} btnText={'All'} />

      <form action=""></form>
    </>
  )
}
