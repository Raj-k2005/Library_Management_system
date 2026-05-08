import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ManageCategories = () => {

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editStatus, setEditStatus] = useState("1");

    const [categories, setCategories] = useState([]);

    const [loadingList, setLoadingList] = useState(false);
    const [saving, setSaving] = useState(false);

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

        setLoadingList(true);

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

        } finally {

            setLoadingList(false);
        }
    };

    const startEdit = (cat) => {

        setEditId(cat.id);
        setEditName(cat.name);
        setEditStatus(cat.is_active ? "1" : "0");
    };

    const cancelEdit = () => {

        setEditId(null);
        setEditName('');
        setEditStatus('1');
    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            const res = await axios.put(
                `http://127.0.0.1:8000/api/update_category/${editId}/`,
                {
                    name: editName,
                    status: editStatus
                }
            );

            if (res.data.success) {

                toast.success(
                    res.data.message || "Updated"
                );

                cancelEdit();

                fetchCategories();

            } else {

                toast.error(
                    res.data.message || "Failed"
                );
            }

        } catch (err) {

            toast.error("Not Updated");

        } finally {

            setSaving(false);
        }
    };

    const handleDelete = async (id) => {

        const ok = window.confirm(
            'Are you Sure?'
        );

        if (!ok) return;

        try {

            const res = await axios.delete(
                `http://127.0.0.1:8000/api/delete_category/${id}/`
            );

            if (res.data.success) {

                toast.success(
                    res.data.message ||
                    "Deleted Successfully"
                );

                setCategories((prev) =>
                    prev.filter((c) => c.id !== id)
                );

            } else {

                toast.error(
                    res.data.message ||
                    "Delete Failed"
                );
            }

        } catch (err) {

            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <style>{`

                /* ───────── PAGE ───────── */

                .manage-category-page{
                    min-height:100vh;
                    background:
                        radial-gradient(circle at 20% 20%, rgba(79,70,229,0.18), transparent 30%),
                        radial-gradient(circle at 80% 70%, rgba(14,165,233,0.14), transparent 30%),
                        linear-gradient(160deg,#0a0f2c 0%, #0d1b3e 50%, #091426 100%);
                    padding:40px 20px;
                    position:relative;
                    overflow:hidden;
                }

                .manage-category-page::before{
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

                .page-header{
                    margin-bottom:2rem;
                }

                .page-title{
                    color:#e2eaf8;
                    font-weight:700;
                    margin-bottom:0.3rem;
                }

                .page-subtitle{
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

                /* ───────── TEXT ───────── */

                .glass-heading{
                    color:#e2eaf8;
                    font-weight:600;
                }

                .glass-muted{
                    color:rgba(148,197,255,0.65);
                }

                /* ───────── INPUT ───────── */

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

                /* ───────── BUTTONS ───────── */

                .glass-btn{
                    border:none!important;
                    border-radius:12px!important;
                    font-weight:600;
                    transition:all 0.25s ease;
                    padding:0.7rem 1rem!important;
                }

                .glass-btn-primary{
                    background:linear-gradient(135deg,#4f46e5,#0ea5e9)!important;
                    color:#fff!important;
                    box-shadow:0 6px 22px rgba(79,70,229,0.35);
                }

                .glass-btn-primary:hover{
                    transform:translateY(-2px);
                    opacity:0.94;
                }

                .glass-btn-danger{
                    background:rgba(239,68,68,0.14)!important;
                    color:#f87171!important;
                    border:1px solid rgba(239,68,68,0.25)!important;
                }

                .glass-btn-danger:hover{
                    background:rgba(239,68,68,0.22)!important;
                }

                .glass-btn-outline{
                    background:rgba(255,255,255,0.04)!important;
                    border:1px solid rgba(99,179,237,0.18)!important;
                    color:#93c5fd!important;
                }

                .glass-btn-outline:hover{
                    background:rgba(255,255,255,0.08)!important;
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

            `}</style>

            <div className="manage-category-page">

                <div className="container position-relative">

                    {/* Header */}

                    <div className="row page-header">

                        <div className="col-md-8 mx-auto d-flex justify-content-between align-items-center flex-wrap gap-3">

                            <div>

                                <h3 className="page-title">
                                    <i className="fa-solid fa-layer-group text-info me-2"></i>
                                    Manage Categories
                                </h3>

                                <p className="page-subtitle">
                                    Manage book categories and update or delete them
                                </p>

                            </div>

                            <button
                                className="btn glass-btn glass-btn-outline"
                                onClick={() =>
                                    navigate('/admin/category_add')
                                }
                            >
                                ➕ Add New
                            </button>

                        </div>

                    </div>

                    <div className="row g-4">

                        {/* Edit Section */}

                        <div className="col-md-4">

                            <div className="glass-card">

                                <div className="card-body p-4">

                                    <h5 className="glass-heading mb-4">
                                        {editId ? 'Edit Category' : 'Select Category'}
                                    </h5>

                                    {editId ? (

                                        <form onSubmit={handleUpdate}>

                                            <div className="mb-4">

                                                <label className="glass-label">
                                                    Category Name
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control glass-input"
                                                    placeholder="Enter category name"
                                                    required
                                                    value={editName}
                                                    onChange={(e) =>
                                                        setEditName(e.target.value)
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
                                                            checked={editStatus === "1"}
                                                            onChange={(e) =>
                                                                setEditStatus(e.target.value)
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
                                                            checked={editStatus === "0"}
                                                            onChange={(e) =>
                                                                setEditStatus(e.target.value)
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

                                            <div className="d-grid gap-2">

                                                <button
                                                    type="submit"
                                                    className="btn glass-btn glass-btn-primary"
                                                    disabled={saving}
                                                >

                                                    {saving ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                                            Updating...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fa-solid fa-pen-to-square me-2"></i>
                                                            Update Category
                                                        </>
                                                    )}

                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn glass-btn glass-btn-danger"
                                                    onClick={cancelEdit}
                                                >
                                                    Cancel
                                                </button>

                                            </div>

                                        </form>

                                    ) : (

                                        <p className="glass-muted small mb-0">
                                            Select a category from the table to edit
                                        </p>

                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Table */}

                        <div className="col-md-8">

                            <div className="glass-card">

                                <div className="card-body p-4">

                                    <h4 className="glass-heading mb-4">
                                        Category List
                                    </h4>

                                    {loadingList ? (

                                        <div className="text-center py-4">
                                            <div className="spinner-border text-info"></div>
                                        </div>

                                    ) : categories.length === 0 ? (

                                        <p className="glass-muted small">
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
                                                        <th>Updated</th>
                                                        <th>Action</th>
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

                                                            <td>
                                                                {new Date(
                                                                    cat.updated_at
                                                                ).toLocaleDateString()}
                                                            </td>

                                                            <td>

                                                                <div className="d-flex gap-2">

                                                                    <button
                                                                        className="btn btn-sm glass-btn glass-btn-outline"
                                                                        onClick={() =>
                                                                            startEdit(cat)
                                                                        }
                                                                    >
                                                                        <i className="fa-solid fa-pen-to-square me-1"></i>
                                                                        Edit
                                                                    </button>

                                                                    <button
                                                                        className="btn btn-sm glass-btn glass-btn-danger"
                                                                        onClick={() =>
                                                                            handleDelete(cat.id)
                                                                        }
                                                                    >
                                                                        <i className="fa-solid fa-trash-can me-1"></i>
                                                                        Delete
                                                                    </button>

                                                                </div>

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

export default ManageCategories;