import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const StudentChangePassword = () => {

  const studentUser = JSON.parse(localStorage.getItem("studentUser"));

  const [form, setForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!studentUser) {
      navigate('/user/login');
    }
  }, [navigate, studentUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.current_password || !form.new_password || !form.confirm_password) {
      toast.error("All fields are required");
      return;
    }

    if (form.new_password !== form.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setSaving(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/student/change_password/",
        {
          student_id: studentUser.student_id,
          current_password: form.current_password,
          new_password: form.new_password,
          confirm_password: form.confirm_password
        }
      );

      toast.success(res.data.message || "Password changed successfully");

      setForm({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });

    } catch (err) {
      toast.error(err.response?.data?.message || "Error changing password");
    } finally {
      setSaving(false);
    }
  };

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
          backdrop-filter: blur(20px);
          border-radius: 22px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.35);
          color: white;
        }

        .header {
          padding: 18px 22px;
          margin-bottom: 25px;
        }

        .title {
          font-weight: 700;
          margin: 0;
        }

        .subtitle {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.6);
        }

        .icon-circle {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(59,130,246,0.15);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .form-control {
          background: rgba(255,255,255,0.06) !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          color: white !important;
          border-radius: 12px;
        }

        .form-control:focus {
          box-shadow: none;
          border-color: #3b82f6 !important;
        }

        label {
          color: rgba(255,255,255,0.7);
          font-size: 0.85rem;
          margin-bottom: 6px;
        }

        .btn-glow {
          background: linear-gradient(135deg,#3b82f6,#06b6d4);
          border: none;
          border-radius: 12px;
          font-weight: 600;
          transition: 0.3s;
        }

        .btn-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59,130,246,0.35);
        }

      `}</style>

      <div className="page">

        <div className="container">

          {/* HEADER */}
          <div className="glass header d-flex justify-content-between align-items-center flex-wrap">

            <div className="d-flex align-items-center gap-3">

              <div className="icon-circle">
                <i className="fa-solid fa-key text-info"></i>
              </div>

              <div>
                <h4 className="title">Change Password</h4>
                <div className="subtitle">Secure your account with a new password</div>
              </div>

            </div>

            <div className="subtitle">
              Welcome <b>{studentUser?.full_name}</b>
            </div>

          </div>

          {/* FORM CARD */}
          <div className="row justify-content-center">

            <div className="col-md-6">

              <div className="glass p-4">

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label>Current Password</label>
                    <input
                      type="password"
                      name="current_password"
                      value={form.current_password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="mb-3">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="new_password"
                      value={form.new_password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="mb-4">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={form.confirm_password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-glow w-100 text-white"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-lock me-2"></i>
                        Update Password
                      </>
                    )}
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default StudentChangePassword;