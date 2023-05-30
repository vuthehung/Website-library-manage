import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card'
import Header from "./Header";
import { useNavigate } from "react-router";


const Cards = () => {
    const [books, setBooks] = useState([])
    const [word, setWord] = useState('')
    const [tmp, setTmp] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getBooks()
    }, [])

    useEffect(() => {
        searchBook(word)
    }, [word])
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
            const filteredBooks = tmp.filter((book) =>
                            book.title.toLowerCase().includes(str.toLowerCase())
                            );
            setBooks(filteredBooks)
            console.log(str + ', ' + books)
        }
    }

    const wordSearch = (str) => {
        setWord(str)
    }

    const onClickToDetail = (id) => {
        navigate(`/book/${id}`)
    }
    return(
        <>
            <Header
                books = {books}
                // searchBook = {searchBook}
                wordSearch={wordSearch}
            />
            <div className='container mt-3'>
                <div className="row d-flex justify-content-center align-items-center">
                    {
                        books.map((element, id) => {
                            return (
                            <>
                                <Card style={{ width: '20rem',border:"none" }} className="d-flex flex-wrap card_style" onClick={() => onClickToDetail(element.id)}>
                                    <Card.Img variant="top" src={`http://localhost:8080/api/Image/${element.image_path}`} style={{height:"16rem"}} className="mt-3"/>
                                    <Card.Body>
                                        <Card.Text><strong>Tiêu đề:</strong> {element.title}</Card.Text>
                                        <Card.Text><strong>Tác giả:</strong> {element.author}</Card.Text>
                                        <Card.Text className="d-flex justify-content-between">
                                            <div>
                                                <strong>Giá:</strong> {element.price}đ
                                            </div>
                                            <div>
                                                <strong>Đã bán:</strong> {element.quantity_sold}
                                            </div>
                                        </Card.Text>
                                        {/* <div className="button_div d-flex justify-content-center">
                                            <Button variant="primary"  
                                            onClick={() => addToCart(element.id)}
                                            className='col-lg-12'>Xem chi tiết</Button>
                                        </div> */}
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