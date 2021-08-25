import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import userImg from '../../assets/images/user.svg';
import { postDoc } from '../../Services/httpServices';
import Modal from '../Modal/Modal';

const RecoverPassword = () => {
    const [OTP, setOTP] = useState('');
    const [timer, setTimer] = useState(0);
    const [success, setSuccess] = useState({ status: false, message: "" });
    const [showModal, setShowModal] = useState(false);
    const [steps, setSteps] = useState({ first: false, second: false, third: false })


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

        if (!values.phone) {
            errors.phone = 'Phone number is required!';
        } else if (values.phone.length < 10) {
            errors.phone = 'Phone number must be at least 10 digit!';
        } else if (!/^\+?[0-9]{10,12}$/.test(values.phone)) {
            errors.phone = 'Invalid phone number!';
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            phone: ''
        },
        validate,
        onSubmit: values => {
            postDoc('user/forgot-password/1', '', values)
                .then(data => {
                    setSuccess({ status: data.status, message: data.message });
                    setSteps({ ...steps, first: true })
                    setTimer(10)
                })
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
        postDoc('user/resend-otp', '', { phone: formik.phone, type: "verification" })
            .then(data => {
                console.log(data);
            })
    }

    const handleSubmitOTP = () => {
        if (/^[0-9]{4}$/.test(OTP) && formik.phone) {
            postDoc('user/register', '', { ...formik.phone, otp: OTP, type: "verification" })
                .then(data => {
                    console.log(data);
                    setSuccess({ status: data.status, message: data.message });
                    setShowModal(true);
                })
        }
    }
    return (
        <div className="login container  d-flex justify-content-center align-items-center">
            <div className="login-container my-3">
                <div className="card border-0">
                    <div className="card-body rounded-5 py-4">
                        <img src={userImg} alt="User img" className="img-75 d-block m-auto mt-2 mb-3" />
                        <h5 className="text-center text-uppercase fw-bold mb-4">Recover Your Password</h5>
                        {
                            showModal &&
                            <Modal
                                isSuccess={success.status}
                                message={success.message}
                                isLink={success.status}
                                linkUrl="/profile"
                                isClose={!success.status}
                                setShowModal={setShowModal} />
                        }
                        {
                            steps.first && !steps.second && !steps.third &&
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
                            !steps.first && !steps.second && !steps.third &&
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
                                <div class="text-center">
                                    <input type="submit" value="Send OTP" className="custom-btn mt-3" />
                                </div>
                                <div className="mt-3 mb-2 fw-bold">
                                    Need an account? <Link to="/register" className="form-link">Create your account.</Link>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword;