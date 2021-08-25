import React from 'react';
import img1 from '../../assets/images/image-1.png'; 
import img2 from '../../assets/images/image-2.png'; 
import img3 from '../../assets/images/image-3.png';
import service from '../../assets/images/service.jpg';
import './MoreDetails.css';

const MoreDetails = () => {
    return (
        <section class="container more-details mt-5">
            <div className="row">
            <div class="col-md-6">
                <div class="d-flex align-items-center details">
                    <div class="details-img">
                        <img src={img1} alt="" />
                    </div>
                    <div class="details-text">
                        <h3>Find the Perfect Fit</h3>
                        <p>Everybody is different, which is why we<br />
                            offer styles for every body.</p>
                    </div>
                </div>
                <div class="d-flex align-items-center details">
                    <div class="details-img">
                        <img src={img2} alt="" />
                    </div>
                    <div class="details-text">
                        <h3>Free Exchanges</h3>
                        <p>One of the many reasons you can shop<br />
                            with peace of mind.</p>
                    </div>
                </div>
                <div class="d-flex align-items-center details">
                    <div class="details-img">
                        <img src={img3} alt="" />
                    </div>
                    <div class="details-text">
                        <h3>Contact Our Seller</h3>
                        <p>They are here to help you. That's quite<br />
                            literally what we pay them for.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 d-flex align-items-center shopping-img">
                <img src={service} class="img-fluid" />
            </div>
            </div>
        </section>
    );
};

export default MoreDetails;