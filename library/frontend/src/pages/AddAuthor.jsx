import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AddAuthor = () => {

    const [name, setName] = useState("");
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);

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
        try {

            const res = await axios.get(
                "http://127.0.0.1:8000/api/authors/"
            );

            setAuthors(res.data);

        } catch (err) {

            const message =
                err?.response?.data?.message || "Something went wrong";

            toast.error(message);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {

            const res = await axios.post(
                "http://127.0.0.1:8000/api/authors/add/",
                { name }
            );

            if (res.data.success) {

                toast.success(res.data.message || "Author created");

                setName("");
                fetchAuthors();

            } else {

                toast.error(res.data.message || "Something went wrong");
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

                .author-page{
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

                .glass-header{
                    margin-bottom:0;
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

                .section-title{
                    color:#e2eaf8;
                    font-weight:600;
                }

                @media (max-width:768px){

                    .author-page{
                        padding:20px 10px;
                    }

                    .glass-title{
                        font-size:1.4rem;
                    }

                }

            `}</style>

            <div className='author-page'>

                <div className='container'>

                    {/* Header */}
                    <div className='row mb-4'>

                        <div className='col-md-10 mx-auto d-flex justify-content-between align-items-center flex-wrap gap-3'>

                            <div className='glass-header text-start'>

                                <h2 className='glass-title mb-1'>
                                    <i className='fa-solid fa-user-pen me-2 text-info'></i>
                                    Add Author
                                </h2>

                                <p className='glass-subtitle mb-0'>
                                    Create book authors and manage your library collection
                                </p>

                            </div>

                            <button
                                className='btn glass-btn'
                                onClick={() => navigate('/admin/manage_author')}
                            >
                                <i className='fa-solid fa-gear me-2'></i>
                                Manage Authors
                            </button>

                        </div>

                    </div>

                    <div className='row g-4 justify-content-center'>

                        {/* Add Author */}
                        <div className='col-lg-5'>

                            <div className='glass-card h-100'>

                                <div className='card-body p-4'>

                                    <form onSubmit={handleSubmit}>

                                        <div className='mb-4'>

                                            <label className='glass-label'>
                                                Author Name
                                            </label>

                                            <input
                                                type="text"
                                                className='form-control glass-input'
                                                placeholder='e.g. Ravi Belagere, Prem Chand'
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />

                                        </div>

                                        <button
                                            type='submit'
                                            className='btn glass-btn w-100'
                                            disabled={loading}
                                        >

                                            {loading ? (
                                                <>
                                                    <span className='spinner-border spinner-border-sm me-2'></span>
                                                    Adding...
                                                </>
                                            ) : (
                                                <>
                                                    <i className='fa-solid fa-plus me-2'></i>
                                                    Add Author
                                                </>
                                            )}

                                        </button>

                                    </form>

                                </div>

                            </div>

                        </div>

                        {/* Authors Table */}
                        <div className='col-lg-7'>

                            <div className='glass-card'>

                                <div className='card-body p-4'>

                                    <h5 className='section-title mb-4'>
                                        Recent Authors
                                    </h5>

                                    {authors.length === 0 ? (

                                        <p className='text-light small mb-0'>
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
                                                    </tr>
                                                </thead>

                                                <tbody>

                                                    {authors.map((auth, index) => (

                                                        <tr key={auth.id}>

                                                            <td>{index + 1}</td>

                                                            <td>
                                                                <i className='fa-solid fa-feather-pointed me-2 text-info'></i>
                                                                {auth.name}
                                                            </td>

                                                            <td>
                                                                {new Date(auth.created_at).toLocaleDateString()}
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

export default AddAuthor;