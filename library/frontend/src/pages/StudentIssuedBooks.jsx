import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area
} from 'recharts';

const StudentIssuedBooks = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [issuedBooks, setIssuedBooks] = useState([]);

  const studentUser = JSON.parse(localStorage.getItem('studentUser'));

  useEffect(() => {

    if (!studentUser) {
      navigate('/user/login');
      return;
    }

    const fetchIssuedBooks = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://127.0.0.1:8000/api/user_issued_books/",
          { params: { student_id: studentUser.student_id } }
        );

        setIssuedBooks(res.data);

      } catch (err) {
        toast.error("Failed to fetch Issued Books");
      } finally {
        setLoading(false);
      }
    };

    fetchIssuedBooks();

  }, []);

  const totalIssuedBooks = issuedBooks.length;
  const notreturnedCount = issuedBooks.filter(i => !i.is_returned).length;
  const returnedCount = issuedBooks.filter(i => i.is_returned).length;
  const totalFine = issuedBooks.reduce((sum, i) => sum + (i.fine || 0), 0);

  // Charts data
  const pieData = [
    { name: 'Returned', value: returnedCount },
    { name: 'Not Returned', value: notreturnedCount }
  ];

  const barData = [
    { name: 'Issued', value: totalIssuedBooks },
    { name: 'Returned', value: returnedCount },
    { name: 'Pending', value: notreturnedCount }
  ];

  const areaData = [
    { name: 'Issued', value: totalIssuedBooks },
    { name: 'Returned', value: returnedCount },
    { name: 'Pending', value: notreturnedCount }
  ];

  const fineData = [
    { name: 'Fine', value: totalFine }
  ];

  const COLORS = ['#22c55e', '#f59e0b'];

  return (
    <>
      <style>{`

        .page {
          min-height: 100vh;
          padding: 40px 20px;
          background:
            radial-gradient(circle at top left, rgba(59,130,246,0.20), transparent 30%),
            radial-gradient(circle at bottom right, rgba(16,185,129,0.15), transparent 30%),
            linear-gradient(135deg,#0b1020,#0f172a,#111827);
        }

        .glass {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.35);
        }

        /* TOP CARDS */
        .stat-card {
          padding: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-value {
          font-size: 1.6rem;
          font-weight: 700;
          color: white;
        }

        .stat-label {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
        }

        /* 🔥 ROUND ICONS */
        .icon-box {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: white;
          box-shadow: 0 10px 25px rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.15);
        }

        .icon-blue {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        }

        .icon-green {
          background: linear-gradient(135deg, #22c55e, #15803d);
        }

        .icon-yellow {
          background: linear-gradient(135deg, #f59e0b, #b45309);
        }

        .icon-red {
          background: linear-gradient(135deg, #ef4444, #991b1b);
        }

        .chart-card {
          padding: 18px;
        }

        .title {
          color: white;
          font-weight: 700;
        }

      `}</style>

      <div className="page">

        <div className="container">

          {/* HEADER */}
          <div className="glass p-3 mb-4 d-flex justify-content-between align-items-center">
            <div>
              <h4 className="title">Issued Books Analytics</h4>
              <small className="text-white-50">
                Visual insights of your library activity
              </small>
            </div>
          </div>

          {/* LOADER */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-info"></div>
            </div>
          )}

          {/* TOP STATS */}
          {!loading && (
            <div className="row g-4 mb-4">

              {/* Issued */}
              <div className="col-md-3">
                <div className="glass stat-card">
                  <div>
                    <div className="stat-label">Total Issued</div>
                    <div className="stat-value">{totalIssuedBooks}</div>
                  </div>
                  <div className="icon-box icon-blue">
                    <i className="fa-solid fa-book"></i>
                  </div>
                </div>
              </div>

              {/* Returned */}
              <div className="col-md-3">
                <div className="glass stat-card">
                  <div>
                    <div className="stat-label">Returned</div>
                    <div className="stat-value">{returnedCount}</div>
                  </div>
                  <div className="icon-box icon-green">
                    <i className="fa-solid fa-check"></i>
                  </div>
                </div>
              </div>

              {/* Pending */}
              <div className="col-md-3">
                <div className="glass stat-card">
                  <div>
                    <div className="stat-label">Pending</div>
                    <div className="stat-value">{notreturnedCount}</div>
                  </div>
                  <div className="icon-box icon-yellow">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                </div>
              </div>

              {/* Fine */}
              <div className="col-md-3">
                <div className="glass stat-card">
                  <div>
                    <div className="stat-label">Total Fine</div>
                    <div className="stat-value">₹{totalFine}</div>
                  </div>
                  <div className="icon-box icon-red">
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* CHARTS */}
          {!loading && (

            <div className="row g-4">

              {/* PIE */}
              <div className="col-md-4">
                <div className="glass chart-card">
                  <h6 className="text-white mb-3">Return Status</h6>

                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" outerRadius={90} label>
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AREA */}
              <div className="col-md-4">
                <div className="glass chart-card">
                  <h6 className="text-white mb-3">Activity Trend</h6>

                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={areaData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#60a5fa" fill="#3b82f6" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* BAR */}
              <div className="col-md-4">
                <div className="glass chart-card">
                  <h6 className="text-white mb-3">Comparison</h6>

                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* FINE */}
              <div className="col-md-12">
                <div className="glass chart-card">
                  <h6 className="text-white mb-3">Fine Overview</h6>

                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={fineData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>

                </div>
              </div>

            </div>

          )}

        </div>
      </div>

    </>
  );
};

export default StudentIssuedBooks;