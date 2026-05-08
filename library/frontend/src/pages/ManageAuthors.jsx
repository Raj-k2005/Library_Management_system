import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ManageAuthors = () => {

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [authors, setAuthors] = useState([]);
    const [loadingList, setLoadingList] = useState(false);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {

        if (!adminUser) {
            navigate('/admin/login');
        } else {
            fetchAuthors();
        }

    }, []);

    const fetchAuthors = async () => {

        setLoadingList(true);

        try {

            const res = await axios.get(
                "http://127.0.0.1:8000/api/authors/"
            );

            setAuthors(res.data);

        } catch (err) {

            const message =
                err?.response?.data?.message || "Failed to load authors";

            toast.error(message);

        } finally {

            setLoadingList(false);
        }
    };

    const startEdit = (auth) => {
        setEditId(auth.id);
        setEditName(auth.name);
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditName('');
    };

    const handleUpdate = async (e) => {

        e.preventDefault();
        setSaving(true);

        try {

            const res = await axios.put(
                `http://127.0.0.1:8000/api/update_author/${editId}/`,
                { name: editName }
            );

            if (res.data.success) {

                toast.success(res.data.message || "Updated");

                cancelEdit();
                fetchAuthors();

            } else {

                toast.error(res.data.message || "Failed");
            }

        } catch (err) {

            toast.error("Not Updated");

        } finally {

            setSaving(false);
        }
    };

    const handleDelete = async (id) => {

        const ok = window.confirm('Are you Sure?');

        if (!ok) return;

        try {

            const res = await axios.delete(
                `http://127.0.0.1:8000/api/delete_author/${id}/`
            );

            if (res.data.success) {

                toast.success(
                    res.data.message || "Deleted Successfully"
                );

                setAuthors((prev) =>
                    prev.filter((c) => c.id !== id)
                );

            } else {

                toast.error(
                    res.data.message || "Delete Failed"
                );
            }

        } catch (err) {

            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <style>{`

                .author-manage-page{
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

                .glass-btn{
                    background:linear-gradient(135deg,#4f46e5,#0ea5e9)!important;
                    border:none!important;
                    border-radius:12px!important;
                    color:#fff!important;
                    font-weight:600;
                    padding:11px 18px!important;
                    transition:0.25s ease;
                    box-shadow:0 10px 25px rgba(79,70,229,0.35);
                }

                .glass-btn:hover{
                    transform:translateY(-1px);
                    box-shadow:0 14px 28px rgba(14,165,233,0.35);
                }

                .glass-outline-btn{
                    border:1px solid rgba(99,179,237,0.35)!important;
                    color:#cfe8ff!important;
                    background:rgba(255,255,255,0.04)!important;
                    border-radius:10px!important;
                    transition:0.2s ease;
                }

                .glass-outline-btn:hover{
                    background:rgba(255,255,255,0.08)!important;
                    color:#fff!important;
                }

                .glass-danger-btn{
                    border:1px solid rgba(255,99,132,0.35)!important;
                    color:#ffb4c4!important;
                    background:rgba(255,255,255,0.04)!important;
                    border-radius:10px!important;
                }

                .glass-danger-btn:hover{
                    background:rgba(255,99,132,0.08)!important;
                    color:#fff!important;
                }

                .glass-table{
                    color:#dbeafe;
                }

                .glass-table thead{
                    background:rgba(255,255,255,0.04);
                }

                .glass-table td,
                .glass-table th{
                    border-color:rgba(255,255,255,0.06)!important;
                    vertical-align:middle;
                }

                .glass-table tbody tr:hover{
                    background:rgba(255,255,255,0.04);
                }

                .glass-muted{
                    color:rgba(180,210,255,0.65);
                }

                @media(max-width:768px){

                    .author-manage-page{
                        padding:20px 10px;
                    }

                    .glass-title{
                        font-size:1.4rem;
                    }

                }

            `}</style>

            <div className='author-manage-page'>

                <div className='container'>

                    {/* Header */}
                    <div className='row mb-4'>

                        <div className='col-md-10 mx-auto d-flex justify-content-between align-items-center flex-wrap gap-3'>

                            <div>
                                <h2 className='glass-title mb-1'>
                                    <i className='fa-solid fa-feather-pointed me-2 text-info'></i>
                                    Manage Authors
                                </h2>

                                <p className='glass-subtitle mb-0'>
                                    Manage book authors and update or delete them
                                </p>
                            </div>

                            <button
                                className='btn glass-btn'
                                onClick={() => navigate('/admin/author_add')}
                            >
                                <i className='fa-solid fa-plus me-2'></i>
                                Add New
                            </button>

                        </div>

                    </div>

                    <div className='row g-4'>

                        {/* Edit Panel */}
                        <div className='col-lg-4'>

                            <div className='glass-card h-100'>

                                <div className='card-body p-4'>

                                    <h5 className='text-light fw-semibold mb-4'>

                                        {editId
                                            ? 'Edit Author'
                                            : 'Select Author To Edit'}

                                    </h5>

                                    {editId ? (

                                        <form onSubmit={handleUpdate}>

                                            <div className='mb-4'>

                                                <label className='glass-label'>
                                                    Author Name
                                                </label>

                                                <input
                                                    type="text"
                                                    className='form-control glass-input'
                                                    placeholder='Enter author name'
                                                    required
                                                    value={editName}
                                                    onChange={(e) =>
                                                        setEditName(e.target.value)
                                                    }
                                                />

                                            </div>

                                            <div className='d-flex gap-2'>

                                                <button
                                                    type='submit'
                                                    className='btn glass-btn w-100'
                                                    disabled={saving}
                                                >

                                                    {saving ? (
                                                        <>
                                                            <span className='spinner-border spinner-border-sm me-2'></span>
                                                            Updating...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className='fa-solid fa-pen me-2'></i>
                                                            Update
                                                        </>
                                                    )}

                                                </button>

                                                <button
                                                    type='button'
                                                    className='btn glass-outline-btn'
                                                    onClick={cancelEdit}
                                                >
                                                    Cancel
                                                </button>

                                            </div>

                                        </form>

                                    ) : (

                                        <p className='glass-muted small mb-0'>
                                            Select an author from the table to edit
                                        </p>

                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Table */}
                        <div className='col-lg-8'>

                            <div className='glass-card'>

                                <div className='card-body p-4'>

                                    <h4 className='text-light fw-semibold mb-4'>
                                        Authors List
                                    </h4>

                                    {loadingList ? (

                                        <div className='text-center py-5'>

                                            <div className='spinner-border text-info'></div>

                                        </div>

                                    ) : authors.length === 0 ? (

                                        <p className='glass-muted small'>
                                            No Authors Found... Add One Now
                                        </p>

                                    ) : (

                                        <div className='table-responsive'>

                                            <table className='table glass-table align-middle'>

                                                <thead>
                                                    <tr>
                                                        <th>SI/No</th>
                                                        <th>Name</th>
                                                        <th>Created</th>
                                                        <th>Updated</th>
                                                        <th className='text-center'>
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>

                                                    {authors.map((auth, index) => (

                                                        <tr key={auth.id}>

                                                            <td>{index + 1}</td>

                                                            <td>
                                                                <i className='fa-solid fa-user-pen me-2 text-info'></i>
                                                                {auth.name}
                                                            </td>

                                                            <td className='glass-muted small'>
                                                                {new Date(auth.created_at).toLocaleDateString()}
                                                            </td>

                                                            <td className='glass-muted small'>
                                                                {new Date(auth.updated_at).toLocaleDateString()}
                                                            </td>

                                                            <td>

                                                                <div className='d-flex justify-content-center gap-2 flex-wrap'>

                                                                    <button
                                                                        className='btn btn-sm glass-outline-btn'
                                                                        onClick={() => startEdit(auth)}
                                                                    >
                                                                        <i className='fa-solid fa-pen-to-square me-1'></i>
                                                                        Edit
                                                                    </button>

                                                                    <button
                                                                        className='btn btn-sm glass-danger-btn'
                                                                        onClick={() => handleDelete(auth.id)}
                                                                    >
                                                                        <i className='fa-solid fa-trash-can me-1'></i>
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
    )
}

export default ManageAuthors;