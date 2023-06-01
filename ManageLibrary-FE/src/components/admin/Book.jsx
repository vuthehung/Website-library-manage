import React, {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import HeaderAd from './HeaderAd';

const Book = () => {
    const [book, setBook] = useState({})
    const [image_path, setImage_path] = useState()

    const [eTitle, setETitle] = useState('')
    const [eAuthor, setEAuhtor] = useState('')
    const [eDate, setEDate] = useState('')

    const [disable, setDisable] = useState(true)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const param = useParams()
    const id = param.id
    const navigate = useNavigate()

    const defaultBtn = document.querySelector('#default')
    const uploadBtn = document.querySelector('#upload')

    const onClickUpload = () => {
        defaultBtn.click()
    }

    useEffect(() => {
        getBook()
    }, [])

    const getBook = async () => {
        let res = await axios.get(`http://localhost:8080/api/Books/${id}`)
        console.log(res)
        if(res && res.data && res.data.data) {
            setBook(res.data.data)
        }
        if(id < 0) {
            setDisable(false)
        }
        
    }
    useEffect(() => {
        return () => {
            image_path && URL.revokeObjectURL(image_path.preview)
        }
    }, [image_path])

    const handlePreviewImage = (e) => {
        const file = e.target.files[0]
        console.log(file + ', ' + typeof file)
        file.preview = URL.createObjectURL(file)
        setImage_path(file) 
    }

    const onClickDisable = () => {
        setDisable(false)
    }

    const handleSubmit = async () => {
        setETitle('')
        setEAuhtor('')
        setEDate('')
        setShow(false)
        console.log(image_path + ', ' + typeof image_path)
        console.log('chec book: ', book)

        if((book.title !== null && book.title !== '') && (book.author !== null && book.author !== '') && book.publised_date !== null) {
            if(image_path) {
                const formData = new FormData()
                formData.append('title', book.title)
                formData.append('author', book.author)
                formData.append('category', book.category)
                formData.append('published_date', book.publised_date)
                formData.append('page', book.page)
                formData.append('price', book.price)
                formData.append('des', book.des)
                formData.append('image_path', image_path)

                for (var pair of formData.entries()) {
                    console.log(pair[0]+ ', ' + pair[1] + ', ' + typeof pair[1]); 
                }
                try {
                    if(id < 0) {
                        const response = await axios.post(`http://localhost:8080/api/Books/save/${id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                        })
                    }else {
                        const response = await axios.put(`http://localhost:8080/api/Books/save/${id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                        })
                    }
                    
                    navigate('/admin')
                } catch (error) {
                    // Xử lý lỗi nếu có
                    console.error(error);
                    setETitle('Sách đã có do trùng tiêu đề và tác giả')
                }
            }else {
                const formData = new FormData()
                formData.append('title', book.title)
                formData.append('author', book.author)
                formData.append('category', book.category)
                formData.append('published_date', book.publised_date)
                formData.append('page', book.page)
                formData.append('price', book.price)
                formData.append('des', book.des)
                try {
                    if(id > 0) {
                        const response = await axios.put(`http://localhost:8080/api/Books/savef/${id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                        })
                        navigate('/admin')
                    }
                } catch (error) {
                    // Xử lý lỗi nếu có
                    console.error(error);
                    // setETitle('Sách đã có do trùng tiêu đề và tác giả')
                }
            }

        }else {
            console.log('có lỗi')
            if(book.title === '' || book.title === null) {
                setETitle('Vui lòng nhập tiêu đề sách')
            }
            if(book.author === '' || book.author === null) {
                setEAuhtor('Vui lòng nhập tác giả')
            }
            if(book.publised_date === null) {
                setEDate('Vui lòng nhập ngày phát hành')
                console.log('eDate: co loi',)
            }
        }
        
    }
    return (
        <>
            <HeaderAd/>
            <Form>
                <h2 className='text-center'>Sách</h2>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Tiêu đề <span style={{color: '#ff4d4f'}}>*</span> </Form.Label>
                                <Form.Control type="text" defaultValue={book.title} disabled={disable} onChange={(e) => setBook({...book, title: e.target.value})}/>
                                {eTitle && (<p style={{color: 'red'}}>{eTitle}</p>)}
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Tác giả <span style={{color: '#ff4d4f'}}>*</span></Form.Label>
                                <Form.Control type="text" defaultValue={book.author} disabled={disable} onChange={(e) => setBook({...book, author: e.target.value})}/>
                                {eAuthor && (<p style={{color: 'red'}}>{eAuthor}</p>)}
                            </Form.Group>
                        </Row>
                        <Form.Group as={Col}>
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control as='textarea' defaultValue={book.des} disabled={disable} style={{height: '100px'}} onChange={(e) => setBook({...book, des: e.target.value})} />
                        </Form.Group>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Ngày phát hành <span style={{color: '#ff4d4f'}}>*</span></Form.Label>
                                <Form.Control type="date" defaultValue={book.publised_date} disabled={disable} onChange={(e) => setBook({...book, publised_date: e.target.value})}/>
                                {eDate && (<p style={{color: 'red'}}>{eDate}</p>)}
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Số trang</Form.Label>
                                <Form.Control type="number" defaultValue={book.page} disabled={disable} onChange={(e) => setBook({...book, page: e.target.value})}/>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Thể loại</Form.Label>
                                <Form.Select disabled={disable} onChange={(e) => setBook({...book, category: e.target.value})}>
                                    <option>{book.category}</option>
                                    <option>Khoa học</option>
                                    <option>Tiểu thuyết</option>
                                    <option>Tâm lý</option>
                                    <option>Truyện</option>
                                    <option>Phát triển bản thân</option>
                                    <option>Văn học</option>
                                    <option>Kinh tế - Kinh doanh</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Giá</Form.Label>
                                <Form.Control type="number" disabled={disable} defaultValue={book.price} onChange={(e) => setBook({...book, price: e.target.value})}/>
                            </Form.Group>
                        </Row>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Control id='default' type="file" disabled={disable} onChange={handlePreviewImage} hidden/>
                        <div className='d-flex justify-content-center'>
                            <Button id='upload' variant="success" onClick={onClickUpload}>Upload</Button>
                        </div>
                        <div className='d-flex justify-content-center'>
                            {image_path && (
                                <Image src={image_path.preview} thumbnail style={{height: '20rem'}}/>
                            )}
                            {!image_path && book.image_path !== null && ( <Image src={`http://localhost:8080/api/Image/${book.image_path}`} thumbnail style={{height: '20rem'}}/>)}
                        </div>
                    </Form.Group>
                </Row>
                <hr/>
                <div className='d-flex justify-content-end'>
                    {id > 0 ? 
                        (disable ? (<Button variant="primary" onClick={() => onClickDisable()}>
                                        Edit    
                                    </Button>) 
                                    : (<Button variant="primary" onClick={() => handleSubmit()}>
                                            Save    
                                        </Button>)) 
                        : ((<Button variant="primary" onClick={handleShow}>
                                Add
                            </Button>) )}   
                    
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Thông báo xác nhận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn thêm mới sách này!!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Confirm
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </>
    )
}

export default Book;