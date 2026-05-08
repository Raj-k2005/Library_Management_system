import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

    const [name, setName] = useState("");
    const [status, setStatus] = useState("1");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {

        if (!adminUser) {

            navigate('/admin/login');

        } else {

            fetchCategories();
        }

    }, []);

    const fetchCategories = async () => {

        try {

            const res = await axios.get(
                "http://127.0.0.1:8000/api/categories/"
            );

            setCategories(res.data);

        } catch (err) {

            const message =
                err?.response?.data?.message ||
                "Something went wrong";

            toast.error(message);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const res = await axios.post(
                "http://127.0.0.1:8000/api/categories/add/",
                { name, status }
            );

            if (res.data.success) {

                toast.success(
                    res.data.message || "Category created"
                );

                setName("");
                setStatus("1");

                fetchCategories();

            } else {

                toast.error(
                    res.data.message || "Failed to Create Category"
                );
            }

        } catch (err) {

            toast.error("Not Created");

        } finally {

            setLoading(false);
        }
    };

    return (
        <>
            <style>{`

                /* ───────── PAGE ───────── */

                .category-page{
                    min-height:100vh;
                    background:
                        radial-gradient(circle at 20% 20%, rgba(79,70,229,0.18), transparent 30%),
                        radial-gradient(circle at 80% 70%, rgba(14,165,233,0.14), transparent 30%),
                        linear-gradient(160deg,#0a0f2c 0%, #0d1b3e 50%, #091426 100%);
                    padding:40px 20px;
                    position:relative;
                    overflow:hidden;
                }

                .category-page::before{
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

                /* ───────── HEADER ───────── */

                .category-header{
                    text-align:center;
                    margin-bottom:2rem;
                    position:relative;
                }

                .category-title{
                    color:#e2eaf8;
                    font-weight:700;
                    margin-bottom:0.3rem;
                }

                .category-subtitle{
                    color:rgba(148,197,255,0.65);
                    font-size:0.9rem;
                    margin-bottom:0;
                }

                /* ───────── GLASS CARD ───────── */

                .glass-card{
                    background:rgba(15,23,50,0.58);
                    backdrop-filter:blur(24px) saturate(180%);
                    -webkit-backdrop-filter:blur(24px) saturate(180%);
                    border:1px solid rgba(99,179,237,0.14);
                    border-radius:22px;
                    box-shadow:
                        0 20px 50px rgba(0,0,0,0.35),
                        inset 0 1px 0 rgba(255,255,255,0.04);
                    overflow:hidden;
                    position:relative;
                    height:100%;
                }

                .glass-card::before{
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

                /* ───────── FORM ───────── */

                .glass-label{
                    color:rgba(182,212,248,0.82);
                    font-size:0.82rem;
                    font-weight:600;
                    margin-bottom:0.45rem;
                    text-transform:uppercase;
                    letter-spacing:0.04em;
                }

                .glass-input{
                    background:rgba(255,255,255,0.05)!important;
                    border:1px solid rgba(99,179,237,0.18)!important;
                    border-radius:12px!important;
                    color:#e2eaf8!important;
                    padding:0.75rem 1rem!important;
                    transition:all 0.2s ease;
                }

                .glass-input::placeholder{
                    color:rgba(148,197,255,0.35)!important;
                }

                .glass-input:focus{
                    background:rgba(255,255,255,0.08)!important;
                    border-color:rgba(99,179,237,0.45)!important;
                    box-shadow:0 0 0 3px rgba(59,130,246,0.12)!important;
                    color:#fff!important;
                }

                /* ───────── RADIO ───────── */

                .glass-radio{
                    background:rgba(255,255,255,0.04);
                    border:1px solid rgba(99,179,237,0.12);
                    padding:0.75rem 1rem;
                    border-radius:14px;
                    color:#dbeafe;
                    display:flex;
                    align-items:center;
                    gap:0.5rem;
                }

                .form-check-input{
                    cursor:pointer;
                }

                .form-check-label{
                    cursor:pointer;
                }

                /* ───────── BUTTON ───────── */

                .glass-btn{
                    background:linear-gradient(135deg,#4f46e5,#0ea5e9)!important;
                    border:none!important;
                    border-radius:12px!important;
                    color:#fff!important;
                    padding:0.8rem 1rem!important;
                    font-weight:600;
                    box-shadow:0 6px 22px rgba(79,70,229,0.35);
                    transition:all 0.25s ease;
                }

                .glass-btn:hover{
                    transform:translateY(-2px);
                    opacity:0.94;
                }

                /* ───────── TABLE ───────── */

                .glass-table{
                    color:#e2eaf8;
                    margin-bottom:0;
                }

                .glass-table thead{
                    background:rgba(255,255,255,0.04);
                }

                .glass-table thead th{
                    color:#93c5fd;
                    font-size:0.8rem;
                    font-weight:600;
                    text-transform:uppercase;
                    border-bottom:1px solid rgba(99,179,237,0.12);
                    padding:1rem;
                    white-space:nowrap;
                }

                .glass-table tbody tr{
                    transition:all 0.2s ease;
                }

                .glass-table tbody tr:hover{
                    background:rgba(255,255,255,0.03);
                }

                .glass-table td{
                    border-color:rgba(99,179,237,0.08);
                    padding:1rem;
                    vertical-align:middle;
                    color:#dbeafe;
                    white-space:nowrap;
                }

                /* ───────── BADGES ───────── */

                .active-badge{
                    background:rgba(16,185,129,0.15);
                    color:#4ade80;
                    border:1px solid rgba(16,185,129,0.25);
                    padding:0.4rem 0.8rem;
                    border-radius:999px;
                    font-size:0.75rem;
                    font-weight:600;
                }

                .inactive-badge{
                    background:rgba(239,68,68,0.15);
                    color:#f87171;
                    border:1px solid rgba(239,68,68,0.25);
                    padding:0.4rem 0.8rem;
                    border-radius:999px;
                    font-size:0.75rem;
                    font-weight:600;
                }

                /* ───────── EMPTY ───────── */

                .empty-text{
                    color:rgba(148,197,255,0.65);
                    text-align:center;
                    padding:2rem;
                }

                .section-title{
                    color:#e2eaf8;
                    font-weight:600;
                }

            `}</style>

            <div className="category-page">

                <div className="container position-relative">

                    {/* Header */}

                    <div className="category-header">

                        {/* Top Right Button */}

                        <div
                            className="position-absolute"
                            style={{ top: "0", right: "0" }}
                        >
                            <button
                                className="btn glass-btn"
                                onClick={() =>
                                    navigate('/admin/category_manage')
                                }
                                style={{
                                    padding: '0.6rem 1rem',
                                    fontSize: '0.85rem'
                                }}
                            >
                                <i className="fa-solid fa-gear me-2"></i>
                                Manage Categories
                            </button>
                        </div>

                        <h3 className="category-title">
                            <i className="fa-solid fa-layer-group me-2 text-info"></i>
                            Insert Category
                        </h3>

                        <p className="category-subtitle">
                            Create book categories and manage their status
                        </p>

                    </div>

                    <div className="row g-4">

                        {/* Form */}

                        <div className="col-md-5">

                            <div className="glass-card">

                                <div className="card-body p-4">

                                    <form onSubmit={handleSubmit}>

                                        <div className="mb-4">

                                            <label className="glass-label">
                                                Category Name
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control glass-input"
                                                placeholder="e.g. Novel, Literature, Biography"
                                                required
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />

                                        </div>

                                        <div className="mb-4">

                                            <label className="glass-label d-block">
                                                Status
                                            </label>

                                            <div className="d-flex gap-3 flex-wrap">

                                                <div className="glass-radio">

                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        value="1"
                                                        checked={status === "1"}
                                                        onChange={(e) =>
                                                            setStatus(e.target.value)
                                                        }
                                                        id="status-active"
                                                        name="status"
                                                    />

                                                    <label
                                                        className="form-check-label small"
                                                        htmlFor="status-active"
                                                    >
                                                        Active
                                                    </label>

                                                </div>

                                                <div className="glass-radio">

                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        value="0"
                                                        checked={status === "0"}
                                                        onChange={(e) =>
                                                            setStatus(e.target.value)
                                                        }
                                                        id="status-inactive"
                                                        name="status"
                                                    />

                                                    <label
                                                        className="form-check-label small"
                                                        htmlFor="status-inactive"
                                                    >
                                                        Inactive
                                                    </label>

                                                </div>

                                            </div>

                                        </div>

                                        <button
                                            type="submit"
                                            className="btn glass-btn w-100"
                                            disabled={loading}
                                        >

                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fa-solid fa-plus me-2"></i>
                                                    Create One
                                                </>
                                            )}

                                        </button>

                                    </form>

                                </div>

                            </div>

                        </div>

                        {/* Categories Table */}

                        <div className="col-md-7">

                            <div className="glass-card">

                                <div className="card-body p-4">

                                    <h5 className="section-title mb-4">
                                        Existing Categories
                                    </h5>

                                    {categories.length === 0 ? (

                                        <p className="empty-text">
                                            No Categories Created Yet
                                        </p>

                                    ) : (

                                        <div className="table-responsive">

                                            <table className="table glass-table">

                                                <thead>

                                                    <tr>
                                                        <th>SI/No</th>
                                                        <th>Name</th>
                                                        <th>Status</th>
                                                        <th>Created</th>
                                                    </tr>

                                                </thead>

                                                <tbody>

                                                    {categories.map((cat, index) => (

                                                        <tr key={cat.id}>

                                                            <td>{index + 1}</td>

                                                            <td>{cat.name}</td>

                                                            <td>

                                                                {cat.is_active ? (

                                                                    <span className="active-badge">
                                                                        Active
                                                                    </span>

                                                                ) : (

                                                                    <span className="inactive-badge">
                                                                        Inactive
                                                                    </span>

                                                                )}

                                                            </td>

                                                            <td>
                                                                {new Date(
                                                                    cat.created_at
                                                                ).toLocaleDateString()}
                                                            </td>

                                                        </tr>

                                                    ))}

                                                </tbody>

                                            </table>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default AddCategory;