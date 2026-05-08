import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const StudentBooks = () => {

    const [books, setBooks] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const studentUser = JSON.parse(localStorage.getItem('studentUser'));

    useEffect(() => {

        if (!studentUser) {

            navigate('/user/login');
            return;
        }

        const fetchBooks = async () => {

            try {

                setLoading(true);

                const res = await axios.get(
                    "http://127.0.0.1:8000/api/user_books/"
                );

                setBooks(res.data);
                setFiltered(res.data);

            } catch (err) {

                console.error("Error fetching Books:", err);
                toast.error("Failed to fetch Books");

            } finally {

                setLoading(false);
            }
        };

        fetchBooks();

    }, []);

    useEffect(() => {

        const term = search.trim().toLowerCase();

        if (term === '') {

            setFiltered(books);
            return;
        }

        const filteredBooks = books.filter(book =>

            book.title.toLowerCase().includes(term) ||
            book.author_name.toLowerCase().includes(term) ||
            book.category_name.toLowerCase().includes(term) ||
            book.isbn.toLowerCase().includes(term)

        );

        setFiltered(filteredBooks);

    }, [search, books]);

    const getCoverUrl = (book) => {

        if (!book.cover_image) {
            return null;
        }

        if (book.cover_image.startsWith('http://')) {
            return book.cover_image;
        }

        return `http://127.0.0.1:8000${book.cover_image}`;
    };

    return (
        <>
            <style>{`

                .student-books-page{
                    min-height:100vh;
                    padding:30px 15px;
                    background:
                        radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 28%),
                        radial-gradient(circle at bottom right, rgba(16,185,129,0.14), transparent 28%),
                        linear-gradient(135deg,#071028 0%, #0f172a 55%, #111827 100%);
                    position:relative;
                    overflow:hidden;
                }

                .student-books-page::before{
                    content:'';
                    position:absolute;
                    inset:0;
                    background-image:
                        radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.12), transparent),
                        radial-gradient(2px 2px at 80% 20%, rgba(255,255,255,0.08), transparent),
                        radial-gradient(2px 2px at 60% 70%, rgba(255,255,255,0.08), transparent);
                    pointer-events:none;
                }

                .books-glass-header{
                    background:rgba(15,23,42,0.68);
                    backdrop-filter:blur(20px);
                    border:1px solid rgba(255,255,255,0.08);
                    border-radius:22px;
                    padding:1.2rem 1.5rem;
                    margin-bottom:1.8rem;
                    box-shadow:0 10px 35px rgba(0,0,0,0.30);
                }

                .books-title{
                    color:#ffffff;
                    font-weight:700;
                    margin-bottom:0.2rem;
                    font-size:1.5rem;
                }

                .books-subtitle{
                    color:rgba(255,255,255,0.62);
                    margin-bottom:0;
                    font-size:0.88rem;
                }

                .search-box{
                    background:rgba(255,255,255,0.06);
                    border:1px solid rgba(255,255,255,0.08);
                    border-radius:14px;
                    padding:0.35rem 0.8rem;
                    display:flex;
                    align-items:center;
                    gap:10px;
                    width:300px;
                }

                .search-box i{
                    color:rgba(255,255,255,0.6);
                    font-size:0.9rem;
                }

                .search-input{
                    background:transparent;
                    border:none;
                    outline:none;
                    width:100%;
                    color:#fff;
                    font-size:0.92rem;
                }

                .search-input::placeholder{
                    color:rgba(255,255,255,0.45);
                }

                .book-card{
                    background:rgba(15,23,42,0.72);
                    backdrop-filter:blur(18px);
                    border:1px solid rgba(255,255,255,0.08);
                    border-radius:20px;
                    overflow:hidden;
                    transition:all 0.25s ease;
                    height:100%;
                    position:relative;
                    box-shadow:0 8px 25px rgba(0,0,0,0.28);
                }

                .book-card:hover{
                    transform:translateY(-5px);
                    box-shadow:0 15px 35px rgba(59,130,246,0.18);
                }

                .book-card::before{
                    content:'';
                    position:absolute;
                    top:0;
                    left:18%;
                    right:18%;
                    height:2px;
                    background:linear-gradient(
                        90deg,
                        transparent,
                        rgba(96,165,250,0.7),
                        transparent
                    );
                }

                .book-cover-box{
                    height:170px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    background:
                        linear-gradient(
                            135deg,
                            rgba(59,130,246,0.12),
                            rgba(15,23,42,0.65)
                        );
                    overflow:hidden;
                    padding:10px;
                }

                .book-cover-box img{
                    max-height:140px;
                    max-width:100%;
                    object-fit:contain;
                    transition:0.3s;
                    filter:drop-shadow(0 8px 16px rgba(0,0,0,0.35));
                }

                .book-card:hover .book-cover-box img{
                    transform:scale(1.04);
                }

                .book-placeholder{
                    width:90px;
                    height:120px;
                    border-radius:14px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    text-align:center;
                    padding:0.8rem;
                    background:rgba(255,255,255,0.06);
                    color:rgba(255,255,255,0.55);
                    border:1px dashed rgba(255,255,255,0.15);
                    font-size:0.75rem;
                }

                .book-content{
                    padding:1rem;
                }

                .book-title{
                    color:#ffffff;
                    font-weight:700;
                    margin-bottom:0.4rem;
                    font-size:0.98rem;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                }

                .book-meta{
                    color:rgba(255,255,255,0.68);
                    font-size:0.82rem;
                    margin-bottom:0.35rem;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                }

                .book-meta i{
                    color:#60a5fa;
                    margin-right:6px;
                }

                .book-category{
                    display:inline-flex;
                    align-items:center;
                    gap:5px;
                    background:rgba(59,130,246,0.12);
                    border:1px solid rgba(96,165,250,0.2);
                    color:#bfdbfe;
                    padding:0.35rem 0.7rem;
                    border-radius:999px;
                    font-size:0.72rem;
                    margin-top:0.3rem;
                }

                .book-footer{
                    margin-top:0.9rem;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    gap:10px;
                    flex-wrap:wrap;
                }

                .book-price{
                    color:#4ade80;
                    font-weight:700;
                    font-size:0.95rem;
                }

                .availability-badge{
                    padding:0.4rem 0.75rem;
                    border-radius:999px;
                    font-size:0.7rem;
                    font-weight:600;
                }

                .available{
                    background:rgba(16,185,129,0.12);
                    border:1px solid rgba(16,185,129,0.2);
                    color:#6ee7b7;
                }

                .not-available{
                    background:rgba(239,68,68,0.12);
                    border:1px solid rgba(239,68,68,0.2);
                    color:#fca5a5;
                }

                .loader-box{
                    background:rgba(15,23,42,0.68);
                    border-radius:20px;
                    padding:3rem;
                    text-align:center;
                    border:1px solid rgba(255,255,255,0.08);
                }

                .empty-box{
                    background:rgba(15,23,42,0.68);
                    border-radius:20px;
                    padding:3rem 2rem;
                    border:1px solid rgba(255,255,255,0.08);
                    text-align:center;
                    color:#fff;
                }

                .empty-box i{
                    color:rgba(255,255,255,0.45);
                }

                @media(max-width:768px){

                    .search-box{
                        width:100%;
                        margin-top:1rem;
                    }

                    .books-glass-header{
                        padding:1rem;
                    }

                    .book-cover-box{
                        height:150px;
                    }

                    .book-cover-box img{
                        max-height:120px;
                    }
                }

            `}</style>

            <div className="student-books-page">

                <div className="container position-relative">

                    <div className="books-glass-header">

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                            <div>

                                <h3 className="books-title">
                                    <i className="fa-solid fa-book-open me-2 text-info"></i>
                                    Available Books
                                </h3>

                                <p className="books-subtitle">
                                    Browse through the library collection instantly
                                </p>

                            </div>

                            <div className="search-box">

                                <i className="fa-solid fa-magnifying-glass"></i>

                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search books..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                            </div>

                        </div>

                    </div>

                    {loading && (

                        <div className="loader-box">

                            <div className="spinner-border text-info"></div>

                            <p className="text-light mt-3 mb-0">
                                Loading Books...
                            </p>

                        </div>

                    )}

                    {!loading && filtered.length === 0 && (

                        <div className="empty-box">

                            <i className="fa-solid fa-book-open-reader fa-4x mb-4"></i>

                            <h4>No Books Found</h4>

                            <p className="text-light opacity-75 mb-0">
                                Try searching with another keyword
                            </p>

                        </div>

                    )}

                    {!loading && filtered.length > 0 && (

                        <div className="row g-3">

                            {filtered.map((book) => (

                                <div className="col-xl-3 col-lg-4 col-md-6" key={book.id}>

                                    <div className="book-card">

                                        <div className="book-cover-box">

                                            {getCoverUrl(book) ? (

                                                <img
                                                    src={getCoverUrl(book)}
                                                    alt={book.title}
                                                />

                                            ) : (

                                                <div className="book-placeholder">
                                                    No Cover
                                                </div>

                                            )}

                                        </div>

                                        <div className="book-content">

                                            <h5 className="book-title">
                                                {book.title}
                                            </h5>

                                            <p className="book-meta">
                                                <i className="fa-solid fa-user"></i>
                                                {book.author_name}
                                            </p>

                                            <p className="book-meta">
                                                <i className="fa-solid fa-barcode"></i>
                                                {book.isbn}
                                            </p>

                                            <div className="book-category">
                                                <i className="fa-solid fa-layer-group"></i>
                                                {book.category_name}
                                            </div>

                                            <div className="book-footer">

                                                <div className="book-price">
                                                    ₹{book.price}/-
                                                </div>

                                                <div
                                                    className={`availability-badge ${
                                                        book.available_quantity > 0
                                                            ? 'available'
                                                            : 'not-available'
                                                    }`}
                                                >
                                                    {
                                                        book.available_quantity > 0
                                                            ? `${book.available_quantity} Left`
                                                            : 'Unavailable'
                                                    }
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>
        </>
    );
};

export default StudentBooks;