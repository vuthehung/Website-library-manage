import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Book = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [published_date, setPublished_date] = useState('')
    const [page, setPage] = useState('')
    const [price, setPrice] = useState('')
    const [des, setDes] = useState('')
    const [image_path, setImage_path] = useState()

    const [eTitle, setETitle] = useState('')
    const [eAuthor, setEAuhtor] = useState('')
    const [eDate, setEDate] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            image_path && URL.revokeObjectURL(image_path.preview)
        }
    }, [image_path])

    const handlePreviewImage = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setImage_path(file) 
    }

    const handleSubmit = async () => {
        setETitle('')
        setEAuhtor('')
        setEDate('')
        if(title !== '' && author !== '' && published_date !== '') {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('author', author)
            formData.append('category', category)
            formData.append('published_date', published_date)
            formData.append('page', page)
            formData.append('price', price)
            formData.append('des', des)
            formData.append('image_path', image_path)

            try {
                // Gửi dữ liệu về API bằng phương thức POST của Axios
                const response = await axios.post('http://localhost:8080/api/Books/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                });
                navigate('/admin/books')
                console.log(response.data);
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error(error);
                setETitle('Sách đã có do trùng tiêu đề và tác giả')
            }
        }else {
            if(title === '') {
                setETitle('Vui lòng nhập tiêu đề sách')
            }
            if(author === '') {
                setEAuhtor('Vui lòng nhập tác giả')
            }
            if(published_date === '') {
                setEDate('Vui lòng nhập ngày phát hành')
            }
        }
        
    }
    return (
        <Form>
            <h2 className='text-center'>Sách</h2>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Row className='mb-3'>
                        <Form.Group as={Col}>
                            <Form.Label>Tiêu đề <span style={{color: '#ff4d4f'}}>*</span> </Form.Label>
                            <Form.Control type="text" onChange={(e) => setTitle(e.target.value)}/>
                            {eTitle && (<p style={{color: 'red'}}>{eTitle}</p>)}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Tác giả <span style={{color: '#ff4d4f'}}>*</span></Form.Label>
                            <Form.Control type="text" onChange={(e) => setAuthor(e.target.value)}/>
                            {eAuthor && (<p style={{color: 'red'}}>{eAuthor}</p>)}
                        </Form.Group>
                    </Row>
                    <Form.Group as={Col}>
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as='textarea' style={{height: '100px'}} onChange={(e) => setDes(e.target.value)} />
                    </Form.Group>

                    <Row className='mb-3'>
                        <Form.Group as={Col}>
                            <Form.Label>Ngày phát hành <span style={{color: '#ff4d4f'}}>*</span></Form.Label>
                            <Form.Control type="date" onChange={(e) => setPublished_date(e.target.value)}/>
                            {eDate && (<p style={{color: 'red'}}>{eDate}</p>)}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Số trang</Form.Label>
                            <Form.Control type="text" onChange={(e) => setPage(e.target.value)}/>
                        </Form.Group>
                    </Row>

                    <Row className='mb-3'>
                        <Form.Group as={Col}>
                            <Form.Label>Thể loại</Form.Label>
                            <Form.Select onChange={(e) => setCategory(e.target.value)}>
                                <option></option>
                                <option>Khoa học</option>
                                <option>Tiểu thuyết</option>
                                <option>Tâm lý</option>
                                <option>Truyện</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Giá <span style={{color: '#ff4d4f'}}>*</span></Form.Label>
                            <Form.Control type="text" onChange={(e) => setPrice(e.target.value)}/>
                        </Form.Group>
                    </Row>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Ảnh bìa</Form.Label>
                    <Form.Control type="file" onChange={handlePreviewImage}/>
                    {image_path && (
                        <Image src={image_path.preview} thumbnail style={{height: '20rem'}}/>
                    )}
                </Form.Group>
            </Row>
            <hr/>
            <div className='d-flex justify-content-end'>
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Add      
                </Button>
            </div>
        </Form>
    )
}

export default Book;