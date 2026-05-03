import { useEffect, useMemo, useState } from 'react';
import MembershipSubscribeModal from './MembershipSubscribeModal';
import {
  catalogEntryForSportName,
  getAllMembershipCatalogs,
  type MembershipPackage,
  type SportMembershipCatalog,
} from './membershipData';

type MembershipPageProps = {
  initialSportName: string;
  onSportNameChange: (name: string) => void;
};

function formatPrice(n: number): string {
  return n.toLocaleString('en-SA');
}

export default function MembershipPage({ initialSportName, onSportNameChange }: MembershipPageProps) {
  const allCatalogs = useMemo(() => getAllMembershipCatalogs(), []);
  const [sportId, setSportId] = useState(
    () => catalogEntryForSportName(initialSportName)?.id ?? allCatalogs[0]?.id ?? 'padel',
  );
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [subscribeTarget, setSubscribeTarget] = useState<MembershipPackage | null>(null);

  const activeSport: SportMembershipCatalog | undefined = useMemo(
    () => allCatalogs.find((s) => s.id === sportId) ?? allCatalogs[0],
    [allCatalogs, sportId],
  );

  useEffect(() => {
    const match = catalogEntryForSportName(initialSportName);
    if (match) {
      setSportId((prev) => (prev === match.id ? prev : match.id));
    }
  }, [initialSportName]);

  useEffect(() => {
    setCategoryIndex(0);
  }, [sportId]);

  const categories = activeSport?.categories ?? [];
  const safeCat = Math.min(categoryIndex, Math.max(0, categories.length - 1));
  const packages: MembershipPackage[] = categories[safeCat]?.packages ?? [];

  const selectSport = (entry: SportMembershipCatalog) => {
    setSportId(entry.id);
    onSportNameChange(entry.sportLabelEn);
  };

  return (
    <div className="mp-shell">
      <header className="mp-top">
        <p className="mp-kicker">MatchPoint</p>
        <h1 className="mp-title">Membership</h1>
        <p className="mp-lede">
          Choose your sport from the bar below, then pick a plan category. Active options use the same green as the
          site header. Subscribe to enter location, dates, headcount, and notes.
        </p>
      </header>

      <div className="mp-sport-bar-outer">
        <div className="mp-sport-bar" role="tablist" aria-label="Select sport">
          {allCatalogs.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={sportId === s.id}
              className={sportId === s.id ? 'mp-sport-chip mp-sport-chip--active' : 'mp-sport-chip'}
              onClick={() => selectSport(s)}
            >
              {s.sportLabelEn}
            </button>
          ))}
        </div>
      </div>

      <div className="mp-cat-row" role="tablist" aria-label="Plan category">
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={safeCat === idx}
            className={safeCat === idx ? 'mp-tab mp-tab--active' : 'mp-tab'}
            onClick={() => setCategoryIndex(idx)}
          >
            {cat.tabLabel}
          </button>
        ))}
      </div>

      <p className="mp-context">
        <strong>{activeSport?.sportLabelEn}</strong> — {categories[safeCat]?.tabLabel}
      </p>

      <ul className="mp-card-list">
        {packages.map((pkg) => (
          <li key={pkg.id}>
            <article className="mp-card">
              <div className="mp-card-seal" aria-hidden>
                <img src="/matchpoint-logo-mark.png" alt="" className="mp-card-seal-img" />
              </div>
              <div className="mp-card-main">
                <h2 className="mp-card-title">{pkg.title}</h2>
                <p className="mp-card-validity">{pkg.validity}</p>
                <p className="mp-card-period">{pkg.period}</p>
              </div>
              <div className="mp-card-side">
                <div className="mp-card-price-block">
                  <span className="mp-card-price">{formatPrice(pkg.price)}</span>
                  <span className="mp-card-currency">SAR</span>
                </div>
                <button type="button" className="mp-card-cta" onClick={() => setSubscribeTarget(pkg)}>
                  Subscribe
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {subscribeTarget && activeSport ? (
        <MembershipSubscribeModal
          key={subscribeTarget.id}
          sportNameEn={activeSport.sportLabelEn}
          categoryLabel={categories[safeCat]?.tabLabel ?? ''}
          pkg={subscribeTarget}
          onClose={() => setSubscribeTarget(null)}
        />
      ) : null}
    </div>
  );
}
