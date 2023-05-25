import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router';
import './App.css';
import Admin from './components/admin/Admin';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/client/Home';
import Books from './components/admin/Books';
import Book from './components/admin/Book';
import Cards from './components/client/Cards';
import CardDetail from './components/client/CardDetail';
import Header from './components/client/Header';
import { useSelector } from 'react-redux';

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const user = useSelector(state => state.auth.user)
  console.log(user)
  return (
    <>
        {/* <Header/> */}
        <Routes>
          <Route path='/' element={<Cards />}/>
          <Route path='book' element={<CardDetail />}/>
          <Route path='/admin/book' element={<Book />} />
          <Route path='/admin/books' element={<Books />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
    </>
  )
}

export default App
