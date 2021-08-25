import React from 'react';
import { Link } from 'react-router-dom';

const Modal = ({ isSuccess, message, isLink, linkUrl, isClose, setShowModal }) => {
    return (
        <div>
            <div class="modal fade show d-flex justify-content-center align-items-center" id="exampleModalLive" tabindex="-1" aria-labelledby="exampleModalLiveLabel" style={{ display: "block" }} aria-modal="true" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content" style={{minWidth:"300px"}}>
                        <div class="modal-body text-center">
                            {
                                isSuccess ?
                                    <><i class="far fa-check-circle fa-4x text-success"></i>
                                        <h5 class="modal-title" id="exampleModalLiveLabel">Sccessfully</h5></> :
                                    <><i class="far fa-times-circle fa-4x text-danger"></i>
                                        <h5 class="modal-title" id="exampleModalLiveLabel">Failed</h5></>

                            }
                            <p>{message}</p>
                            {
                                isLink && <Link to={linkUrl} type="button" class="custom-btn">Login</Link>
                            }
                            {
                                isClose &&
                                <button onClick={() => setShowModal(false)} className="btn btn-secondary">Close</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show"></div>
        </div>
    );
};

export default Modal;