import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import userImg from '../../assets/images/user.svg';
import './Login.css';
import { postDoc } from '../../Services/httpServices';
import Modal from '../Modal/Modal';
import { UserDataContext } from '../../App';

const Login = () => {
    const [userData, setUserData]  = useContext(UserDataContext);
    const [success, setSuccess] = useState({ status: false, message: "" });
    const [showModal, setShowModal] = useState(false)

    const validate = values => {
        const errors = {};

        if (!values.phone) {
            errors.phone = 'Phone number is required!';
        } else if (values.phone.length < 10) {
            errors.phone = 'Phone number must be at least 10 digit!';
        } else if (!/^\+?[0-9]{10,13}$/.test(values.phone)) {
            errors.phone = 'Invalid phone number!';
        }

        if (!values.password) {
            errors.password = 'Password is required!';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 character!';
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            phone: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            postDoc('user/login','',{...values,deviceId:"device-id",deviceType:"chrome"})
            .then(data=>{
                console.log({...values,deviceId:"device-id",deviceType:"chrome"})
                setSuccess({status:data.status,message:data.message});
                setShowModal(true);
                if (data.status) {
                    setUserData(data)
                    console.log(data);
                }
            })
        },
    });
    return (
        <div className="login container  d-flex justify-content-center align-items-center">
            <div className="login-container my-3">
                <div className="card border-0">
                    <div className="card-body rounded-5 py-4">
                        <img src={userImg} alt="User img" className="img-75 d-block m-auto mt-2 mb-3" />
                        <h5 className="text-center text-uppercase fw-bold mb-4">Strofen Shop Dashboard</h5>
                        {
                            showModal && 
                            <Modal
                            isSuccess={success.status} 
                            message={success.message} 
                            isLink={success.status}
                            linkUrl="/profile"
                            isClose={!success.status}
                            setShowModal={setShowModal}/>
                        }
                        <form onSubmit={formik.handleSubmit}>
                            <div class="input-wrapper">
                                <i class="fas fa-phone-alt" aria-hidden="true"></i>
                                <input
                                    type="text"
                                    name="phone"
                                    autocomplete="user-name"
                                    placeholder="Your Phone Number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone} />
                            </div>
                            {
                                formik.touched.phone && formik.errors.phone &&
                                <small className="text-danger text-center">{formik.errors.phone}</small>
                            }
                            <div class="input-wrapper">
                                <i class="fas fa-user-lock" aria-hidden="true"></i>
                                <input
                                    type="password"
                                    name="password"
                                    autocomplete="user-name"
                                    placeholder="Your Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password} />
                            </div>
                            {
                                formik.touched.password && formik.errors.password &&
                                <small className="text-danger text-center">{formik.errors.password}</small>
                            }
                            <Link to="/forget-password" className="form-link d-block mb-3 mt-2">Forget your password?</Link>
                            <div class="text-center">
                                <input type="submit" value="Signin" className="custom-btn" />
                            </div>
                        </form>
                        <div className="mt-3 mb-2 fw-bold">
                            Need an account? <Link to="/register" className="form-link">Create your account.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;