import { useEffect, useMemo, useState } from 'react';

export type ProfileTab =
  | 'account'
  | 'wallet'
  | 'bookings'
  | 'memberships'
  | 'favorites'
  | 'notifications'
  | 'settings';

export type UserProfile = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  bio: string;
  avatarUrl: string;
  membershipStatus: 'Basic Member' | 'Premium Member' | 'Elite Member';
};

export type UserBooking = {
  id: string;
  sport: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Upcoming' | 'Completed';
  location: string;
  /** Session meta: duration, participants, member notes */
  notes?: string;
};

export type UserSettings = {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  language: 'Arabic' | 'English';
};

export type WalletTransaction = {
  id: string;
  title: string;
  amount: string;
  date: string;
  type: 'credit' | 'debit';
};

type RegisterForm = UserProfile & {
  password: string;
  confirmPassword: string;
};

type ProfilePageProps = {
  profile: UserProfile | null;
  bookings: UserBooking[];
  settings: UserSettings;
  walletBalance: number;
  transactions: WalletTransaction[];
  activeTab: ProfileTab;
  onRegister: (profile: UserProfile) => void;
  onUpdateProfile: (profile: UserProfile) => void;
  onUpdateSettings: (settings: UserSettings) => void;
  onTopUp: (amount: number) => void;
  onChangeTab: (tab: ProfileTab) => void;
};

const EMPTY_REGISTER: RegisterForm = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  bio: '',
  avatarUrl: '',
  membershipStatus: 'Premium Member',
  password: '',
  confirmPassword: '',
};

export default function ProfilePage({
  profile,
  bookings,
  settings,
  walletBalance,
  transactions,
  activeTab,
  onRegister,
  onUpdateProfile,
  onUpdateSettings,
  onTopUp,
  onChangeTab,
}: ProfilePageProps) {
  const [localTab, setLocalTab] = useState<ProfileTab>(activeTab);
  const [registerForm, setRegisterForm] = useState<RegisterForm>(EMPTY_REGISTER);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  const [editProfile, setEditProfile] = useState<UserProfile>(
    profile ?? {
      fullName: '',
      email: '',
      phone: '',
      city: '',
      bio: '',
      avatarUrl: '',
      membershipStatus: 'Premium Member',
    },
  );
  const [profileSuccess, setProfileSuccess] = useState('');
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setEditProfile(profile);
    }
  }, [profile]);

  useEffect(() => {
    setLocalTab(activeTab);
  }, [activeTab]);

  const initials = useMemo(() => {
    if (!profile?.fullName) return 'MP';
    const parts = profile.fullName.split(' ').filter(Boolean);
    return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
  }, [profile]);

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');

    if (!registerForm.fullName || !registerForm.email || !registerForm.phone || !registerForm.password) {
      setRegisterError('Please complete all required fields.');
      return;
    }
    if (registerForm.password.length < 6) {
      setRegisterError('Password must be at least 6 characters.');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('Password confirmation does not match.');
      return;
    }

    const nextProfile: UserProfile = {
      fullName: registerForm.fullName,
      email: registerForm.email,
      phone: registerForm.phone,
      city: registerForm.city || 'Riyadh',
      bio: registerForm.bio || 'MatchPoint member',
      avatarUrl: registerForm.avatarUrl,
      membershipStatus: registerForm.membershipStatus,
    };
    onRegister(nextProfile);
    setEditProfile(nextProfile);
    setRegisterSuccess('Your account has been created successfully.');
    setRegisterForm(EMPTY_REGISTER);
    setLocalTab('account');
    onChangeTab('account');
  };
  const switchTab = (tab: ProfileTab) => {
    setLocalTab(tab);
    onChangeTab(tab);
  };

  const favorites = ['Court 3', 'Coach Ahmad', 'Padel Evening Group', 'Arena A'];
  const notifications = [
    'Your booking BKG-24091 is confirmed.',
    'New match request received for Thursday.',
    'Membership renewal reminder in 5 days.',
  ];


  const handleProfileSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUpdateProfile(editProfile);
    setProfileSuccess('Profile information updated.');
    window.setTimeout(() => setProfileSuccess(''), 2200);
  };

  const handlePasswordSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordMessage('');
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordMessage('Complete all password fields first.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage('New password must be at least 6 characters.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('New password confirmation does not match.');
      return;
    }
    setPasswordMessage('Password updated successfully.');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  if (!profile) {
    return (
      <section className="profile-shell">
        <article className="profile-register-card">
          <h2 className="section-title">Create Account</h2>
          <p className="section-text">
            Create your MatchPoint account to manage profile details, track bookings, and personalize settings.
          </p>
          <form className="profile-form" onSubmit={handleRegister}>
            <div className="profile-grid-two">
              <label>
                Full Name *
                <input
                  value={registerForm.fullName}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, fullName: e.target.value }))}
                />
              </label>
              <label>
                Email *
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
                />
              </label>
              <label>
                Phone *
                <input
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </label>
              <label>
                City
                <input
                  value={registerForm.city}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, city: e.target.value }))}
                />
              </label>
              <label>
                Profile Picture URL
                <input
                  value={registerForm.avatarUrl}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, avatarUrl: e.target.value }))}
                />
              </label>
              <label>
                Membership
                <select
                  value={registerForm.membershipStatus}
                  onChange={(e) =>
                    setRegisterForm((prev) => ({
                      ...prev,
                      membershipStatus: e.target.value as UserProfile['membershipStatus'],
                    }))
                  }
                >
                  <option>Basic Member</option>
                  <option>Premium Member</option>
                  <option>Elite Member</option>
                </select>
              </label>
              <label>
                Password *
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
                />
              </label>
              <label>
                Confirm Password *
                <input
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </label>
            </div>
            <label>
              Bio
              <textarea
                value={registerForm.bio}
                onChange={(e) => setRegisterForm((prev) => ({ ...prev, bio: e.target.value }))}
              />
            </label>
            {registerError ? <p className="profile-message error">{registerError}</p> : null}
            {registerSuccess ? <p className="profile-message success">{registerSuccess}</p> : null}
            <button type="submit" className="primary-btn">
              Create Account
            </button>
          </form>
        </article>
      </section>
    );
  }

  return (
    <section className="profile-shell">
      <aside className="profile-sidebar">
        <div className="profile-avatar">
          {profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.fullName} className="profile-avatar-img" /> : initials}
        </div>
        <h3 className="profile-side-name">{profile.fullName}</h3>
        <p className="profile-side-email">{profile.email}</p>
        <nav className="profile-side-nav">
          <button className={localTab === 'account' ? 'profile-side-link active' : 'profile-side-link'} onClick={() => switchTab('account')}>
            Account
          </button>
          <button className={localTab === 'wallet' ? 'profile-side-link active' : 'profile-side-link'} onClick={() => switchTab('wallet')}>
            My Wallet
          </button>
          <button className={localTab === 'bookings' ? 'profile-side-link active' : 'profile-side-link'} onClick={() => switchTab('bookings')}>
            Bookings
          </button>
          <button className={localTab === 'memberships' ? 'profile-side-link active' : 'profile-side-link'} onClick={() => switchTab('memberships')}>
            Memberships
          </button>
          <button className={localTab === 'favorites' ? 'profile-side-link active' : 'profile-side-link'} onClick={() => switchTab('favorites')}>
            Favorites
          </button>
          <button className={localTab === 'notifications' ? 'profile-side-link active' : 'profile-side-link'} onClick={() => switchTab('notifications')}>
            Notifications
          </button>
          <button className={localTab === 'settings' ? 'profile-side-link active' : 'profile-side-link'} onClick={() => switchTab('settings')}>
            Settings
          </button>
        </nav>
      </aside>

      <article className="profile-content">
        {localTab === 'account' ? (
          <div className="profile-panel">
            <h2 className="section-title">Account Profile</h2>
            <p className="section-text">Edit your personal details and keep your profile up to date.</p>
            <form className="profile-form" onSubmit={handleProfileSave}>
              <div className="profile-grid-two">
                <label>
                  Full Name
                  <input
                    value={editProfile.fullName}
                    onChange={(e) => setEditProfile((prev) => ({ ...prev, fullName: e.target.value }))}
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={editProfile.email}
                    onChange={(e) => setEditProfile((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </label>
                <label>
                  Phone
                  <input
                    value={editProfile.phone}
                    onChange={(e) => setEditProfile((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </label>
                <label>
                  City
                  <input
                    value={editProfile.city}
                    onChange={(e) => setEditProfile((prev) => ({ ...prev, city: e.target.value }))}
                  />
                </label>
                <label>
                  Profile Picture URL
                  <input
                    value={editProfile.avatarUrl}
                    onChange={(e) => setEditProfile((prev) => ({ ...prev, avatarUrl: e.target.value }))}
                  />
                </label>
                <label>
                  Membership Status
                  <select
                    value={editProfile.membershipStatus}
                    onChange={(e) =>
                      setEditProfile((prev) => ({
                        ...prev,
                        membershipStatus: e.target.value as UserProfile['membershipStatus'],
                      }))
                    }
                  >
                    <option>Basic Member</option>
                    <option>Premium Member</option>
                    <option>Elite Member</option>
                  </select>
                </label>
              </div>
              <label>
                Bio
                <textarea
                  value={editProfile.bio}
                  onChange={(e) => setEditProfile((prev) => ({ ...prev, bio: e.target.value }))}
                />
              </label>
              {profileSuccess ? <p className="profile-message success">{profileSuccess}</p> : null}
              <button type="submit" className="primary-btn">
                Save Changes
              </button>
            </form>
          </div>
        ) : null}

        {localTab === 'wallet' ? (
          <div className="profile-panel">
            <h2 className="section-title">My Wallet</h2>
            <p className="section-text">Track your balance and quickly top-up your account.</p>
            <div className="wallet-balance-card">
              <span>Current Balance</span>
              <strong>SAR {walletBalance.toFixed(2)}</strong>
              <div className="wallet-actions">
                <button type="button" className="primary-btn" onClick={() => onTopUp(50)}>Top-up SAR 50</button>
                <button type="button" className="primary-btn" onClick={() => onTopUp(100)}>Top-up SAR 100</button>
              </div>
            </div>
            <div className="wallet-transactions">
              {transactions.map((tx) => (
                <article key={tx.id} className="wallet-row">
                  <div>
                    <h4>{tx.title}</h4>
                    <p>{tx.date}</p>
                  </div>
                  <strong className={tx.type === 'credit' ? 'tx-credit' : 'tx-debit'}>{tx.amount}</strong>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {localTab === 'bookings' ? (
          <div className="profile-panel">
            <h2 className="section-title">My Bookings</h2>
            <p className="section-text">View your upcoming sessions and booking history.</p>
            <div className="profile-bookings">
              {bookings.map((booking) => (
                <article key={booking.id} className="profile-booking-card">
                  <div>
                    <h3>{booking.sport}</h3>
                    <p>{booking.location}</p>
                    {booking.notes ? <p className="profile-booking-notes">{booking.notes}</p> : null}
                  </div>
                  <div className="profile-booking-meta">
                    <span>{booking.date}</span>
                    <span>{booking.time}</span>
                    <span className="profile-status">{booking.status}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {localTab === 'memberships' ? (
          <div className="profile-panel">
            <h2 className="section-title">Memberships</h2>
            <p className="section-text">Current plan and available upgrades.</p>
            <div className="profile-bookings">
              <article className="profile-booking-card">
                <div>
                  <h3>{profile.membershipStatus}</h3>
                  <p>Active membership for all MatchPoint facilities.</p>
                </div>
                <button type="button" className="primary-btn">Upgrade Plan</button>
              </article>
            </div>
          </div>
        ) : null}

        {localTab === 'favorites' ? (
          <div className="profile-panel">
            <h2 className="section-title">My Favorites</h2>
            <p className="section-text">Quick access to your preferred courts and partners.</p>
            <div className="profile-bookings">
              {favorites.map((fav) => (
                <article key={fav} className="profile-booking-card">
                  <div>
                    <h3>{fav}</h3>
                    <p>Saved in your favorite list</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {localTab === 'notifications' ? (
          <div className="profile-panel">
            <h2 className="section-title">Notifications</h2>
            <p className="section-text">Stay updated with requests and confirmations.</p>
            <div className="profile-bookings">
              {notifications.map((note) => (
                <article key={note} className="profile-booking-card">
                  <div>
                    <h3>Update</h3>
                    <p>{note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {localTab === 'settings' ? (
          <div className="profile-panel">
            <h2 className="section-title">Settings</h2>
            <p className="section-text">Manage notifications, language, and account security.</p>
            <div className="profile-settings-list">
              <label className="profile-switch-row">
                <span>Email Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    onUpdateSettings({
                      ...settings,
                      emailNotifications: e.target.checked,
                    })
                  }
                />
              </label>
              <label className="profile-switch-row">
                <span>SMS Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) =>
                    onUpdateSettings({
                      ...settings,
                      smsNotifications: e.target.checked,
                    })
                  }
                />
              </label>
              <label className="profile-switch-row">
                <span>Marketing Emails</span>
                <input
                  type="checkbox"
                  checked={settings.marketingEmails}
                  onChange={(e) =>
                    onUpdateSettings({
                      ...settings,
                      marketingEmails: e.target.checked,
                    })
                  }
                />
              </label>
              <label className="profile-lang-row">
                <span>Language</span>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    onUpdateSettings({
                      ...settings,
                      language: e.target.value as UserSettings['language'],
                    })
                  }
                >
                  <option>Arabic</option>
                  <option>English</option>
                </select>
              </label>
            </div>

            <form className="profile-security-card" onSubmit={handlePasswordSave}>
              <h3>Change Password</h3>
              <div className="profile-grid-two">
                <label>
                  Current Password
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                    }
                  />
                </label>
                <label>
                  New Password
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                  />
                </label>
                <label>
                  Confirm New Password
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                    }
                  />
                </label>
              </div>
              {passwordMessage ? <p className="profile-message success">{passwordMessage}</p> : null}
              <button type="submit" className="primary-btn">
                Update Password
              </button>
            </form>
          </div>
        ) : null}
      </article>
    </section>
  );
}
