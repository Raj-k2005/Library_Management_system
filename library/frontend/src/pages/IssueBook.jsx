import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const IssueBook = () => {
    const [studentId, setStudentId] = useState('');
    const [student, setStudent] = useState(null);

    const [bookQuery, setBookQuery] = useState('');
    const [book, setBook] = useState(null);

    const [studentLoading, setStudentLoading] = useState(false);
    const [bookLoading, setBookLoading] = useState(false);

    const [issuing, setIssuing] = useState(false);
    const [remark, setRemark] = useState('');

    const navigate = useNavigate();
    const adminUser = localStorage.getItem('adminUser');

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
        }
    }, []);

    const handleFetchStudent = async () => {
        if (!studentId) return toast.error('Enter Student ID');

        setStudent(null);
        setStudentLoading(true);

        try {
            const res = await axios.get(
                `http://127.0.0.1:8000/api/user/by-id/?student_id=${studentId}`
            );

            setStudent(res.data.student);

        } catch {
            toast.error('Student not found');

        } finally {
            setStudentLoading(false);
        }
    };

    const handleFetchBook = async () => {
        if (!bookQuery) return toast.error('Enter book name or ISBN');

        setBook(null);
        setBookLoading(true);

        try {
            const res = await axios.get(
                `http://127.0.0.1:8000/api/books/lookup/?q=${bookQuery}`
            );

            setBook(res.data.book);

        } catch {
            toast.error('Book not found');

        } finally {
            setBookLoading(false);
        }
    };

    const handleIssueBook = async () => {

        if (!student || !book) {
            return toast.error('Fill all fields');
        }

        if (book.quantity <= 0) {
            return toast.error('Book out of stock');
        }

        setIssuing(true);

        try {

            const res = await axios.post(
                'http://127.0.0.1:8000/api/issue-book/',
                {
                    student_id: student.id,
                    book_id: book.id,
                    remark,
                }
            );

            if (res.data.success) {

                toast.success('Book issued successfully');

                setStudent(null);
                setBook(null);
                setStudentId('');
                setBookQuery('');
                setRemark('');
            }

        } catch (err) {

            console.error(err.response?.data || err);

            toast.error(
                err.response?.data?.message || 'Failed to issue book'
            );

        } finally {
            setIssuing(false);
        }
    };

    const bookCoverUrl = book?.cover_image
        ? book.cover_image.startsWith('http')
            ? book.cover_image
            : `http://127.0.0.1:8000${book.cover_image}`
        : null;

    return (
        <>
            <style>{`

                .issue-page{
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

                .glass-input,
                .glass-textarea{
                    background:rgba(255,255,255,0.06)!important;
                    border:1px solid rgba(99,179,237,0.18)!important;
                    border-radius:12px!important;
                    color:#fff!important;
                    padding:12px 14px!important;
                    transition:0.25s ease;
                }

                .glass-input::placeholder,
                .glass-textarea::placeholder{
                    color:rgba(180,210,255,0.4);
                }

                .glass-input:focus,
                .glass-textarea:focus{
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

                .glass-btn-outline{
                    background:transparent!important;
                    border:1px solid rgba(99,179,237,0.35)!important;
                    border-radius:12px!important;
                    color:#dbeafe!important;
                    padding:11px 18px!important;
                    transition:0.25s ease;
                }

                .glass-btn-outline:hover{
                    background:rgba(255,255,255,0.08)!important;
                }

                .section-title{
                    color:#e2eaf8;
                    font-weight:600;
                }

                .info-box{
                    background:rgba(255,255,255,0.04);
                    border:1px solid rgba(255,255,255,0.05);
                    border-radius:14px;
                    padding:14px;
                }

                .info-box p{
                    color:#dbeafe;
                    margin-bottom:10px;
                    font-size:0.92rem;
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                    word-break:break-word;
                }

                .info-box span{
                    color:rgba(180,210,255,0.7);
                    font-weight:600;
                }

                .book-preview{
                    background:rgba(255,255,255,0.04);
                    border:1px solid rgba(255,255,255,0.05);
                    border-radius:16px;
                    padding:14px;
                    display:flex;
                    gap:15px;
                    align-items:flex-start;
                    flex-wrap:wrap;
                }

                .book-preview img{
                    width:110px;
                    height:150px;
                    object-fit:cover;
                    border-radius:12px;
                    border:1px solid rgba(255,255,255,0.08);
                }

                .book-preview h6{
                    color:#fff;
                    font-weight:600;
                }

                .book-preview p{
                    color:#cbd5e1;
                    margin-bottom:8px;
                    font-size:0.9rem;
                }

                .glass-textarea{
                    min-height:120px;
                    resize:none;
                }

                @media (max-width:768px){

                    .issue-page{
                        padding:20px 10px;
                    }

                    .glass-title{
                        font-size:1.4rem;
                    }

                }

            `}</style>

            <div className='issue-page'>

                <div className='container'>

                    {/* Header */}
                    <div className='row mb-4'>

                        <div className='col-md-10 mx-auto d-flex justify-content-between align-items-center flex-wrap gap-3'>

                            <div>

                                <h2 className='glass-title mb-1'>
                                    <i className='fa-solid fa-book-open me-2 text-info'></i>
                                    Issue Books
                                </h2>

                                <p className='glass-subtitle mb-0'>
                                    Search students and books using ID or ISBN and issue books instantly
                                </p>

                            </div>

                            <button
                                className='btn glass-btn-outline'
                                onClick={() => navigate('/admin/manage-issued-books')}
                            >
                                <i className='fa-solid fa-book-bookmark me-2'></i>
                                Issued Books
                            </button>

                        </div>

                    </div>

                    <div className='row g-4 justify-content-center'>

                        {/* Student Card */}
                        <div className='col-lg-5'>

                            <div className='glass-card h-100'>

                                <div className='card-body p-4'>

                                    <h5 className='section-title mb-4'>
                                        <i className='fa-solid fa-user-graduate me-2 text-info'></i>
                                        Student Information
                                    </h5>

                                    <div className='mb-3'>

                                        <label className='glass-label'>
                                            Student ID
                                        </label>

                                        <div className='d-flex gap-2 flex-wrap'>

                                            <input
                                                type='text'
                                                className='form-control glass-input'
                                                placeholder='Enter Student ID'
                                                value={studentId}
                                                onChange={(e) => setStudentId(e.target.value)}
                                            />

                                            <button
                                                className='btn glass-btn'
                                                type='button'
                                                onClick={handleFetchStudent}
                                            >
                                                {studentLoading ? (
                                                    <>
                                                        <span className='spinner-border spinner-border-sm me-2'></span>
                                                        Loading
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className='fa-solid fa-magnifying-glass me-2'></i>
                                                        Fetch
                                                    </>
                                                )}
                                            </button>

                                        </div>

                                    </div>

                                    {student && (

                                        <div className='info-box mt-4'>

                                            <p>
                                                <span>Name</span>
                                                {student.full_name}
                                            </p>

                                            <p>
                                                <span>Email</span>
                                                {student.email}
                                            </p>

                                            <p>
                                                <span>Status</span>

                                                {student.is_active ? (
                                                    <span className='badge bg-success'>
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className='badge bg-danger'>
                                                        Blocked
                                                    </span>
                                                )}
                                            </p>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Book Card */}
                        <div className='col-lg-5'>

                            <div className='glass-card h-100'>

                                <div className='card-body p-4'>

                                    <h5 className='section-title mb-4'>
                                        <i className='fa-solid fa-book me-2 text-warning'></i>
                                        Book Information
                                    </h5>

                                    <div className='mb-3'>

                                        <label className='glass-label'>
                                            Book Name / ISBN
                                        </label>

                                        <div className='d-flex gap-2 flex-wrap'>

                                            <input
                                                type='text'
                                                className='form-control glass-input'
                                                placeholder='Book Name or ISBN'
                                                value={bookQuery}
                                                onChange={(e) => setBookQuery(e.target.value)}
                                            />

                                            <button
                                                className='btn glass-btn'
                                                type='button'
                                                onClick={handleFetchBook}
                                            >
                                                {bookLoading ? (
                                                    <>
                                                        <span className='spinner-border spinner-border-sm me-2'></span>
                                                        Loading
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className='fa-solid fa-magnifying-glass me-2'></i>
                                                        Fetch
                                                    </>
                                                )}
                                            </button>

                                        </div>

                                    </div>

                                    {book && (

                                        <div className='book-preview mt-4'>

                                            {bookCoverUrl && (
                                                <img
                                                    src={bookCoverUrl}
                                                    alt='Book Cover'
                                                />
                                            )}

                                            <div className='flex-grow-1'>

                                                <h6 className='mb-3'>
                                                    {book.title}
                                                </h6>

                                                <p>
                                                    <strong>Author:</strong> {book.author}
                                                </p>

                                                <p>
                                                    <strong>Available:</strong> {book.quantity}
                                                </p>

                                                <p>
                                                    <strong>Status:</strong>{" "}

                                                    {book.quantity > 0 ? (
                                                        <span className='badge bg-success'>
                                                            In Stock
                                                        </span>
                                                    ) : (
                                                        <span className='badge bg-danger'>
                                                            Out Of Stock
                                                        </span>
                                                    )}

                                                </p>

                                            </div>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Remark + Submit */}
                        <div className='col-lg-10'>

                            <div className='glass-card'>

                                <div className='card-body p-4'>

                                    <h5 className='section-title mb-4'>
                                        <i className='fa-solid fa-pen-to-square me-2 text-primary'></i>
                                        Issue Remark
                                    </h5>

                                    <div className='mb-4'>

                                        <label className='glass-label'>
                                            Remark
                                        </label>

                                        <textarea
                                            className='form-control glass-textarea'
                                            placeholder='Enter any remarks before issuing the book...'
                                            value={remark}
                                            onChange={(e) => setRemark(e.target.value)}
                                        ></textarea>

                                    </div>

                                    <button
                                        className='btn glass-btn w-100'
                                        disabled={issuing}
                                        onClick={handleIssueBook}
                                    >

                                        {issuing ? (
                                            <>
                                                <span className='spinner-border spinner-border-sm me-2'></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <i className='fa-solid fa-paper-plane me-2'></i>
                                                Issue Book
                                            </>
                                        )}

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default IssueBook;