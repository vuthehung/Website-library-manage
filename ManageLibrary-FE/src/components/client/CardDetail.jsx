import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router";
import Table from 'react-bootstrap/Table'
import axios from "axios";
import Review from "./Review";
import { useSelector } from "react-redux";
import { Container, Card, Row, Col } from "react-bootstrap";

const CardDetail = () => {
    const param = useParams()
    const id = param.id
    const [book, setBook] = useState({})
    const [reviews, setReviews] = useState([])
    const [addRe, setAddRe] = useState(0)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        getBook()
    }, [])

    useEffect(() => {
        getReviews()
    }, [addRe])
    const getBook = async () => {
        let res = await axios.get(`http://localhost:8080/api/Books/${id}`)
        console.log(res)
        if(res && res.data && res.data.data) {
            setBook(res.data.data)
        }
    }

    const getReviews = async () => {
        let res = await axios.get(`http://localhost:8080/api/review/all`)
        console.log("check review: ", res.data)
        if(res && res.data) {
            setReviews(res.data)
        }
    }

    const incAddRe = () => {
        const cnt = addRe + 1
        setAddRe(cnt)
    }
    return(
        <>
            <Header/>
            <div className="container mt-2">
                <h2 className='text-center'>Iteams Details Page
                </h2>

                <section className='container mt-3'>
                <div className="iteamsdetails">
                    <div className="items_img">
                        <img src={`http://localhost:8080/api/Image/${book.image_path}`} alt="" />
                    </div>

                    <div className="details">
                    <Table>
                        <tr>
                        <td>
                            <p> <strong>Tiêu đề</strong>  : {book.title}</p>
                            <p> <strong>Tác giả</strong>  : {book.author}</p>
                            <p> <strong>Giá</strong>  :  {book.price}đ</p>
                            {/* <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                                <span style={{fontSize:24}} onClick={ele.qnty <=1 ? ()=>dlt(ele.id) : ()=>remove(ele)}>-</span>
                                <span style={{fontSize:22}}>{ele.qnty}</span>
                                <span style={{fontSize:24}} onClick={()=>send(ele)}>+</span>
                            </div> */}

                        </td>
                        <td>
                            {/* <p><strong>Rating :</strong> <span style={{background:"green",color:"#fff",padding:"2px 5px",borderRadius:"5px"}}>{ele.rating} ★	</span></p>
                            <p><strong>Order Review :</strong> <span >{ele.somedata}	</span></p>
                            <p><strong>Remove :</strong> <span ><i className='fas fa-trash' onClick={()=>dlt(ele.id)} style={{color:"red",fontSize:20,cursor:"pointer"}}></i>	</span></p> */}
                        </td>
                        </tr>
                    </Table>
                    </div>          
                </div>
                </section>
            </div>
            <br/>
            <Container>
                <h4>Nhận xét về sách này</h4>
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