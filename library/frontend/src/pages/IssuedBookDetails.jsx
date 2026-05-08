import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';

const IssuedBookDetails = () => {

    const { id } = useParams();

    const [issue, setIssue] = useState(null);
    const [fine, setFine] = useState('');
    const [loading, setLoading] = useState(false);
    const [returning, setReturning] = useState(false);

    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {

        if (!adminUser) {
            navigate('/admin/login');
        } else {
            fetchDetails();
        }

    }, []);

    const fetchDetails = async () => {

        setLoading(true);

        try {

            const res = await axios.get(
                `http://127.0.0.1:8000/api/issued-books/${id}/`
            );

            setIssue(res.data);

            if (res.data.fine) {
                setFine(res.data.fine);
            }

        } catch (err) {

            const message =
                err?.response?.data?.message ||
                "Failed to load issued book details";

            toast.error(message);

        } finally {

            setLoading(false);

        }
    };

    const hadleReturn = async () => {

        if (!window.confirm("Are you sure to return this book?")) {
            return;
        }

        setReturning(true);

        try {

            await axios.post(
                `http://127.0.0.1:8000/api/return_book/${id}/`,
                { fine: fine }
            );

            toast.success("Book returned successfully");

            fetchDetails();

        } catch (err) {

            const message =
                err?.response?.data?.message ||
                "Failed to return book";

            toast.error(message);

        } finally {

            setReturning(false);

        }
    };

    const bookCoverUrl = issue?.book_cover
        ? issue.book_cover.startsWith('http')
            ? issue.book_cover
            : `http://127.0.0.1:8000${issue.book_cover}`
        : null;

    if (loading) {

        return (

            <>
                <style>{`

                    .issued-page{
                        min-height:100vh;
                        background:
                            radial-gradient(circle at top left, rgba(79,70,229,0.18), transparent 30%),
                            radial-gradient(circle at bottom right, rgba(14,165,233,0.16), transparent 30%),
                            linear-gradient(160deg, #0a0f2c 0%, #0d1b3e 50%, #091426 100%);
                        display:flex;
                        justify-content:center;
                        align-items:center;
                    }

                `}</style>

                <div className='issued-page'>
                    <div className='spinner-border text-info'></div>
                </div>
            </>

        );
    }

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
                    height:100%;
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

                .section-title{
                    color:#e2eaf8;
                    font-weight:600;
                    font-size:1.1rem;
                }

                .detail-item{
                    margin-bottom:14px;
                    color:#dbeafe;
                    word-break:break-word;
                }

                .detail-label{
                    color:rgba(180,210,255,0.7);
                    font-size:0.82rem;
                    margin-bottom:3px;
                    display:block;
                    text-transform:uppercase;
                    letter-spacing:0.05em;
                }

                .detail-value{
                    font-size:0.95rem;
                    font-weight:500;
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

                .glass-label{
                    color:rgba(190,220,255,0.85);
                    font-size:0.82rem;
                    font-weight:600;
                    margin-bottom:6px;
                    text-transform:uppercase;
                    letter-spacing:0.05em;
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
                    color:#dbeafe!important;
                    background:rgba(255,255,255,0.04)!important;
                    border-radius:12px!important;
                    padding:11px 18px!important;
                    font-weight:600;
                    transition:0.25s ease;
                }

                .glass-outline-btn:hover{
                    background:rgba(255,255,255,0.08)!important;
                    color:#fff!important;
                }

                .book-cover{
                    width:100%;
                    max-width:220px;
                    height:300px;
                    object-fit:cover;
                    border-radius:18px;
                    border:1px solid rgba(255,255,255,0.08);
                    box-shadow:0 10px 30px rgba(0,0,0,0.4);
                }

                .status-badge{
                    background:rgba(34,197,94,0.18);
                    color:#86efac;
                    padding:6px 12px;
                    border-radius:30px;
                    font-size:0.75rem;
                    font-weight:600;
                    border:1px solid rgba(34,197,94,0.35);
                }

                .divider{
                    border-color:rgba(255,255,255,0.08)!important;
                }

                @media (max-width:768px){

                    .issued-page{
                        padding:20px 10px;
                    }

                    .glass-title{
                        font-size:1.4rem;
                    }

                    .book-cover{
                        max-width:180px;
                        height:250px;
                    }

                }

            `}</style>

            <div className='issued-page'>

                <div className='container'>

                    {/* Header */}
                    <div className='row mb-4'>

                        <div className='col-lg-10 mx-auto d-flex justify-content-between align-items-center flex-wrap gap-3'>

                            <div>

                                <h2 className='glass-title mb-1'>
                                    <i className='fa-solid fa-book-open me-2 text-info'></i>
                                    Issued Book Details
                                </h2>

                                <p className='glass-subtitle mb-0'>
                                    View student details, issue information and return status
                                </p>

                            </div>

                            <button
                                className='btn glass-outline-btn'
                                onClick={() => navigate('/admin/manage-issued-books')}
                            >
                                <i className='fa-solid fa-arrow-left me-2'></i>
                                Back
                            </button>

                        </div>

                    </div>

                    <div className='row g-4 justify-content-center'>

                        {/* Student Details */}
                        <div className='col-lg-5'>

                            <div className='glass-card'>

                                <div className='card-body p-4'>

                                    <div className='d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2'>

                                        <h5 className='section-title mb-0'>
                                            <i className='fa-solid fa-user-graduate me-2 text-info'></i>
                                            Student Details
                                        </h5>

                                        <span className='status-badge'>
                                            {issue?.is_returned ? 'Returned' : 'Active Issue'}
                                        </span>

                                    </div>

                                    <hr className='divider' />

                                    <div className='detail-item'>
                                        <span className='detail-label'>Student Name</span>
                                        <div className='detail-value'>{issue?.student_name}</div>
                                    </div>

                                    <div className='detail-item'>
                                        <span className='detail-label'>Email Address</span>
                                        <div className='detail-value'>{issue?.student_email}</div>
                                    </div>

                                    <div className='detail-item'>
                                        <span className='detail-label'>Phone Number</span>
                                        <div className='detail-value'>{issue?.student_mobile}</div>
                                    </div>

                                    <div className='detail-item'>
                                        <span className='detail-label'>Student ID</span>
                                        <div className='detail-value'>{issue?.student_id}</div>
                                    </div>

                                    <div className='detail-item mb-0'>
                                        <span className='detail-label'>Current Fine</span>
                                        <div className='detail-value'>
                                            ₹ {issue?.fine || 0}
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Book Details */}
                        <div className='col-lg-5'>

                            <div className='glass-card'>

                                <div className='card-body p-4 text-center'>

                                    <h5 className='section-title mb-4'>
                                        <i className='fa-solid fa-book me-2 text-success'></i>
                                        Book Details
                                    </h5>

                                    {bookCoverUrl && (

                                        <img
                                            src={bookCoverUrl}
                                            alt="Book Cover"
                                            className='book-cover mb-4'
                                        />

                                    )}

                                    <div className='detail-item'>
                                        <span className='detail-label'>Book Title</span>
                                        <div className='detail-value'>{issue?.book_title}</div>
                                    </div>

                                    <div className='detail-item'>
                                        <span className='detail-label'>ISBN Number</span>
                                        <div className='detail-value'>{issue?.book_isbn}</div>
                                    </div>

                                    <div className='detail-item'>
                                        <span className='detail-label'>Issued Date</span>
                                        <div className='detail-value'>
                                            {issue?.issued_at
                                                ? new Date(issue.issued_at).toLocaleDateString()
                                                : "-"}
                                        </div>
                                    </div>

                                    <div className='detail-item mb-0'>
                                        <span className='detail-label'>Return Date</span>
                                        <div className='detail-value'>
                                            {issue?.return_at
                                                ? new Date(issue.return_at).toLocaleDateString()
                                                : "Not Returned Yet"}
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Return Section */}
                        <div className='col-lg-10'>

                            <div className='glass-card'>

                                <div className='card-body p-4'>

                                    <h5 className='section-title mb-4'>
                                        <i className='fa-solid fa-money-bill-wave me-2 text-warning'></i>
                                        Fine & Return Section
                                    </h5>

                                    <div className='row g-3 align-items-end'>

                                        <div className='col-md-8'>

                                            <label className='glass-label'>
                                                Fine Amount
                                            </label>

                                            <input
                                                type='number'
                                                className='form-control glass-input'
                                                placeholder='Enter fine amount if any'
                                                value={fine}
                                                onChange={(e) => setFine(e.target.value)}
                                            />

                                        </div>

                                        <div className='col-md-4'>

                                            <button
                                                className='btn glass-btn w-100'
                                                onClick={hadleReturn}
                                                disabled={returning || issue?.is_returned}
                                            >

                                                {returning ? (
                                                    <>
                                                        <span className='spinner-border spinner-border-sm me-2'></span>
                                                        Returning...
                                                    </>
                                                ) : issue?.is_returned ? (
                                                    <>
                                                        <i className='fa-solid fa-check me-2'></i>
                                                        Already Returned
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className='fa-solid fa-rotate-left me-2'></i>
                                                        Return Book
                                                    </>
                                                )}

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default IssuedBookDetails;