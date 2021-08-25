import React from 'react';
import { Link } from 'react-router-dom';
import onlineAd from '../../assets/images/online-ad.svg';
import './HeroSection.css'

const HeroSection = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={onlineAd} className="w-75 m-auto d-block my-4" alt="" />
                </div>
                <div className="col-md-6 d-flex justify-content-center flex-column text-center">
                    <div>
                    <h1 className="hero-text">Welcome to</h1>
                    <h1 className="hero-text my-3">Strefen Shop</h1>
                    <h6 className="mb-4">We are providing best products for you.</h6>
                    <Link to="/login" className="custom-btn Hello text-decoration-none my-3">Login/Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;