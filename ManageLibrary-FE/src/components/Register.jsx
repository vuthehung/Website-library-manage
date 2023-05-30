import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [erName, setErName] = useState('')
    const [erPass, setErPass] = useState('')
    const [erEmail, setErEmail] = useState('')
    const navigate = useNavigate()

    const handlSubmit = async (e) => {
        e.preventDefault()

        setErName('')
        setErEmail('')
        setErPass('')
        if(name !== '' && email !== '' && password !== '') {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            try {
                // Gửi thông tin đăng nhập qua API
                const response = await axios.post('http://localhost:8080/api/User/register', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                });
                
                // Kiểm tra xác thực thành công
                if (response.status === 200) {
                    // Chuyển hướng đến trang chủ
                    navigate('/login');
                }
            } catch (error) {
                console.error('Đăng khí thất bại:', error);
                setErEmail('Email đã được đăng kí')
            }
        }else {
            if(name === '') {
                setErName('Vui lòng nhập họ tên')
            }
            if(email === '') {
                setErEmail('Vui lòng nhập email')
            }
            if(password === '') {
                setErPass('Vui lòng nhập password')
            }
        }
    }
    return (
        <div className='register_container w-100 d-flex justify-content-center'>
            <div className="register_form mt-5 w-50">
                <h2 className="text-center">Đăng kí tài khoản</h2>
                <div className="form mt-3">
                    <form className="border p-3" onSubmit={handlSubmit}>
                        <label for='name' className="mt-2"><strong>Họ tên <span style={{color: '#ff4d4f'}}>*</span></strong></label>
                        <input type="text" name='name' className="form-control"
                        onChange={(e) => setName(e.target.value)}/>
                        {erName && <p style={{color: 'red'}}>{erName}</p>}

                        <label for='email' className="mt-2"><strong>Email <span style={{color: '#ff4d4f'}}>*</span></strong></label>
                        <input type="email" name='email' className="form-control"  placeholder="example@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}/>
                        {erEmail && <p style={{color: 'red'}}>{erEmail}</p>}

                        <label for='password' className="mt-2"><strong>Password <span style={{color: '#ff4d4f'}}>*</span></strong></label>
                        <input type="password" name='pasword' className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                        {erPass && <p style={{color: 'red'}}>{erPass}</p>}

                        <div className="mt-3">
                            <button className="btn btn-primary w-40">Đăng kí</button>
                        </div>
                    </form>
                </div>
                <hr/>
                <span>Đã có tài khoản?<NavLink to="/login"> Đăng nhập</NavLink></span>
            </div>
            
        </div>
    )
}

export default Register