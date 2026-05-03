import { useEffect, useId, useState, type FormEvent } from 'react';
import type { MembershipPackage } from './membershipData';

const FACILITIES = [
  'MatchPoint Main — Riyadh',
  'MatchPoint North Campus',
  'Outdoor Courts Complex',
  'Indoor Arena & Studios',
  'Equestrian Center — Stables',
  'Wellness & Studio Wing',
] as const;

export type MembershipSubscribeModalProps = {
  sportNameEn: string;
  categoryLabel: string;
  pkg: MembershipPackage;
  onClose: () => void;
};

function todayISODate(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addMonthsISO(iso: string, months: number): string {
  const [y, m, day] = iso.split('-').map(Number);
  const d = new Date(y, m - 1 + months, day);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function MembershipSubscribeModal({
  sportNameEn,
  categoryLabel,
  pkg,
  onClose,
}: MembershipSubscribeModalProps) {
  const titleId = useId();
  const [facility, setFacility] = useState<string>(FACILITIES[0]);
  const [startDate, setStartDate] = useState(todayISODate);
  const [endDate, setEndDate] = useState(() => addMonthsISO(todayISODate(), 1));
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

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!startDate || !endDate) {
      setError('Please set start and end dates.');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setError('End date must be after the start date.');
      return;
    }
    if (participants < 1 || participants > 50) {
      setError('Number of people must be between 1 and 50.');
      return;
    }
    setDone(true);
  };

  const priceStr = pkg.price.toLocaleString('en-SA');

  if (done) {
    return (
      <div className="msub-overlay" role="presentation" onClick={onClose}>
        <div
          className="msub-dialog msub-dialog--success"
          role="alertdialog"
          aria-labelledby={titleId}
          onClick={(ev) => ev.stopPropagation()}
        >
          <h2 id={titleId} className="msub-success-title">
            Request received
          </h2>
          <p className="msub-success-text">
            Plan <strong>{pkg.title}</strong> for {sportNameEn}. Facility: {facility}. From {startDate} to {endDate}.
            People: {participants}. Our membership team will contact you to confirm payment and activation.
          </p>
          <button type="button" className="msub-btn msub-btn--primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="msub-overlay" role="presentation" onClick={onClose}>
      <div
        className="msub-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="msub-head">
          <div>
            <p className="msub-kicker">Subscription details</p>
            <h2 id={titleId} className="msub-title">
              {sportNameEn}
            </h2>
          </div>
          <button type="button" className="msub-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="msub-package">
          <h3 className="msub-package-label">Selected plan</h3>
          <p className="msub-package-title">{pkg.title}</p>
          <p className="msub-package-meta">
            <span>{pkg.validity}</span>
            {' · '}
            <span>{categoryLabel}</span>
          </p>
          <p className="msub-package-period">{pkg.period}</p>
          <p className="msub-package-price">
            {priceStr} <span className="msub-sar">SAR</span>
          </p>
        </div>

        <form className="msub-form" onSubmit={submit}>
          <label className="msub-field">
            <span className="msub-label">Facility / branch</span>
            <select className="msub-input" value={facility} onChange={(e) => setFacility(e.target.value)}>
              {FACILITIES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>
          <div className="msub-row">
            <label className="msub-field">
              <span className="msub-label">Start date</span>
              <input
                type="date"
                className="msub-input"
                value={startDate}
                min={todayISODate()}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </label>
            <label className="msub-field">
              <span className="msub-label">End date (expected)</span>
              <input
                type="date"
                className="msub-input"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </label>
          </div>
          <label className="msub-field">
            <span className="msub-label">Number of people</span>
            <input
              type="number"
              className="msub-input"
              min={1}
              max={50}
              value={participants}
              onChange={(e) =>
                setParticipants(Math.max(1, Math.min(50, Number(e.target.value) || 1)))
              }
            />
          </label>
          <label className="msub-field">
            <span className="msub-label">Notes (optional)</span>
            <textarea
              className="msub-textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Payment preference, beneficiary names, special requests…"
            />
          </label>

          {error ? <p className="msub-error">{error}</p> : null}

          <div className="msub-actions">
            <button type="button" className="msub-btn msub-btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="msub-btn msub-btn--primary">
              Submit request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
