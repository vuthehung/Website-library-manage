import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router';
import './App.css';
import Admin from './components/admin/Admin';
import Login from './components/Login';
import Register from './components/Register';
import Book from './components/admin/Book';
import Cards from './components/client/Cards';
import CardDetail from './components/client/CardDetail';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login, logout } from './store/authSlice';

const App = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const user = useSelector(state => state.auth.user)
  useEffect(() => {
    // Kiểm tra xem có trạng thái đăng nhập đã lưu trong Local Storage hay không
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      // Khôi phục trạng thái đăng nhập và thông tin người dùng từ Local Storage vào Redux store
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch(login(user));
    } else {
      dispatch(logout())
    }
  }, [dispatch]);
  return (
    <>
      {/* <Header/> */}
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/book/:id' element={<CardDetail />} />
        {isLoggedIn && user.is_admin && (<Route path='/admin/book/:id' element={<Book />} />)}
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
