import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import logo from '../../../../assets/Images/titlelogo.png'
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthContext";
import ChangePassword from "../../../Authentication/Components/ChangePassword/ChangePassword";
import { Modal } from "react-bootstrap";

export default function SideBar({ logout }) {

  let location = useLocation();

  let { loginData } = useContext(AuthContext);

  let [collapse, setCollapse] = useState(false);
  let getCollapse = () => {
    setCollapse(!collapse);
  }

  useEffect(() => {
    const width = collapse ? '80px' : '250px';
    document.documentElement.style.setProperty('--sidebar-w', width);
  }, [collapse]);


  let [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  return (
    <div className="sidebar-container">
      <Sidebar className="h-100 position-fixed sidebar" collapsed={collapse}>
        <img onClick={getCollapse} src={logo} alt="logo" className="w-50 mt-5 mx-3" />
        <Menu className="mt-5">
          <MenuItem active={location.pathname == "/dashboard/home" || location.pathname == "/dashboard"} component={<Link to='home'></Link>} icon={<i className="fa-solid fa-house"></i>}> Home </MenuItem>
          {loginData?.userGroup == 'SuperAdmin' && <MenuItem active={location.pathname.includes("user")} component={<Link to='users'></Link>} icon={<i className="fa-solid fa-users"></i>}> Users </MenuItem>}
          <MenuItem active={location.pathname.includes("recipe")} component={<Link to='recipes'></Link>} icon={<i className="fa-regular fa-newspaper"></i>}> Recipes </MenuItem>
          {loginData?.userGroup == 'SuperAdmin' && <MenuItem active={location.pathname == "/dashboard/categories"} component={<Link to='categories'></Link>} icon={<i className="fa-regular fa-calendar-days"></i>}> Categories </MenuItem>}
          {loginData?.userGroup == 'SystemUser' && <MenuItem active={location.pathname == "/dashboard/favourits"} component={<Link to='favourits'></Link>} icon={<i className="fa-regular fa-heart"></i>}> Favourits </MenuItem>}
          <MenuItem onClick={handleShow} icon={<i className="fa-solid fa-unlock-keyhole"></i>}> Change Password </MenuItem>
          <MenuItem onClick={logout} component={<Link to='/login'></Link>} icon={<i className="fa-solid fa-right-from-bracket"></i>}> Logout </MenuItem>
        </Menu>
      </Sidebar>


      {/* Change Password */}
      <Modal show={show} onHide={handleClose} className="change-modal">
        <Modal.Header closeButton className='border-0'>
        </Modal.Header>
        <Modal.Body>
          <ChangePassword />
        </Modal.Body>
      </Modal>
    </div>
  )
}
