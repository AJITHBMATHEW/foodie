import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import userImg from '../../assets/images/user.svg';
import { postDoc } from '../../Services/httpServices';
import Modal from '../Modal/Modal';

const Register = () => {
    const [userData, setUserData] = useState({ status: false, data: {} });
    const [OTP, setOTP] = useState('');
    const [timer, setTimer] = useState(0);
    const [success, setSuccess] = useState({ status: false, message: "" });
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        let myInterval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    const validate = values => {
        const errors = {};

        if (!values.firstname) {
            errors.firstname = 'First Name is required!';
        }

        if (!values.lastname) {
            errors.lastname = 'Last Name is required!';
        }

        if (!values.phone) {
            errors.phone = 'Phone number is required!';
        } else if (values.phone.length < 10) {
            errors.phone = 'Phone number must be at least 10 digit!';
        } else if (!/^\+?[0-9]{10,12}$/.test(values.phone)) {
            errors.phone = 'Invalid phone number!';
        }

        if (!values.email) {
            errors.email = 'Email is required!';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address!';
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
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            setUserData({ status: true, data: values });
            setTimer(10);
            sendOTP(values.phone);
            // alert(JSON.stringify(values, null, 2));
        },
    });

    const handleOnChange = (e) => {
        setOTP(e.target.value)
    }

    const sendOTP = (phone) => {
        postDoc('user/generate-otp', '', { phone: phone, type: "verification" })
            .then(data => {
                console.log(data);
            })
    }

    const reSendOTP = () => {
        setTimer(10);
        postDoc('user/resend-otp', '', { phone: userData.data.phone, type: "verification" })
            .then(data => {
                console.log(data);
            })
    }

    const handleSubmitOTP = () => {
        if (/^[0-9]{4}$/.test(OTP) && userData.data) {
            postDoc('user/register', '', { ...userData.data, otp: OTP, type: "verification" })
                .then(data => {
                    console.log(data);
                    setSuccess({ status: data.status, message: data.message });
                    setShowModal(true);
                })
        }
    }
    return (
        <div className="container">
            <div className="login-container my-3">
                <div className="card border-0">
                    <div className="card-body rounded-5 py-4">
                        <img src={userImg} alt="User img" className="img-75 d-block m-auto mt-2 mb-3" />
                        <h5 className="text-center text-uppercase fw-bold mb-4">Create Account</h5>
                        {
                            showModal && 
                            <Modal 
                            isSuccess={success.status} 
                            message={success.message} 
                            isLink={success.status}
                            linkUrl="/login"
                            isClose={!success.status}
                            setShowModal={setShowModal}/>
                        }
                        {
                            userData.status &&
                            <div>
                                <p><strong>An OTP has been send to your phone number via SMS. Enter the OTP & click the 'Submit OTP' Button.</strong></p>
                                <div className="d-flex">
                                    <div class="input-wrapper mt-0 me-2">
                                        <i class="fas fa-sms" aria-hidden="true"></i>
                                        <input
                                            type="text"
                                            name="otp"
                                            placeholder="Enter OTP"
                                            onChange={handleOnChange}
                                        />
                                    </div>
                                    {
                                        timer > 0 ?
                                            <button
                                                className="custom-btn disabled"
                                                style={{ width: "120px" }}>Resend({timer})</button> :
                                            <button
                                                className="custom-btn"
                                                onClick={reSendOTP}
                                                style={{ width: "120px" }}>Resend</button>
                                    }
                                </div>
                                {
                                    !/^[0-9]{4}$/.test(OTP) && OTP.length > 0 &&
                                    <small className="text-danger">OTP must be a number of 4 digit</small>
                                }
                                <div class="text-center mt-3">
                                    {
                                        /^[0-9]{4}$/.test(OTP) ?
                                            <input
                                                type="submit"
                                                value="Submit OTP"
                                                className="custom-btn"
                                                onClick={handleSubmitOTP} /> :
                                            <input
                                                type="submit"
                                                value="Submit OTP"
                                                className="custom-btn disabled" />
                                    }
                                </div>
                            </div>

                        }

                        {
                            !userData.status &&
                            <form onSubmit={formik.handleSubmit}>
                                <div class="input-wrapper">
                                    <i class="fas fa-user" aria-hidden="true"></i>
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="First Name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.firstname} />
                                </div>
                                {
                                    formik.touched.firstname && formik.errors.firstname &&
                                    <small className="text-danger text-center">{formik.errors.firstname}</small>
                                }

                                <div class="input-wrapper">
                                    <i class="fas fa-user" aria-hidden="true"></i>
                                    <input
                                        type="text"
                                        name="lastname"
                                        placeholder="Last Name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.lastname} />
                                </div>
                                {
                                    formik.touched.lastname && formik.errors.lastname &&
                                    <small className="text-danger text-center">{formik.errors.lastname}</small>
                                }

                                <div class="input-wrapper">
                                    <i class="fas fa-phone-alt" aria-hidden="true"></i>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone Number"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone} />
                                </div>
                                {
                                    formik.touched.phone && formik.errors.phone &&
                                    <small className="text-danger text-center">{formik.errors.phone}</small>
                                }

                                <div class="input-wrapper">
                                    <i class="fas fa-envelope" aria-hidden="true"></i>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Your Email Address"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email} />
                                </div>
                                {
                                    formik.touched.email && formik.errors.email &&
                                    <small className="text-danger text-center">{formik.errors.email}</small>
                                }

                                <div class="input-wrapper">
                                    <i class="fas fa-user-lock" aria-hidden="true"></i>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Your Password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password} />
                                </div>
                                {
                                    formik.touched.password && formik.errors.password &&
                                    <small className="text-danger text-center">{formik.errors.password}</small>
                                }

                                <div class="text-center mt-3">
                                    <input type="submit" value="Signin" className="custom-btn" />
                                </div>
                                <div className="mt-3 mb-2 fw-bold">
                                    Already have an account? <Link to="/login" className="form-link">Login</Link>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;