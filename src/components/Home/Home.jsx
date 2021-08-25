import React from 'react';
import AllProducts from '../AllProducts/AllProducts';
import Footer from '../Footer/Footer';
import HeroSection from '../HeroSection/HeroSection';
import MoreDetails from '../MoreDetails/MoreDetails';
import Navbar from '../Navbar/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <HeroSection/>
            <AllProducts/>
            <MoreDetails/>
            <Footer/>
        </div>
    );
};

export default Home;