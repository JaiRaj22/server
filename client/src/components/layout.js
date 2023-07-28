import Navbar from "./navbar";
import React from "react";

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className='container'>{children}</div>
        </div>
    )
}

export default Layout