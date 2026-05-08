import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ManageIssuedBooks = () => {

    const [issues, setIssues] = useState([]);
    const [loadingList, setLoadingList] = useState(false);

    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {

        if (!adminUser) {

            navigate('/admin/login');

        } else {

            fetchIssues();
        }

    }, []);

    const fetchIssues = async () => {

        setLoadingList(true);

        try {

            const res = await axios.get(
                "http://127.0.0.1:8000/api/admin/issued-books/"
            );

            setIssues(res.data);

        } catch (err) {

            const message =
                err?.response?.data?.message ||
                "Failed to load issued books";

            toast.error(message);

        } finally {

            setLoadingList(false);
        }
    };

    return (
        <>
            <style>{`

                .issued-page{
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
                    margin-bottom:0;
                }

                .glass-table thead{
                    background:rgba(255,255,255,0.04);
                }

                .glass-table td,
                .glass-table th{
                    border-color:rgba(255,255,255,0.06)!important;
                    vertical-align:middle;
                    white-space:nowrap;
                }

                .glass-table tbody tr:hover{
                    background:rgba(255,255,255,0.04);
                }

                .section-title{
                    color:#e2eaf8;
                    font-weight:600;
                }

                .returned-badge{
                    background:rgba(16,185,129,0.15);
                    color:#4ade80;
                    border:1px solid rgba(16,185,129,0.25);
                    padding:0.4rem 0.8rem;
                    border-radius:999px;
                    font-size:0.75rem;
                    font-weight:600;
                }

                .pending-badge{
                    background:rgba(239,68,68,0.15);
                    color:#f87171;
                    border:1px solid rgba(239,68,68,0.25);
                    padding:0.4rem 0.8rem;
                    border-radius:999px;
                    font-size:0.75rem;
                    font-weight:600;
                }

                .empty-text{
                    color:rgba(180,210,255,0.7);
                    font-size:0.9rem;
                }

                .glass-action-btn{
                    background:rgba(255,255,255,0.05)!important;
                    border:1px solid rgba(99,179,237,0.20)!important;
                    color:#dbeafe!important;
                    border-radius:10px!important;
                    transition:0.25s ease;
                }

                .glass-action-btn:hover{
                    background:rgba(255,255,255,0.10)!important;
                    color:#fff!important;
                }

                @media (max-width:768px){

                    .issued-page{
                        padding:20px 10px;
                    }

                    .glass-title{
                        font-size:1.4rem;
                    }

                }

            `}</style>

            <div className='issued-page'>

                <div className='container'>

                    {/* Header */}

                    <div className='row mb-4'>

                        <div className='col-md-10 mx-auto d-flex justify-content-between align-items-center flex-wrap gap-3'>

                            <div>

                                <h2 className='glass-title mb-1'>
                                    <i className='fa-solid fa-book-bookmark me-2 text-info'></i>
                                    Handle Issued Books
                                </h2>

                                <p className='glass-subtitle mb-0'>
                                    Track all issued books and monitor return status
                                </p>

                            </div>

                            <button
                                className='btn glass-btn'
                                onClick={() => navigate('/admin/issue-books')}
                            >
                                <i className='fa-solid fa-plus me-2'></i>
                                Issue New Book
                            </button>

                        </div>

                    </div>

                    {/* Table Section */}

                    <div className='row justify-content-center'>

                        <div className='col-lg-11'>

                            <div className='glass-card'>

                                <div className='card-body p-4'>

                                    <h5 className='section-title mb-4'>
                                        Issued Books List
                                    </h5>

                                    {loadingList ? (

                                        <div className='text-center py-5'>
                                            <div className='spinner-border text-info'></div>
                                        </div>

                                    ) : issues.length === 0 ? (

                                        <p className='empty-text mb-0'>
                                            No Issued Books Found...
                                        </p>

                                    ) : (

                                        <div className='table-responsive'>

                                            <table className='table glass-table align-middle'>

                                                <thead>

                                                    <tr>
                                                        <th>SI/No</th>
                                                        <th>Student ID</th>
                                                        <th>Student Name</th>
                                                        <th>Book Name</th>
                                                        <th>ISBN</th>
                                                        <th>Issued Date</th>
                                                        <th>Return Status</th>
                                                        <th className='text-center'>Action</th>
                                                    </tr>

                                                </thead>

                                                <tbody>

                                                    {issues.map((issue, index) => (

                                                        <tr key={issue.id}>

                                                            <td>{index + 1}</td>

                                                            <td>{issue.student_id}</td>

                                                            <td>
                                                                <i className='fa-solid fa-user me-2 text-info'></i>
                                                                {issue.student_name}
                                                            </td>

                                                            <td>
                                                                <i className='fa-solid fa-book me-2 text-warning'></i>
                                                                {issue.book_title}
                                                            </td>

                                                            <td>{issue.book_isbn}</td>

                                                            <td>
                                                                {issue.issued_at
                                                                    ? new Date(issue.issued_at).toLocaleDateString()
                                                                    : "-"}
                                                            </td>

                                                            <td>

                                                                {issue.is_returned ? (

                                                                    <span className='returned-badge'>
                                                                        Returned
                                                                    </span>

                                                                ) : (

                                                                    <span className='pending-badge'>
                                                                        Not Returned
                                                                    </span>

                                                                )}

                                                            </td>

                                                            <td className='text-center'>

                                                                <button
                                                                    className='btn btn-sm glass-action-btn'
                                                                    onClick={() =>
                                                                        navigate(`/admin/issued-books/${issue.id}`)
                                                                    }
                                                                >
                                                                    <i className='fa-solid fa-eye me-1'></i>
                                                                    Details
                                                                </button>

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

export default ManageIssuedBooks;