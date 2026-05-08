import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

    const adminUser = localStorage.getItem("adminUser");

    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!adminUser) {

            navigate('/admin/login');

        } else {

            fetchStats();
        }

    }, []);

    const fetchStats = async () => {

        setLoading(true);

        try {

            const res = await axios.get(
                "http://127.0.0.1:8000/api/admin/stats/"
            );

            setStats(res.data);

        } catch (err) {

            const message =
                err?.response?.data?.message ||
                "Failed to load statistics";

            toast.error(message);

        } finally {

            setLoading(false);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <style>{`

                .admin-dashboard-page{
                    min-height:100vh;
                    background:
                        radial-gradient(circle at 20% 20%, rgba(79,70,229,0.18), transparent 30%),
                        radial-gradient(circle at 80% 70%, rgba(14,165,233,0.14), transparent 30%),
                        linear-gradient(160deg,#0a0f2c 0%, #0d1b3e 50%, #091426 100%);
                    padding:40px 20px;
                    position:relative;
                    overflow:hidden;
                }

                .admin-dashboard-page::before{
                    content:'';
                    position:absolute;
                    inset:0;
                    background-image:
                        radial-gradient(2px 2px at 20% 30%, rgba(147,197,253,0.20), transparent),
                        radial-gradient(2px 2px at 80% 20%, rgba(147,197,253,0.18), transparent),
                        radial-gradient(2px 2px at 60% 80%, rgba(147,197,253,0.16), transparent),
                        radial-gradient(2px 2px at 35% 70%, rgba(147,197,253,0.14), transparent);
                    pointer-events:none;
                }

                .dashboard-header{
                    background:rgba(15,23,50,0.58);
                    backdrop-filter:blur(24px) saturate(180%);
                    -webkit-backdrop-filter:blur(24px) saturate(180%);
                    border:1px solid rgba(99,179,237,0.14);
                    border-radius:22px;
                    padding:1.5rem 2rem;
                    margin-bottom:2rem;
                    box-shadow:
                        0 20px 50px rgba(0,0,0,0.35),
                        inset 0 1px 0 rgba(255,255,255,0.04);
                    position:relative;
                    overflow:hidden;
                }

                .dashboard-header::before{
                    content:'';
                    position:absolute;
                    top:0;
                    left:10%;
                    right:10%;
                    height:2px;
                    background:linear-gradient(
                        90deg,
                        transparent,
                        rgba(14,165,233,0.7),
                        rgba(79,70,229,0.7),
                        transparent
                    );
                }

                .dashboard-title{
                    color:#e2eaf8;
                    font-weight:700;
                    margin-bottom:0.3rem;
                }

                .dashboard-subtitle{
                    color:rgba(148,197,255,0.65);
                    margin-bottom:0;
                    font-size:0.9rem;
                }

                .admin-badge{
                    background:linear-gradient(
                        135deg,
                        rgba(79,70,229,0.22),
                        rgba(14,165,233,0.22)
                    );
                    border:1px solid rgba(99,179,237,0.18);
                    color:#dbeafe;
                    padding:0.7rem 1rem;
                    border-radius:999px;
                    font-size:0.88rem;
                    font-weight:600;
                    backdrop-filter:blur(10px);
                }

                .glass-stat-card{
                    background:rgba(15,23,50,0.58);
                    backdrop-filter:blur(22px) saturate(180%);
                    -webkit-backdrop-filter:blur(22px) saturate(180%);
                    border:1px solid rgba(99,179,237,0.14);
                    border-radius:20px;
                    padding:1.5rem;
                    height:100%;
                    box-shadow:
                        0 12px 35px rgba(0,0,0,0.28),
                        inset 0 1px 0 rgba(255,255,255,0.04);
                    transition:all 0.3s ease;
                    position:relative;
                    overflow:hidden;
                    cursor:pointer;
                }

                .glass-stat-card::before{
                    content:'';
                    position:absolute;
                    top:0;
                    left:15%;
                    right:15%;
                    height:1.5px;
                    background:linear-gradient(
                        90deg,
                        transparent,
                        rgba(99,179,237,0.55),
                        transparent
                    );
                }

                .glass-stat-card:hover{
                    transform:translateY(-6px) scale(1.015);
                    box-shadow:
                        0 18px 45px rgba(14,165,233,0.14),
                        inset 0 1px 0 rgba(255,255,255,0.05);
                }

                .stat-label{
                    color:rgba(148,197,255,0.68);
                    font-size:0.78rem;
                    font-weight:600;
                    text-transform:uppercase;
                    letter-spacing:0.05em;
                    margin-bottom:0.35rem;
                }

                .stat-value{
                    color:#ffffff;
                    font-size:2.2rem;
                    font-weight:700;
                    margin-bottom:0.35rem;
                }

                .stat-desc{
                    color:rgba(203,213,225,0.72);
                    font-size:0.84rem;
                    margin-bottom:0;
                }

                .glass-loader{
                    background:rgba(15,23,50,0.58);
                    border:1px solid rgba(99,179,237,0.14);
                    border-radius:20px;
                    padding:3rem;
                    backdrop-filter:blur(18px);
                }

                .progress{
                    overflow:hidden;
                    border-radius:999px;
                }

                .progress-bar{
                    transition:width 0.5s ease;
                }

                .glass-stat-card:hover .progress-bar{
                    filter:brightness(1.1);
                }

                .circle-chart{
                    width:90px;
                    height:90px;
                    border-radius:50%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    flex-shrink:0;
                    box-shadow:0 0 20px rgba(255,255,255,0.08);
                }

                .circle-inner{
                    width:68px;
                    height:68px;
                    border-radius:50%;
                    background:#0f172a;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:#fff;
                    font-weight:700;
                    font-size:0.9rem;
                }

                @media(max-width:768px){

                    .dashboard-header{
                        padding:1.2rem;
                    }

                    .stat-value{
                        font-size:1.8rem;
                    }

                    .circle-chart{
                        width:75px;
                        height:75px;
                    }

                    .circle-inner{
                        width:56px;
                        height:56px;
                        font-size:0.75rem;
                    }

                }

            `}</style>

            <div className="admin-dashboard-page">

                <div className="container position-relative">

                    {/* Header */}

                    <div className="dashboard-header">

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                            <div>

                                <h3 className="dashboard-title">
                                    <i className="fa-solid fa-gauge-high me-2 text-info"></i>
                                    Admin Dashboard
                                </h3>

                                <p className="dashboard-subtitle">
                                    Manage students, books, issues, and library analytics
                                </p>

                            </div>

                            <div className="admin-badge">
                                <i className="fa-solid fa-shield-halved me-2"></i>
                                Admin Panel
                            </div>

                        </div>

                    </div>

                    {/* Loader */}

                    {loading && (

                        <div className="glass-loader text-center">

                            <div
                                className="spinner-border text-info"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>

                            </div>

                        </div>

                    )}

                    {/* Cards */}

                    {!loading && stats && (

                        <div className="row g-4">

                            {/* Students */}

                            <div className="col-md-4">

                                <div
                                    className="glass-stat-card"
                                    onClick={() =>
                                        handleNavigate('/admin/manage_students')
                                    }
                                >

                                    <div className="d-flex justify-content-between align-items-start">

                                        <div className="w-100 me-3">

                                            <p className="stat-label">
                                                Total Students
                                            </p>

                                            <h2 className="stat-value">
                                                {stats.total_students}
                                            </h2>

                                            <div className="mt-3">

                                                <div className="d-flex justify-content-between small mb-1">
                                                    <span className="text-success">
                                                        Active
                                                    </span>

                                                    <span className="text-success fw-bold">
                                                        {stats.active_students}
                                                    </span>
                                                </div>

                                                <div
                                                    className="progress bg-dark bg-opacity-25"
                                                    style={{ height:'8px' }}
                                                >
                                                    <div
                                                        className="progress-bar bg-success"
                                                        style={{
                                                            width: `${(stats.active_students / stats.total_students) * 100}%`
                                                        }}
                                                    ></div>
                                                </div>

                                            </div>

                                            <div className="mt-3">

                                                <div className="d-flex justify-content-between small mb-1">
                                                    <span className="text-danger">
                                                        Blocked
                                                    </span>

                                                    <span className="text-danger fw-bold">
                                                        {stats.blocked_students}
                                                    </span>
                                                </div>

                                                <div
                                                    className="progress bg-dark bg-opacity-25"
                                                    style={{ height:'8px' }}
                                                >
                                                    <div
                                                        className="progress-bar bg-danger"
                                                        style={{
                                                            width: `${(stats.blocked_students / stats.total_students) * 100}%`
                                                        }}
                                                    ></div>
                                                </div>

                                            </div>

                                        </div>

                                        <div
                                            className="circle-chart"
                                            style={{
                                                background: `conic-gradient(
                                                    #22c55e 0% ${(stats.active_students / stats.total_students) * 100}%,
                                                    #ef4444 ${(stats.active_students / stats.total_students) * 100}% 100%
                                                )`
                                            }}
                                        >

                                            <div className="circle-inner">
                                                {Math.round(
                                                    (stats.active_students / stats.total_students) * 100
                                                )}%
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Books */}

                            <div className="col-md-4">

                                <div
                                    className="glass-stat-card"
                                    onClick={() =>
                                        handleNavigate('/admin/book_manage')
                                    }
                                >

                                    <div className="d-flex justify-content-between align-items-start">

                                        <div className="w-100 me-3">

                                            <p className="stat-label">
                                                Total Books
                                            </p>

                                            <h2 className="stat-value">
                                                {stats.total_books}
                                            </h2>

                                            <div className="mt-3">

                                                <div className="d-flex justify-content-between small mb-1">
                                                    <span className="text-success">
                                                        Available
                                                    </span>

                                                    <span className="text-success fw-bold">
                                                        {stats.available_books}
                                                    </span>
                                                </div>

                                                <div
                                                    className="progress bg-dark bg-opacity-25"
                                                    style={{ height:'8px' }}
                                                >
                                                    <div
                                                        className="progress-bar bg-success"
                                                        style={{
                                                            width: `${(stats.available_books / stats.total_books) * 100}%`
                                                        }}
                                                    ></div>
                                                </div>

                                            </div>

                                            <div className="mt-3">

                                                <div className="d-flex justify-content-between small mb-1">
                                                    <span className="text-danger">
                                                        Out Of Stock
                                                    </span>

                                                    <span className="text-danger fw-bold">
                                                        {stats.out_of_stock_books}
                                                    </span>
                                                </div>

                                                <div
                                                    className="progress bg-dark bg-opacity-25"
                                                    style={{ height:'8px' }}
                                                >
                                                    <div
                                                        className="progress-bar bg-danger"
                                                        style={{
                                                            width: `${(stats.out_of_stock_books / stats.total_books) * 100}%`
                                                        }}
                                                    ></div>
                                                </div>

                                            </div>

                                        </div>

                                        <div
                                            className="circle-chart"
                                            style={{
                                                background: `conic-gradient(
                                                    #22c55e 0% ${(stats.available_books / stats.total_books) * 100}%,
                                                    #ef4444 ${(stats.available_books / stats.total_books) * 100}% 100%
                                                )`
                                            }}
                                        >

                                            <div className="circle-inner">
                                                {Math.round(
                                                    (stats.available_books / stats.total_books) * 100
                                                )}%
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Issues */}

                            <div className="col-md-4">

                                <div
                                    className="glass-stat-card"
                                    onClick={() =>
                                        handleNavigate('/admin/manage-issued-books')
                                    }
                                >

                                    <div className="d-flex justify-content-between align-items-start">

                                        <div className="w-100 me-3">

                                            <p className="stat-label">
                                                Issue Records
                                            </p>

                                            <h2 className="stat-value">
                                                {stats.total_issued}
                                            </h2>

                                            <div className="mt-3">

                                                <div className="d-flex justify-content-between small mb-1">
                                                    <span className="text-info">
                                                        Issued
                                                    </span>

                                                    <span className="text-info fw-bold">
                                                        {stats.currently_issued}
                                                    </span>
                                                </div>

                                                <div
                                                    className="progress bg-dark bg-opacity-25"
                                                    style={{ height:'8px' }}
                                                >
                                                    <div
                                                        className="progress-bar bg-info"
                                                        style={{
                                                            width: `${(stats.currently_issued / stats.total_issued) * 100}%`
                                                        }}
                                                    ></div>
                                                </div>

                                            </div>

                                            <div className="mt-3">

                                                <div className="d-flex justify-content-between small mb-1">
                                                    <span className="text-warning">
                                                        Returned
                                                    </span>

                                                    <span className="text-warning fw-bold">
                                                        {stats.returned_books}
                                                    </span>
                                                </div>

                                                <div
                                                    className="progress bg-dark bg-opacity-25"
                                                    style={{ height:'8px' }}
                                                >
                                                    <div
                                                        className="progress-bar bg-warning"
                                                        style={{
                                                            width: `${(stats.returned_books / stats.total_issued) * 100}%`
                                                        }}
                                                    ></div>
                                                </div>

                                            </div>

                                        </div>

                                        <div
                                            className="circle-chart"
                                            style={{
                                                background: `conic-gradient(
                                                    #06b6d4 0% ${(stats.currently_issued / stats.total_issued) * 100}%,
                                                    #f59e0b ${(stats.currently_issued / stats.total_issued) * 100}% 100%
                                                )`
                                            }}
                                        >

                                            <div className="circle-inner">
                                                {Math.round(
                                                    (stats.currently_issued / stats.total_issued) * 100
                                                )}%
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Categories */}

                            <div className="col-md-6">

                                <div
                                    className="glass-stat-card"
                                    onClick={() =>
                                        handleNavigate('/admin/category_manage')
                                    }
                                >

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <p className="stat-label">
                                                Categories
                                            </p>

                                            <h2 className="stat-value">
                                                {stats.total_categories}
                                            </h2>

                                            <p className="stat-desc">
                                                Different genres and academic subjects available
                                            </p>

                                            <div className="mt-4">
                                                <div
                                                    className="progress"
                                                    style={{
                                                        height:'10px',
                                                        background:'rgba(255,255,255,0.08)'
                                                    }}
                                                >
                                                    <div
                                                        className="progress-bar"
                                                        style={{
                                                            width:'85%',
                                                            background:'linear-gradient(90deg,#9333ea,#c084fc)'
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>

                                        </div>

                                        <div
                                            style={{
                                                width:'90px',
                                                height:'90px',
                                                borderRadius:'24px',
                                                background:'linear-gradient(135deg,#9333ea,#c084fc)',
                                                display:'flex',
                                                alignItems:'center',
                                                justifyContent:'center',
                                                boxShadow:'0 0 30px rgba(168,85,247,0.45)'
                                            }}
                                        >
                                            <i className="fa-solid fa-layer-group text-white fs-2"></i>
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Authors */}

                            <div className="col-md-6">

                                <div
                                    className="glass-stat-card"
                                    onClick={() =>
                                        handleNavigate('/admin/manage_author')
                                    }
                                >

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <p className="stat-label">
                                                Authors
                                            </p>

                                            <h2 className="stat-value">
                                                {stats.total_authors}
                                            </h2>

                                            <p className="stat-desc">
                                                Global collection of authors in the library system
                                            </p>

                                            <div className="mt-4 d-flex align-items-end gap-1">

                                                {[40,70,55,90,60,85,50].map((h,index)=>(
                                                    <div
                                                        key={index}
                                                        style={{
                                                            width:'10px',
                                                            height:`${h}px`,
                                                            borderRadius:'20px',
                                                            background:'linear-gradient(to top,#f59e0b,#fde68a)',
                                                            opacity:'0.9'
                                                        }}
                                                    ></div>
                                                ))}

                                            </div>

                                        </div>

                                        <div
                                            style={{
                                                width:'90px',
                                                height:'90px',
                                                borderRadius:'24px',
                                                background:'linear-gradient(135deg,#f59e0b,#fde68a)',
                                                display:'flex',
                                                alignItems:'center',
                                                justifyContent:'center',
                                                boxShadow:'0 0 30px rgba(245,158,11,0.45)'
                                            }}
                                        >
                                            <i className="fa-solid fa-feather text-dark fs-2"></i>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>
        </>
    );
};

export default AdminDashboard;