export type SportCardItem = {
  name: string;
  description: string;
  imageSrc: string;
  imagePosition?: string;
};

export const SPORTS_PAGE_ITEMS: SportCardItem[] = [
  {
    name: 'Horse Riding',
    description:
      'Experience the timeless bond between rider and horse Build core strength and balance while enjoying a unique connection with nature.',
    imageSrc: '/horse.jpg',
    imagePosition: 'object-[center_22%]',
  },
  {
    name: 'Padel',
    description:
      'A fast-paced, social, and addictive racquet sport. Perfect for all skill levels, it combines elements of tennis and squash.',
    imageSrc: '/padel.jpg',
    imagePosition: 'object-[center_55%]',
  },
  {
    name: 'Archery',
    description:
      'Master the art of precision and focus. Develop patience and upper body strength as you aim for the bullseye.',
    imageSrc: '/sport-archery.png',
  },
  {
    name: 'Bowling',
    description:
      'The ultimate social sport for friends and family. Test your coordination and enjoy a fun, competitive atmosphere.',
    imageSrc: '/sport-bowling.png',
  },
  {
    name: 'Billiards',
    description:
      'A game of strategy, physics, and nerves of steel. Refine your concentration and enjoy the classic vibe.',
    imageSrc: '/sport-billiards.png',
  },
  {
    name: 'Basketball',
    description:
      'Elevate your game with high-intensity teamwork. Improve your agility and endurance on professional courts.',
    imageSrc: '/sport-basketball.png',
  },
  {
    name: 'Football',
    description:
      'Join the world’s most popular sport to build stamina and teamwork. Experience the thrill of the pitch.',
    imageSrc: '/sport-football.png',
  },
  {
    name: 'Table Tennis',
    description:
      'A lightning-fast game that sharpens your reflexes. Great for quick matches and high-energy fun.',
    imageSrc: '/sport-table-tennis.png',
  },
  {
    name: 'Pilates',
    description:
      'Focus on controlled movements to strengthen your core and improve flexibility. Transform your body alignment.',
    imageSrc: '/sport-pilates.png',
  },
  {
    name: 'Yoga',
    description:
      'Discover inner peace and physical flexibility. Connect your breath with movement to reduce stress.',
    imageSrc: '/sport-yoga.png',
  },
  {
    name: 'Cycling',
    description:
      'Pedal your way to better cardiovascular health. Enjoy an exhilarating ride that keeps you moving forward.',
    imageSrc: '/sport-cycling.png',
  },
  {
    name: 'Running',
    description:
      'The purest form of fitness. Build your stamina, clear your mind, and hit your personal best.',
    imageSrc: '/sport-running.png',
  },
  {
    name: 'Badminton',
    description:
      'A classic sport of speed and agility. Perfect your serves and smashes in a dynamic environment.',
    imageSrc: '/badminton.jpg',
    imagePosition: 'object-[center_40%]',
  },
  {
    name: 'Bungee Fitness',
    description:
      'Defy gravity in this high-cardio, low-impact workout. Use bungee resistance to fly and strengthen your body.',
    imageSrc: '/sport-bungee.png',
  },
];

export type SportsPageProps = {
  onMembership: (sportName: string) => void;
};

const PAGE_INTRO =
  'A world of sport awaits.. an extraordinary experience designed specifically for you.';

export default function SportsPage({ onMembership }: SportsPageProps) {
  return (
    <section className="w-full" aria-labelledby="sports-page-heading">
      {/* Intro matches site sections (no colored banner); 14 sports from SPORTS_PAGE_ITEMS */}
      <div className="mx-auto mb-10 max-w-3xl px-4 text-center sm:mb-12 sm:px-6">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#6e7c76]">Programs</p>
        <h1
          id="sports-page-heading"
          className="text-3xl font-extrabold uppercase tracking-[0.12em] text-[#137766] sm:text-4xl"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          Sports
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6e7c76] sm:text-[15px] sm:leading-[1.75]">
          {PAGE_INTRO}
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {SPORTS_PAGE_ITEMS.map((sport) => (
          <div
            key={sport.name}
            className="h-full rounded-2xl transition-all duration-300 ease-in-out will-change-transform hover:scale-[1.05] hover:shadow-[0_28px_56px_rgba(0,0,0,0.2),0_0_0_1px_rgba(19,119,102,0.12),0_0_48px_rgba(19,119,102,0.22)]"
          >
            <article className="group relative isolate flex h-full min-h-[400px] flex-col overflow-hidden rounded-2xl shadow-[0_18px_45px_rgba(0,0,0,0.12)] ring-1 ring-black/10 transition-all duration-300 ease-in-out sm:min-h-[420px]">
            <img
              src={sport.imageSrc}
              alt={sport.name}
              className={`absolute inset-0 h-full w-full object-cover ${sport.imagePosition ?? ''}`}
              loading="lazy"
            />
            {/* Legibility gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/[0.88] via-black/50 to-black/25"
              aria-hidden
            />
            {/* Bottom-left stack: title → description (like reference), then buttons — all #FFFFFF */}
            <div className="absolute inset-x-0 bottom-0 z-[1] flex min-h-[400px] flex-col justify-end p-6 sm:min-h-[420px] sm:p-8">
              <div className="w-full max-w-[95%] text-left">
                <h2
                  className="text-left text-2xl font-bold leading-tight tracking-tight sm:text-[1.65rem]"
                  style={{ color: '#FFFFFF', opacity: 1 }}
                >
                  {sport.name}
                </h2>
                <p className="mt-2 line-clamp-4 text-sm font-normal leading-relaxed text-[#FFFFFF] sm:text-[15px] sm:leading-[1.65]">
                  {sport.description}
                </p>
                <div className="mt-6 flex">
                  <button
                    type="button"
                    onClick={() => onMembership(sport.name)}
                    className="inline-flex w-full items-center justify-center rounded-full border-2 border-[#FFFFFF] bg-transparent px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#FFFFFF] transition-all duration-300 ease-in-out hover:bg-white/15 active:translate-y-px"
                  >
                    Membership
                  </button>
                </div>
              </div>
            </div>
          </article>
          </div>
        ))}
      </div>
    </section>
  );
}
