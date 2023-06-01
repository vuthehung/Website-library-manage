import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const HeaderAd = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const handlLogOut = () => {
        dispatch(logout())
        localStorage.removeItem('isLoggedIn')
    }
    return(
        <Navbar bg="light">
        <Container>
            <NavLink to='/admin' className='text-decoration-none navbar-brand'><strong>Admin</strong></NavLink>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            {isLoggedIn && user.is_admin && (
                <NavDropdown title={user.name}>
                    <NavDropdown.Item>
                        <NavLink to="/" style={{textDecoration: 'none', color: 'black'}}>Trang Chủ</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handlLogOut}>Đăng xuất</NavDropdown.Item>
                </NavDropdown>
            )}
            {!isLoggedIn && (
                <NavLink to='/login' style={{textDecoration: 'none', color: 'black'}}>Đăng nhập</NavLink>
            )}
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default HeaderAd
