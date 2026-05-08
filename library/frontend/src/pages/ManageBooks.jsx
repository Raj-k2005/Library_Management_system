import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ManageBooks = () => {

    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);

    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editAuthor, setEditAuthor] = useState("");
    const [editPrice, setEditPrice] = useState('');
    const [editQuantity, setEditQuantity] = useState('');

    const [editImageFile, setEditImageFile] = useState(null);
    const [editImagePreview, setEditImagePreview] = useState(null);

    const [loadingList, setLoadingList] = useState(false);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {

        if (!adminUser) {

            navigate('/admin/login');

        } else {

            fetchAll();
        }

    }, []);

    const fetchAll = async () => {

        setLoadingList(true);

        try {

            const [booksRes, categoriesRes, authorsRes] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/books/'),
                axios.get('http://127.0.0.1:8000/api/categories/'),
                axios.get('http://127.0.0.1:8000/api/authors/')
            ]);

            setBooks(booksRes.data);
            setCategories(categoriesRes.data);
            setAuthors(authorsRes.data);

        } catch (err) {

            const message =
                err?.response?.data?.message || "Failed to load books";

            toast.error(message);

        } finally {

            setLoadingList(false);
        }
    };

    const startEdit = (book) => {

        setEditId(book.id);
        setEditTitle(book.title);
        setEditCategory(book.category);
        setEditAuthor(book.author);
        setEditPrice(book.price);
        setEditQuantity(book.quantity);

        setEditImagePreview(
            `http://127.0.0.1:8000${book.cover_image}`
        );

        setEditImageFile(null);
    };

    const cancelEdit = () => {

        setEditId(null);
        setEditTitle('');
        setEditCategory('');
        setEditAuthor('');
        setEditPrice('');
        setEditQuantity('');
        setEditImagePreview(null);
        setEditImageFile(null);
    };

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            setEditImageFile(file);
            setEditImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {

        e.preventDefault();
        setSaving(true);

        try {

            const formData = new FormData();

            formData.append("title", editTitle);
            formData.append("category", editCategory);
            formData.append("author", editAuthor);
            formData.append("price", editPrice);
            formData.append("quantity", editQuantity);

            if (editImageFile) {

                formData.append('cover_image', editImageFile);
            }

            const res = await axios.put(
                `http://127.0.0.1:8000/api/update_book/${editId}/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (res.data.success) {

                toast.success(
                    res.data.message || "Updated Successfully"
                );

                cancelEdit();
                fetchAll();

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
                `http://127.0.0.1:8000/api/delete_book/${id}/`
            );

            if (res.data.success) {

                toast.success(
                    res.data.message || "Deleted Successfully"
                );

                setBooks((prev) =>
                    prev.filter((c) => c.id !== id)
                );

                if (editId === id) {

                    cancelEdit();
                }

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

                .book-image{
                    width:70px;
                    height:90px;
                    object-fit:cover;
                    border-radius:10px;
                    border:1px solid rgba(255,255,255,0.08);
                }

                .edit-preview{
                    width:140px;
                    border-radius:14px;
                    border:1px solid rgba(255,255,255,0.08);
                }

                .glass-text{
                    color:#dbeafe;
                }

                .glass-muted{
                    color:rgba(180,210,255,0.7);
                    font-size:0.85rem;
                }

                .action-btn{
                    border-radius:10px!important;
                    font-size:0.82rem!important;
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
                                    Manage Books
                                </h2>

                                <p className='glass-subtitle mb-0'>
                                    Update or remove books from your library
                                </p>

                            </div>

                            <button
                                className='btn glass-btn'
                                onClick={() => navigate('/admin/book_add')}
                            >
                                <i className='fa-solid fa-plus me-2'></i>
                                Add New Book
                            </button>

                        </div>

                    </div>

                    <div className='row g-4'>

                        {/* Edit Section */}

                        <div className='col-lg-4'>

                            <div className='glass-card h-100'>

                                <div className='card-body p-4'>

                                    <h5 className='section-title mb-4'>

                                        {editId
                                            ? "Edit Book"
                                            : "Select a Book"}

                                    </h5>

                                    {editId ? (

                                        <form onSubmit={handleUpdate}>

                                            <div className='row g-3'>

                                                <div className='col-12'>

                                                    <label className='glass-label'>
                                                        Book Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className='form-control glass-input'
                                                        value={editTitle}
                                                        onChange={(e) =>
                                                            setEditTitle(e.target.value)
                                                        }
                                                        required
                                                    />

                                                </div>

                                                <div className='col-md-6'>

                                                    <label className='glass-label'>
                                                        Category
                                                    </label>

                                                    <select
                                                        className='form-select glass-select'
                                                        value={editCategory}
                                                        onChange={(e) =>
                                                            setEditCategory(e.target.value)
                                                        }
                                                    >

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

                                                <div className='col-md-6'>

                                                    <label className='glass-label'>
                                                        Author
                                                    </label>

                                                    <select
                                                        className='form-select glass-select'
                                                        value={editAuthor}
                                                        onChange={(e) =>
                                                            setEditAuthor(e.target.value)
                                                        }
                                                    >

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

                                                <div className='col-md-6'>

                                                    <label className='glass-label'>
                                                        Price
                                                    </label>

                                                    <input
                                                        type='number'
                                                        className='form-control glass-input'
                                                        value={editPrice}
                                                        onChange={(e) =>
                                                            setEditPrice(e.target.value)
                                                        }
                                                    />

                                                </div>

                                                <div className='col-md-6'>

                                                    <label className='glass-label'>
                                                        Quantity
                                                    </label>

                                                    <input
                                                        type='number'
                                                        className='form-control glass-input'
                                                        value={editQuantity}
                                                        onChange={(e) =>
                                                            setEditQuantity(e.target.value)
                                                        }
                                                    />

                                                </div>

                                                <div className='col-12'>

                                                    <label className='glass-label'>
                                                        Cover Image
                                                    </label>

                                                    {editImagePreview && (

                                                        <div className='mb-3'>

                                                            <img
                                                                src={editImagePreview}
                                                                alt='Preview'
                                                                className='img-fluid edit-preview'
                                                            />

                                                        </div>

                                                    )}

                                                    <input
                                                        type='file'
                                                        className='form-control glass-input'
                                                        accept='image/*'
                                                        onChange={handleImageChange}
                                                    />

                                                </div>

                                            </div>

                                            <div className='d-flex gap-2 mt-4'>

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
                                                            <i className='fa-solid fa-check me-2'></i>
                                                            Update
                                                        </>

                                                    )}

                                                </button>

                                                <button
                                                    type='button'
                                                    className='btn btn-secondary w-100'
                                                    onClick={cancelEdit}
                                                >
                                                    Cancel
                                                </button>

                                            </div>

                                        </form>

                                    ) : (

                                        <p className='glass-muted mb-0'>
                                            Select a book from the list to edit
                                        </p>

                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Books Table */}

                        <div className='col-lg-8'>

                            <div className='glass-card'>

                                <div className='card-body p-4'>

                                    <h5 className='section-title mb-4'>
                                        Books List
                                    </h5>

                                    {loadingList ? (

                                        <div className='text-center py-5'>

                                            <div className='spinner-border text-info'></div>

                                        </div>

                                    ) : books.length === 0 ? (

                                        <p className='glass-muted'>
                                            No Books Found
                                        </p>

                                    ) : (

                                        <div className='table-responsive'>

                                            <table className='table glass-table align-middle'>

                                                <thead>

                                                    <tr>
                                                        <th>SI/No</th>
                                                        <th>Book</th>
                                                        <th>Category</th>
                                                        <th>Author</th>
                                                        <th>ISBN</th>
                                                        <th>Price</th>
                                                        <th>Qty</th>
                                                        <th>Actions</th>
                                                    </tr>

                                                </thead>

                                                <tbody>

                                                    {books.map((book, index) => (

                                                        <tr key={book.id}>

                                                            <td>{index + 1}</td>

                                                            <td style={{ minWidth: '220px' }}>

                                                                <div className='d-flex gap-3 align-items-center'>

                                                                    <img
                                                                        src={`http://127.0.0.1:8000${book.cover_image}`}
                                                                        alt={book.title}
                                                                        className='book-image'
                                                                    />

                                                                    <div>

                                                                        <div className='fw-semibold glass-text'>
                                                                            {book.title}
                                                                        </div>

                                                                    </div>

                                                                </div>

                                                            </td>

                                                            <td>{book.category_name}</td>

                                                            <td>{book.author_name}</td>

                                                            <td>{book.isbn}</td>

                                                            <td>₹ {book.price}</td>

                                                            <td>{book.quantity}</td>

                                                            <td>

                                                                <div className='d-flex gap-2'>

                                                                    <button
                                                                        className='btn btn-outline-primary btn-sm action-btn'
                                                                        onClick={() => startEdit(book)}
                                                                    >
                                                                        <i className='fa-solid fa-pen-to-square me-1'></i>
                                                                        Edit
                                                                    </button>

                                                                    <button
                                                                        className='btn btn-outline-danger btn-sm action-btn'
                                                                        onClick={() => handleDelete(book.id)}
                                                                    >
                                                                        <i className='fa-solid fa-trash me-1'></i>
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

export default ManageBooks;