import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router";
import Table from 'react-bootstrap/Table'
import axios from "axios";
import Review from "./Review";
import { useSelector } from "react-redux";
import { Container, Card} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './styleC.css'

const CardDetail = () => {
    const param = useParams()
    const id = param.id
    const [book, setBook] = useState({})
    const [reviews, setReviews] = useState([])
    const [tran, setTran] = useState([])
    const [addRe, setAddRe] = useState(0)
    const [newAdd, setNewAdd] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const naviLogin = () => navigate('/login')

    useEffect(() => {
        getBook()
    }, [])

    useEffect(() => {
        getTrans()
    }, [newAdd])
    useEffect(() => {
        getReviews()
    }, [addRe])

    const getBook = async () => {
        let res = await axios.get(`http://localhost:8080/api/Books/${id}`)
        console.log(res)
        if(res && res.data && res.data.data) {
            setBook(res.data.data)
            setNewAdd(1)
        }
    }

    const getReviews = async () => {
        let res = await axios.get(`http://localhost:8080/api/review/book/${id}`)
        console.log("check review: ", res.data)
        if(res && res.data) {
            setReviews(res.data) 
        }
    }

    const getTrans = async () => {
        let res = await axios.get(`http://localhost:8080/api/transaction/user/${user.id}`)
        
        if(res && res.data) {
            const tmp = res.data.filter(i => i.book.id === book.id)
            console.log("check tran 0: ", tmp)
            setTran(tmp) 
        }
    }
    const incAddRe = () => {
        const cnt = addRe + 1
        setAddRe(cnt)
    }

    const incQuantity = () => {
        const cnt = quantity + 1
        setQuantity(cnt)
    }

    const decQuantity = () => {
        const cnt = quantity - 1
        setQuantity(cnt)
    }


    const addToCart = async () => {
        console.log('tran: ', tran[0])
        if(tran.length > 0) {
            const formData = new FormData()
            formData.append('quantity', quantity + tran[0].quantity)
            console.log('quantity: ', quantity + tran[0].quantity)
            try {
                const response = await axios.put(`http://localhost:8080/api/transaction/update/${tran[0].id}`, formData)
                console.log('data: ', response.data)
                const cnt = newAdd + 1
                setNewAdd(cnt)
            } catch (e) {
                console.log(e)
            }
        }else {
            const formData = new FormData()
            formData.append('userId', user.id)
            formData.append('bookId', book.id)
            formData.append('quantity', quantity)
            try {
                const response = await axios.post('http://localhost:8080/api/transaction/add', formData)
                console.log('data: ', response.data)
                const cnt = newAdd + 1
                setNewAdd(cnt)
            } catch (e) {
                console.log(e)
            }
        }

    }
    return(
        <>
            <Header
                newAdd = {newAdd}
            />
            <div className="container mt-2">
                <section className='container mt-3'>
                <div className="iteamsdetails">
                    <div className="items_img">
                        <img src={`http://localhost:8080/api/Image/${book.image_path}`} alt="" />
                    </div>

                    <div className="details">
                        <p> <h3>{book.title} - {book.author}</h3></p>
                        <Table>
                            <tr>
                                <td>
                                    <p><strong>Thể loại</strong></p>
                                    <p><strong>Giá</strong></p>
                                    <p><strong>Số trang</strong></p>
                                    <p><strong>Ngày phát hành</strong></p>
                                    <p><strong>Mô tả</strong></p>
                                    <p><strong>Số lượng</strong></p>
                                </td>
                                <td>
                                    <p>{book.category}</p>
                                    <p>{book.price}đ</p>
                                    <p>{book.page}</p>
                                    <p>{book.publised_date}</p>
                                    <>
                                        <Button variant="outline-primary" size="sm" onClick={handleShow}>
                                            Xem chi tiết mô tả
                                        </Button>

                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Mô tả sản phẩm</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>{book.des}</Modal.Body>
                                            <Modal.Footer></Modal.Footer>
                                        </Modal>
                                    </>
                                    <div className='d-flex justify-content-between align-items-center' style={{width:80, height:70,cursor:"pointer"}}>
                                        {quantity === 1 ?
                                            (<span style={{fontSize:19}}>-</span>)
                                            :
                                            (<span style={{fontSize:19}} onClick={() => decQuantity()}>-</span>)
                                        }
                                        <span style={{fontSize:20}}>{quantity}</span>
                                        <span style={{fontSize:19}} onClick={() => incQuantity()}>+</span>
                                    </div>
                                </td>
                            </tr>
                        </Table>    
                        <Button variant="outline-success"  onClick={isLoggedIn ? (addToCart) : (naviLogin)}>Thêm vào giỏ hàng</Button>
                    </div>          
                </div>
                </section>
            </div>
            <br/>
            <Container>
                <h4>Đánh giá sản phẩm</h4>
                <Review
                    isLoggedIn={isLoggedIn}
                    book={book}
                    user={user}
                    incAddRe={incAddRe}
                />
                <hr/>
                {reviews.map((r, rIndex) => {
                    return (
                        <Card>
                            <Card.Body>
                                <Card.Title>{r.user.name}</Card.Title>
                                {[...Array(r.rating)].map((s, sIndex) => {
                                return <i className="fas fa-star text-warning" />;
                                })}
                                <p>{r.comment}</p>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Container>
        </>
    )
}

export default CardDetail