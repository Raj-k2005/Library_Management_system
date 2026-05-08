import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';

const StudentHistory = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const adminUser = localStorage.getItem('adminUser');

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
            return;
        }
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `http://127.0.0.1:8000/api/admin/student-history/${studentId}/`
            );
            setStudent(res.data.student);
            setIssues(res.data.issues);
        } catch (err) {
            toast.error("Failed to load student details");
        } finally {
            setLoading(false);
        }
    };

    const total = issues.length;
    const returned = issues.filter(i => i.is_returned).length;
    const pending = issues.filter(i => !i.is_returned).length;
    const fine = issues.reduce((sum, i) => sum + (i.fine || 0), 0);

    return (
        <>
            <style>{`
                .page {
                    min-height: 100vh;
                    padding: 40px 20px;
                    background:
                        radial-gradient(circle at top left, rgba(59,130,246,0.2), transparent 35%),
                        radial-gradient(circle at bottom right, rgba(16,185,129,0.15), transparent 35%),
                        linear-gradient(135deg,#0b1020,#0f172a,#111827);
                }

                .glass {
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.08);
                    backdrop-filter: blur(18px);
                    border-radius: 18px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.35);
                    color: white;
                }

                .stat-card {
                    padding: 16px;
                    transition: 0.3s;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                }

                .icon-circle {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                table {
                    color: white !important;
                }

                th, td {
                    border-color: rgba(255,255,255,0.1) !important;
                }

                .header-title {
                    font-weight: 700;
                }

                .sub-text {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.9rem;
                }
            `}</style>

            <div className="page">

                <div className="container">

                    {/* HEADER */}
                    <div className="glass p-3 mb-4 d-flex justify-content-between align-items-center flex-wrap">

                        <div>
                            <h4 className="header-title">
                                <i className="fa-solid fa-user text-info me-2"></i>
                                Student History
                            </h4>

                            <div className="sub-text">
                                {student
                                    ? `${student.full_name} (${student.student_id})`
                                    : "Loading student details..."}
                            </div>
                        </div>

                        <button
                            className="btn btn-outline-info mt-2 mt-md-0"
                            onClick={() => navigate('/admin/manage_students')}
                        >
                            <i className="fa-solid fa-arrow-left me-1"></i>
                            Back
                        </button>

                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="text-center py-5">
                            <div className="spinner-border text-info"></div>
                        </div>
                    )}

                    {/* STATS */}
                    {!loading && (
                        <div className="row g-4 mb-4">

                            <div className="col-md-3">
                                <div className="glass stat-card d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className="sub-text">Total Books</div>
                                        <h4>{total}</h4>
                                    </div>
                                    <div className="icon-circle bg-primary bg-opacity-25">
                                        <i className="fa-solid fa-book text-primary"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="glass stat-card d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className="sub-text">Returned</div>
                                        <h4>{returned}</h4>
                                    </div>
                                    <div className="icon-circle bg-success bg-opacity-25">
                                        <i className="fa-solid fa-check text-success"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="glass stat-card d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className="sub-text">Pending</div>
                                        <h4>{pending}</h4>
                                    </div>
                                    <div className="icon-circle bg-warning bg-opacity-25">
                                        <i className="fa-solid fa-clock text-warning"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="glass stat-card d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className="sub-text">Total Fine</div>
                                        <h4>₹{fine}</h4>
                                    </div>
                                    <div className="icon-circle bg-danger bg-opacity-25">
                                        <i className="fa-solid fa-indian-rupee-sign text-danger"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* EMPTY STATE */}
                    {!loading && issues.length === 0 && (
                        <div className="glass text-center p-5">
                            <i className="fa-solid fa-book-open fa-3x text-secondary mb-3"></i>
                            <h5>No Issued Books Found</h5>
                            <p className="text-white-50">
                                This student has not issued any books yet.
                            </p>
                        </div>
                    )}

                    {/* TABLE */}
                    {!loading && issues.length > 0 && (
                        <div className="glass p-3 table-responsive">

                            <table className="table table-hover align-middle">

                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Book</th>
                                        <th>Issued Date</th>
                                        <th>Return Date</th>
                                        <th>Status</th>
                                        <th>Fine</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {issues.map((issue, index) => (
                                        <tr key={issue.id}>
                                            <td>{index + 1}</td>
                                            <td className="fw-semibold">{issue.book_title}</td>
                                            <td>{new Date(issue.issued_at).toLocaleDateString()}</td>
                                            <td>
                                                {issue.is_returned
                                                    ? new Date(issue.return_at).toLocaleDateString()
                                                    : "Not returned"}
                                            </td>
                                            <td>
                                                {issue.is_returned ? (
                                                    <span className="badge bg-success">Returned</span>
                                                ) : (
                                                    <span className="badge bg-warning text-dark">Pending</span>
                                                )}
                                            </td>
                                            <td>
                                                {issue.fine > 0 ? (
                                                    <span className="badge bg-danger">
                                                        ₹{issue.fine}
                                                    </span>
                                                ) : (
                                                    <span className="text-success">₹0</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default StudentHistory;