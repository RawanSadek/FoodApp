import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import logo from '../../../../assets/Images/titlelogo.png'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar({ logout }) {
  let [collapse, setCollapse] = useState(false);
  let getCollapse=()=>{
    setCollapse(!collapse);
  }

  useEffect(() => {
    const width = collapse ? '80px' : '250px';
    document.documentElement.style.setProperty('--sidebar-w', width);
  }, [collapse]);

  return (
    <div className="sidebar-container">
      <Sidebar className="h-100 position-fixed sidebar" collapsed={collapse}>
        <img onClick={getCollapse} src={logo} alt="logo" className="w-50 mt-5 mx-3" />
        <Menu className="mt-5">
          <MenuItem component={<Link to='home'></Link>} icon={<i className="fa-solid fa-house"></i>}> Home </MenuItem>
          <MenuItem component={<Link to='users'></Link>} icon={<i className="fa-solid fa-users"></i>}> Users </MenuItem>
          <MenuItem component={<Link to='recipes'></Link>} icon={<i className="fa-regular fa-newspaper"></i>}> Recipes </MenuItem>
          <MenuItem component={<Link to='categories'></Link>} icon={<i className="fa-regular fa-calendar-days"></i>}> Categories </MenuItem>
          <MenuItem icon={<i className="fa-solid fa-unlock-keyhole"></i>}> Change Password </MenuItem>
          <MenuItem onClick={logout} component={<Link to='/login'></Link>} icon={<i className="fa-solid fa-right-from-bracket"></i>}> Logout </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}
