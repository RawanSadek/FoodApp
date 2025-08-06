import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import logo from '../../../../assets/Images/titlelogo.png'
import { useState } from "react";
import Home from "../../../Dashboard/Components/Home/Home";
import { Link } from "react-router-dom";

export default function SideBar({ logout }) {
  let [collapse, setCollapse] = useState(false);
  let getCollapse=()=>{
    setCollapse(!collapse);
  }
  return (
    <div className="sidebar-container">
      <Sidebar className="vh-100" collapsed={collapse}>
        <img onClick={getCollapse} src={logo} alt="logo" className="w-50 mt-5 mx-3" />
        <Menu className="mt-5">
          <MenuItem component={<Link to='home'></Link>} icon={<i className="fa-solid fa-house"></i>}> Home </MenuItem>
          <MenuItem component={<Link to='users'></Link>} icon={<i className="fa-solid fa-users"></i>}> Users </MenuItem>
          <MenuItem component={<Link to='recipes'></Link>} icon={<i className="fa-solid fa-grip"></i>}> Recipes </MenuItem>
          <MenuItem component={<Link to='categories'></Link>} icon={<i className="fa-regular fa-calendar-days"></i>}> Categories </MenuItem>
          <MenuItem icon={<i className="fa-solid fa-unlock-keyhole"></i>}> Change Password </MenuItem>
          <MenuItem onClick={logout} component={<Link to='/login'></Link>} icon={<i className="fa-solid fa-right-from-bracket"></i>}> Logout </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}
