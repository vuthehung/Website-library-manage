import React, { useState, useEffect } from "react";
import Table  from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useNavigate } from "react-router";

const Books = () => {
    const [books, setBooks] = useState([])
    const [show, setShow] = useState(false)
    const [id, setId] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        getBooks()
    }, [])
    useEffect(() => {
        getBooks()
    }, [id])
    const getBooks = async () => {
        let res = await axios.get('http://localhost:8080/api/Books')
        if(res && res.data) {
            setBooks(res.data)
        }
    }

    const onClickView = (id) => {
        navigate(`admin/book/${id}`)
    }

    const onClickAdd = () => {
        navigate('/admin/book')
    }

    const handleClose = () => setShow(false);
    const handleShow = (x) => {
        setShow(true)
        setId(x)
    }

    const handlDelete = async (x) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/Books/delete/${x}`); 
            setShow(false)
            setId('')
            console.log(response.data);
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        }
    }
    return(
        <>  
            <div className="d-flex justify-content-between">
                <span> <b>Danh sách sách</b></span>
                {isLogin && (<button className="btn btn-success" onClick={() => onClickAdd()}>Thêm mới</button>)}
            </div>
            <hr/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Tiêu đề</th>
                    <th>Tác giả</th>
                    <th>Thể loại</th>
                    <th>Ngày phát hành</th>
                    <th>Số trang</th>
                    <th>Giá</th>
                    <th>Số lượng đã bán</th>
                    <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {books && books.length > 0 && 
                        books.map((book, idx) => {
                            return (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>{book.publised_date}</td>
                                    <td>{book.page}</td>
                                    <td>{book.price}</td>
                                    <td>{book.quantity_sold}</td>
                                    <td>
                                        {isLogin && (
                                            <>
                                                <Button variant="info">Xem</Button>
                                                <span> </span>
                                                <Button variant="danger" onClick={() => handleShow(book.id)}>Xoá</Button>   
                                            </>
                                        )}
                                    </td>
                                </tr>
                            
                            )
                        })

                    }
                </tbody>
            </Table>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có muốn xoá sách có id là {id}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => handlDelete(id)}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Books