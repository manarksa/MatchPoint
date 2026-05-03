import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import SportsPage from './SportsPage';
import SportBookingModal from './SportBookingModal';
import AboutPage from './AboutPage';
import MembershipPage from './MembershipPage';
import ProfilePage, {
  type ProfileTab,
  type UserProfile,
  type UserSettings,
  type UserBooking,
  type WalletTransaction,
} from './ProfilePage';

type Section = 'home' | 'about' | 'sports' | 'membership' | 'proshop' | 'profile';

function IconWallet({ className }: { className?: string }) {
  return (
    <svg className={className} width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      <path d="M4 11h17" stroke="currentColor" strokeWidth={1.6} />
      <circle cx={16} cy={14} r={1} fill="currentColor" />
    </svg>
  );
}

function IconSettings({ className }: { className?: string }) {
  return (
    <svg className={className} width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx={12} cy={12} r={3} stroke="currentColor" strokeWidth={1.5} />
      <path
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        d="M12 3v2M12 19v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M3 12h2M19 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x={3} y={5} width={18} height={16} rx={2} stroke="currentColor" strokeWidth={1.6} />
      <path d="M3 11h18M9 5V3m6 2V3" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg className={className} width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 17.5 6.9 21l1.35-6.06L4 10.5l5.93-.93L12 4l2.07 5.56L20 10.5l-4.26 4.43L17.09 21 12 17.5Z"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg className={className} width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-8-5.35-8-11a5 5 0 0 1 8-4 8 8 0 0 1 8 4c0 5.65-8 11-8 11Z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </svg>
  );
}

function IconBell({ className }: { className?: string }) {
  return (
    <svg className={className} width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2ZM18 17H6l1-9a5 5 0 1 1 10 0l1 9Z"
        stroke="currentColor"
        strokeWidth={1.4}
      />
    </svg>
  );
}

function IconLogout({ className }: { className?: string }) {
  return (
    <svg className={className} width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 7V5a2 2 0 0 1 2-2h8v18h-8a2 2 0 0 1-2-2v-2M4 12h12"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path d="M7 17l5-5-5-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

type ProShopProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  imageSrc: string;
  tag: string;
};

const PROSHOP_PRODUCTS: ProShopProduct[] = [
  {
    id: 'equestrian-boots',
    name: 'Elite Equestrian Boots',
    description: 'Premium riding boots with elegant structure, comfort lining, and stable support.',
    price: 'SAR 790',
    imageSrc: '/proshop/equestrian-boots.png',
    tag: 'Best Seller',
  },
  {
    id: 'power-bank',
    name: 'Signature Power Bank',
    description: 'Compact high-capacity charging bank with gold detailing and fast USB-C output.',
    price: 'SAR 179',
    imageSrc: '/proshop/power-bank.png',
    tag: 'New',
  },
  {
    id: 'club-tshirt',
    name: 'MatchPoint Club T-Shirt',
    description: 'Soft performance cotton tee featuring the official crest for daily training style.',
    price: 'SAR 99',
    imageSrc: '/proshop/club-tshirt.png',
    tag: 'Apparel',
  },
  {
    id: 'duffle-bag',
    name: 'Travel Duffle Bag',
    description: 'Spacious premium duffle with structured handles and dedicated accessory storage.',
    price: 'SAR 260',
    imageSrc: '/proshop/duffle-bag.png',
    tag: 'Gear',
  },
  {
    id: 'training-dumbbells',
    name: 'Studio Dumbbell Set',
    description: 'Balanced grip dumbbells designed for strength sessions, conditioning, and recovery.',
    price: 'SAR 239',
    imageSrc: '/proshop/training-dumbbells.png',
    tag: 'Training',
  },
  {
    id: 'signature-cap',
    name: 'MatchPoint Signature Cap',
    description: 'Lightweight adjustable cap with embroidered crest and breathable all-day wear.',
    price: 'SAR 89',
    imageSrc: '/proshop/signature-cap.png',
    tag: 'Accessories',
  },
  {
    id: 'phone-case-charm',
    name: 'Club Phone Case Charm',
    description: 'Elegant phone case with metallic racket charm inspired by MatchPoint identity.',
    price: 'SAR 119',
    imageSrc: '/proshop/phone-case-charm.png',
    tag: 'Limited',
  },
  {
    id: 'club-mug',
    name: 'Sports Club Mug',
    description: 'Matte-finish collectible mug with signature stars pattern and premium feel.',
    price: 'SAR 69',
    imageSrc: '/proshop/club-mug.png',
    tag: 'Lifestyle',
  },
  {
    id: 'performance-sweatshirt',
    name: 'Performance Sweatshirt',
    description: 'Comfort-fit technical sweatshirt with modern cut and lightweight insulation.',
    price: 'SAR 199',
    imageSrc: '/proshop/performance-sweatshirt.png',
    tag: 'Apparel',
  },
  {
    id: 'court-shoe',
    name: 'Pro Court Shoe',
    description: 'High-stability court shoe engineered for grip, quick pivots, and impact control.',
    price: 'SAR 369',
    imageSrc: '/proshop/court-shoe.png',
    tag: 'Footwear',
  },
  {
    id: 'water-bottle',
    name: 'Thermal Water Bottle',
    description: 'Insulated bottle that keeps drinks at ideal temperature during long sessions.',
    price: 'SAR 95',
    imageSrc: '/proshop/water-bottle.png',
    tag: 'Essentials',
  },
  {
    id: 'wireless-headphones',
    name: 'Wireless Club Headphones',
    description: 'Immersive over-ear headphones with premium finish and durable braided cable.',
    price: 'SAR 499',
    imageSrc: '/proshop/wireless-headphones.png',
    tag: 'Tech',
  },
];

const PROFILE_STORAGE_KEY = 'matchpoint-profile-v1';

const DEFAULT_BOOKINGS: UserBooking[] = [
  {
    id: 'BKG-24091',
    sport: 'Padel',
    date: '2026-05-07',
    time: '07:00 PM',
    status: 'Confirmed',
    location: 'Court 3',
  },
  {
    id: 'BKG-24092',
    sport: 'Horse Riding',
    date: '2026-05-10',
    time: '05:30 PM',
    status: 'Upcoming',
    location: 'Arena A',
  },
  {
    id: 'BKG-24080',
    sport: 'Badminton',
    date: '2026-04-24',
    time: '08:15 PM',
    status: 'Completed',
    location: 'Hall 2',
  },
];

const DEFAULT_SETTINGS: UserSettings = {
  emailNotifications: true,
  smsNotifications: true,
  marketingEmails: false,
  language: 'Arabic',
};

const normalizeProfile = (value: UserProfile): UserProfile => ({
  ...value,
  avatarUrl: value.avatarUrl ?? '',
  membershipStatus: value.membershipStatus ?? 'Premium Member',
});

const DEFAULT_TRANSACTIONS: WalletTransaction[] = [
  { id: 'TX-901', title: 'Wallet Top-up', amount: '+SAR 120.00', date: '2026-04-27', type: 'credit' },
  { id: 'TX-902', title: 'Padel Court Booking', amount: '-SAR 70.00', date: '2026-04-29', type: 'debit' },
];

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [selectedSport, setSelectedSport] = useState<string>('Padel');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<UserBooking[]>(DEFAULT_BOOKINGS);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [walletBalance, setWalletBalance] = useState(350);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(DEFAULT_TRANSACTIONS);
  const [dashboardTab, setDashboardTab] = useState<ProfileTab>('account');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [sportsBookingSport, setSportsBookingSport] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const initials = useMemo(() => {
    if (!profile?.fullName) return 'MP';
    const parts = profile.fullName.split(' ').filter(Boolean);
    return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
  }, [profile]);

  useEffect(() => {
    const savedRaw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!savedRaw) return;
    try {
      const saved = JSON.parse(savedRaw) as {
        profile: UserProfile | null;
        settings: UserSettings;
        walletBalance?: number;
        transactions?: WalletTransaction[];
        bookings?: UserBooking[];
      };
      if (saved.profile) setProfile(normalizeProfile(saved.profile));
      if (saved.settings) setSettings(saved.settings);
      if (typeof saved.walletBalance === 'number') setWalletBalance(saved.walletBalance);
      if (saved.transactions) setTransactions(saved.transactions);
      if (saved.bookings && Array.isArray(saved.bookings) && saved.bookings.length > 0) {
        setBookings(saved.bookings);
      }
    } catch {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify({ profile, settings, walletBalance, transactions, bookings }),
    );
  }, [profile, settings, walletBalance, transactions, bookings]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goTo = (sport: string, section: Section) => {
    setSelectedSport(sport);
    setActiveSection(section);
  };

  const openProfilePanel = (tab: ProfileTab) => {
    setDashboardTab(tab);
    setActiveSection('profile');
    setIsProfileMenuOpen(false);
  };

  const addSportBooking = (payload: Omit<UserBooking, 'id'>) => {
    const id = `BKG-${Date.now().toString(36).toUpperCase().slice(-10)}`;
    setBookings((prev) => [{ ...payload, id }, ...prev]);
  };

  const topUpWallet = (amount: number) => {
    setWalletBalance((prev) => Number((prev + amount).toFixed(2)));
    const nextTx: WalletTransaction = {
      id: `TX-${Date.now()}`,
      title: 'Wallet Top-up',
      amount: `+SAR ${amount.toFixed(2)}`,
      date: new Date().toISOString().slice(0, 10),
      type: 'credit',
    };
    setTransactions((prev) => [nextTx, ...prev]);
  };

  const scrollToSiteContact = () => {
    document.getElementById('site-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const signOut = () => {
    setProfile(null);
    setSettings(DEFAULT_SETTINGS);
    setWalletBalance(350);
    setTransactions(DEFAULT_TRANSACTIONS);
    setBookings(DEFAULT_BOOKINGS);
    setDashboardTab('account');
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    setIsProfileMenuOpen(false);
    setSportsBookingSport(null);
    setActiveSection('home');
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
                      className="sport-book-btn"
                      onClick={() => setSportsBookingSport('Horse Riding')}
                    >
                      Book · حجز
                    </button>
                    <button
                      type="button"
                      className="ghost-btn"
                      onClick={() => goTo('Horse Riding', 'membership')}
                    >
                      Membership
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
                      className="sport-book-btn"
                      onClick={() => setSportsBookingSport('Padel')}
                    >
                      Book · حجز
                    </button>
                    <button
                      type="button"
                      className="ghost-btn"
                      onClick={() => goTo('Padel', 'membership')}
                    >
                      Membership
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
                      className="sport-book-btn"
                      onClick={() => setSportsBookingSport('Badminton')}
                    >
                      Book · حجز
                    </button>
                    <button
                      type="button"
                      className="ghost-btn"
                      onClick={() => goTo('Badminton', 'membership')}
                    >
                      Membership
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </section>
        );
      case 'about':
        return (
          <section className="section section--about">
            <AboutPage onGoTo={setActiveSection} onScrollToContact={scrollToSiteContact} />
          </section>
        );
      case 'sports':
        return (
          <section className="section">
            <SportsPage
              onMembership={(sport) => goTo(sport, 'membership')}
              onBook={(sport) => setSportsBookingSport(sport)}
            />
          </section>
        );
      case 'membership':
        return (
          <section className="section section--membership-v2">
            <MembershipPage initialSportName={selectedSport} onSportNameChange={setSelectedSport} />
          </section>
        );
      case 'proshop':
        return (
          <section className="section">
            <h2 className="section-title">ProShop</h2>
            <p className="section-text">
              Discover curated MatchPoint products and premium essentials designed for performance
              and lifestyle.
            </p>
            <div className="proshop-grid">
              {PROSHOP_PRODUCTS.map((product) => (
                <article key={product.id} className="proshop-card">
                  <div className="proshop-image-wrap">
                    <img src={product.imageSrc} alt={product.name} className="proshop-image" loading="lazy" />
                  </div>
                  <div className="proshop-content">
                    <span className="proshop-tag">{product.tag}</span>
                    <h3 className="proshop-name">{product.name}</h3>
                    <p className="proshop-description">{product.description}</p>
                    <div className="proshop-footer">
                      <span className="proshop-price">{product.price}</span>
                      <button type="button" className="primary-btn proshop-btn">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      case 'profile':
        return (
          <section className="section">
            <ProfilePage
              profile={profile}
              bookings={bookings}
              settings={settings}
              walletBalance={walletBalance}
              transactions={transactions}
              activeTab={dashboardTab}
              onRegister={(newProfile: UserProfile) => setProfile(normalizeProfile(newProfile))}
              onUpdateProfile={(nextProfile: UserProfile) => setProfile(normalizeProfile(nextProfile))}
              onUpdateSettings={(nextSettings: UserSettings) => setSettings(nextSettings)}
              onTopUp={topUpWallet}
              onChangeTab={setDashboardTab}
            />
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      {sportsBookingSport ? (
        <SportBookingModal
          key={sportsBookingSport}
          sportName={sportsBookingSport}
          onClose={() => setSportsBookingSport(null)}
          onSubmit={addSportBooking}
          onViewBookings={() => {
            setSportsBookingSport(null);
            openProfilePanel('bookings');
          }}
        />
      ) : null}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="branding">
            <img
              src="/matchpoint-logo-mark.png"
              alt="MatchPoint"
              className="logo-mark"
              width={56}
              height={64}
            />
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
              type="button"
              className={
                activeSection === 'proshop'
                  ? 'nav-link nav-link--proshop nav-link--proshop-active'
                  : 'nav-link nav-link--proshop'
              }
              onClick={() => setActiveSection('proshop')}
            >
              PROSHOP
            </button>
          </nav>
          <div className="user-menu-wrap" ref={menuRef}>
            <button
              type="button"
              className={`profile-trigger ${isProfileMenuOpen ? 'profile-trigger--open' : ''}`}
              aria-label="Profile menu"
              aria-expanded={isProfileMenuOpen}
              aria-haspopup="true"
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            >
              <span className="profile-trigger-photo">
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName ? `${profile.fullName} profile photo` : 'Profile'}
                    className="profile-trigger-photo-img"
                  />
                ) : (
                  <span className="profile-trigger-initials">{initials}</span>
                )}
              </span>
            </button>

            {isProfileMenuOpen ? (
              <div className="profile-dropdown" role="dialog" aria-label="Account menu">
                <div className="profile-dropdown-top">
                  <div className="profile-dropdown-photo">
                    {profile?.avatarUrl ? (
                      <img
                        src={profile.avatarUrl}
                        alt={profile.fullName ? `${profile.fullName} profile photo` : 'Profile'}
                        className="profile-dropdown-photo-img"
                      />
                    ) : (
                      <span className="profile-dropdown-initials">{initials}</span>
                    )}
                  </div>
                  <div className="profile-dropdown-identity">
                    <strong>{profile?.fullName ?? 'Guest'}</strong>
                    <span className="profile-dropdown-email">
                      {profile?.email ?? 'Sign in to manage your hub'}
                    </span>
                  </div>
                </div>

                <div className="profile-dropdown-wallet">
                  <IconWallet />
                  <div className="profile-dropdown-wallet-copy">
                    <span className="profile-dropdown-wallet-label">My Wallet</span>
                    <strong className="profile-dropdown-wallet-amount">
                      SAR {walletBalance.toFixed(2)}
                    </strong>
                  </div>
                  <div className="profile-dropdown-wallet-actions">
                    <button type="button" onClick={() => openProfilePanel('wallet')}>Top-up</button>
                    <button type="button" onClick={() => openProfilePanel('wallet')}>History</button>
                  </div>
                </div>

                <nav className="profile-dropdown-nav" aria-label="Account shortcuts">
                  <button type="button" className="profile-dropdown-row" onClick={() => openProfilePanel('wallet')}>
                    <span className="profile-dropdown-row-icon"><IconWallet /></span>
                    <span>My Wallet</span>
                  </button>
                  <button type="button" className="profile-dropdown-row" onClick={() => openProfilePanel('settings')}>
                    <span className="profile-dropdown-row-icon"><IconSettings /></span>
                    <span>Profile Settings</span>
                  </button>
                  <button type="button" className="profile-dropdown-row" onClick={() => openProfilePanel('bookings')}>
                    <span className="profile-dropdown-row-icon"><IconCalendar /></span>
                    <span>My Bookings</span>
                  </button>
                  <button type="button" className="profile-dropdown-row" onClick={() => openProfilePanel('memberships')}>
                    <span className="profile-dropdown-row-icon"><IconStar /></span>
                    <span>Memberships</span>
                  </button>
                  <button type="button" className="profile-dropdown-row" onClick={() => openProfilePanel('favorites')}>
                    <span className="profile-dropdown-row-icon"><IconHeart /></span>
                    <span>My Favorites</span>
                  </button>
                  <button type="button" className="profile-dropdown-row" onClick={() => openProfilePanel('notifications')}>
                    <span className="profile-dropdown-row-icon"><IconBell /></span>
                    <span>Notifications</span>
                  </button>
                </nav>

                <div className="profile-dropdown-bottom">
                  <button type="button" className="profile-dropdown-signout" onClick={signOut}>
                    <IconLogout />
                    Sign out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
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
              <button className="footer-link" onClick={() => setActiveSection('profile')}>
                Profile
              </button>
              <span className="footer-note">Booking system integration ready.</span>
            </div>
            <div className="footer-col" id="site-contact">
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