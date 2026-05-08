import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [formData, setFormData] = useState({
        login_id: '',
        password: ''
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/api/user_login/", formData
            );
            if (res.data.success) {
                localStorage.setItem("studentUser", JSON.stringify(res.data));
                toast.success(`Login Successful!`);
                navigate('/user/dashboard');
                setFormData({ login_id: '', password: '' });
            } else {
                toast.error(res.data.message || "Login Failed");
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Invalid Credentials. Please enter your Id and Password correctly.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
                /* ── Page background ──────────────────────────────── */
                .login-page {
                    min-height: 100vh;
                    background:
                        radial-gradient(ellipse at 20% 30%, rgba(79, 70, 229, 0.18) 0%, transparent 55%),
                        radial-gradient(ellipse at 80% 70%, rgba(14, 165, 233, 0.14) 0%, transparent 55%),
                        linear-gradient(160deg, #0a0f2c 0%, #0d1b3e 50%, #0a1628 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 3rem 1rem;
                    position: relative;
                    overflow: hidden;
                }

                /* Floating book particles */
                .login-page::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image:
                        radial-gradient(1.5px 1.5px at 18% 22%, rgba(148,197,255,0.25) 0%, transparent 100%),
                        radial-gradient(1px 1px at 72% 15%, rgba(148,197,255,0.18) 0%, transparent 100%),
                        radial-gradient(1.5px 1.5px at 55% 80%, rgba(148,197,255,0.2) 0%, transparent 100%),
                        radial-gradient(1px 1px at 35% 65%, rgba(148,197,255,0.15) 0%, transparent 100%),
                        radial-gradient(2px 2px at 88% 45%, rgba(148,197,255,0.12) 0%, transparent 100%);
                    pointer-events: none;
                }

                /* ── Glass card ───────────────────────────────────── */
                .glass-card {
                    background: rgba(15, 23, 50, 0.6);
                    backdrop-filter: blur(24px) saturate(180%);
                    -webkit-backdrop-filter: blur(24px) saturate(180%);
                    border: 1px solid rgba(99, 179, 237, 0.18);
                    border-top: 1px solid rgba(148, 205, 255, 0.28);
                    border-radius: 20px !important;
                    box-shadow:
                        0 24px 64px rgba(0, 0, 0, 0.5),
                        0 1px 0 rgba(255, 255, 255, 0.06) inset;
                    overflow: hidden;
                    width: 100%;
                    max-width: 440px;
                    position: relative;
                }

                /* Top accent line */
                .glass-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 10%; right: 10%;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(99,179,237,0.6), rgba(79,70,229,0.6), transparent);
                    border-radius: 0 0 4px 4px;
                }

                /* ── Card header / icon area ──────────────────────── */
                .glass-card-header {
                    padding: 2rem 2rem 0.5rem;
                    text-align: center;
                }

                .glass-icon-wrap {
                    width: 64px;
                    height: 64px;
                    border-radius: 18px;
                    background: linear-gradient(135deg, rgba(79, 70, 229, 0.7), rgba(14, 165, 233, 0.6));
                    box-shadow: 0 0 24px rgba(79, 70, 229, 0.45), 0 4px 12px rgba(0,0,0,0.3);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.6rem;
                    color: #e0f2fe;
                    margin-bottom: 1rem;
                    border: 1px solid rgba(148, 205, 255, 0.2);
                }

                .glass-title {
                    color: #e2eaf8;
                    font-size: 1.45rem;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    margin-bottom: 0.3rem;
                }

                .glass-subtitle {
                    color: rgba(148, 197, 255, 0.65);
                    font-size: 0.85rem;
                    margin-bottom: 0;
                }

                /* ── Form body ────────────────────────────────────── */
                .glass-card-body {
                    padding: 1.5rem 2rem 2rem;
                }

                .glass-label {
                    color: rgba(182, 212, 248, 0.8);
                    font-size: 0.82rem;
                    font-weight: 500;
                    margin-bottom: 0.4rem;
                    letter-spacing: 0.03em;
                    text-transform: uppercase;
                }

                .glass-input {
                    background: rgba(255, 255, 255, 0.05) !important;
                    border: 1px solid rgba(99, 179, 237, 0.22) !important;
                    border-radius: 10px !important;
                    color: #e2eaf8 !important;
                    padding: 0.6rem 0.95rem !important;
                    font-size: 0.92rem !important;
                    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
                }
                .glass-input::placeholder {
                    color: rgba(148, 197, 255, 0.35) !important;
                }
                .glass-input:focus {
                    background: rgba(255, 255, 255, 0.08) !important;
                    border-color: rgba(99, 179, 237, 0.55) !important;
                    box-shadow: 0 0 0 3px rgba(99, 179, 237, 0.12) !important;
                    outline: none;
                    color: #fff !important;
                }

                /* ── Submit button ────────────────────────────────── */
                .glass-submit-btn {
                    background: linear-gradient(135deg, #4f46e5, #0ea5e9) !important;
                    border: none !important;
                    border-radius: 10px !important;
                    color: #fff !important;
                    font-weight: 600;
                    font-size: 0.95rem;
                    padding: 0.65rem 1rem !important;
                    letter-spacing: 0.04em;
                    box-shadow: 0 4px 20px rgba(79, 70, 229, 0.45);
                    transition: opacity 0.2s, box-shadow 0.2s, transform 0.2s;
                    position: relative;
                    overflow: hidden;
                }
                .glass-submit-btn::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%);
                    pointer-events: none;
                }
                .glass-submit-btn:hover:not(:disabled) {
                    opacity: 0.92;
                    box-shadow: 0 6px 28px rgba(14, 165, 233, 0.5);
                    transform: translateY(-1px);
                }
                .glass-submit-btn:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                }

                /* ── Footer link ──────────────────────────────────── */
                .glass-footer-text {
                    color: rgba(148, 197, 255, 0.55);
                    font-size: 0.83rem;
                }
                .glass-footer-text a {
                    color: #93c5fd;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                .glass-footer-text a:hover {
                    color: #bae6fd;
                    text-decoration: underline;
                }

                /* ── Divider ──────────────────────────────────────── */
                .glass-divider {
                    border: none;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(99,179,237,0.2), transparent);
                    margin: 1.2rem 0;
                }
            `}</style>

            <div className="login-page">
                <div className="glass-card">

                    {/* Header */}
                    <div className="glass-card-header">
                        <div className="glass-icon-wrap">
                            <i className="fa-solid fa-book-open-reader"></i>
                        </div>
                        <h4 className="glass-title">Welcome Back</h4>
                        <p className="glass-subtitle">Sign in to access your library account</p>
                    </div>

                    <hr className="glass-divider mx-4" />

                    {/* Form */}
                    <div className="glass-card-body">
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="glass-label">
                                    <i className="fa-solid fa-id-card me-1"></i>Email or Student ID
                                </label>
                                <input
                                    type="text"
                                    name="login_id"
                                    className="form-control glass-input"
                                    placeholder="Enter Email or Student ID"
                                    required
                                    value={formData.login_id}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="glass-label">
                                    <i className="fa-solid fa-lock me-1"></i>Password
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

                            <button
                                type="submit"
                                className="btn glass-submit-btn w-100"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Accessing...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-right-to-bracket me-2"></i>Log In
                                    </>
                                )}
                            </button>

                            <p className="text-center glass-footer-text mt-3 mb-0">
                                New here? <Link to="/user/signup">Create an account</Link>
                            </p>

                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default UserLogin;