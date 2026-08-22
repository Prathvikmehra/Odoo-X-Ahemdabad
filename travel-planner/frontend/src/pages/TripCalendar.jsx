import { Link } from 'react-router-dom';

export default function TripCalendar() {
  return (
    <div className="text-on-background font-body-md antialiased overflow-x-hidden selection:bg-surface-tint selection:text-warm-ivory bg-background">
      <nav className="md:hidden bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-deep-teal/20 flex justify-between items-center px-margin-mobile h-20">
        <Link to="/" className="font-hero-display-mobile text-section-heading-mobile tracking-tighter text-ink-charcoal">GlobeTrotter</Link>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">search</span>
          <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden">
            <img alt="User profile portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZluXtqSN9on6RrBbgtgMG7IY0_KXE-XzsHs69ozrcI3U1H1MFYUB5FRwvX-qDCAH7UlqtDkOWig6qXgCBNd7TcNWiddbq8gze0Resb27mY8d5YzIhgyHszGdJsRCV3WMHZiOKNAa-AOIKNKK4rmulXNqc8Q9loeadYTct7VkN0JzSi0E-uI35pJpaHv-alwS08X9WHIl9CdSOmjmst2YISA_TiRiRYQxk-2mO7CFWn4WKFJDOAAAQTw" />
          </div>
        </div>
      </nav>

      <aside className="bg-surface-container-low fixed left-0 top-0 h-full w-64 hidden lg:flex flex-col border-r border-deep-teal/10 py-8 px-6 gap-8 z-40">
        <div className="flex flex-col gap-4">
          <div className="aspect-[4/3] w-full rounded-lg overflow-hidden relative">
            <img alt="Trip cover thumbnail" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHD6HCbhjOJLBR5vthj9LWIuYP-Rn-PacjQrg3tDZu08x5hPXVNIm-7MBNd7szhKK66HDg_L0RVXviKNjr1QjfL8q_41udbcrQV-AyeGs9ukDKJG-EqlmUX8b3NIAnVwFDY4p782GZemQ_oO569-L2CP4zcQrm8iz5tq2T-K4lqi-0HWOzfZad8ASSxaEqPskhNVCqk1PHdAZZSlBaDcAoU-rAWocVTg4thHOQMh2Ce31da4hsGFgeVA" />
          </div>
          <div>
            <h2 className="font-section-heading text-chapter-number text-primary mb-1">European Grand Tour</h2>
            <p className="font-label-caps text-label-caps text-on-tertiary-fixed-variant">Sept 2024 • 21 Days</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2 mt-4 flex-grow">
          <Link to="#" className="flex items-center gap-3 px-3 py-2 text-on-tertiary-fixed-variant font-label-caps text-label-caps hover:bg-surface-variant/50 transition-all translate-x-1 duration-200">
            <span className="material-symbols-outlined">map</span> Overview
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2 text-on-surface bg-surface-container-highest rounded-lg font-label-caps text-label-caps hover:bg-surface-variant/50 transition-all translate-x-1 duration-200">
            <span className="material-symbols-outlined">calendar_month</span> Itinerary
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2 text-on-tertiary-fixed-variant font-label-caps text-label-caps hover:bg-surface-variant/50 transition-all translate-x-1 duration-200">
            <span className="material-symbols-outlined">receipt_long</span> Logistics
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2 text-on-tertiary-fixed-variant font-label-caps text-label-caps hover:bg-surface-variant/50 transition-all translate-x-1 duration-200">
            <span className="material-symbols-outlined">payments</span> Expenses
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <button className="w-full py-3 bg-surface border border-deep-teal/20 text-primary font-label-caps text-label-caps rounded flex items-center justify-center gap-2 hover:bg-surface-variant/50 transition-colors">
            <span className="material-symbols-outlined text-sm">ios_share</span> Export Journal
          </button>
          <div className="flex flex-col gap-2 border-t border-deep-teal/10 pt-4">
            <Link to="#" className="flex items-center gap-3 px-3 py-2 text-on-tertiary-fixed-variant font-label-caps text-label-caps hover:bg-surface-variant/50 transition-all">
              <span className="material-symbols-outlined text-[18px]">settings</span> Settings
            </Link>
            <Link to="#" className="flex items-center gap-3 px-3 py-2 text-on-tertiary-fixed-variant font-label-caps text-label-caps hover:bg-surface-variant/50 transition-all">
              <span className="material-symbols-outlined text-[18px]">help</span> Support
            </Link>
          </div>
        </div>
      </aside>

      <main className="pt-24 md:pt-16 pb-32 lg:pl-64 px-margin-mobile md:px-gutter lg:px-margin-desktop min-h-screen relative max-w-[1600px] mx-auto">
        <header className="mb-section-lg md:mb-section-xl relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12">
          <div className="max-w-2xl">
            <div className="font-label-stamp text-label-stamp text-terracotta mb-6 flex items-center gap-2 tracking-[0.15em] uppercase border border-terracotta/20 rounded-full px-3 py-1 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span> Calendar View
            </div>
            <h1 className="font-hero-display-mobile text-section-heading-mobile md:font-hero-display md:text-hero-display text-ink-charcoal mb-4 relative ml-[-4px]">
              September
              <span className="absolute -top-4 -right-12 font-chapter-number text-chapter-number text-tertiary italic hidden md:block">2024</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg leading-relaxed">A curation of time across the continent. Mapping the rhythm of travel, leisure, and cultural immersion.</p>
          </div>
          <div className="flex gap-4 items-center shrink-0">
            <button className="w-12 h-12 rounded-full border border-deep-teal/20 flex items-center justify-center text-ink-charcoal hover:bg-deep-teal/5 transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="font-label-caps text-label-caps px-2 min-w-[80px] text-center">SEP '24</span>
            <button className="w-12 h-12 rounded-full border border-deep-teal/20 flex items-center justify-center text-ink-charcoal hover:bg-deep-teal/5 transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </header>

        <div className="relative w-full overflow-x-auto hide-scrollbar pb-8">
          <div className="min-w-[800px] w-full">
            <div className="grid-calendar mb-6 border-b border-deep-teal/20 pb-4">
              <div className="font-label-caps text-label-caps text-on-surface-variant text-center opacity-60">SUN</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant text-center opacity-60">MON</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant text-center opacity-60">TUE</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant text-center opacity-60">WED</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant text-center opacity-60">THU</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant text-center opacity-60">FRI</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant text-center opacity-60">SAT</div>
            </div>
            <div className="grid-calendar gap-y-12 gap-x-2 relative">
              <div className="relative min-h-[140px] p-2 border-t border-transparent group">
                <div className="calendar-day-content"><span className="font-chapter-number text-[20px] text-ink-charcoal mb-4 block">1</span></div>
              </div>
              <div className="relative min-h-[140px] p-2 border-t border-deep-teal/10 group hover:bg-surface-container-low transition-colors rounded">
                <div className="calendar-day-content"><span className="font-chapter-number text-[20px] text-ink-charcoal mb-4 block group-hover:text-terracotta transition-colors">2</span></div>
              </div>
              <div className="relative min-h-[140px] p-2 border-t border-deep-teal/10 group hover:bg-surface-container-low transition-colors rounded">
                <div className="calendar-day-content"><span className="font-chapter-number text-[20px] text-ink-charcoal mb-4 block group-hover:text-terracotta transition-colors">3</span></div>
              </div>
              <div className="relative min-h-[140px] p-2 border-t border-deep-teal/20 bg-deep-teal/5 rounded-l-lg group">
                <div className="calendar-line left-1/2"></div>
                <div className="calendar-day-content h-full flex flex-col">
                  <span className="font-chapter-number text-[20px] text-deep-teal mb-2 block font-bold">4</span>
                  <div className="mt-auto mb-2 flex items-start gap-2 bg-warm-ivory p-2 rounded shadow-sm border border-deep-teal/10">
                    <span className="material-symbols-outlined text-[16px] text-deep-teal shrink-0 mt-0.5">flight_takeoff</span>
                    <div className="flex flex-col">
                      <span className="font-label-stamp text-[10px] text-deep-teal">FLIGHT • 18:00</span>
                      <span className="font-label-caps text-[12px] text-ink-charcoal leading-tight">JFK → CDG</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative min-h-[140px] p-2 border-t border-deep-teal/20 bg-deep-teal/5 rounded-r-lg group">
                <div className="calendar-line right-1/2"></div>
                <div className="calendar-day-content h-full flex flex-col">
                  <span className="font-chapter-number text-[20px] text-deep-teal mb-2 block font-bold">5</span>
                  <div className="mt-auto mb-2 flex items-start gap-2 bg-warm-ivory p-2 rounded shadow-sm border border-deep-teal/10">
                    <span className="material-symbols-outlined text-[16px] text-deep-teal shrink-0 mt-0.5">flight_land</span>
                    <div className="flex flex-col">
                      <span className="font-label-stamp text-[10px] text-deep-teal">ARRIVE • 07:30</span>
                      <span className="font-label-caps text-[12px] text-ink-charcoal leading-tight">Paris</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative min-h-[140px] p-2 border-t border-deep-teal/10 group hover:bg-surface-container-low transition-colors rounded">
                <div className="calendar-day-content h-full flex flex-col">
                  <span className="font-chapter-number text-[20px] text-ink-charcoal mb-2 block group-hover:text-terracotta transition-colors">6</span>
                  <div className="mt-auto flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 px-1.5 py-1 rounded bg-terracotta/10 border border-terracotta/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></div>
                      <span className="font-label-caps text-[11px] text-terracotta truncate">Louvre Tour 10AM</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative min-h-[140px] p-2 border-t border-deep-teal/10 group hover:bg-surface-container-low transition-colors rounded">
                <div className="calendar-day-content h-full flex flex-col">
                  <span className="font-chapter-number text-[20px] text-ink-charcoal mb-2 block group-hover:text-terracotta transition-colors">7</span>
                  <div className="mt-auto flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 px-1.5 py-1 rounded bg-terracotta/10 border border-terracotta/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></div>
                      <span className="font-label-caps text-[11px] text-terracotta truncate">Dinner @ Le Jules</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative min-h-[140px] p-2 border-t border-deep-teal/10 group hover:bg-surface-container-low transition-colors rounded">
                <div className="calendar-day-content h-full flex flex-col">
                  <span className="font-chapter-number text-[20px] text-ink-charcoal mb-2 block group-hover:text-terracotta transition-colors">8</span>
                </div>
              </div>
              <div className="relative min-h-[140px] p-2 border-t border-deep-teal/20 bg-deep-teal/5 rounded-lg group">
                <div className="calendar-day-content h-full flex flex-col">
                  <span className="font-chapter-number text-[20px] text-deep-teal mb-2 block font-bold">9</span>
                  <div className="mt-auto mb-2 flex items-start gap-2 bg-warm-ivory p-2 rounded shadow-sm border border-deep-teal/10">
                    <span className="material-symbols-outlined text-[16px] text-deep-teal shrink-0 mt-0.5">train</span>
                    <div className="flex flex-col">
                      <span className="font-label-stamp text-[10px] text-deep-teal">THALYS • 09:25</span>
                      <span className="font-label-caps text-[12px] text-ink-charcoal leading-tight">Paris → AMS</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative min-h-[140px] p-2 border-t border-deep-teal/10 group hover:bg-surface-container-low transition-colors rounded">
                <div className="calendar-day-content h-full flex flex-col">
                  <span className="font-chapter-number text-[20px] text-ink-charcoal mb-2 block group-hover:text-terracotta transition-colors">10</span>
                  <div className="mt-auto flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 px-1.5 py-1 rounded bg-terracotta/10 border border-terracotta/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></div>
                      <span className="font-label-caps text-[11px] text-terracotta truncate">Rijksmuseum</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative min-h-[140px] p-2 border-t border-deep-teal/10 group hover:bg-surface-container-low transition-colors rounded">
                <div className="calendar-day-content h-full flex flex-col">
                  <span className="font-chapter-number text-[20px] text-ink-charcoal mb-2 block group-hover:text-terracotta transition-colors">11</span>
                </div>
              </div>
              <div className="relative min-h-[140px] p-2 border-t border-deep-teal/10 group hover:bg-surface-container-low transition-colors rounded">
                <div className="calendar-day-content h-full flex flex-col">
                  <span className="font-chapter-number text-[20px] text-ink-charcoal mb-2 block group-hover:text-terracotta transition-colors">12</span>
                </div>
              </div>
              <div className="relative min-h-[140px] p-2 border-t border-deep-teal/10 group hover:bg-surface-container-low transition-colors rounded">
                <div className="calendar-day-content h-full flex flex-col">
                  <span className="font-chapter-number text-[20px] text-ink-charcoal mb-2 block group-hover:text-terracotta transition-colors">13</span>
                </div>
              </div>
              <div className="relative min-h-[140px] p-2 border-t border-deep-teal/10 group hover:bg-surface-container-low transition-colors rounded">
                <div className="calendar-day-content h-full flex flex-col">
                  <span className="font-chapter-number text-[20px] text-ink-charcoal mb-2 block group-hover:text-terracotta transition-colors">14</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}