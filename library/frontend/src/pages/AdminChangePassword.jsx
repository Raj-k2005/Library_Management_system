import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AdminChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {

        if (!adminUser) {
            navigate('/admin/login');
        }

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        try {

            const res = await axios.post(
                "http://127.0.0.1:8000/api/change_admin_password/",
                {
                    username: adminUser,
                    current_password: currentPassword,
                    new_password: newPassword,
                    confirm_password: confirmPassword
                }
            );

            if (res.data.success) {

                toast.success(res.data.message || "Password Changed ✅");

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");

            } else {

                toast.error(res.data.message || "Something went wrong");
            }

        } catch (err) {

            console.log(err);

            if (err.response && err.response.data && err.response.data.message) {

                toast.error(err.response.data.message);

            } else {

                toast.error("Something went wrong");
            }

        } finally {

            setLoading(false);
        }
    };

    return (
        <>
            <style>{`

                .password-page{
                    min-height:100vh;
                    background:
                        radial-gradient(circle at top left, rgba(79,70,229,0.18), transparent 30%),
                        radial-gradient(circle at bottom right, rgba(14,165,233,0.16), transparent 30%),
                        linear-gradient(160deg, #0a0f2c 0%, #0d1b3e 50%, #091426 100%);
                    padding:40px 15px;
                }

                .glass-card{
                    background:rgba(15,23,50,0.58);
                    backdrop-filter:blur(22px) saturate(180%);
                    -webkit-backdrop-filter:blur(22px) saturate(180%);
                    border:1px solid rgba(99,179,237,0.18);
                    border-radius:22px;
                    box-shadow:
                        0 20px 50px rgba(0,0,0,0.45),
                        inset 0 1px 0 rgba(255,255,255,0.04);
                    overflow:hidden;
                }

                .glass-title{
                    color:#e2eaf8;
                    font-weight:700;
                    font-size:1.8rem;
                }

                .glass-subtitle{
                    color:rgba(180,210,255,0.7);
                    font-size:0.9rem;
                }

                .glass-label{
                    color:rgba(190,220,255,0.85);
                    font-size:0.82rem;
                    font-weight:600;
                    margin-bottom:6px;
                    text-transform:uppercase;
                    letter-spacing:0.05em;
                }

                .glass-input{
                    background:rgba(255,255,255,0.06)!important;
                    border:1px solid rgba(99,179,237,0.18)!important;
                    border-radius:12px!important;
                    color:#fff!important;
                    padding:12px 14px!important;
                    transition:0.25s ease;
                }

                .glass-input::placeholder{
                    color:rgba(180,210,255,0.4);
                }

                .glass-input:focus{
                    background:rgba(255,255,255,0.08)!important;
                    border-color:rgba(99,179,237,0.55)!important;
                    box-shadow:0 0 0 4px rgba(59,130,246,0.12)!important;
                    color:#fff!important;
                }

                .glass-icon{
                    background:rgba(255,255,255,0.06)!important;
                    border:1px solid rgba(99,179,237,0.18)!important;
                    color:#dbeafe!important;
                    border-radius:12px 0 0 12px!important;
                }

                .glass-toggle{
                    background:rgba(255,255,255,0.06)!important;
                    border:1px solid rgba(99,179,237,0.18)!important;
                    color:#dbeafe!important;
                    border-radius:0 12px 12px 0!important;
                }

                .glass-toggle:hover{
                    background:rgba(255,255,255,0.1)!important;
                    color:#fff!important;
                }

                .glass-btn{
                    background:linear-gradient(135deg,#4f46e5,#0ea5e9)!important;
                    border:none!important;
                    border-radius:12px!important;
                    color:#fff!important;
                    font-weight:600;
                    padding:12px 18px!important;
                    transition:0.25s ease;
                    box-shadow:0 10px 25px rgba(79,70,229,0.35);
                }

                .glass-btn:hover{
                    transform:translateY(-1px);
                    box-shadow:0 14px 28px rgba(14,165,233,0.35);
                }

                .security-box{
                    background:rgba(255,255,255,0.04);
                    border:1px solid rgba(255,255,255,0.05);
                    border-radius:16px;
                    padding:16px;
                }

                .security-box p{
                    color:#cbd5e1;
                    margin-bottom:8px;
                    font-size:0.9rem;
                }

                .security-box i{
                    color:#38bdf8;
                    margin-right:8px;
                }

                @media (max-width:768px){

                    .password-page{
                        padding:20px 10px;
                    }

                    .glass-title{
                        font-size:1.4rem;
                    }

                }

            `}</style>

            <div className='password-page'>

                <div className='container'>

                    {/* Header */}
                    <div className='row mb-4'>

                        <div className='col-md-8 mx-auto text-center'>

                            <h2 className='glass-title mb-2'>
                                <i className='fa-solid fa-shield-halved me-2 text-info'></i>
                                Admin Change Password
                            </h2>

                            <p className='glass-subtitle mb-0'>
                                Secure your admin account by updating your password
                            </p>

                        </div>

                    </div>

                    <div className='row justify-content-center'>

                        <div className='col-lg-7'>

                            <div className='glass-card'>

                                <div className='card-body p-4 p-md-5'>

                                    <div className='security-box mb-4'>

                                        <p>
                                            <i className='fa-solid fa-lock'></i>
                                            Use a strong password with letters, numbers and symbols
                                        </p>

                                        <p className='mb-0'>
                                            <i className='fa-solid fa-user-shield'></i>
                                            Minimum password length should be 6 characters
                                        </p>

                                    </div>

                                    <form onSubmit={handleSubmit}>

                                        {/* Current Password */}
                                        <div className='mb-4'>

                                            <label className='glass-label'>
                                                Current Password
                                            </label>

                                            <div className='input-group'>

                                                <span className='input-group-text glass-icon'>
                                                    <i className='fa-solid fa-lock'></i>
                                                </span>

                                                <input
                                                    type={showCurrent ? "text" : "password"}
                                                    className='form-control glass-input'
                                                    placeholder='Enter Current Password'
                                                    required
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                />

                                                <button
                                                    type='button'
                                                    className='btn glass-toggle'
                                                    onClick={() => setShowCurrent(!showCurrent)}
                                                >

                                                    {showCurrent ? (
                                                        <i className='fa-solid fa-eye-slash'></i>
                                                    ) : (
                                                        <i className='fa-solid fa-eye'></i>
                                                    )}

                                                </button>

                                            </div>

                                        </div>

                                        {/* New Password */}
                                        <div className='mb-4'>

                                            <label className='glass-label'>
                                                New Password
                                            </label>

                                            <div className='input-group'>

                                                <span className='input-group-text glass-icon'>
                                                    <i className='fa-solid fa-key'></i>
                                                </span>

                                                <input
                                                    type={showNew ? "text" : "password"}
                                                    className='form-control glass-input'
                                                    placeholder='Enter New Password'
                                                    required
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                />

                                                <button
                                                    type='button'
                                                    className='btn glass-toggle'
                                                    onClick={() => setShowNew(!showNew)}
                                                >

                                                    {showNew ? (
                                                        <i className='fa-solid fa-eye-slash'></i>
                                                    ) : (
                                                        <i className='fa-solid fa-eye'></i>
                                                    )}

                                                </button>

                                            </div>

                                        </div>

                                        {/* Confirm Password */}
                                        <div className='mb-4'>

                                            <label className='glass-label'>
                                                Confirm New Password
                                            </label>

                                            <div className='input-group'>

                                                <span className='input-group-text glass-icon'>
                                                    <i className='fa-solid fa-key'></i>
                                                </span>

                                                <input
                                                    type={showConfirm ? "text" : "password"}
                                                    className='form-control glass-input'
                                                    placeholder='Confirm New Password'
                                                    required
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />

                                                <button
                                                    type='button'
                                                    className='btn glass-toggle'
                                                    onClick={() => setShowConfirm(!showConfirm)}
                                                >

                                                    {showConfirm ? (
                                                        <i className='fa-solid fa-eye-slash'></i>
                                                    ) : (
                                                        <i className='fa-solid fa-eye'></i>
                                                    )}

                                                </button>

                                            </div>

                                        </div>

                                        <button
                                            type='submit'
                                            className='btn glass-btn w-100'
                                            disabled={loading}
                                        >

                                            {loading ? (
                                                <>
                                                    <span className='spinner-border spinner-border-sm me-2'></span>
                                                    Changing Password...
                                                </>
                                            ) : (
                                                <>
                                                    <i className='fa-solid fa-floppy-disk me-2'></i>
                                                    Change Password
                                                </>
                                            )}

                                        </button>

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default AdminChangePassword;