import { useState } from 'react';
import './App.css';
import SportsPage from './SportsPage';

type Section = 'home' | 'about' | 'sports' | 'membership' | 'proshop';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [selectedSport, setSelectedSport] = useState<string>('Padel');

  const goTo = (sport: string, section: Section) => {
    setSelectedSport(sport);
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <section className="section section--home">
            <h2 className="home-title">Choose your sport and start your journey today</h2>
            <p className="home-subtitle">
              Discover premium training experiences with direct access to memberships and pro shop
              essentials.
            </p>
            <div className="sport-grid">
              <article className="sport-card sport-card--hero">
                <img
                  src="/horse.jpg"
                  alt="Horse riding"
                  className="sport-img sport-img--horse"
                />
                <div className="sport-overlay">
                  <span className="sport-kind-badge">Horse Riding</span>
                  <h3 className="sport-name">Horse Riding</h3>
                  <p className="sport-desc">Safe, progressive coaching designed for every level.</p>
                  <div className="sport-actions">
                    <button
                      type="button"
                      className="ghost-btn"
                      onClick={() => goTo('Horse Riding', 'membership')}
                    >
                      Membership
                    </button>
                    <button
                      type="button"
                      className="primary-btn sport-primary-btn"
                      onClick={() => goTo('Horse Riding', 'proshop')}
                    >
                      ProShop
                    </button>
                  </div>
                </div>
              </article>

              <article className="sport-card sport-card--half">
                <img
                  src="/padel.jpg"
                  alt="Padel"
                  className="sport-img sport-img--padel"
                />
                <div className="sport-overlay">
                  <span className="sport-kind-badge">Padel</span>
                  <h3 className="sport-name">Padel</h3>
                  <p className="sport-desc">Power, precision, and tactical training for all players.</p>
                  <div className="sport-actions">
                    <button
                      type="button"
                      className="ghost-btn"
                      onClick={() => goTo('Padel', 'membership')}
                    >
                      Membership
                    </button>
                    <button
                      type="button"
                      className="primary-btn sport-primary-btn"
                      onClick={() => goTo('Padel', 'proshop')}
                    >
                      ProShop
                    </button>
                  </div>
                </div>
              </article>

              <article className="sport-card sport-card--half">
                <img
                  src="/badminton.jpg"
                  alt="Badminton"
                  className="sport-img sport-img--badminton"
                />
                <div className="sport-overlay">
                  <span className="sport-kind-badge">Badminton</span>
                  <h3 className="sport-name">Badminton</h3>
                  <p className="sport-desc">Fast-paced sessions to build movement, control, and stamina.</p>
                  <div className="sport-actions">
                    <button
                      type="button"
                      className="ghost-btn"
                      onClick={() => goTo('Badminton', 'membership')}
                    >
                      Membership
                    </button>
                    <button
                      type="button"
                      className="primary-btn sport-primary-btn"
                      onClick={() => goTo('Badminton', 'proshop')}
                    >
                      ProShop
                    </button>
                  </div>
                </div>
              </article>
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
            <SportsPage
              onMembership={(sport) => goTo(sport, 'membership')}
              onProShop={(sport) => goTo(sport, 'proshop')}
            />
          </section>
        );
      case 'membership':
        return (
          <section className="section">
            <h2 className="section-title">Membership</h2>
            <p className="section-text">
              Choose the membership that fits your schedule. Your selected sport is{' '}
              <strong>{selectedSport}</strong>.
            </p>
            <div className="grid three">
              <div className="program-card">
                <h3>Starter</h3>
                <p>Perfect to begin: access to facilities and 2 coached sessions per month.</p>
                <span className="meta">Monthly · Best for beginners</span>
              </div>
              <div className="program-card featured">
                <h3>Pro</h3>
                <p>
                  Our most popular plan: priority bookings, weekly coaching, and member-only
                  events.
                </p>
                <span className="meta">Monthly · Priority access</span>
              </div>
              <div className="program-card">
                <h3>Elite</h3>
                <p>High-performance coaching, advanced clinics, and premium time slots.</p>
                <span className="meta">Quarterly · Competitive athletes</span>
              </div>
            </div>
            <h3 className="section-subtitle">Included for {selectedSport}</h3>
            <div className="course-grid">
              <div className="course-card">
                <img src="/matchpoint-hero.png" alt="Coaching sessions" className="course-img" />
                <div className="course-body">
                  <h4>Coached Sessions</h4>
                  <p>Structured sessions designed around your level, goals, and schedule.</p>
                  <span className="meta">Weekly options</span>
                </div>
              </div>
              <div className="course-card">
                <img src="/matchpoint-hero.png" alt="Member perks" className="course-img" />
                <div className="course-body">
                  <h4>Member Perks</h4>
                  <p>Exclusive discounts, early access to events, and priority booking windows.</p>
                  <span className="meta">Limited slots</span>
                </div>
              </div>
            </div>
          </section>
        );
      case 'proshop':
        return (
          <section className="section">
            <h2 className="section-title">ProShop</h2>
            <p className="section-text">
              Premium gear and essentials for your sessions. Filtered for{' '}
              <strong>{selectedSport}</strong>.
            </p>
            <div className="proshop-toolbar">
              <label className="proshop-filter">
                Sport
                <select value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
                  <option>Padel</option>
                  <option>Horse Riding</option>
                  <option>Archery</option>
                  <option>Badminton</option>
                  <option>Bowling</option>
                  <option>Billiards</option>
                  <option>Basketball</option>
                  <option>Football</option>
                  <option>Table Tennis</option>
                  <option>Pilates</option>
                  <option>Yoga</option>
                  <option>Cycling</option>
                  <option>Running</option>
                  <option>Bungee Fitness</option>
                </select>
              </label>
            </div>
            <div className="grid three proshop-grid">
              <div className="course-card">
                <img src="/matchpoint-hero.png" alt="Premium Gear" className="course-img" />
                <div className="course-body">
                  <h4>Premium Gear</h4>
                  <p>Top-tier essentials curated for training sessions and weekly play.</p>
                  <span className="meta">Bestseller</span>
                </div>
              </div>
              <div className="course-card">
                <img src="/matchpoint-hero.png" alt="Accessories" className="course-img" />
                <div className="course-body">
                  <h4>Accessories</h4>
                  <p>Grip, protection, and add-ons that improve comfort and performance.</p>
                  <span className="meta">New arrivals</span>
                </div>
              </div>
              <div className="course-card">
                <img src="/matchpoint-hero.png" alt="Apparel" className="course-img" />
                <div className="course-body">
                  <h4>Apparel</h4>
                  <p>Breathable fits and premium materials designed for movement.</p>
                  <span className="meta">Limited drops</span>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="branding">
            <img src="/logo-pin-transparent.png" alt="MatchPoint Logo" className="logo-mark" />
            <span className="branding-title">MATCHPOINT</span>
          </div>
          <nav className="nav" aria-label="Primary">
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
              className={activeSection === 'membership' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActiveSection('membership')}
            >
              MEMBERSHIP
            </button>
            <button
              className={activeSection === 'proshop' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActiveSection('proshop')}
            >
              PROSHOP
            </button>
          </nav>
          <div className="topbar-spacer" aria-hidden="true" />
        </div>
      </header>
      <main className="main-area">{renderContent()}</main>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-title">MatchPoint</div>
            <p className="footer-text">
              Your premium hub for training, memberships, and sports essentials — crafted for a
              modern lifestyle.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <div className="footer-heading">Explore</div>
              <button className="footer-link" onClick={() => setActiveSection('home')}>
                Home
              </button>
              <button className="footer-link" onClick={() => setActiveSection('about')}>
                About Us
              </button>
              <button className="footer-link" onClick={() => setActiveSection('sports')}>
                Sports
              </button>
            </div>
            <div className="footer-col">
              <div className="footer-heading">Services</div>
              <button className="footer-link" onClick={() => setActiveSection('membership')}>
                Membership
              </button>
              <button className="footer-link" onClick={() => setActiveSection('proshop')}>
                ProShop
              </button>
              <span className="footer-note">Booking system integration ready.</span>
            </div>
            <div className="footer-col">
              <div className="footer-heading">Contact</div>
              <span className="footer-note">Riyadh, Saudi Arabia</span>
              <span className="footer-note">support@matchpoint.sa</span>
              <span className="footer-note">+966 5X XXX XXXX</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MatchPoint. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;