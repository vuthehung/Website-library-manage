import React, {useState, useEffect} from "react";
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from "react-redux";

const Header = (props) => {
    const {books, searchBook} = props
    const [word, setWord] = useState('')
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)
    const handleSearch = (str) => {
        searchBook(str)
    }
    return (
        <Navbar bg="light" expand="lg" className="d-flex">
            <Container fluid>
                <NavLink to='/' className='text-decoration-none text-dark mx-3' style={{fontSize: 30}}>Library Book</NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Tìm sách mà bạn muốn"
                        className="me-2"
                        aria-label="Search"
                        style={{width: '300px'}}
                        onChange={(e) => setWord(e.target.value)}
                        />
                        <Button variant="outline-primary">Tìm kiếm</Button>
                    </Form>
                </Navbar.Collapse>
                <Badge badgeContent={1} color="primary"
                        id="basic-button"
                >
                    <i class="fa-solid fa-cart-shopping text-dark" style={{ fontSize: 20, cursor: "pointer", marginLeft: '100px',}}></i>
                </Badge>
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px'}}
                    navbarScroll
                >
                    
                    {isLoggedIn && (
                        <Nav.Link href="#action1" style={{marginLeft: '90px'}}>{user.name}</Nav.Link>
                    )}
                    {!isLoggedIn && (<Nav.Link href="#action1" style={{marginLeft: '90px'}}>Tài khoản</Nav.Link>)}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;