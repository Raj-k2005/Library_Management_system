import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ManageStudents = () => {

    const [students, setStudents] = useState([]);
    const [loadingList, setLoadingList] = useState(false);

    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {

        if (!adminUser) {

            navigate('/admin/login');

        } else {

            fetchStudents();
        }

    }, []);

    const fetchStudents = async () => {

        setLoadingList(true);

        try {

            const res = await axios.get(
                "http://127.0.0.1:8000/api/admin/students/"
            );

            setStudents(res.data);

        } catch (err) {

            const message =
                err?.response?.data?.message ||
                "Failed to load Students";

            toast.error(message);

        } finally {

            setLoadingList(false);
        }
    };

    const handleToggleStatus = async (student) => {

        const isCurrentlyActive = student.is_active;

        const url = isCurrentlyActive
            ? `http://127.0.0.1:8000/api/admin/block_students/${student.id}/`
            : `http://127.0.0.1:8000/api/admin/activate_students/${student.id}/`;

        const confirmMessage = isCurrentlyActive
            ? `You sure want to block ${student.full_name}?`
            : `Want to activate ${student.full_name}?`;

        if (!window.confirm(confirmMessage)) {
            return;
        }

        try {

            await axios.post(url);

            toast.success(
                isCurrentlyActive
                    ? "Student Blocked"
                    : "Student Activated"
            );

            fetchStudents();

        } catch (err) {

            console.error(err);
            toast.error("Failed to update user");
        }
    };

    return (
        <>
            <style>{`

                /* ───────── PAGE ───────── */

                .students-page{
                    min-height:100vh;
                    background:
                        radial-gradient(circle at 20% 20%, rgba(79,70,229,0.18), transparent 30%),
                        radial-gradient(circle at 80% 70%, rgba(14,165,233,0.14), transparent 30%),
                        linear-gradient(160deg,#0a0f2c 0%, #0d1b3e 50%, #091426 100%);
                    padding:40px 20px;
                    position:relative;
                    overflow:hidden;
                }

                .students-page::before{
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

                .students-header{
                    background:rgba(15,23,50,0.58);
                    backdrop-filter:blur(24px) saturate(180%);
                    -webkit-backdrop-filter:blur(24px) saturate(180%);
                    border:1px solid rgba(99,179,237,0.14);
                    border-radius:22px;
                    padding:1.5rem 2rem;
                    margin-bottom:2rem;
                    box-shadow:
                        0 20px 50px rgba(0,0,0,0.35),
                        inset 0 1px 0 rgba(255,255,255,0.04);
                    position:relative;
                    overflow:hidden;
                }

                .students-header::before{
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

                .students-title{
                    color:#e2eaf8;
                    font-weight:700;
                    margin-bottom:0.3rem;
                }

                .students-subtitle{
                    color:rgba(148,197,255,0.65);
                    margin-bottom:0;
                    font-size:0.9rem;
                }

                /* ───────── BUTTON ───────── */

                .glass-btn{
                    background:linear-gradient(135deg,#4f46e5,#0ea5e9);
                    border:none;
                    color:#fff;
                    padding:0.7rem 1rem;
                    border-radius:12px;
                    font-size:0.9rem;
                    font-weight:600;
                    box-shadow:0 6px 22px rgba(79,70,229,0.35);
                    transition:all 0.25s ease;
                }

                .glass-btn:hover{
                    transform:translateY(-2px);
                    opacity:0.92;
                }

                /* ───────── CARD ───────── */

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
                    letter-spacing:0.05em;
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

                /* ───────── STATUS BADGES ───────── */

                .status-active{
                    background:rgba(16,185,129,0.15);
                    color:#4ade80;
                    border:1px solid rgba(16,185,129,0.25);
                    padding:0.45rem 0.8rem;
                    border-radius:999px;
                    font-size:0.75rem;
                    font-weight:600;
                }

                .status-inactive{
                    background:rgba(239,68,68,0.15);
                    color:#f87171;
                    border:1px solid rgba(239,68,68,0.25);
                    padding:0.45rem 0.8rem;
                    border-radius:999px;
                    font-size:0.75rem;
                    font-weight:600;
                }

                /* ───────── ACTION BUTTONS ───────── */

                .action-btn{
                    border:none;
                    border-radius:10px;
                    padding:0.45rem 0.85rem;
                    font-size:0.8rem;
                    font-weight:600;
                    transition:all 0.2s ease;
                }

                .block-btn{
                    background:rgba(239,68,68,0.14);
                    color:#f87171;
                    border:1px solid rgba(239,68,68,0.2);
                }

                .activate-btn{
                    background:rgba(16,185,129,0.14);
                    color:#4ade80;
                    border:1px solid rgba(16,185,129,0.2);
                }

                .details-btn{
                    background:rgba(59,130,246,0.14);
                    color:#60a5fa;
                    border:1px solid rgba(59,130,246,0.2);
                }

                .action-btn:hover{
                    transform:translateY(-1px);
                    opacity:0.92;
                }

                /* ───────── LOADER ───────── */

                .glass-loader{
                    padding:3rem;
                    text-align:center;
                }

                /* ───────── EMPTY ───────── */

                .empty-text{
                    color:rgba(148,197,255,0.65);
                    text-align:center;
                    padding:2rem;
                }

            `}</style>

            <div className="students-page">

                <div className="container position-relative">

                    {/* Header */}

                    <div className="students-header">

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                            <div>

                                <h3 className="students-title">
                                    <i className="fa-solid fa-user-graduate me-2 text-info"></i>
                                    Manage Students
                                </h3>

                                <p className="students-subtitle">
                                    View, activate or block students from the library system
                                </p>

                            </div>

                            <button
                                className="glass-btn"
                                onClick={() =>
                                    navigate('/admin/issue-books')
                                }
                            >
                                <i className="fa-solid fa-arrow-right me-2"></i>
                                Issued Books
                            </button>

                        </div>

                    </div>

                    {/* Table Card */}

                    <div className="glass-card">

                        <div className="p-4">

                            {loadingList ? (

                                <div className="glass-loader">

                                    <div className="spinner-border text-info"></div>

                                </div>

                            ) : students.length === 0 ? (

                                <p className="empty-text">
                                    No Students Found
                                </p>

                            ) : (

                                <div className="table-responsive">

                                    <table className="table glass-table">

                                        <thead>

                                            <tr>
                                                <th>SI/No</th>
                                                <th>Student ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Mobile</th>
                                                <th>Reg Date</th>
                                                <th>Status</th>
                                                <th className="text-center">
                                                    Actions
                                                </th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {students.map((student, index) => (

                                                <tr key={student.id}>

                                                    <td>{index + 1}</td>

                                                    <td>
                                                        {student.student_id}
                                                    </td>

                                                    <td>
                                                        {student.full_name}
                                                    </td>

                                                    <td>
                                                        {student.email}
                                                    </td>

                                                    <td>
                                                        {student.mobile}
                                                    </td>

                                                    <td>
                                                        {student.created_at
                                                            ? new Date(
                                                                student.created_at
                                                            ).toLocaleDateString()
                                                            : "-"}
                                                    </td>

                                                    <td>

                                                        {student.is_active ? (

                                                            <span className="status-active">
                                                                Active
                                                            </span>

                                                        ) : (

                                                            <span className="status-inactive">
                                                                Inactive
                                                            </span>

                                                        )}

                                                    </td>

                                                    <td className="text-center">

                                                        <div className="d-flex justify-content-center gap-2">

                                                            <button
                                                                className={
                                                                    student.is_active
                                                                        ? "action-btn block-btn"
                                                                        : "action-btn activate-btn"
                                                                }
                                                                onClick={() =>
                                                                    handleToggleStatus(student)
                                                                }
                                                            >
                                                                {student.is_active
                                                                    ? "Block"
                                                                    : "Activate"}
                                                            </button>

                                                            <button
                                                                className="action-btn details-btn"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/students/${student.student_id}/history`
                                                                    )
                                                                }
                                                            >
                                                                Details
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
        </>
    );
};

export default ManageStudents;