import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const UserSignup = () => {

    const [formData, setFormData] = useState({
        full_name: '',
        mobile: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            toast.error("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/api/user_signup/",
                formData
            );

            if (res.data.success) {

                toast.success(
                    `Signup Successful! Your Student ID is ${res.data.student_id}`
                );

                setFormData({
                    full_name: '',
                    mobile: '',
                    email: '',
                    password: '',
                    confirm_password: ''
                });

            } else {
                toast.error(res.data.message || "Signup Failed");
            }

        } catch (err) {

            console.log(err);

            toast.error(
                err.response?.data?.message || "An error occurred"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
                
                /* ───────── PAGE BACKGROUND ───────── */
                .signup-page{
                    min-height:100vh;
                    background:
                        radial-gradient(circle at 20% 20%, rgba(79,70,229,0.18), transparent 30%),
                        radial-gradient(circle at 80% 70%, rgba(14,165,233,0.14), transparent 30%),
                        linear-gradient(160deg,#0a0f2c 0%, #0d1b3e 50%, #091426 100%);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    padding:20px;
                    overflow:hidden;
                    position:relative;
                }

                /* Floating particles */
                .signup-page::before{
                    content:'';
                    position:absolute;
                    inset:0;
                    background-image:
                        radial-gradient(2px 2px at 20% 30%, rgba(147,197,253,0.25), transparent),
                        radial-gradient(2px 2px at 80% 20%, rgba(147,197,253,0.2), transparent),
                        radial-gradient(2px 2px at 60% 80%, rgba(147,197,253,0.18), transparent),
                        radial-gradient(2px 2px at 35% 70%, rgba(147,197,253,0.16), transparent);
                    pointer-events:none;
                }

                /* ───────── GLASS CARD ───────── */
                .signup-glass-card{
                    width:100%;
                    max-width:430px;
                    background:rgba(15,23,50,0.58);
                    backdrop-filter:blur(24px) saturate(180%);
                    -webkit-backdrop-filter:blur(24px) saturate(180%);
                    border:1px solid rgba(99,179,237,0.16);
                    border-top:1px solid rgba(255,255,255,0.12);
                    border-radius:22px;
                    overflow:hidden;
                    box-shadow:
                        0 20px 60px rgba(0,0,0,0.45),
                        inset 0 1px 0 rgba(255,255,255,0.06);
                    position:relative;
                }

                /* Top glow line */
                .signup-glass-card::before{
                    content:'';
                    position:absolute;
                    top:0;
                    left:12%;
                    right:12%;
                    height:2px;
                    background:linear-gradient(
                        90deg,
                        transparent,
                        rgba(14,165,233,0.7),
                        rgba(79,70,229,0.7),
                        transparent
                    );
                }

                /* ───────── HEADER ───────── */
                .signup-header{
                    text-align:center;
                    padding:1.8rem 1.8rem 1rem;
                }

                .signup-icon{
                    width:68px;
                    height:68px;
                    border-radius:18px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    margin:0 auto 1rem;
                    background:linear-gradient(
                        135deg,
                        rgba(79,70,229,0.8),
                        rgba(14,165,233,0.7)
                    );
                    color:#fff;
                    font-size:1.6rem;
                    box-shadow:
                        0 0 30px rgba(79,70,229,0.4),
                        0 4px 14px rgba(0,0,0,0.3);
                    border:1px solid rgba(255,255,255,0.12);
                }

                .signup-title{
                    color:#e2eaf8;
                    font-size:1.5rem;
                    font-weight:700;
                    margin-bottom:0.3rem;
                }

                .signup-subtitle{
                    color:rgba(148,197,255,0.65);
                    font-size:0.85rem;
                    margin-bottom:0;
                }

                /* ───────── BODY ───────── */
                .signup-body{
                    padding:1rem 1.8rem 1.8rem;
                }

                .glass-input{
                    background:rgba(255,255,255,0.05) !important;
                    border:1px solid rgba(99,179,237,0.22) !important;
                    border-radius:12px !important;
                    color:#e2eaf8 !important;
                    padding:0.72rem 0.95rem !important;
                    font-size:0.92rem !important;
                    transition:all 0.25s ease;
                }

                .glass-input::placeholder{
                    color:rgba(148,197,255,0.38) !important;
                }

                .glass-input:focus{
                    background:rgba(255,255,255,0.08) !important;
                    border-color:rgba(99,179,237,0.55) !important;
                    box-shadow:0 0 0 3px rgba(99,179,237,0.12) !important;
                    color:#fff !important;
                }

                .glass-label{
                    color:rgba(182,212,248,0.8);
                    font-size:0.78rem;
                    margin-bottom:0.4rem;
                    font-weight:600;
                    text-transform:uppercase;
                    letter-spacing:0.04em;
                }

                /* ───────── BUTTON ───────── */
                .signup-btn{
                    background:linear-gradient(135deg,#4f46e5,#0ea5e9) !important;
                    border:none !important;
                    border-radius:12px !important;
                    color:#fff !important;
                    font-weight:600;
                    padding:0.75rem 1rem !important;
                    font-size:0.94rem;
                    letter-spacing:0.03em;
                    box-shadow:0 6px 24px rgba(79,70,229,0.45);
                    transition:all 0.25s ease;
                    position:relative;
                    overflow:hidden;
                }

                .signup-btn::after{
                    content:'';
                    position:absolute;
                    inset:0;
                    background:linear-gradient(
                        180deg,
                        rgba(255,255,255,0.12),
                        transparent
                    );
                }

                .signup-btn:hover:not(:disabled){
                    transform:translateY(-1px);
                    box-shadow:0 8px 30px rgba(14,165,233,0.45);
                    opacity:0.95;
                }

                .signup-btn:disabled{
                    opacity:0.7;
                    cursor:not-allowed;
                }

                /* ───────── FOOTER ───────── */
                .signup-footer{
                    color:rgba(148,197,255,0.58);
                    font-size:0.84rem;
                }

                .signup-footer a{
                    color:#93c5fd;
                    text-decoration:none;
                    font-weight:600;
                }

                .signup-footer a:hover{
                    color:#dbeafe;
                    text-decoration:underline;
                }

                /* Divider */
                .glass-divider{
                    border:none;
                    height:1px;
                    background:linear-gradient(
                        90deg,
                        transparent,
                        rgba(99,179,237,0.2),
                        transparent
                    );
                    margin:0;
                }

            `}</style>

            <div className="signup-page">

                <div className="signup-glass-card">

                    {/* Header */}
                    <div className="signup-header">

                        <div className="signup-icon">
                            <i className="fa-solid fa-user-plus"></i>
                        </div>

                        <h3 className="signup-title">
                            Create Account
                        </h3>

                        <p className="signup-subtitle">
                            Join the smart digital library platform
                        </p>

                    </div>

                    <hr className="glass-divider" />

                    {/* Body */}
                    <div className="signup-body">

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="glass-label">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="full_name"
                                    className="form-control glass-input"
                                    placeholder="Enter Full Name"
                                    required
                                    value={formData.full_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="glass-label">
                                    Mobile Number
                                </label>

                                <input
                                    type="number"
                                    name="mobile"
                                    className="form-control glass-input"
                                    placeholder="Enter Mobile Number"
                                    required
                                    value={formData.mobile}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="glass-label">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control glass-input"
                                    placeholder="Enter Email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="glass-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control glass-input"
                                    placeholder="Enter Password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="glass-label">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirm_password"
                                    className="form-control glass-input"
                                    placeholder="Confirm Password"
                                    required
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn signup-btn w-100"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-user-plus me-2"></i>
                                        Register Now
                                    </>
                                )}
                            </button>

                            <p className="text-center signup-footer mt-3 mb-0">
                                Already have an account?{" "}
                                <Link to="/user/login">
                                    Login
                                </Link>
                            </p>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
};

export default UserSignup;