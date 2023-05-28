import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/cartSlice";
import { useNavigate } from "react-router";


const Cards = () => {
    const [books, setBooks] = useState([])
    const [word, setWord] = useState('')
    const [tmp, setTmp] = useState([])
    const [newAdd, setNewAdd] = useState(0)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)

    const addToCart = async (id, title, author, price, image_path) => {
        dispatch(cartAction.addToCart({id, title, author, price, image_path}))

        const formData = new FormData()
        formData.append('userId', user.id)
        formData.append('bookId', id)
        formData.append('quantity', 1)
        try {
            const response = await axios.post('http://localhost:8080/api/transaction/add', formData)
            console.log('data: ', response.data)
            const cnt = newAdd + 1
            setNewAdd(cnt)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getBooks()
    }, [])
    const getBooks = async () => {
        let res = await axios.get('http://localhost:8080/api/Books')
        if(res && res.data) {
            setBooks(res.data)
            setTmp(res.data)
        }
    }

    const searchBook = (str) => {
        setWord(str)
        console.log('check word: ', word)
        if(str === '') {
            console.log(tmp)
            setBooks(tmp)
        }else {
            const filteredBooks = books.filter((book) =>
                            book.title.toLowerCase().includes(str.toLowerCase())
                            );
            setBooks(filteredBooks)
            console.log(str + ', ' + books)
        }
    }

    const onClickToDetail = (id) => {
        navigate(`/book/${id}`)
    }
    return(
        <>
            <Header
                books = {books}
                searchBook = {searchBook}
                newAdd = {newAdd}
            />
            <div className='container mt-3'>
                <div className="row d-flex justify-content-center align-items-center">
                    {
                        books.map((element, id) => {
                            return (
                            <>
                                <Card style={{ width: '20rem',border:"none" }} className="mx-2 mt-4 card_style">
                                <Card.Img variant="top" src={`http://localhost:8080/api/Image/${element.image_path}`} style={{height:"16rem"}} className="mt-3" />
                                <Card.Body>
                                    <Card.Title onClick={() => onClickToDetail(element.id)}>{element.title}</Card.Title>
                                    <Card.Title>{element.author}</Card.Title>
                                    <Card.Text> {element.price} đ</Card.Text>
                                    <div className="button_div d-flex justify-content-center">
                                        <Button variant="primary"  
                                        onClick={() => addToCart(element.id, element.title, element.author, element.price, element.image_path)}
                                        className='col-lg-12'>Xem chi tiết</Button>
                                    </div>
                                </Card.Body>
                                </Card>
                            </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default Cards