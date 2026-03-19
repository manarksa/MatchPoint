import { useState } from 'react';
import './App.css';

type Section = 'home' | 'about' | 'sports' | 'training' | 'bookings';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <section className="section">
            <div className="hero-header">
              <p className="eyebrow">Welcome to</p>
              <h1 className="logo-heading">MatchPoint</h1>
              <p className="subtitle">
                A curated destination for premium sports, training programs, and lifestyle
                experiences.
              </p>
              <div className="tags">
                <span>Padel</span>
                <span>Horse Riding</span>
                <span>Wellness</span>
              </div>
            </div>
            <div className="hero-media">
              <div className="hero-card primary">
                <img src="/matchpoint-hero.png" alt="MatchPoint sports experience" />
                <div className="overlay">
                  <h3>Padel Clinics</h3>
                  <p>Small-group coaching with international certified coaches.</p>
                </div>
              </div>
              <div className="hero-column">
                <div className="hero-card secondary">
                  <div className="pill">New</div>
                  <h3>Horse Riding Academy</h3>
                  <p>Tailored programs for all levels, from first ride to competition.</p>
                </div>
                <div className="hero-card secondary">
                  <h3>Weekend Sports Camps</h3>
                  <p>Multi-sport experiences focused on skill, fitness, and fun.</p>
                </div>
              </div>
            </div>
          </section>
        );
      case 'about':
        return (
          <section className="section">
            <h2 className="section-title">About MatchPoint</h2>
            <p className="section-text">
              MatchPoint is a modern sports destination designed for athletes, families, and
              lifestyle seekers. We combine world-class facilities with a warm, welcoming
              atmosphere so every visit feels like a retreat.
            </p>
            <div className="grid two">
              <div className="info-card">
                <h3>Our Vision</h3>
                <p>
                  To become the region&apos;s leading hub for racket sports, equestrian programs,
                  and holistic performance training.
                </p>
              </div>
              <div className="info-card">
                <h3>Our Promise</h3>
                <p>
                  Thoughtfully designed programs, professional coaches, and seamless digital
                  booking to make your sports journey effortless.
                </p>
              </div>
            </div>
          </section>
        );
      case 'sports':
        return (
          <section className="section">
            <h2 className="section-title">Sports</h2>
            <div className="grid three">
              <div className="info-card">
                <h3>Padel</h3>
                <p>Premium indoor and outdoor padel courts with smart lighting and booking.</p>
                <ul className="bullets">
                  <li>Singles & doubles courts</li>
                  <li>Private and group sessions</li>
                  <li>Matchmaking & leagues</li>
                </ul>
              </div>
              <div className="info-card">
                <h3>Tennis</h3>
                <p>High-performance tennis courts suitable for both training and tournaments.</p>
                <ul className="bullets">
                  <li>Junior & adult programs</li>
                  <li>Technique & performance clinics</li>
                  <li>Seasonal tournaments</li>
                </ul>
              </div>
              <div className="info-card">
                <h3>Equestrian</h3>
                <p>A dedicated arena for horse riding lessons and experiences for all ages.</p>
                <ul className="bullets">
                  <li>Beginner riding classes</li>
                  <li>Advanced jump & dressage</li>
                  <li>Family experiences</li>
                </ul>
              </div>
            </div>
          </section>
        );
      case 'training':
        return (
          <section className="section">
            <h2 className="section-title">Training Programs</h2>
            <p className="section-text">
              Choose from structured programs crafted by expert coaches to elevate your game.
            </p>
            <div className="grid three">
              <div className="program-card">
                <h3>Elite Performance</h3>
                <p>Intensive weekly sessions for competitive athletes seeking measurable gains.</p>
                <span className="meta">4–6 weeks · Small groups</span>
              </div>
              <div className="program-card">
                <h3>Foundations</h3>
                <p>Perfect for beginners who want to build confidence and solid technique.</p>
                <span className="meta">Ongoing · All ages</span>
              </div>
              <div className="program-card">
                <h3>Junior Academy</h3>
                <p>Age-specific programs combining skill development, fitness, and fun.</p>
                <span className="meta">Seasonal · 6–16 yrs</span>
              </div>
            </div>
            <h3 className="section-subtitle">Courses by Sport</h3>
            <div className="grid three courses-grid">
              <div className="program-card">
                <h4>Padel Power Clinics</h4>
                <p>Focused drills to improve control, positioning, and winning tactics on court.</p>
                <span className="meta">Padel · Intermediate–Advanced</span>
              </div>
              <div className="program-card">
                <h4>Horse Riding Fundamentals</h4>
                <p>Safe introduction to horse handling, balance, and basic riding skills.</p>
                <span className="meta">Equestrian · Beginner</span>
              </div>
              <div className="program-card">
                <h4>Tennis Precision Sessions</h4>
                <p>Serve, forehand, and footwork clinics for players who want sharper technique.</p>
                <span className="meta">Tennis · All levels</span>
              </div>
            </div>
          </section>
        );
      case 'bookings':
        return (
          <section className="section">
            <h2 className="section-title">Bookings</h2>
            <p className="section-text">
              Reserve your court, class, or program in a few simple steps. This is a design
              prototype — connect it later to your real booking system.
            </p>
            <form className="booking-form">
              <div className="form-row">
                <label>
                  Sport
                  <select>
                    <option>Padel</option>
                    <option>Tennis</option>
                    <option>Horse Riding</option>
                  </select>
                </label>
                <label>
                  Program
                  <select>
                    <option>Open Court</option>
                    <option>Private Coaching</option>
                    <option>Group Class</option>
                    <option>Kids Program</option>
                  </select>
                </label>
              </div>
              <div className="form-row">
                <label>
                  Date
                  <input type="date" />
                </label>
                <label>
                  Time
                  <input type="time" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Full Name
                  <input type="text" placeholder="Your name" />
                </label>
                <label>
                  Phone
                  <input type="tel" placeholder="+966..." />
                </label>
              </div>
              <label>
                Notes
                <textarea placeholder="Preferred coach, level, or any details" />
              </label>
              <button type="submit" className="primary-btn">
                Request Booking
              </button>
            </form>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="branding">
          <span className="branding-title">MatchPoint</span>
          <div className="logo-mark" aria-hidden="true">
            <span className="logo-circle" />
          </div>
        </div>
        <nav className="nav">
          <button
            className={activeSection === 'home' ? 'nav-link active' : 'nav-link'}
            onClick={() => setActiveSection('home')}
          >
            HOME
          </button>
          <button
            className={activeSection === 'about' ? 'nav-link active' : 'nav-link'}
            onClick={() => setActiveSection('about')}
          >
            ABOUT US
          </button>
          <button
            className={activeSection === 'sports' ? 'nav-link active' : 'nav-link'}
            onClick={() => setActiveSection('sports')}
          >
            SPORTS
          </button>
          <button
            className={activeSection === 'training' ? 'nav-link active' : 'nav-link'}
            onClick={() => setActiveSection('training')}
          >
            TRAINING PROGRAMS
          </button>
          <button
            className={activeSection === 'bookings' ? 'nav-link active' : 'nav-link'}
            onClick={() => setActiveSection('bookings')}
          >
            BOOKINGS
          </button>
        </nav>
      </header>
      <main className="main-area">{renderContent()}</main>
    </div>
  );
}

export default App;