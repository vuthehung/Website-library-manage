import React, {useState, useEffect} from "react";
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from "../../store/authSlice";
import { Menu } from "@mui/material";
import './styleC.css'
import Table from 'react-bootstrap/esm/Table';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Header = (props) => {
    const {books, wordSearch, newAdd} = props
    const [trans, setTrans] = useState([])
    const [check, setCheck] = useState(0)
    const [disable, setDisable] = useState(true)
    const [price, setPrice] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [word, setWord] = useState('')
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    // const handleSearch = () => {
    //     searchBook(word)
    //     console.log('check books: ', books)
    // }
    const handlLogOut = () => {
        dispatch(logout())
        localStorage.removeItem('isLoggedIn')
        console.log(localStorage.getItem('isLoggedIn'))
    }

    const incCartItems = async (id, quantity) => {
        const formData = new FormData()
        formData.append('quantity', quantity + 1)
        try {
            const response = await axios.put(`http://localhost:8080/api/transaction/update/${id}`, formData)
            const cnt = check + 1
            setCheck(cnt)
            console.log(ok);
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        }
    }
    const desCartItems = async (id, quantity) => {
        const formData = new FormData()
        formData.append('quantity', quantity - 1)
        try {
            const response = await axios.put(`http://localhost:8080/api/transaction/update/${id}`, formData)
            const cnt = check + 1
            setCheck(cnt)
            console.log(ok);
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        }
    }

    const total = ()=>{
        let price = 0;
        trans.map((ele,k)=>{
            price = ele.book.price * ele.quantity + price
        });
        setPrice(price);
    };

    useEffect(() => {
        getTransUser()
    }, [newAdd, isLoggedIn, check])

    const getTransUser = async () => {    
        let res = await axios.get(`http://localhost:8080/api/transaction/user/${user.id}`)
        console.log('trans: ', res.data)
        if(res && res.data) {
            setTrans(res.data)
        }
    }

    const handlDeleteCart = async (x) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/transaction/delete/${x}`)
            const cnt = check + 1
            setCheck(cnt)
            console.log(ok);
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        }
    }

    useEffect(()=>{
        total();
    },[total])

    return (
        <Navbar bg="light" expand="lg" className="header">
            <Container className="container">
                <NavLink to='/' className='text-decoration-none navbar-brand'>Library Book</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Form className="d-flex">
                            <Form.Control
                            type="search"
                            placeholder="Tìm sách mà bạn muốn"
                            className="me-2"
                            aria-label="Search"
                            style={{width: '400px', maxWidth: '340px', marginLeft: '100px'}}
                            onChange={(e) => wordSearch(e.target.value)}
                            />
                            {/* <Button variant="outline-primary" onClick={handleSearch}>Search</Button> */}
                        </Form>
                    </Nav>
                    <Badge badgeContent={isLoggedIn ? trans.length : 0} color="primary"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            style={{marginLeft: '50px'}}
                            onClick={handleClick}
                    >
                        <i class="fa-solid fa-cart-shopping text-dark" style={{ fontSize: 20, cursor: "pointer", marginLeft: '100px',}}></i>
                    </Badge>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '140px'}}
                    >
                        
                        {isLoggedIn && (
                            // <Nav.Link href="/admin" style={{marginLeft: '90px'}}>{user.name}</Nav.Link>
                            <NavDropdown title={user.name} style={{paddingLeft: '80px'}}>
                                {user.is_admin && (
                                    <NavDropdown.Item>
                                        <NavLink to="/admin" style={{textDecoration: 'none', color: 'black'}}>Trang Quản Trị</NavLink>
                                    </NavDropdown.Item>
                                )}
                                <NavDropdown.Item>
                                    <NavLink to="/account" style={{textDecoration: 'none', color: 'black'}}>Tài khoản</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handlLogOut}>Đăng xuất</NavDropdown.Item>
                            </NavDropdown>
                        )}
                        {!isLoggedIn && (<NavLink to="/login" style={{marginLeft: '90px', textDecoration: 'none', color: 'black'}}>Tài khoản</NavLink>)}
                    </Nav>
                </Navbar.Collapse>
                
            </Container>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {trans.length && isLoggedIn ?
                    <div className='card_details' style={{width:"24rem",padding:10}}>
                        <strong>Giỏ hàng của bạn</strong>
                        <hr/>
                        <Table>
                            <tbody>
                                {
                                    trans.map((e) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>
                                                        <img src={`http://localhost:8080/api/Image/${e.book.image_path}`} style={{width:"5rem",height:"5rem"}} alt="" />
                                                    </td>
                                                    <td>
                                                        <p>{e.book.title} - {e.book.author}</p>
                                                        <p>Giá: {e.book.price * e.quantity}đ</p>
                                                        {/* <p>Số lượng: {e.quantity}</p> */}
                                                        <div className='d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer"}}>
                                                            <span style={{cursor: 'auto'}}>Số lượng:</span>
                                                            {e.quantity === 1 ?
                                                                (<span style={{fontSize:18}}>-</span>)
                                                                :
                                                                (<span style={{fontSize:18}} onClick={() => desCartItems(e.id, e.quantity)}>-</span>)
                                                            }
                                                            <span style={{fontSize:16}}>{e.quantity}</span>
                                                            <span style={{fontSize:18}} onClick={() => incCartItems(e.id, e.quantity)}>+</span>
                                                        </div>
                                                    </td>
                                                    <td className='mt-5' style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={() => handlDeleteCart(e.id)}>
                                                        <i className='fas fa-trash largetrash'></i>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                                
                            </tbody>
                        </Table>
                        <span>Tổng:</span>
                        <span style={{paddingLeft: '90px'}}>{price}đ</span>
                    </div> :
                    <div className='card_details d-flex justify-content-center align-items-center' style={{width:"24rem",padding:10,position:"relative"}}>
                        <i className='fas fa-close smallclose'
                            onClick={handleClose}
                            style={{position:"absolute",top:2,right:20,fontSize:23,cursor:"pointer"}}></i>
                        <p style={{fontSize:20}}>Không có sản phẩm nào </p>
                        <img src="./cart.gif" alt="" className='emptycart_img' style={{width:"5rem",padding:10}} />
                    </div>
                }
            </Menu>
        </Navbar>
    )
}

export default Header;