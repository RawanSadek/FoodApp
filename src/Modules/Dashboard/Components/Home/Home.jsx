import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/Images/headerImg.svg'
import RecipesHeader from '../../../Shared/Components/RecipesHeader/RecipesHeader'
import { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext/AuthContext';

export default function Home() {

  let { loginData } = useContext(AuthContext);
  
  return (
    <div>
      <Header title={`Welcome ${loginData?.userName}`} desc={'You can now add your items that any user can order it from the Application and you can edit'} imgPath={headerImg} />

      <RecipesHeader title={'Fill'} btnText={'Fill'} />
    </div>
  )
}
