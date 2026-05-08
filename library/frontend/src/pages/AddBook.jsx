import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AddBook = () => {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [coverFile, setCoverFile] = useState(null);

    // dropdowns
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingDropdowns, setLoadingDropdowns] = useState(false);

    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {

        if (!adminUser) {

            navigate('/admin/login');

        } else {

            fetchDropdownData();
        }

    }, []);

    const fetchDropdownData = async () => {

        setLoadingDropdowns(true);

        try {

            const [authRes, catRes] = await Promise.all([
                axios.get("http://127.0.0.1:8000/api/authors/"),
                axios.get("http://127.0.0.1:8000/api/categories/")
            ]);

            const activeCats = (catRes.data).filter((c) => c.is_active);

            setCategories(activeCats);
            setAuthors(authRes.data);

        } catch (err) {

            const message =
                err?.response?.data?.message || "Something went wrong";

            toast.error(message);

        } finally {

            setLoadingDropdowns(false);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        const formdata = new FormData();

        formdata.append("title", title);
        formdata.append("category", category);
        formdata.append("author", author);
        formdata.append("isbn", isbn);
        formdata.append("price", price);
        formdata.append("quantity", quantity);
        formdata.append("description", description);

        if (coverFile) {
            formdata.append("cover_image", coverFile);
        }

        try {

            const res = await axios.post(
                "http://127.0.0.1:8000/api/books/add/",
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (res.data.success) {

                toast.success(
                    res.data.message || "Book created successfully"
                );

                setTitle("");
                setCategory("");
                setAuthor("");
                setIsbn("");
                setDescription("");
                setPrice("");
                setQuantity("");
                setCoverFile(null);

                fetchDropdownData();

            } else {

                toast.error(
                    res.data.message || "Something went wrong"
                );
            }

        } catch (err) {

            toast.error('Failed to Create Book');

        } finally {

            setLoading(false);
        }
    };

    return (
        <>
            <style>{`

                .book-page{
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
                .glass-select{
                    background:rgba(255,255,255,0.06)!important;
                    border:1px solid rgba(99,179,237,0.18)!important;
                    border-radius:12px!important;
                    color:#fff!important;
                    padding:12px 14px!important;
                    transition:0.25s ease;
                }

                .glass-input::placeholder,
                textarea::placeholder{
                    color:rgba(180,210,255,0.4)!important;
                }

                .glass-input:focus,
                .glass-select:focus{
                    background:rgba(255,255,255,0.08)!important;
                    border-color:rgba(99,179,237,0.55)!important;
                    box-shadow:0 0 0 4px rgba(59,130,246,0.12)!important;
                    color:#fff!important;
                }

                .glass-select option{
                    background:#0d1b3e;
                    color:#fff;
                }

                .glass-btn{
                    background:linear-gradient(135deg,#4f46e5,#0ea5e9)!important;
                    border:none!important;
                    border-radius:12px!important;
                    color:#fff!important;
                    font-weight:600;
                    padding:12px 18px!important;
                    transition:0.25s ease;
                    box-shadow:0 10px 25px rgba(79,70,229,0.35);
                }

                .glass-btn:hover{
                    transform:translateY(-1px);
                    box-shadow:0 14px 28px rgba(14,165,233,0.35);
                }

                .small-note{
                    color:rgba(180,210,255,0.6);
                    font-size:0.78rem;
                    margin-top:5px;
                }

                @media (max-width:768px){

                    .book-page{
                        padding:20px 10px;
                    }

                    .glass-title{
                        font-size:1.4rem;
                    }

                }

            `}</style>

            <div className='book-page'>

                <div className='container'>

                    {/* Header */}

                    <div className='row mb-4'>

                        <div className='col-md-10 mx-auto d-flex justify-content-between align-items-center flex-wrap gap-3'>

                            <div>

                                <h2 className='glass-title mb-1'>
                                    <i className='fa-solid fa-book-open me-2 text-info'></i>
                                    Add Books
                                </h2>

                                <p className='glass-subtitle mb-0'>
                                    Create books and manage your library collection
                                </p>

                            </div>

                            <button
                                className='btn glass-btn'
                                onClick={() => navigate('/admin/book_manage')}
                            >
                                <i className='fa-solid fa-gear me-2'></i>
                                Manage Books
                            </button>

                        </div>

                    </div>

                    {/* Form */}

                    <div className='row justify-content-center'>

                        <div className='col-lg-10'>

                            <div className='glass-card'>

                                <div className='card-body p-4 p-md-5'>

                                    {loadingDropdowns ? (

                                        <div className='text-center py-5'>

                                            <div className='spinner-border text-info'></div>

                                        </div>

                                    ) : (

                                        <form onSubmit={handleSubmit}>

                                            <div className='row g-4'>

                                                {/* Book Name */}

                                                <div className='col-md-6'>

                                                    <label className='glass-label'>
                                                        Book Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className='form-control glass-input'
                                                        placeholder='e.g. The Alchemist'
                                                        required
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                    />

                                                </div>

                                                {/* Category */}

                                                <div className='col-md-6'>

                                                    <label className='glass-label'>
                                                        Category
                                                    </label>

                                                    <select
                                                        className='form-select glass-select'
                                                        required
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                    >

                                                        <option value=''>
                                                            -- Select Category --
                                                        </option>

                                                        {categories.map((cat) => (

                                                            <option
                                                                key={cat.id}
                                                                value={cat.id}
                                                            >
                                                                {cat.name}
                                                            </option>

                                                        ))}

                                                    </select>

                                                </div>

                                                {/* Author */}

                                                <div className='col-md-6'>

                                                    <label className='glass-label'>
                                                        Author
                                                    </label>

                                                    <select
                                                        className='form-select glass-select'
                                                        required
                                                        value={author}
                                                        onChange={(e) => setAuthor(e.target.value)}
                                                    >

                                                        <option value=''>
                                                            -- Select Author --
                                                        </option>

                                                        {authors.map((auth) => (

                                                            <option
                                                                key={auth.id}
                                                                value={auth.id}
                                                            >
                                                                {auth.name}
                                                            </option>

                                                        ))}

                                                    </select>

                                                </div>

                                                {/* ISBN */}

                                                <div className='col-md-6'>

                                                    <label className='glass-label'>
                                                        ISBN
                                                    </label>

                                                    <input
                                                        type='text'
                                                        className='form-control glass-input'
                                                        placeholder='e.g. 978-3-16-148410-0'
                                                        required
                                                        value={isbn}
                                                        onChange={(e) => setIsbn(e.target.value)}
                                                    />

                                                    <p className='small-note mb-0'>
                                                        ISBN must be unique for each book
                                                    </p>

                                                </div>

                                                {/* Price */}

                                                <div className='col-md-4'>

                                                    <label className='glass-label'>
                                                        Price
                                                    </label>

                                                    <input
                                                        type='number'
                                                        className='form-control glass-input'
                                                        placeholder='e.g. 499'
                                                        required
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                    />

                                                </div>

                                                {/* Quantity */}

                                                <div className='col-md-4'>

                                                    <label className='glass-label'>
                                                        Quantity
                                                    </label>

                                                    <input
                                                        type='number'
                                                        className='form-control glass-input'
                                                        min={'0'}
                                                        step={'1'}
                                                        placeholder='e.g. 10'
                                                        required
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                    />

                                                </div>

                                                {/* Cover */}

                                                <div className='col-md-4'>

                                                    <label className='glass-label'>
                                                        Cover Image
                                                    </label>

                                                    <input
                                                        type='file'
                                                        className='form-control glass-input'
                                                        accept='image/*'
                                                        required
                                                        onChange={(e) =>
                                                            setCoverFile(e.target.files[0])
                                                        }
                                                    />

                                                </div>

                                                {/* Description */}

                                                <div className='col-12'>

                                                    <label className='glass-label'>
                                                        Description
                                                    </label>

                                                    <textarea
                                                        className='form-control glass-input'
                                                        rows='5'
                                                        placeholder='Write short description about the book...'
                                                        value={description}
                                                        onChange={(e) =>
                                                            setDescription(e.target.value)
                                                        }
                                                    ></textarea>

                                                </div>

                                            </div>

                                            {/* Submit */}

                                            <div className='mt-4'>

                                                <button
                                                    type='submit'
                                                    className='btn glass-btn w-100'
                                                    disabled={loading}
                                                >

                                                    {loading ? (

                                                        <>
                                                            <span className='spinner-border spinner-border-sm me-2'></span>
                                                            Submitting...
                                                        </>

                                                    ) : (

                                                        <>
                                                            <i className='fa-solid fa-check me-2'></i>
                                                            Add Book
                                                        </>

                                                    )}

                                                </button>

                                            </div>

                                        </form>

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

export default AddBook;