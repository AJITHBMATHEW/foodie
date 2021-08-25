import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { apiBaseUrl, getDoc } from '../../Services/httpServices';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './ViewProduct.css';

const ViewProduct = () => {
    const [productData, setProductData] = useState({});
    const [thumbnail, setThumbnail] = useState('')
    const {productId} = useParams('productId');

    useEffect(() => {
        getDoc(`products/get-one-product/${productId}`)
            .then(product => {
                setProductData(product.data);
            })
    }, [])
    return (
        <>
            <Navbar />
            <div className="container my-5">
                {
                    !productData?.product_id &&
                    <div className="d-flex justify-content-center align-items-center w-100 my-5 py-5">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
                {
                    productData?.product_id &&
                    <div className="row">
                        <div className="col-md-5">
                            <div className="custom-box text-center p-3">
                                {
                                    !thumbnail ?
                                    <img src={apiBaseUrl + productData?.images[0]} className="d-block m-auto" style={{ height: "350px" }} alt="" />:
                                    <img src={apiBaseUrl + thumbnail} className="d-block m-auto" style={{ height: "350px" }} alt="" />
                                }
                                <div className="py-3">
                                    {
                                        productData.images.map(img=><img 
                                            key={img} 
                                            src={apiBaseUrl + img} 
                                            onClick={()=>setThumbnail(img)}
                                            className="thumbnail-picker"  
                                            alt="product thumbnail" />)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="custom-box py-3 px-4 mt-3 mt-md-0">
                                <h3 className="mt-2">{productData.product_name}</h3>
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <a href="#" className="d-block text-decoration-none">{productData.brand_name}</a>
                                        <p className="d-block text-decoration-none mt-2"><b>Catagory:</b> {productData.category}</p>
                                        <h5 class="price mt-3"><del>₹10</del> ₹10</h5>
                                    </div>
                                    <div className="col-6 ">
                                        <button className="btn btn-dark py-2"> + </button>
                                        <input type="number" className="py-1 mx-2 text-center input-wrapper d-inline-block" defaultValue="1" />
                                        <button className="btn btn-dark py-2"> - </button>
                                    </div>
                                </div>
                                <button className="custom-btn mt-3">Buy Now</button>
                                <div className="mt-3">
                                    <h5>Product Description</h5>
                                    {parse(productData.description)}
                                </div>
                                <div className="mt-3">
                                    <b>Tags:</b> {productData.tags}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </>
    );
};

export default ViewProduct;