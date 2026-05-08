import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const location = useLocation();
  const adminUser = localStorage.getItem("adminUser");
  const studentUser = localStorage.getItem("studentUser");

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate('/admin/login')
  }

  const handleStudentLogout = () => {
    localStorage.removeItem('studentUser')
    navigate('/user/login')
  }

  const isActive = (path) => {
    return location.pathname === path ? "active fw-semibold" : "";
  }

  return (
    <>
      <style>{`
        /* ── Glass Navbar ───────────────────────────────────────── */
        .glass-navbar {
          background: rgba(15, 23, 42, 0.55) !important;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(99, 179, 237, 0.18) !important;
          box-shadow:
            0 4px 32px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
          position: sticky;
          top: 0;
          z-index: 1030;

          /* Subtle shimmer line at top */
          border-top: 1px solid rgba(148, 205, 255, 0.22) !important;
        }

        /* ── Brand ──────────────────────────────────────────────── */
        .glass-brand {
          color: #e2eaf8 !important;
          letter-spacing: 0.04em;
          font-weight: 700;
          font-size: 1.18rem;
          transition: color 0.2s;
        }
        .glass-brand:hover { color: #93c5fd !important; }

        .glass-logo-icon {
          background: linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%) !important;
          box-shadow: 0 0 14px rgba(79, 70, 229, 0.55), 0 2px 6px rgba(0,0,0,0.3);
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .glass-logo-icon:hover {
          box-shadow: 0 0 22px rgba(14, 165, 233, 0.7), 0 4px 12px rgba(0,0,0,0.3);
          transform: scale(1.08);
        }

        /* ── Nav links ──────────────────────────────────────────── */
        .glass-nav-link {
          color: rgba(203, 220, 248, 0.82) !important;
          border-radius: 8px;
          padding: 0.42rem 0.75rem !important;
          transition: color 0.2s, background 0.2s, box-shadow 0.2s;
          font-size: 0.88rem;
          white-space: nowrap;
        }
        .glass-nav-link:hover,
        .glass-nav-link:focus {
          color: #e0f2fe !important;
          background: rgba(148, 197, 255, 0.12);
          box-shadow: 0 0 0 1px rgba(148, 197, 255, 0.15);
        }
        .glass-nav-link.active {
          color: #93c5fd !important;
          background: rgba(99, 179, 237, 0.14);
          box-shadow: 0 0 0 1px rgba(99, 179, 237, 0.25);
        }

        /* ── Dropdown toggle buttons ────────────────────────────── */
        .glass-dropdown-btn {
          background: none !important;
          border: none !important;
          color: rgba(203, 220, 248, 0.82) !important;
          border-radius: 8px;
          padding: 0.42rem 0.75rem !important;
          font-size: 0.88rem;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .glass-dropdown-btn:hover,
        .glass-dropdown-btn:focus {
          color: #e0f2fe !important;
          background: rgba(148, 197, 255, 0.12) !important;
          outline: none;
          box-shadow: none !important;
        }

        /* ── Dropdown menu ──────────────────────────────────────── */
        .glass-dropdown-menu {
          background: rgba(15, 23, 50, 0.82) !important;
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border: 1px solid rgba(99, 179, 237, 0.18) !important;
          border-radius: 12px !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45), 0 2px 0 rgba(255,255,255,0.05) inset;
          padding: 0.4rem !important;
          min-width: 180px;
        }
        .glass-dropdown-item {
          color: rgba(203, 220, 248, 0.85) !important;
          border-radius: 8px !important;
          padding: 0.45rem 0.9rem !important;
          font-size: 0.87rem;
          transition: background 0.18s, color 0.18s;
        }
        .glass-dropdown-item:hover {
          background: rgba(99, 179, 237, 0.18) !important;
          color: #e0f2fe !important;
        }
        .glass-dropdown-item.text-danger {
          color: #fca5a5 !important;
        }
        .glass-dropdown-item.text-danger:hover {
          background: rgba(239, 68, 68, 0.18) !important;
          color: #fecaca !important;
        }
        .glass-divider {
          border-color: rgba(99, 179, 237, 0.15) !important;
          margin: 0.3rem 0 !important;
        }

        /* ── Admin Login pill button ────────────────────────────── */
        .glass-admin-btn {
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.55), rgba(14, 165, 233, 0.4)) !important;
          border: 1px solid rgba(99, 179, 237, 0.35) !important;
          color: #e0f2fe !important;
          border-radius: 20px !important;
          padding: 0.38rem 1rem !important;
          font-size: 0.88rem;
          transition: background 0.25s, box-shadow 0.25s, transform 0.2s;
          backdrop-filter: blur(8px);
        }
        .glass-admin-btn:hover {
          background: linear-gradient(135deg, rgba(99, 88, 240, 0.75), rgba(14, 165, 233, 0.6)) !important;
          box-shadow: 0 0 18px rgba(99, 179, 237, 0.4);
          transform: translateY(-1px);
          color: #fff !important;
        }

        /* ── Logout buttons ─────────────────────────────────────── */
        .glass-logout-btn {
          background: transparent !important;
          border: 1px solid rgba(239, 68, 68, 0.45) !important;
          color: #fca5a5 !important;
          border-radius: 8px !important;
          padding: 0.38rem 0.85rem !important;
          font-size: 0.88rem;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, color 0.2s;
        }
        .glass-logout-btn:hover {
          background: rgba(239, 68, 68, 0.2) !important;
          box-shadow: 0 0 12px rgba(239, 68, 68, 0.3);
          color: #fecaca !important;
          border-color: rgba(239, 68, 68, 0.7) !important;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg glass-navbar">
        <div className="container">

          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center gap-2 glass-brand" to="/">
            <span
              className="rounded-circle d-inline-flex align-items-center justify-content-center glass-logo-icon"
              style={{ color: "white", width: "36px", height: "36px" }}
            >
              <i className="fa-solid fa-book-open-reader"></i>
            </span>
            <span>E-borrow</span>
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2 align-items-center">

              {/* ── Guest links ── */}
              {!adminUser && !studentUser && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link glass-nav-link ${isActive("/")}`} to="/">
                      <i className="fa-solid fa-home me-1"></i>Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link glass-nav-link ${isActive("/user/login")}`} to="/user/login">
                      <i className="fa-solid fa-user me-1"></i>User Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link glass-nav-link ${isActive("/user/signup")}`} to="/user/signup">
                      <i className="fa-solid fa-user-plus me-1"></i>User SignUp
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link glass-admin-btn" to="/admin/login">
                      <i className="fa-solid fa-shield-halved me-1"></i>Admin Login
                    </Link>
                  </li>
                </>
              )}

              {/* ── Admin links ── */}
              {adminUser && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link glass-nav-link ${isActive("/admin/dashboard")}`} to="/admin/dashboard">
                      <i className="fa-solid fa-gauge-high me-1"></i>Dashboard
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <button className="glass-dropdown-btn dropdown-toggle" data-bs-toggle="dropdown">
                      <i className="fa-solid fa-layer-group me-1"></i>Categories
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end glass-dropdown-menu">
                      <li>
                        <Link className="dropdown-item glass-dropdown-item" to="/admin/category_add">
                          <i className="fa-solid fa-plus me-1"></i>Add Category
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item glass-dropdown-item" to="/admin/category_manage">
                          <i className="fa-solid fa-list me-1"></i>Manage
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <button className="glass-dropdown-btn dropdown-toggle" data-bs-toggle="dropdown">
                      <i className="fa-solid fa-user-pen me-1"></i>Authors
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end glass-dropdown-menu">
                      <li>
                        <Link className="dropdown-item glass-dropdown-item" to="/admin/author_add">
                          <i className="fa-solid fa-plus me-1"></i>Add Author
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item glass-dropdown-item" to="/admin/manage_author">
                          <i className="fa-solid fa-list me-1"></i>Manage Author
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <button className="glass-dropdown-btn dropdown-toggle" data-bs-toggle="dropdown">
                      <i className="fa-solid fa-book me-1"></i>Books
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end glass-dropdown-menu">
                      <li>
                        <Link className="dropdown-item glass-dropdown-item" to="/admin/book_add">
                          <i className="fa-solid fa-plus me-1"></i>Add Book
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item glass-dropdown-item" to="/admin/book_manage">
                          <i className="fa-solid fa-list me-1"></i>Manage Book
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item glass-dropdown-item" to="/admin/manage-issued-books">
                          <i className="fa-solid fa-arrow-right-arrow-left me-1"></i>Issued Books
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link className={`nav-link glass-nav-link ${isActive("/admin/issue-books")}`} to="/admin/issue-books">
                      <i className="fa-solid fa-right-from-bracket me-1"></i>Issue Books
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link glass-nav-link ${isActive("/admin/manage_students")}`} to="/admin/manage_students">
                      <i className="fa-solid fa-users me-1"></i>Students
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link glass-nav-link ${isActive("/admin/change_password")}`} to="/admin/change_password">
                      <i className="fa-solid fa-key me-1"></i>Change Password
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="glass-logout-btn" onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket me-1"></i>LogOut
                    </button>
                  </li>
                </>
              )}

              {/* ── Student links ── */}
              {studentUser && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link glass-nav-link ${isActive('/user/dashboard')}`} to="/user/dashboard">
                      <i className="fa-solid fa-gauge me-1"></i>Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link glass-nav-link ${isActive('/user/books')}`} to="/user/books">
                      <i className="fa-solid fa-book-open me-1"></i>My Library
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link glass-nav-link ${isActive('/user/issued-books')}`} to="/user/issued-books">
                      <i className="fa-solid fa-receipt me-1"></i>Issued Books
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <button className="glass-dropdown-btn dropdown-toggle" data-bs-toggle="dropdown">
                      <i className="fa-solid fa-circle-user me-1"></i>My Account
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end glass-dropdown-menu">
                      <li>
                        <Link className="dropdown-item glass-dropdown-item" to="/user/profile">
                          <i className="fa-solid fa-id-badge me-1"></i>Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item glass-dropdown-item" to="/user/change_password">
                          <i className="fa-solid fa-key me-1"></i>Change Password
                        </Link>
                      </li>
                      <hr className="dropdown-divider glass-divider" />
                      <li>
                        <button type="button" className="dropdown-item glass-dropdown-item text-danger" onClick={handleStudentLogout}>
                          <i className="fa-solid fa-right-from-bracket me-1"></i>Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header