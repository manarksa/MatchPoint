/** Membership packages per sport — categories (tabs) + priced tiers (English copy) */

import { SPORTS_PAGE_ITEMS } from './SportsPage';

export type MembershipPackage = {
  id: string;
  title: string;
  validity: string;
  period: string;
  price: number;
};

export type MembershipCategory = {
  id: string;
  tabLabel: string;
  packages: MembershipPackage[];
};

export type SportMembershipCatalog = {
  id: string;
  sportLabelEn: string;
  categories: MembershipCategory[];
};

export const MEMBERSHIP_CATALOG: SportMembershipCatalog[] = [
  {
    id: 'padel',
    sportLabelEn: 'Padel',
    categories: [
      {
        id: 'padel-courts',
        tabLabel: 'Court booking',
        packages: [
          {
            id: 'p-c1',
            title: 'Single session — 90 min court',
            validity: '1 Week Validity',
            period: 'Activates from first booking · Expires one week after purchase',
            price: 185,
          },
          {
            id: 'p-c2',
            title: '6 sessions — valid 4 weeks',
            validity: '4 Weeks Validity',
            period: 'Starts from first booked session · Not rolled over after 4 weeks',
            price: 999,
          },
          {
            id: 'p-c3',
            title: '12 sessions — valid 2 months',
            validity: '2 Months Validity',
            period: 'Two months from activation · Book via app or desk',
            price: 1849,
          },
          {
            id: 'p-c4',
            title: '24 sessions — valid 3 months',
            validity: '3 Months Validity',
            period: 'Best value for regular players · Ends at end of third month',
            price: 3290,
          },
          {
            id: 'p-c5',
            title: '48 sessions — valid 6 months',
            validity: '6 Months Validity',
            period: 'Full season pack · Peak-time priority subject to availability',
            price: 5990,
          },
        ],
      },
      {
        id: 'padel-coach',
        tabLabel: 'Private coaching',
        packages: [
          {
            id: 'p-t1',
            title: 'Single session — private coaching',
            validity: '1 Week Validity',
            period: 'Use within one week of purchase',
            price: 279,
          },
          {
            id: 'p-t2',
            title: '6 sessions — valid 4 weeks',
            validity: '4 Weeks Validity',
            period: 'Certified coach · Flexible scheduling',
            price: 1323,
          },
          {
            id: 'p-t3',
            title: '12 sessions — valid 2 months',
            validity: '2 Months Validity',
            period: 'Performance tracking and tactical plan',
            price: 2046,
          },
          {
            id: 'p-t4',
            title: '24 sessions — valid 3 months',
            validity: '3 Months Validity',
            period: 'Full development programme',
            price: 3655,
          },
          {
            id: 'p-t5',
            title: '48 sessions — valid 6 months',
            validity: '6 Months Validity',
            period: 'Advanced and competitive levels',
            price: 6890,
          },
        ],
      },
      {
        id: 'padel-academy',
        tabLabel: 'Group academy',
        packages: [
          {
            id: 'p-a1',
            title: '4 group sessions — beginner',
            validity: '1 Month Validity',
            period: 'Small groups · once per week',
            price: 420,
          },
          {
            id: 'p-a2',
            title: '8 sessions — 2 month programme',
            validity: '2 Months Validity',
            period: 'Technical and tactical foundation',
            price: 790,
          },
          {
            id: 'p-a3',
            title: '12 sessions — half-season',
            validity: '4 Months Validity',
            period: 'Progression to intermediate level',
            price: 1090,
          },
        ],
      },
    ],
  },
  {
    id: 'horse',
    sportLabelEn: 'Horse Riding',
    categories: [
      {
        id: 'horse-intro',
        tabLabel: 'Beginner lessons',
        packages: [
          {
            id: 'h-i1',
            title: 'Intro session — basic guidance',
            validity: '2 Weeks Validity',
            period: 'First-time friendly · Club equipment included',
            price: 350,
          },
          {
            id: 'h-i2',
            title: '6 sessions — valid 1 month',
            validity: '1 Month Validity',
            period: 'Balance and safe riding basics',
            price: 1890,
          },
          {
            id: 'h-i3',
            title: '12 sessions — valid 2 months',
            validity: '2 Months Validity',
            period: 'Progress per coach plan',
            price: 3490,
          },
        ],
      },
      {
        id: 'horse-private',
        tabLabel: 'Private arena training',
        packages: [
          {
            id: 'h-p1',
            title: 'Private session — 45 minutes',
            validity: '1 Week Validity',
            period: 'One-to-one with instructor',
            price: 420,
          },
          {
            id: 'h-p2',
            title: '8 private sessions — 6 weeks',
            validity: '6 Weeks Validity',
            period: 'Scheduled around arena availability',
            price: 2890,
          },
          {
            id: 'h-p3',
            title: '16 sessions — valid 3 months',
            validity: '3 Months Validity',
            period: 'Performance follow-up and goals',
            price: 5290,
          },
        ],
      },
      {
        id: 'horse-track',
        tabLabel: 'Course & jumping',
        packages: [
          {
            id: 'h-t1',
            title: '5 course sessions — intermediate',
            validity: '1 Month Validity',
            period: 'After skills assessment',
            price: 2200,
          },
          {
            id: 'h-t2',
            title: '10 sessions — seasonal programme',
            validity: '3 Months Validity',
            period: 'Jumping technique and control',
            price: 4100,
          },
        ],
      },
    ],
  },
  {
    id: 'archery',
    sportLabelEn: 'Archery',
    categories: [
      {
        id: 'arch-basics',
        tabLabel: 'Safety & induction',
        packages: [
          {
            id: 'ar-b1',
            title: 'Single session — basics & range rules',
            validity: '2 Weeks Validity',
            period: 'Club equipment included',
            price: 199,
          },
          {
            id: 'ar-b2',
            title: '6 sessions — valid 1 month',
            validity: '1 Month Validity',
            period: 'Stance and focus coaching',
            price: 990,
          },
        ],
      },
      {
        id: 'arch-range',
        tabLabel: 'Indoor range passes',
        packages: [
          {
            id: 'ar-r1',
            title: '10 rounds — monthly pack',
            validity: '4 Weeks Validity',
            period: 'Entry in allocated time slots',
            price: 450,
          },
          {
            id: 'ar-r2',
            title: '30 rounds — valid 2 months',
            validity: '2 Months Validity',
            period: 'For regular practice',
            price: 1190,
          },
          {
            id: 'ar-r3',
            title: 'Season pack — 80 rounds',
            validity: '3 Months Validity',
            period: 'Priority booking in quiet hours',
            price: 2790,
          },
        ],
      },
      {
        id: 'arch-comp',
        tabLabel: 'Competition track',
        packages: [
          {
            id: 'ar-c1',
            title: '12 technical sessions — contest prep',
            validity: '2 Months Validity',
            period: 'Certified coach · shot analysis',
            price: 2490,
          },
        ],
      },
    ],
  },
  {
    id: 'badminton',
    sportLabelEn: 'Badminton',
    categories: [
      {
        id: 'bad-hall',
        tabLabel: 'Hall court time',
        packages: [
          {
            id: 'bd-h1',
            title: '1 hour — doubles court',
            validity: '1 Week Validity',
            period: 'Subject to court availability',
            price: 95,
          },
          {
            id: 'bd-h2',
            title: '10 hours — valid 1 month',
            validity: '1 Month Validity',
            period: 'Advance booking via system',
            price: 799,
          },
          {
            id: 'bd-h3',
            title: '25 hours — valid 3 months',
            validity: '3 Months Validity',
            period: 'Clubs and groups',
            price: 1790,
          },
        ],
      },
      {
        id: 'bad-coach',
        tabLabel: 'Private coaching',
        packages: [
          {
            id: 'bd-c1',
            title: 'Single session — footwork & strokes',
            validity: '1 Week Validity',
            period: '60 minute session',
            price: 220,
          },
          {
            id: 'bd-c2',
            title: '8 sessions — valid 6 weeks',
            validity: '6 Weeks Validity',
            period: 'Fitness and shot plan',
            price: 1590,
          },
          {
            id: 'bd-c3',
            title: '16 sessions — valid 3 months',
            validity: '3 Months Validity',
            period: 'Intermediate level and above',
            price: 2890,
          },
        ],
      },
      {
        id: 'bad-youth',
        tabLabel: 'Youth academy',
        packages: [
          {
            id: 'bd-y1',
            title: '8 week programme — age group',
            validity: '2 Months Validity',
            period: 'Two sessions per week',
            price: 990,
          },
          {
            id: 'bd-y2',
            title: 'Full season — 3 months',
            validity: '3 Months Validity',
            period: 'Participation certificate and club cup',
            price: 1650,
          },
        ],
      },
    ],
  },
];

function slugId(en: string): string {
  return en
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function hashSport(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function genericCatalog(sportEn: string): SportMembershipCatalog {
  const id = slugId(sportEn);
  const h = hashSport(sportEn);
  const b = 140 + (h % 90);

  return {
    id,
    sportLabelEn: sportEn,
    categories: [
      {
        id: `${id}-sessions`,
        tabLabel: 'Sessions & access',
        packages: [
          {
            id: `${id}-s1`,
            title: `Single session — ${sportEn}`,
            validity: '2 Weeks Validity',
            period: 'Activates from first visit · Expires two weeks after purchase',
            price: b,
          },
          {
            id: `${id}-s2`,
            title: '6 sessions — monthly pack',
            validity: '1 Month Validity',
            period: 'Starts from first booked session · Not rolled over after expiry',
            price: b * 5 + (h % 50),
          },
          {
            id: `${id}-s3`,
            title: '12 sessions — short season',
            validity: '2 Months Validity',
            period: 'Two months · subject to club schedule and availability',
            price: b * 9 + (h % 120),
          },
        ],
      },
      {
        id: `${id}-coach`,
        tabLabel: 'Coaching & progression',
        packages: [
          {
            id: `${id}-c1`,
            title: 'Private coaching — single session',
            validity: '1 Week Validity',
            period: 'Certified coach · book via desk or app',
            price: Math.round(b * 1.4) + (h % 40),
          },
          {
            id: `${id}-c2`,
            title: '8 coaching sessions — 6 weeks',
            validity: '6 Weeks Validity',
            period: 'Performance check-ins and starter plan',
            price: Math.round(b * 7) + (h % 200),
          },
          {
            id: `${id}-c3`,
            title: '16 sessions — 3 month commitment',
            validity: '3 Months Validity',
            period: 'Steady progress · ends at period end or when sessions are used',
            price: Math.round(b * 12) + (h % 300),
          },
        ],
      },
      {
        id: `${id}-season`,
        tabLabel: 'Season passes',
        packages: [
          {
            id: `${id}-m1`,
            title: '3 month pass — access & events',
            validity: '3 Months Validity',
            period: `Member benefits for ${sportEn} as per club policy`,
            price: Math.round(b * 15) + (h % 400),
          },
          {
            id: `${id}-m2`,
            title: '6 month pass — booking priority',
            validity: '6 Months Validity',
            period: 'Best long-term value · terms apply',
            price: Math.round(b * 26) + (h % 500),
          },
        ],
      },
    ],
  };
}

export function getAllMembershipCatalogs(): SportMembershipCatalog[] {
  return SPORTS_PAGE_ITEMS.map((item) => {
    const existing = MEMBERSHIP_CATALOG.find((c) => c.sportLabelEn === item.name);
    return existing ?? genericCatalog(item.name);
  });
}

export function catalogEntryForSportName(name: string): SportMembershipCatalog | undefined {
  const list = getAllMembershipCatalogs();
  const n = name.trim().toLowerCase();
  const exact = list.find((s) => s.sportLabelEn.toLowerCase() === n);
  if (exact) return exact;
  const partial = list.find(
    (s) =>
      n.includes(s.sportLabelEn.toLowerCase()) ||
      s.sportLabelEn.toLowerCase().includes(n),
  );
  return partial ?? list[0];
}
