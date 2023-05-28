import React from "react";
import { Route, Routes } from "react-router";
import Books from "./Books"
import Book from "./Book"
import HeaderAd from "./HeaderAd";
const Admin = () => {
    return(
        <>
           <HeaderAd/>
           <br/>
           <br/>
           <Books/>
        </>
    )
}

export default Admin