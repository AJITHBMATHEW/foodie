import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiBaseUrl, postDoc } from '../../Services/httpServices';
import './AllProducts.css'

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([])
    const [itemCount, setItemCount] = useState(6)

    useEffect(() => {
        postDoc('products/get-all-products')
            .then(products => {
                setAllProducts(products.data);
            })
    }, [])
    return (
        <section class="container my-5 py-4">
            <h3 class="section-title text-center">All Products</h3>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {
                    !(allProducts.length > 0) &&
                    <div className="d-flex justify-content-center align-items-center w-100 my-5 py-5">
                        <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    </div>
                }
                {
                    allProducts?.slice(0, itemCount)?.map(({ images, product_name, selling_price, discount, product_id }) => {
                        return (
                            <div class="col">
                                <div class="shadow card h-100">
                                    <div class="card-body">
                                        <Link to={"/product/" + product_id} className="text-dark text-decoration-none">
                                            <div className="product-img">
                                                <img src={apiBaseUrl + images[0]} class="" alt="..." />
                                            </div>
                                            <h5 class="card-title" title={product_name}>
                                                {product_name?.substring(0, 50)}
                                                {product_name.length > 50 && <span>...</span>}
                                            </h5>
                                        </Link>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between pt-0">
                                        <div className="price-area d-flex align-items-center">
                                            <h6 class="price text-dark me-2"><del>₹{selling_price}</del></h6>
                                            <h5 class="price">₹{Math.round(selling_price * (1 - discount / 100))}</h5>
                                        </div>
                                        <button class="custom-btn w-50"><i class="fas fa-shopping-cart"></i> Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                itemCount < 10 &&
                <div className="text-center mt-5 font-lg">
                    <button className="custom-btn" onClick={() => setItemCount(10)}>Load More Product</button>
                </div>
            }
        </section>
    );
};

export default AllProducts;