import { Link } from 'react-router-dom';

export default function ItineraryBuilder() {
  return (
    <div className="bg-background text-on-background min-h-screen font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      <nav className="bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex justify-between items-center px-gutter max-w-7xl mx-auto h-20 border-b-2 border-surface shadow-sm">
          <Link to="/" className="font-section-heading-mobile text-section-heading-mobile text-primary">GlobeTrotter</Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300">Home</Link>
            <Link to="/explore" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300">Explore</Link>
            <Link to="/trips" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300">My Trips</Link>
            <Link to="/plan" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300">Plan</Link>
            <Link to="/itinerary-builder" className="text-primary border-b-2 border-primary pb-1 font-label-caps text-label-caps">Itinerary</Link>
            <Link to="/budget" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300">Budget</Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container">
              <span className="material-symbols-outlined">search</span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
              <img
                alt="User Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeqmBs9tlAdyg3VHMavdhlCAcEsCh3I5fv1IFXMUmYemyrbdugs9MEYK7a09gzpujBrePQA-1y5lBql6h02CIM0HVNUNoG-k6hjJT9Tz6C6s8v08i5i2bX0GSaJK37Qz8A5EYF9ioP53Ci0InzlvGiUx2SRvFJ2x6KBFwp5DAPNG5Chtpg3nlSV0zcKdP1gFfYd3hO7PjwLaB9Ueri8tUFtxgU2ZODmd5qMX3rEts-PZOx6ZhMGsvarQ"
              />
            </div>
          </div>
        </div>
      </nav>

      <header className="pt-section-lg pb-12 px-gutter max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="font-label-stamp text-label-stamp text-tertiary uppercase tracking-widest mb-4">European Summer Escape</p>
          <div className="flex flex-wrap gap-4 text-on-surface-variant font-body-md text-body-md">
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">calendar_month</span> Aug 12 - Aug 26</span>
            <span className="text-outline-variant">•</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">group</span> 2 Travelers</span>
            <span className="text-outline-variant">•</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">location_on</span> Paris, Amsterdam, Berlin</span>
          </div>
        </div>
        <div className="relative">
          <h1 className="font-hero-display-mobile md:font-hero-display text-on-surface uppercase leading-none tracking-tighter">Paris</h1>
          <div className="absolute right-0 bottom-0 md:-right-8 md:bottom-8 w-1/2 md:w-1/3 aspect-[4/3] overflow-hidden rounded-sm shadow-xl z-10 hidden md:block">
            <img alt="Eiffel tower reveal" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAucf0xJciEL6DFtUP9alRpgdMU7Rf5sixKgUgpc8PIHh110fc3EefmQJ7jUoiUW4vont2kda6MmQX7F_OF2kDlruRlq2yhWxC2uRX9x8cdOyjl61hwYzVV1pPOS19VR3M-9Pip-gaA9VIPNyaKT9fiVN-3KFKuRgG0A7isEDZBwF5GEMACxNc1tZknSKUtVvU4SDvEpIJUcswFrzMHb_ZjYfFJuyp1Ee7cOKWZsg58knJl9hxDQS_4w" />
          </div>
        </div>
      </header>

      <div className="border-y border-outline-variant/30 bg-surface-container-lowest sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-gutter overflow-x-auto hide-scrollbar">
          <div className="flex space-x-12 py-6 min-w-max">
            <button className="flex flex-col items-start group">
              <span className="font-label-stamp text-label-stamp text-on-surface-variant group-hover:text-primary transition-colors mb-2">Day 01</span>
              <span className="font-section-heading-mobile text-section-heading-mobile text-on-surface">Arrival</span>
            </button>
            <button className="flex flex-col items-start group">
              <span className="font-label-stamp text-label-stamp text-on-surface-variant group-hover:text-primary transition-colors mb-2">Day 02</span>
              <span className="font-section-heading-mobile text-section-heading-mobile text-on-surface">Louvre</span>
            </button>
            <button className="flex flex-col items-start group">
              <span className="font-label-stamp text-label-stamp text-on-surface-variant group-hover:text-primary transition-colors mb-2">Day 03</span>
              <span className="font-section-heading-mobile text-section-heading-mobile text-on-surface">Montmartre</span>
            </button>
            <button className="flex flex-col items-start relative after:content-[''] after:absolute after:-bottom-6 after:left-0 after:w-full after:h-[2px] after:bg-primary">
              <span className="font-label-stamp text-label-stamp text-primary mb-2">Day 04</span>
              <span className="font-section-heading-mobile text-section-heading-mobile text-primary">Travel Day</span>
            </button>
            <button className="flex flex-col items-start group opacity-60">
              <span className="font-label-stamp text-label-stamp text-on-surface-variant group-hover:text-primary transition-colors mb-2">Day 05</span>
              <span className="font-section-heading-mobile text-section-heading-mobile text-on-surface">Amsterdam</span>
            </button>
            <button className="flex flex-col items-start group opacity-60">
              <span className="font-label-stamp text-label-stamp text-on-surface-variant group-hover:text-primary transition-colors mb-2">Day 06</span>
              <span className="font-section-heading-mobile text-section-heading-mobile text-on-surface">Amsterdam</span>
            </button>
            <button className="flex flex-col items-start group opacity-40">
              <span className="font-label-stamp text-label-stamp text-on-surface-variant group-hover:text-primary transition-colors mb-2">Day 07</span>
              <span className="font-section-heading-mobile text-section-heading-mobile text-on-surface">Berlin</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-gutter py-section-lg space-y-section-lg">
        <div className="relative py-section-lg">
          <div className="text-center mb-16">
            <p className="font-label-stamp text-label-stamp text-tertiary uppercase tracking-widest mb-4">15 June</p>
            <h2 className="font-section-heading text-section-heading text-on-surface">Paris <span className="material-symbols-outlined text-4xl align-middle mx-4 text-primary">arrow_forward</span> Amsterdam</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">The Journey North</p>
          </div>
          <div className="bg-surface-container-low rounded-xl p-8 md:p-16 border border-outline-variant/30 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-transparent opacity-50"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left flex-1">
                <p className="font-label-stamp text-label-stamp text-tertiary mb-4 uppercase">Departure</p>
                <h3 className="font-section-heading-mobile text-section-heading-mobile text-on-surface mb-2">Gare du Nord</h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant">09:25 AM</p>
              </div>
              <div className="flex flex-col items-center flex-1 w-full md:w-auto relative">
                <div className="bg-surface-container-lowest rounded-full p-4 z-10 shadow-sm border border-outline-variant/30 text-primary">
                  <span className="material-symbols-outlined">train</span>
                </div>
                <p className="font-label-stamp text-label-stamp text-on-surface-variant mt-4 bg-surface-container-low px-4 z-10">Thalys 9327 • 3h 20m</p>
              </div>
              <div className="text-center md:text-right flex-1">
                <p className="font-label-stamp text-label-stamp text-tertiary mb-4 uppercase">Arrival</p>
                <h3 className="font-section-heading-mobile text-section-heading-mobile text-on-surface mb-2">Centraal</h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant">12:45 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative py-section-lg text-center border-t border-outline-variant/30">
          <h2 className="font-section-heading text-section-heading text-on-surface">Amsterdam</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">Day 05</p>
        </div>

        <div className="relative route-line pb-section-lg">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-hero-display text-surface-container-high opacity-50 z-0 hidden md:block">05</div>
          <div className="relative z-10 mb-section-lg">
            <div className="flex justify-center md:justify-start items-center mb-16 md:ml-[calc(50%+40px)]">
              <span className="material-symbols-outlined text-4xl text-primary bg-background px-4 z-10">light_mode</span>
              <h3 className="font-section-heading-mobile text-section-heading-mobile text-on-surface ml-4 bg-background z-10">Morning</h3>
            </div>
            <div className="flex flex-col md:flex-row items-center w-full mb-32">
              <div className="w-full md:w-1/2 md:pr-16 flex justify-end">
                <div className="w-full max-w-lg aspect-[3/4] rounded-sm overflow-hidden shrink-0 shadow-lg">
                  <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCxsgP1P2LJffn_YLFPq2YBaEbtIpZu6bNPvD-js3tOz-Uu79x053g3s8S4jtqmY4EiWx-ht8ZCJYemRuyaKvwW4EYKg5JFzwe8qWUPcFg0VPhzj-nFZH6cTSJXQz266s97FL4DZWmrMqsyQTuFS3d8RfLyo40uaKlsfRJl96VzZvVu37FCT2tLGRWJf-F-uv7mYfHMyPEgehedug6dY-pSmGl4lfd3PT9hJjhcAa95gT0B5MBaA-v8A" />
                </div>
              </div>
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-20 border-4 border-background"></div>
              <div className="w-full md:w-1/2 md:pl-16 mt-8 md:mt-0 text-center md:text-left">
                <div className="flex justify-center md:justify-start items-center gap-4 mb-4">
                  <span className="font-label-stamp text-label-stamp text-tertiary uppercase">08:30 AM</span>
                  <span className="text-outline-variant">•</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">€25</span>
                </div>
                <h4 className="font-section-heading-mobile text-section-heading-mobile text-on-surface mb-4">Breakfast at Dignita Hoftuin</h4>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto md:mx-0">A lovely start to the day with locally sourced ingredients in a glass house setting hidden in a quiet courtyard.</p>
              </div>
            </div>
          </div>
          <div className="relative z-10 mb-section-lg">
            <div className="flex justify-center md:justify-end items-center mb-16 md:mr-[calc(50%+40px)]">
              <h3 className="font-section-heading-mobile text-section-heading-mobile text-on-surface mr-4 bg-background z-10">Afternoon</h3>
              <span className="material-symbols-outlined text-4xl text-primary bg-background px-4 z-10">partly_cloudy_day</span>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center w-full">
              <div className="w-full md:w-1/2 md:pl-16 flex justify-start">
                <div className="w-full max-w-2xl aspect-[16/9] rounded-sm overflow-hidden shrink-0 shadow-lg">
                  <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAljGnNccuntdFRVQpLmQBbqv56TQAoPDEzETDlAPndr8KZIrYbU05oR89cYPQQnSvuvTnVI_lU4FjQRHXVs4jo14vMvsA4UHfCCKUiIw1uEQEAwDS9XAshiSSaObfV_MBYaFo4XeimZOF8Kdyyd0WWivguk5G974Jn_yS0lfb6Zq6xj0FkL7hDwgOFLyBQdNQ4fM5K36cK7UqJe1GLsEf00N0PvAkZiKwPHFgyiRJm71v-nPzI3_HI5w" />
                </div>
              </div>
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-20 border-4 border-background"></div>
              <div className="w-full md:w-1/2 md:pr-16 mt-8 md:mt-0 text-center md:text-right">
                <div className="flex justify-center md:justify-end items-center gap-4 mb-4">
                  <span className="font-label-stamp text-label-stamp text-tertiary uppercase">02:00 PM</span>
                  <span className="text-outline-variant">•</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">€22.50</span>
                </div>
                <h4 className="font-section-heading-mobile text-section-heading-mobile text-on-surface mb-4">Rijksmuseum Visit</h4>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto md:ml-auto md:mr-0">Immerse yourself in Dutch art and history from the Middle Ages to the present day, featuring masterpieces by Rembrandt and Vermeer.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
}