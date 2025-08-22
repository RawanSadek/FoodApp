import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/AuthContext/AuthContext';

export default function ProtectedRoutes({children}) {

    let {loginData} = useContext(AuthContext);
  
    if(localStorage.getItem('token')||loginData) return children;
  else return <Navigate to='/login'/>
}
