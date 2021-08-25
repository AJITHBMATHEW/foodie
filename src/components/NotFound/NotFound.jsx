import React from 'react';
import Navbar from '../Navbar/Navbar';
import errorImg from '../../assets/images/error.png';
import Footer from '../Footer/Footer';

const NotFound = () => {
    return (
        <>
        <Navbar/>
        <div className="container d-flex justify-content-center align-items-center" style={{height:"calc(100vh - 100px)"}}>
            <img src={errorImg} className="d-block" alt="" />
        </div>
        <Footer/>
        </>
    );
};

export default NotFound;