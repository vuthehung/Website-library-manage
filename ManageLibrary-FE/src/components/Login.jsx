import React, { useState } from "react";
import { json, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { NavLink } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPass, setErrorPass] = useState('')
    const navigate = useNavigate()
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const handlSubmit = async (e) => {
        e.preventDefault()
        setErrorEmail('')
        setErrorPass('')
        if(email !== '' && password !== '') {
            const formData = new FormData()
            formData.append('email', email)
            formData.append('password', password)
            try {
                // Gửi thông tin đăng nhập qua API
                const response = await axios.post('http://localhost:8080/api/User/login', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                });
                
                // Kiểm tra xác thực thành công
                if (response.status === 200) {
                    // Chuyển hướng đến trang chủ
                    dispatch(login(response.data.data))
                    localStorage.setItem('isLoggedIn', true)
                    localStorage.setItem('user', JSON.stringify(response.data.data))
                    console.log(response)
                    navigate('/');
                }
            } catch (error) {
                console.error('Đăng nhập thất bại:', error);
                setErrorEmail('Sai email hoặc mật khẩu')
            }
        }else {
            if(email === '') {
                setErrorEmail('Vui lòng nhập email')
            }
            if(password === '') {
                setErrorPass('Vui lòng nhập password')
            }
        }
    }

    return (
        <div className='login_container w-100 d-flex justify-content-center'>
            <div className="login_form mt-5 w-50">
                <h2 className="text-center">Đăng nhập</h2>
                <div className="form mt-3">
                    <form className="border p-3" onSubmit={handlSubmit}>
                        <label for='email' className="mt-2"><strong>Email <span style={{color: '#ff4d4f'}}>*</span></strong></label>
                        <input type="email" name='email' className="form-control"  placeholder="example@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}/>
                        {errorEmail && <p style={{color: 'red'}}>{errorEmail}</p>}

                        <label for='password' className="mt-2"><strong>Password <span style={{color: '#ff4d4f'}}>*</span></strong></label>
                        <input type="password" name='pasword' className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                        {errorPass && <p style={{color: 'red'}}>{errorPass}</p>}
                        
                        <div className="mt-3">
                            <button className="btn btn-primary w-40">Đăng nhập</button>
                        </div>
                    </form>
                </div>
                <hr/>
                <span>Chưa có tài khoản?<NavLink to="/register"> Đăng ký</NavLink></span>
            </div>

        </div>
    )
}

export default Login;