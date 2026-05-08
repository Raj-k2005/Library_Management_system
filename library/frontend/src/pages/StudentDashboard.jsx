import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {

    const [stats, setStats] = useState({
        total_books: 0,
        total_issued: 0,
        not_returned: 0
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const studentUser = JSON.parse(localStorage.getItem('studentUser'));

    useEffect(() => {

        if (!studentUser) {
            navigate('/user/login');
            return;
        }

        const fetchStats = async () => {

            try {

                setLoading(true);

                const res = await axios.get(
                    "http://127.0.0.1:8000/api/user_stats/",
                    {
                        params: {
                            student_id: studentUser.student_id
                        }
                    }
                );

                setStats(res.data.stats);

            } catch (err) {

                console.error("Error fetching dashboard data:", err);
                toast.error("Failed to fetch Stats");

            } finally {

                setLoading(false);
            }
        };

        fetchStats();

    }, []);

    const total = 
        stats.total_books +
        stats.total_issued +
        stats.not_returned;

    const booksPercent =
        total > 0
            ? (stats.total_books / total) * 100
            : 0;

    const issuedPercent =
        total > 0
            ? (stats.total_issued / total) * 100
            : 0;

    const borrowedPercent =
        total > 0
            ? (stats.not_returned / total) * 100
            : 0;

    return (
        <>
            <style>{`

                .student-dashboard-page{
                    min-height:100vh;
                    padding:40px 20px;
                    background:
                        radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 28%),
                        radial-gradient(circle at bottom right, rgba(16,185,129,0.15), transparent 28%),
                        linear-gradient(135deg,#071028 0%, #0f172a 50%, #111827 100%);
                    position:relative;
                    overflow:hidden;
                }

                .student-dashboard-page::before{
                    content:'';
                    position:absolute;
                    inset:0;
                    background-image:
                        radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.12), transparent),
                        radial-gradient(2px 2px at 80% 20%, rgba(255,255,255,0.08), transparent),
                        radial-gradient(2px 2px at 60% 70%, rgba(255,255,255,0.08), transparent);
                    pointer-events:none;
                }

                .student-glass-header{
                    background:rgba(15,23,42,0.65);
                    backdrop-filter:blur(22px);
                    -webkit-backdrop-filter:blur(22px);
                    border:1px solid rgba(255,255,255,0.08);
                    border-radius:24px;
                    padding:1.5rem 2rem;
                    margin-bottom:2rem;
                    box-shadow:0 10px 40px rgba(0,0,0,0.35);
                }

                .student-title{
                    color:#ffffff;
                    font-weight:700;
                    margin-bottom:0.2rem;
                }

                .student-subtitle{
                    color:rgba(255,255,255,0.6);
                    margin-bottom:0;
                    font-size:0.92rem;
                }

                .student-badge{
                    padding:0.7rem 1rem;
                    border-radius:999px;
                    background:rgba(59,130,246,0.15);
                    color:#dbeafe;
                    border:1px solid rgba(96,165,250,0.2);
                    font-size:0.9rem;
                    font-weight:600;
                }

                .dashboard-card{
                    background:rgba(15,23,42,0.65);
                    backdrop-filter:blur(22px);
                    -webkit-backdrop-filter:blur(22px);
                    border:1px solid rgba(255,255,255,0.08);
                    border-radius:24px;
                    padding:1.5rem;
                    box-shadow:0 10px 35px rgba(0,0,0,0.3);
                    transition:all 0.3s ease;
                    height:100%;
                    position:relative;
                    overflow:hidden;
                }

                .dashboard-card:hover{
                    transform:translateY(-5px);
                    box-shadow:0 20px 40px rgba(59,130,246,0.18);
                }

                .dashboard-card::before{
                    content:'';
                    position:absolute;
                    top:0;
                    left:15%;
                    right:15%;
                    height:2px;
                    background:linear-gradient(
                        90deg,
                        transparent,
                        rgba(96,165,250,0.7),
                        transparent
                    );
                }

                .card-label{
                    color:rgba(255,255,255,0.65);
                    text-transform:uppercase;
                    letter-spacing:1px;
                    font-size:0.78rem;
                    font-weight:600;
                    margin-bottom:0.4rem;
                }

                .card-value{
                    color:#ffffff;
                    font-size:2.2rem;
                    font-weight:700;
                    margin-bottom:0.8rem;
                }

                .card-desc{
                    color:rgba(255,255,255,0.65);
                    font-size:0.9rem;
                    margin-bottom:1rem;
                }

                .chart-wrapper{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    margin:1rem 0;
                }

                .pie-chart{
                    width:140px;
                    height:140px;
                    border-radius:50%;
                    position:relative;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                }

                .pie-chart::after{
                    content:'';
                    position:absolute;
                    width:78px;
                    height:78px;
                    border-radius:50%;
                    background:#0f172a;
                }

                .pie-center{
                    position:relative;
                    z-index:2;
                    color:#fff;
                    font-weight:700;
                    font-size:1.1rem;
                }

                .bar-chart{
                    display:flex;
                    align-items:flex-end;
                    justify-content:center;
                    gap:18px;
                    height:180px;
                    padding-top:20px;
                }

                .bar{
                    width:55px;
                    border-radius:14px 14px 6px 6px;
                    position:relative;
                    transition:0.3s;
                }

                .bar:hover{
                    transform:scaleY(1.05);
                }

                .bar-value{
                    position:absolute;
                    top:-28px;
                    width:100%;
                    text-align:center;
                    color:#fff;
                    font-weight:700;
                    font-size:0.85rem;
                }

                .bar-label{
                    text-align:center;
                    margin-top:10px;
                    color:rgba(255,255,255,0.7);
                    font-size:0.82rem;
                }

                .line-chart{
                    position:relative;
                    height:180px;
                    margin-top:1rem;
                }

                .line-svg{
                    width:100%;
                    height:180px;
                }

                .chart-link{
                    text-decoration:none;
                    color:#60a5fa;
                    font-weight:600;
                    transition:0.3s;
                }

                .chart-link:hover{
                    color:#93c5fd;
                }

                .loader-box{
                    background:rgba(15,23,42,0.65);
                    border-radius:24px;
                    padding:3rem;
                    text-align:center;
                    border:1px solid rgba(255,255,255,0.08);
                }

            `}</style>

            <div className="student-dashboard-page">

                <div className="container position-relative">

                    {/* Header */}

                    <div className="student-glass-header">

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                            <div>

                                <h3 className="student-title">
                                    <i className="fa-solid fa-user-graduate me-2 text-info"></i>
                                    Student Dashboard
                                </h3>

                                <p className="student-subtitle">
                                    Track your library activity and borrowed books
                                </p>

                            </div>

                            <div className="student-badge">
                                Welcome {studentUser?.full_name || 'Student'}
                            </div>

                        </div>

                    </div>

                    {/* Loader */}

                    {loading && (

                        <div className="loader-box">

                            <div className="spinner-border text-info"></div>

                            <p className="text-light mt-3 mb-0">
                                Loading Dashboard...
                            </p>

                        </div>

                    )}

                    {/* Cards */}

                    {!loading && (

                        <div className="row g-4">

                            {/* Pie Chart Card */}

                            <div className="col-lg-4">

                                <div className="dashboard-card">

                                    <p className="card-label">
                                        Total Library Books
                                    </p>

                                    <h2 className="card-value">
                                        {stats.total_books}
                                    </h2>

                                    <div className="chart-wrapper">

                                        <div
                                            className="pie-chart"
                                            style={{
                                                background: `
                                                    conic-gradient(
                                                        #3b82f6 0% ${booksPercent}%,
                                                        #1e293b ${booksPercent}% 100%
                                                    )
                                                `
                                            }}
                                        >
                                            <div className="pie-center">
                                                {Math.round(booksPercent)}%
                                            </div>

                                        </div>

                                    </div>

                                    <p className="card-desc">
                                        Overall available books inside the library system
                                    </p>

                                    <Link
                                        to="/user/books"
                                        className="chart-link"
                                    >
                                        View All Books
                                        <i className="fa-solid fa-arrow-right ms-2"></i>
                                    </Link>

                                </div>

                            </div>

                            {/* Bar Chart Card */}

                            <div className="col-lg-4">

                                <div className="dashboard-card">

                                    <p className="card-label">
                                        Borrowed Books
                                    </p>

                                    <h2 className="card-value">
                                        {stats.not_returned}
                                    </h2>

                                    <div className="bar-chart">

                                        <div>

                                            <div
                                                className="bar"
                                                style={{
                                                    height: `${Math.max(
                                                        borrowedPercent * 1.5,
                                                        40
                                                    )}px`,
                                                    background:
                                                        'linear-gradient(180deg,#10b981,#059669)'
                                                }}
                                            >
                                                <div className="bar-value">
                                                    {stats.not_returned}
                                                </div>

                                            </div>

                                            <div className="bar-label">
                                                Borrowed
                                            </div>

                                        </div>

                                        <div>

                                            <div
                                                className="bar"
                                                style={{
                                                    height: `${Math.max(
                                                        issuedPercent * 1.5,
                                                        50
                                                    )}px`,
                                                    background:
                                                        'linear-gradient(180deg,#f59e0b,#d97706)'
                                                }}
                                            >
                                                <div className="bar-value">
                                                    {stats.total_issued}
                                                </div>

                                            </div>

                                            <div className="bar-label">
                                                Issued
                                            </div>

                                        </div>

                                    </div>

                                    <p className="card-desc">
                                        Books currently borrowed and pending return
                                    </p>

                                </div>

                            </div>

                            {/* Line Chart Card */}

                            <div className="col-lg-4">

                                <div className="dashboard-card">

                                    <p className="card-label">
                                        Total Issued Books
                                    </p>

                                    <h2 className="card-value">
                                        {stats.total_issued}
                                    </h2>

                                    <div className="line-chart">

                                        <svg
                                            className="line-svg"
                                            viewBox="0 0 300 180"
                                            preserveAspectRatio="none"
                                        >

                                            <defs>

                                                <linearGradient
                                                    id="lineGradient"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >

                                                    <stop
                                                        offset="0%"
                                                        stopColor="#3b82f6"
                                                        stopOpacity="1"
                                                    />

                                                    <stop
                                                        offset="100%"
                                                        stopColor="#06b6d4"
                                                        stopOpacity="0.2"
                                                    />

                                                </linearGradient>

                                            </defs>

                                            <path
                                                d="M0 150 Q60 110 120 120 T240 70 T300 40"
                                                fill="none"
                                                stroke="#60a5fa"
                                                strokeWidth="5"
                                                strokeLinecap="round"
                                            />

                                            <path
                                                d="M0 150 Q60 110 120 120 T240 70 T300 40 L300 180 L0 180 Z"
                                                fill="url(#lineGradient)"
                                            />

                                            <circle
                                                cx="300"
                                                cy="40"
                                                r="7"
                                                fill="#60a5fa"
                                            />

                                        </svg>

                                    </div>

                                    <p className="card-desc">
                                        Complete history of all books issued to you
                                    </p>

                                    <Link
                                        to="/user/issued-books"
                                        className="chart-link"
                                    >
                                        View Issued Books
                                        <i className="fa-solid fa-arrow-right ms-2"></i>
                                    </Link>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>
        </>
    );
};

export default StudentDashboard;