import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {

    const hasFetched = useRef(false);

    const [profile, setProfile] = useState({
        student_id: '',
        full_name: '',
        email: '',
        mobile: '',
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const studentUser = JSON.parse(localStorage.getItem('studentUser'));

    useEffect(() => {

        if (!studentUser) {
            navigate('/user/login');
            return;
        }

        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchProfile = async () => {
            try {
                const res = await axios.get(
                    "http://127.0.0.1:8000/api/user/profile/",
                    { params: { student_id: studentUser.student_id } }
                );

                setProfile({
                    student_id: res.data.student_id,
                    full_name: res.data.full_name,
                    email: res.data.email,
                    mobile: res.data.mobile
                });

            } catch (err) {
                toast.error("Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

    }, [navigate, studentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            await axios.put(
                "http://127.0.0.1:8000/api/user/profile/",
                profile
            );

            toast.success("Profile updated");

            localStorage.setItem(
                'studentUser',
                JSON.stringify({ ...studentUser, full_name: profile.full_name })
            );

        } catch (err) {
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", background: "#0b1020", color: "#fff" }}>
                <div className="spinner-border text-info me-2"></div>
                Loading Profile...
            </div>
        );
    }

    return (
        <>
            <style>{`

                .page {
                    min-height: 100vh;
                    padding: 40px 20px;
                    background:
                        radial-gradient(circle at top left, rgba(59,130,246,0.20), transparent 30%),
                        radial-gradient(circle at bottom right, rgba(16,185,129,0.15), transparent 30%),
                        linear-gradient(135deg,#0b1020,#0f172a,#111827);
                }

                .glass {
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.08);
                    backdrop-filter: blur(20px);
                    border-radius: 20px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.35);
                }

                .header-box {
                    padding: 18px 22px;
                    margin-bottom: 25px;
                }

                .avatar {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg,#3b82f6,#22c55e);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    color: white;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.4);
                }

                .title {
                    color: #fff;
                    font-weight: 700;
                }

                .subtitle {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.9rem;
                }

                .form-card {
                    padding: 25px;
                }

                .form-control {
                    background: rgba(255,255,255,0.05) !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                    color: #fff !important;
                    border-radius: 12px;
                    padding: 10px 14px;
                }

                .form-control:focus {
                    box-shadow: 0 0 0 3px rgba(59,130,246,0.25);
                    border-color: #3b82f6 !important;
                }

                label {
                    color: rgba(255,255,255,0.7);
                    font-size: 0.85rem;
                    margin-bottom: 6px;
                }

                .btn-glow {
                    background: linear-gradient(135deg,#3b82f6,#22c55e);
                    border: none;
                    color: white;
                    font-weight: 600;
                    padding: 10px;
                    border-radius: 12px;
                    transition: 0.3s;
                }

                .btn-glow:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(59,130,246,0.3);
                }

            `}</style>

            <div className="page">

                <div className="container">

                    {/* HEADER */}
                    <div className="glass header-box d-flex justify-content-between align-items-center flex-wrap">

                        <div className="d-flex align-items-center gap-3">

                            <div className="avatar">
                                <i className="fa-solid fa-user-graduate"></i>
                            </div>

                            <div>
                                <h4 className="title mb-1">My Profile</h4>
                                <div className="subtitle">
                                    View and update your personal information
                                </div>
                            </div>

                        </div>

                        <div className="subtitle mt-2 mt-md-0">
                            Welcome <b>{studentUser?.full_name}</b>
                        </div>

                    </div>

                    {/* FORM */}
                    <div className="row justify-content-center">

                        <div className="col-md-7">

                            <div className="glass form-card">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">
                                        <label>Student ID</label>
                                        <input
                                            className="form-control"
                                            name="student_id"
                                            value={profile.student_id}
                                            readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Full Name</label>
                                        <input
                                            className="form-control"
                                            name="full_name"
                                            value={profile.full_name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Email</label>
                                        <input
                                            className="form-control"
                                            name="email"
                                            value={profile.email}
                                            readOnly
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label>Mobile</label>
                                        <input
                                            className="form-control"
                                            name="mobile"
                                            value={profile.mobile}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-glow w-100"
                                        disabled={saving}
                                    >
                                        {saving ? "Saving..." : "Save Changes"}
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default StudentProfile;