import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Header from "./Header";

const Cards = () => {
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState([])

    useEffect(() => {
        getBooks()
    }, [])
    const getBooks = async () => {
        let res = await axios.get('http://localhost:8080/api/Books')
        if(res && res.data) {
            setBooks(res.data)
        }
    }

    const searchBook = (str) => {
        const res = books.filter(b => b.title.includes(str))
        setSearch(res)
    }
    return(
        <>
            <Header
                books = {books}
                searchBook = {searchBook}
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
                                    <Card.Title>{element.title}</Card.Title>
                                    <Card.Title>{element.author}</Card.Title>
                                    <Card.Text> {element.price} đ</Card.Text>
                                    <div className="button_div d-flex justify-content-center">
                                        <Button variant="primary"  
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