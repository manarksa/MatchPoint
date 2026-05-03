import { useEffect, useId, useState, type FormEvent } from 'react';
import type { UserBooking } from './ProfilePage';

export type SportBookingModalProps = {
  sportName: string;
  onClose: () => void;
  onSubmit: (booking: Omit<UserBooking, 'id'>) => void;
  onViewBookings?: () => void;
};

const FACILITIES = [
  'MatchPoint Main — Riyadh',
  'MatchPoint North Campus',
  'Outdoor Courts Complex',
  'Indoor Arena & Studios',
  'Equestrian Center — Stables',
  'Wellness & Studio Wing',
] as const;

const DURATIONS = [30, 60, 90, 120] as const;

function formatTime12FromInput(isoTime: string): string {
  const [hs, ms] = isoTime.split(':');
  const h = Number(hs);
  const m = Number(ms);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
}

function todayISODate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  return `${y}-${mo}-${da}`;
}

function formatDateLong(iso: string): string {
  if (!iso) return '—';
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function LabelBilingual({ en, ar }: { en: string; ar: string }) {
  return (
    <span className="sport-booking-label">
      {en} <span className="sport-booking-label-ar">/ {ar}</span>
    </span>
  );
}

function BookingSummary({
  sportName,
  date,
  timeLabel,
  facility,
  spot,
  duration,
  participants,
  notes,
}: {
  sportName: string;
  date: string;
  timeLabel: string;
  facility: string;
  spot: string;
  duration: number;
  participants: number;
  notes: string;
}) {
  const spotTrim = spot.trim();
  return (
    <div className="sport-booking-summary" aria-live="polite">
      <h3 className="sport-booking-summary-title">ملخص الحجز · Booking summary</h3>
      <ul className="sport-booking-summary-list">
        <li>
          <strong>الرياضة · Sport</strong> <span>{sportName}</span>
        </li>
        <li>
          <strong>اليوم · Date</strong> <span>{formatDateLong(date)}</span>
        </li>
        <li>
          <strong>الوقت · Time</strong> <span>{timeLabel}</span>
        </li>
        <li>
          <strong>الفرع · Branch</strong> <span>{facility}</span>
        </li>
        <li>
          <strong>المكان · Spot</strong> <span>{spotTrim || '—'}</span>
        </li>
        <li>
          <strong>المدة · Duration</strong> <span>{duration} min</span>
        </li>
        <li>
          <strong>العدد · Group</strong> <span>{participants}</span>
        </li>
        {notes.trim() ? (
          <li>
            <strong>ملاحظات · Notes</strong> <span>{notes.trim()}</span>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default function SportBookingModal({
  sportName,
  onClose,
  onSubmit,
  onViewBookings,
}: SportBookingModalProps) {
  const titleId = useId();
  const [date, setDate] = useState(todayISODate);
  const [time, setTime] = useState('18:00');
  const [facility, setFacility] = useState<string>(FACILITIES[0]);
  const [spot, setSpot] = useState('');
  const [duration, setDuration] = useState<number>(60);
  const [participants, setParticipants] = useState(1);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const spotTrim = spot.trim();
    if (!spotTrim) {
      setError('أدخل الملعب أو المكان بدقة. · Enter court, lane, arena, or exact area.');
      return;
    }
    if (!date || !time) {
      setError('اختر التاريخ والوقت. · Choose date and time.');
      return;
    }
    if (participants < 1 || participants > 30) {
      setError('عدد المشاركين من 1 إلى 30. · Participants must be 1–30.');
      return;
    }

    const location = `${facility} · ${spotTrim}`;
    const metaNotes = [
      `Duration: ${duration} min`,
      `Participants: ${participants}`,
      notes.trim() ? notes.trim() : null,
    ]
      .filter(Boolean)
      .join(' · ');

    onSubmit({
      sport: sportName,
      date,
      time: formatTime12FromInput(time),
      status: 'Confirmed',
      location,
      notes: metaNotes,
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="sport-booking-overlay" role="presentation" onClick={onClose}>
        <div
          className="sport-booking-dialog sport-booking-dialog--success"
          role="alertdialog"
          aria-labelledby={titleId}
          aria-describedby={`${titleId}-desc`}
          onClick={(ev) => ev.stopPropagation()}
        >
          <h2 id={titleId} className="sport-booking-success-title">
            تم تأكيد الحجز · Booking confirmed
          </h2>
          <p id={`${titleId}-desc`} className="sport-booking-success-text">
            حجزك لـ <strong>{sportName}</strong> محفوظ مع كل التفاصيل (الموعد، الموقع، المدة، عدد اللاعبين).
            تجده في الملف الشخصي ضمن «حجوزاتي».
            <span className="sport-booking-success-en">
              {' '}
              Your full booking is saved under <strong>My Bookings</strong> in your profile.
            </span>
          </p>
          <div className="sport-booking-success-actions">
            {onViewBookings ? (
              <button type="button" className="sport-booking-btn sport-booking-btn--primary" onClick={onViewBookings}>
                حجوزاتي · My bookings
              </button>
            ) : null}
            <button type="button" className="sport-booking-btn sport-booking-btn--ghost" onClick={onClose}>
              إغلاق · Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sport-booking-overlay" role="presentation" onClick={onClose}>
      <div
        className="sport-booking-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="sport-booking-head">
          <div>
            <p className="sport-booking-kicker">حجز جلسة · Reserve a session</p>
            <h2 id={titleId} className="sport-booking-title">
              حجز {sportName}
            </h2>
            <p className="sport-booking-sub">
              املأ التفاصيل: اليوم، الوقت، الفرع، الملعب أو المنطقة، المدة، وعدد المشاركين — ثم راجع الملخص قبل
              التأكيد.
              <span className="sport-booking-sub-en">
                {' '}
                Full details: when, where, spot, duration, and group size — review the summary below.
              </span>
            </p>
          </div>
          <button type="button" className="sport-booking-close" onClick={onClose} aria-label="Close booking form">
            ×
          </button>
        </div>

        <form className="sport-booking-form" onSubmit={handleSubmit}>
          <div className="sport-booking-grid">
            <label className="sport-booking-field">
              <LabelBilingual en="Date" ar="التاريخ" />
              <input
                type="date"
                className="sport-booking-input"
                value={date}
                min={todayISODate()}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
            <label className="sport-booking-field">
              <LabelBilingual en="Start time" ar="وقت البداية" />
              <input
                type="time"
                className="sport-booking-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </label>
            <label className="sport-booking-field sport-booking-field--full">
              <LabelBilingual en="Facility / branch" ar="الفرع / المنشأة" />
              <select
                className="sport-booking-input"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
              >
                {FACILITIES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </label>
            <label className="sport-booking-field sport-booking-field--full">
              <LabelBilingual en="Court / exact location" ar="الملعب أو الموقع بالتفصيل" />
              <input
                type="text"
                className="sport-booking-input"
                value={spot}
                onChange={(e) => setSpot(e.target.value)}
                placeholder="e.g. Court 3, Lane B, Arena A, Studio 2"
                autoComplete="off"
              />
            </label>
            <label className="sport-booking-field">
              <LabelBilingual en="Session length" ar="مدة الجلسة" />
              <select
                className="sport-booking-input"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              >
                {DURATIONS.map((d) => (
                  <option key={d} value={d}>
                    {d} minutes
                  </option>
                ))}
              </select>
            </label>
            <label className="sport-booking-field">
              <LabelBilingual en="Participants" ar="عدد المشاركين" />
              <input
                type="number"
                className="sport-booking-input"
                min={1}
                max={30}
                value={participants}
                onChange={(e) =>
                  setParticipants(
                    Math.max(1, Math.min(30, Number(e.target.value) || 1)),
                  )
                }
              />
            </label>
            <label className="sport-booking-field sport-booking-field--full">
              <LabelBilingual en="Notes (optional)" ar="ملاحظات لاستقبال النادي" />
              <textarea
                className="sport-booking-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="معدات، مدرب، إمكانية وصول، موقف… · Equipment, coach, accessibility, parking…"
              />
            </label>
          </div>

          <BookingSummary
            sportName={sportName}
            date={date}
            timeLabel={formatTime12FromInput(time)}
            facility={facility}
            spot={spot}
            duration={duration}
            participants={participants}
            notes={notes}
          />

          {error ? <p className="sport-booking-error">{error}</p> : null}

          <div className="sport-booking-actions">
            <button type="button" className="sport-booking-btn sport-booking-btn--ghost" onClick={onClose}>
              إلغاء · Cancel
            </button>
            <button type="submit" className="sport-booking-btn sport-booking-btn--primary">
              تأكيد الحجز · Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
