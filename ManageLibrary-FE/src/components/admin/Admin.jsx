import React from "react";
import { Route, Routes } from "react-router";
import Books from "./Books"
import Book from "./Book"
const Admin = () => {
    return(
        <>
            <h1>Hello Admin</h1>
            {/* <Routes>
                <Route path='/admin/books' element={<Books/>}/>
                <Route path='/admin/book' element={<Book/>}/>
            </Routes> */}
        </>
    )
}

export default Admin