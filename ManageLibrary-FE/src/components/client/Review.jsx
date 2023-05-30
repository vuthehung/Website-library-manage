import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Col, Row, Form} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";

const Review = (props) => {
    const {isLoggedIn, book, user, incAddRe} = props
    const [clicked, setClicked] = useState(false);
    const [stars, setStars] = useState(1);
    const [review, setReview] = useState("");
    const [show, setShow] = useState(false);
    const navigate = useNavigate()


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const naviLogin = () => navigate('/login')

    const onMouseOver = (rating) => {
        if (clicked) return;

        [...Array(rating)].map((x, i) => {
            document.querySelector(`#star-${i + 1}`).classList.replace("far", "fas");
        });
    };

    const onMouseOut = (rating) => {
        if (clicked) return;

        [...Array(rating)].map((x, i) => {
            document.querySelector(`#star-${i + 1}`).classList.replace("fas", "far");
        });
    };

    const onClick = (rating) => {
        setClicked(true);
        setStars(rating);
        // Reset
        [...Array(5)].map((x, i) => {
            document.querySelector(`#star-${i + 1}`).classList.replace("fas", "far");
        });

        // highlight
        [...Array(rating)].map((x, i) => {
            document.querySelector(`#star-${i + 1}`).classList.replace("far", "fas");
        });
    };

    const submitReview = async (e) => {
        e.preventDefault();
        console.log('rating: ', stars)
        console.log('comment: ', review)
        console.log(isLoggedIn)

        const formData = new FormData()
        formData.append('userId', user.id)
        formData.append('bookId', book.id)
        formData.append('rating', stars)
        formData.append('comment', review)

        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1] + ', ' + typeof pair[1]); 
        }

        try {
            const response = await axios.post('http://localhost:8080/api/review/add', formData)
            console.log(response)
            setShow(false)
            incAddRe()
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <>
            <Button variant="primary" onClick={isLoggedIn ? (handleShow) : (naviLogin)}>
                Thêm đánh giá
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đánh giá sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Col>
                    <Row>
                        <Col className="text-center">
                            {[...Array(5)].map((x, i) => {
                            return (
                                <i
                                key={i}
                                className="far fa-star"
                                id={`star-${i + 1}`}
                                onMouseOver={(e) => onMouseOver(i + 1)}
                                onMouseOut={(e) => onMouseOut(i + 1)}
                                onClick={(e) => onClick(i + 1)}
                                />
                            );
                            })}
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                defaultValue={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Bỏ qua
                    </Button>
                    <Button variant="primary" onClick={submitReview}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Review