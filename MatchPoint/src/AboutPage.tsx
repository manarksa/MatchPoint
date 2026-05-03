import { Fragment, useEffect, useMemo, useState } from 'react';

type AboutNav = 'home' | 'about' | 'sports' | 'membership' | 'proshop' | 'profile';

type AboutPageProps = {
  onGoTo: (section: AboutNav) => void;
  onScrollToContact: () => void;
};

const goldStroke = '#b0935a';

const ROTATE_MS = 5500;

type StatIcon = ({ className }: { className?: string }) => React.JSX.Element;

type StatItem = {
  id: string;
  Icon: StatIcon;
  sub: string;
  /** If set, first line animates as a number */
  count?: { to: number; prefix?: string; suffix?: string; format?: 'compact' };
  /** Static first line when count omitted */
  line1?: string;
  line2: string;
};

const STAT_FRAMES: StatItem[][] = [
  [
    {
      id: 'est',
      Icon: IconStatCalendar,
      count: { to: 2010 },
      line2: 'ESTABLISHED',
      sub: 'A legacy of curated sport and refined hospitality.',
    },
    {
      id: 'mem',
      Icon: IconStatUsers,
      count: { to: 1500, suffix: '+' },
      line2: 'MEMBERS',
      sub: 'An active network of athletes and lifestyle members.',
    },
    {
      id: 'coach',
      Icon: IconStatTrophy,
      count: { to: 50, suffix: '+' },
      line2: 'COACHES',
      sub: 'Certified professionals across disciplines and levels.',
    },
    {
      id: 'court',
      Icon: IconStatCourt,
      count: { to: 40, suffix: '+' },
      line2: 'COURTS',
      sub: 'Premium indoor and outdoor spaces, maintained daily.',
    },
  ],
  [
    {
      id: 'sat',
      Icon: IconStatPercent,
      count: { to: 98, suffix: '%' },
      line2: 'SATISFACTION',
      sub: 'Member feedback scores across services and facilities.',
    },
    {
      id: 'visit',
      Icon: IconStatTrend,
      count: { to: 12, suffix: 'K+', format: 'compact' },
      line2: 'YEARLY VISITS',
      sub: 'Check-ins and bookings across our club network.',
    },
    {
      id: 'events',
      Icon: IconStatCalendar,
      count: { to: 200, suffix: '+' },
      line2: 'EVENTS / YEAR',
      sub: 'Tournaments, clinics, and member-only gatherings.',
    },
    {
      id: 'lounge',
      Icon: IconStatClock,
      line1: '24/7',
      line2: 'MEMBER ACCESS',
      sub: 'Premium lounges and recovery zones when you need them.',
    },
  ],
  [
    {
      id: 'sports',
      Icon: IconStatCourt,
      count: { to: 15, suffix: '+' },
      line2: 'SPORTS',
      sub: 'Disciplines from racket sports to equestrian programs.',
    },
    {
      id: 'acad',
      Icon: IconStatTrophy,
      count: { to: 8 },
      line2: 'ACADEMY TRACKS',
      sub: 'Structured pathways for juniors through elite training.',
    },
    {
      id: 'part',
      Icon: IconStatUsers,
      count: { to: 30, suffix: '+' },
      line2: 'PARTNERS',
      sub: 'Wellness, retail, and performance brands we collaborate with.',
    },
    {
      id: 'star',
      Icon: IconStatStar,
      count: { to: 5 },
      line2: 'STAR EXPERIENCE',
      sub: 'Consistent five-star service standards across the club.',
    },
  ],
];

function useCountUp(
  target: number,
  durationMs: number,
  resetKey: number,
  enabled: boolean,
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }
    let raf = 0;
    let cancelled = false;
    const easeOut = (t: number) => 1 - (1 - t) ** 3;
    const t0 = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const p = easeOut(Math.min(1, (now - t0) / durationMs));
      setValue(Math.round(target * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    setValue(0);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [target, durationMs, resetKey, enabled]);

  return value;
}

function StatNumericLine({ item, frameIndex }: { item: StatItem; frameIndex: number }) {
  const c = item.count!;
  const { to, prefix = '', suffix = '', format } = c;
  const v = useCountUp(to, 1300, frameIndex, true);
  const display =
    format === 'compact' && to >= 1000
      ? `${(v / 1000).toFixed(v >= 1000 ? 0 : 1)}`
      : v.toLocaleString();
  return (
    <span className="about-stat-line1 about-stat-line1--numeric">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function StatLine1({ item, frameIndex }: { item: StatItem; frameIndex: number }) {
  if (item.count) {
    return <StatNumericLine item={item} frameIndex={frameIndex} />;
  }
  return <span className="about-stat-line1">{item.line1}</span>;
}

function IconEye({ className }: { className?: string }) {
  return (
    <svg className={className} width={40} height={40} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
        stroke={goldStroke}
        strokeWidth={1.35}
        strokeLinejoin="round"
      />
      <circle cx={12} cy={12} r={3} stroke={goldStroke} strokeWidth={1.35} />
    </svg>
  );
}

function IconTarget({ className }: { className?: string }) {
  return (
    <svg className={className} width={40} height={40} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx={12} cy={12} r={9} stroke={goldStroke} strokeWidth={1.35} />
      <circle cx={12} cy={12} r={5} stroke={goldStroke} strokeWidth={1.35} />
      <circle cx={12} cy={12} r={1.5} fill={goldStroke} />
    </svg>
  );
}

function IconDiamond({ className }: { className?: string }) {
  return (
    <svg className={className} width={40} height={40} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 4 10l8 11 8-11-8-7Z"
        stroke={goldStroke}
        strokeWidth={1.35}
        strokeLinejoin="round"
      />
      <path d="M4 10h16" stroke={goldStroke} strokeWidth={1.35} />
    </svg>
  );
}

function IconPeople({ className }: { className?: string }) {
  return (
    <svg className={className} width={40} height={40} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke={goldStroke}
        strokeWidth={1.35}
        strokeLinecap="round"
      />
      <path
        d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
        stroke={goldStroke}
        strokeWidth={1.35}
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconStatCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} width={28} height={28} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x={3} y={4} width={18} height={18} rx={2} stroke={goldStroke} strokeWidth={1.35} />
      <path d="M16 2v4M8 2v4M3 10h18" stroke={goldStroke} strokeWidth={1.35} strokeLinecap="round" />
    </svg>
  );
}

function IconStatUsers({ className }: { className?: string }) {
  return (
    <svg className={className} width={28} height={28} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
        stroke={goldStroke}
        strokeWidth={1.35}
      />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke={goldStroke} strokeWidth={1.35} />
    </svg>
  );
}

function IconStatTrophy({ className }: { className?: string }) {
  return (
    <svg className={className} width={28} height={28} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 21h8M12 17v4" stroke={goldStroke} strokeWidth={1.35} strokeLinecap="round" />
      <path
        d="M7 4h10v5a5 5 0 0 1-10 0V4Z"
        stroke={goldStroke}
        strokeWidth={1.35}
        strokeLinejoin="round"
      />
      <path d="M7 8H4a2 2 0 0 0 2 3M17 8h3a2 2 0 0 1-2 3" stroke={goldStroke} strokeWidth={1.35} strokeLinecap="round" />
    </svg>
  );
}

function IconStatCourt({ className }: { className?: string }) {
  return (
    <svg className={className} width={28} height={28} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x={3} y={5} width={18} height={14} rx={2} stroke={goldStroke} strokeWidth={1.35} />
      <path d="M12 5v14M3 12h18" stroke={goldStroke} strokeWidth={1.35} />
    </svg>
  );
}

function IconStatPercent({ className }: { className?: string }) {
  return (
    <svg className={className} width={28} height={28} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx={7} cy={7} r={2} stroke={goldStroke} strokeWidth={1.35} />
      <circle cx={17} cy={17} r={2} stroke={goldStroke} strokeWidth={1.35} />
      <path d="M15 7 7 17" stroke={goldStroke} strokeWidth={1.35} strokeLinecap="round" />
    </svg>
  );
}

function IconStatTrend({ className }: { className?: string }) {
  return (
    <svg className={className} width={28} height={28} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 18 9 13l4 4 8-8" stroke={goldStroke} strokeWidth={1.35} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8h4v4" stroke={goldStroke} strokeWidth={1.35} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconStatClock({ className }: { className?: string }) {
  return (
    <svg className={className} width={28} height={28} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx={12} cy={12} r={9} stroke={goldStroke} strokeWidth={1.35} />
      <path d="M12 7v6l4 2" stroke={goldStroke} strokeWidth={1.35} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconStatStar({ className }: { className?: string }) {
  return (
    <svg className={className} width={28} height={28} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5 14.2 9l5.8.4-4.5 3.8 1.4 5.7L12 16.9 6.1 18.9l1.4-5.7L3 9.4l5.8-.4L12 3.5Z"
        stroke={goldStroke}
        strokeWidth={1.35}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutPage({ onGoTo, onScrollToContact }: AboutPageProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFrameIndex((i) => (i + 1) % STAT_FRAMES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const stats = useMemo(() => STAT_FRAMES[frameIndex], [frameIndex]);

  return (
    <div className="about-page">
      <section className="about-hero about-hero--banner" aria-labelledby="about-hero-title">
        <div className="about-hero-bg" aria-hidden />
        <div className="about-hero-scrim" aria-hidden />
        <div className="about-hero-inner">
          <div className="about-hero-copy">
            <p className="about-eyebrow">
              <span className="about-eyebrow-line" aria-hidden />
              ABOUT US
            </p>
            <h1 id="about-hero-title" className="about-hero-title">
              Who We Are
            </h1>
            <p className="about-hero-text">
              MatchPoint is a premium sports club where performance meets poise. We curate world-class
              facilities, expert coaching, and a warm community so every visit feels intentional — whether
              you are training, recovering, or simply sharing the game with people who love it as much as
              you do.
            </p>
            <button type="button" className="about-cta-primary" onClick={() => onGoTo('membership')}>
              JOIN OUR COMMUNITY
            </button>
          </div>
          <div className="about-hero-spacer" aria-hidden />
        </div>
      </section>

      <section className="about-values" aria-label="Our vision, mission, values, and community">
        <div className="about-values-inner">
          <article className="about-value-col">
            <IconEye className="about-value-icon" />
            <h2 className="about-value-title">OUR VISION</h2>
            <p className="about-value-desc">
              To be the region&apos;s most trusted home for racket sports, equestrian arts, and holistic
              athletic development — where ambition and elegance share the same address.
            </p>
          </article>
          <article className="about-value-col">
            <IconTarget className="about-value-icon" />
            <h2 className="about-value-title">OUR MISSION</h2>
            <p className="about-value-desc">
              We deliver thoughtful programming, seamless digital access, and human-centered coaching so
              members can progress with clarity, confidence, and joy.
            </p>
          </article>
          <article className="about-value-col">
            <IconDiamond className="about-value-icon" />
            <h2 className="about-value-title">OUR VALUES</h2>
            <ul className="about-values-list">
              <li>Excellence</li>
              <li>Integrity</li>
              <li>Community</li>
              <li>Passion</li>
            </ul>
          </article>
          <article className="about-value-col">
            <IconPeople className="about-value-icon" />
            <h2 className="about-value-title">OUR COMMUNITY</h2>
            <p className="about-value-desc">
              Families, competitors, and newcomers train side by side in a culture built on respect,
              celebration, and shared standards of quality.
            </p>
          </article>
        </div>
      </section>

      <section className="about-stats" aria-label="Club highlights">
        <div className="about-stats-bar about-stats-bar--live">
          <div key={frameIndex} className="about-stats-bar-track">
            {stats.map((item, idx) => {
              const Icon = item.Icon;
              return (
                <Fragment key={`${frameIndex}-${item.id}`}>
                  {idx > 0 ? <div className="about-stat-divider" aria-hidden /> : null}
                  <div className="about-stat">
                    <Icon className="about-stat-icon about-stat-icon--float" />
                    <div className="about-stat-main about-stat-main--stack">
                      <StatLine1 item={item} frameIndex={frameIndex} />
                      <span className="about-stat-line2">{item.line2}</span>
                    </div>
                    <p className="about-stat-sub">{item.sub}</p>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-bottom-cta" aria-labelledby="about-bottom-cta-title">
        <h2 id="about-bottom-cta-title" className="about-bottom-cta-title">
          Become a part of Matchpoint.
        </h2>
        <p className="about-bottom-cta-lede">
          Experience a lifestyle where sport, wellness, and community come together.
        </p>
        <div className="about-bottom-cta-actions">
          <button type="button" className="about-cta-outline" onClick={() => onGoTo('membership')}>
            MEMBERSHIP
          </button>
          <button type="button" className="about-cta-solid" onClick={onScrollToContact}>
            CONTACT US
          </button>
        </div>
      </section>
    </div>
  );
}
