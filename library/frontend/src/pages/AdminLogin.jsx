import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {

            const res = await axios.post(
                "http://127.0.0.1:8000/api/admin/login/",
                {
                    username,
                    password
                }
            );

            if (res.status === 200) {

                toast.success(
                    res.data.message || "Login done successfully"
                );

                localStorage.setItem(
                    "adminUser",
                    res.data.username
                );

                navigate('/admin/dashboard');

            } else {

                toast.error(
                    res.data.message || "Invalid data"
                );
            }

        } catch (err) {

            console.log(err);

            if (err.response?.data?.message) {

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

                /* ───────── PAGE BACKGROUND ───────── */

                .admin-login-page{
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

                .admin-login-page::before{
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

                .admin-glass-card{
                    width:100%;
                    max-width:420px;
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

                .admin-glass-card::before{
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

                .admin-header{
                    text-align:center;
                    padding:2rem 2rem 1rem;
                }

                .admin-icon{
                    width:70px;
                    height:70px;
                    border-radius:20px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    margin:0 auto 1rem;
                    background:linear-gradient(
                        135deg,
                        rgba(79,70,229,0.85),
                        rgba(14,165,233,0.75)
                    );
                    color:#fff;
                    font-size:1.7rem;
                    box-shadow:
                        0 0 30px rgba(79,70,229,0.45),
                        0 4px 14px rgba(0,0,0,0.3);
                    border:1px solid rgba(255,255,255,0.12);
                }

                .admin-title{
                    color:#e2eaf8;
                    font-size:1.5rem;
                    font-weight:700;
                    margin-bottom:0.3rem;
                }

                .admin-subtitle{
                    color:rgba(148,197,255,0.65);
                    font-size:0.85rem;
                    margin-bottom:0;
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

                /* ───────── FORM BODY ───────── */

                .admin-body{
                    padding:1.5rem 2rem 2rem;
                }

                .glass-label{
                    color:rgba(182,212,248,0.8);
                    font-size:0.78rem;
                    margin-bottom:0.45rem;
                    font-weight:600;
                    text-transform:uppercase;
                    letter-spacing:0.04em;
                }

                .glass-input-group{
                    border-radius:12px;
                    overflow:hidden;
                    border:1px solid rgba(99,179,237,0.22);
                    background:rgba(255,255,255,0.05);
                    transition:all 0.25s ease;
                }

                .glass-input-group:focus-within{
                    border-color:rgba(99,179,237,0.55);
                    box-shadow:0 0 0 3px rgba(99,179,237,0.12);
                    background:rgba(255,255,255,0.08);
                }

                .glass-input-icon{
                    background:transparent !important;
                    border:none !important;
                    color:rgba(148,197,255,0.7) !important;
                    padding-left:1rem !important;
                }

                .glass-input{
                    background:transparent !important;
                    border:none !important;
                    color:#e2eaf8 !important;
                    padding:0.78rem 1rem !important;
                    font-size:0.92rem !important;
                    box-shadow:none !important;
                }

                .glass-input::placeholder{
                    color:rgba(148,197,255,0.35) !important;
                }

                .glass-input:focus{
                    box-shadow:none !important;
                }

                /* ───────── BUTTON ───────── */

                .admin-btn{
                    background:linear-gradient(135deg,#4f46e5,#0ea5e9) !important;
                    border:none !important;
                    border-radius:12px !important;
                    color:#fff !important;
                    font-weight:600;
                    padding:0.78rem 1rem !important;
                    font-size:0.95rem;
                    letter-spacing:0.03em;
                    box-shadow:0 6px 24px rgba(79,70,229,0.45);
                    transition:all 0.25s ease;
                    position:relative;
                    overflow:hidden;
                }

                .admin-btn::after{
                    content:'';
                    position:absolute;
                    inset:0;
                    background:linear-gradient(
                        180deg,
                        rgba(255,255,255,0.12),
                        transparent
                    );
                }

                .admin-btn:hover:not(:disabled){
                    transform:translateY(-1px);
                    box-shadow:0 8px 30px rgba(14,165,233,0.45);
                    opacity:0.95;
                }

                .admin-btn:disabled{
                    opacity:0.7;
                    cursor:not-allowed;
                }

            `}</style>

            <div className="admin-login-page">

                <div className="admin-glass-card">

                    {/* Header */}

                    <div className="admin-header">

                        <div className="admin-icon">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>

                        <h3 className="admin-title">
                            Admin Portal
                        </h3>

                        <p className="admin-subtitle">
                            Secure administrator access panel
                        </p>

                    </div>

                    <hr className="glass-divider" />

                    {/* Form Body */}

                    <div className="admin-body">

                        <form onSubmit={handleSubmit}>

                            {/* Username */}

                            <div className="mb-3">

                                <label className="glass-label">
                                    Username
                                </label>

                                <div className="input-group glass-input-group">

                                    <span className="input-group-text glass-input-icon">
                                        <i className="fa-regular fa-user"></i>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control glass-input"
                                        placeholder="Enter admin username"
                                        required
                                        value={username}
                                        onChange={(e) =>
                                            setUserName(e.target.value)
                                        }
                                    />

                                </div>

                            </div>

                            {/* Password */}

                            <div className="mb-4">

                                <label className="glass-label">
                                    Password
                                </label>

                                <div className="input-group glass-input-group">

                                    <span className="input-group-text glass-input-icon">
                                        <i className="fa-solid fa-key"></i>
                                    </span>

                                    <input
                                        type="password"
                                        className="form-control glass-input"
                                        placeholder="Enter secure password"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />

                                </div>

                            </div>

                            {/* Submit Button */}

                            <button
                                type="submit"
                                className="btn admin-btn w-100"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-right-to-bracket me-2"></i>
                                        Sign In
                                    </>
                                )}
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
};

export default AdminLogin;