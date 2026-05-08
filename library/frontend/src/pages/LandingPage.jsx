import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

        .lp-root {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #0d0d0d;
        }

        /* ── background image ── */
        .lp-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center;
          filter: brightness(0.28) saturate(0.6);
          transform: scale(1.04);
          transition: transform 8s ease;
        }
        .lp-root:hover .lp-bg {
          transform: scale(1.08);
        }

        /* ── subtle grid overlay ── */
        .lp-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(79,70,229,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,70,229,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* ── radial glow ── */
        .lp-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: pulse-glow 4s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.12); }
        }

        /* ── card ── */
        .lp-card {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 3.5rem 3rem;
          max-width: 480px;
          width: 90%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 24px;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.55);
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .lp-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── logo icon ── */
        .lp-icon {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          color: white;
          margin-bottom: 1.5rem;
          box-shadow: 0 8px 24px rgba(79,70,229,0.45);
          animation: float 3.5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }

        /* ── text ── */
        .lp-title {
          color: #fff;
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin: 0 0 0.5rem;
        }
        .lp-sub {
          color: rgba(255,255,255,0.45);
          font-size: 0.95rem;
          font-weight: 400;
          margin: 0 0 2.5rem;
          line-height: 1.6;
        }

        /* ── divider ── */
        .lp-divider {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          border-radius: 2px;
          margin: 0 auto 2rem;
        }

        /* ── buttons ── */
        .lp-btns {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .lp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.85rem 1.5rem;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          text-decoration: none;
          letter-spacing: 0.2px;
        }
        .lp-btn:active { transform: scale(0.97) !important; }

        .lp-btn-primary {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #fff;
          box-shadow: 0 6px 20px rgba(79,70,229,0.40);
        }
        .lp-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(79,70,229,0.55);
        }

        .lp-btn-ghost {
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.80);
          border: 1px solid rgba(255,255,255,0.12);
        }
        .lp-btn-ghost:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.12);
          color: #fff;
        }

        /* ── footer note ── */
        .lp-footer {
          margin-top: 2rem;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.20);
          letter-spacing: 0.5px;
        }
      `}</style>

      <div className="lp-root">
        <div className="lp-bg" />
        <div className="lp-grid" />
        <div className="lp-glow" />

        <div className={`lp-card ${visible ? 'visible' : ''}`}>

          <div className="lp-icon">
            <i className="fa-solid fa-book-open-reader" />
          </div>

          <h1 className="lp-title">E-Borrow</h1>
          <div className="lp-divider" />
          <p className="lp-sub">Your digital library — borrow, explore,<br />and manage books effortlessly.</p>

          <div className="lp-btns">
            <button className="lp-btn lp-btn-primary" onClick={() => navigate('/user/login')}>
              <i className="fa-solid fa-graduation-cap" />
              Student Login
            </button>
            <button className="lp-btn lp-btn-ghost" onClick={() => navigate('/admin/login')}>
              <i className="fa-solid fa-shield-halved" />
              Admin Login
            </button>
          </div>

          <p className="lp-footer">E-BORROW &nbsp;·&nbsp; LIBRARY MANAGEMENT</p>
        </div>
      </div>
    </>
  );
};

export default LandingPage;