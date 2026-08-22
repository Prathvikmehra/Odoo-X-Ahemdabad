import { Link } from 'react-router-dom';

export default function PlanYourJourney() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col antialiased">
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-deep-teal/20 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 transition-all">
        <Link to="/" className="font-hero-display-mobile text-section-heading-mobile tracking-tighter text-ink-charcoal">GlobeTrotter</Link>
        <div className="hidden md:flex items-center gap-8 font-label-caps text-label-caps">
          <span className="text-terracotta font-bold border-b-2 border-terracotta pb-1">New Entry</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="font-label-caps text-label-caps text-on-surface-variant hover:text-terracotta transition-colors duration-300">Close</button>
        </div>
      </nav>

      <main className="flex-grow pt-32 pb-section-lg px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter max-w-[1920px] mx-auto w-full">
        <section className="lg:col-span-8 flex flex-col gap-section-lg">
          <div className="relative">
            <span className="absolute -left-12 top-2 font-chapter-number text-chapter-number italic text-tertiary-fixed-dim hidden md:block">01</span>
            <h1 className="font-section-heading-mobile md:font-section-heading text-section-heading-mobile md:text-section-heading text-ink-charcoal mb-4">Where to next?</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">Begin typing a city, region, or specific landmark to add it to your itinerary.</p>
            <div className="relative w-full max-w-3xl">
              <label className="block font-label-caps text-label-caps text-ink-charcoal mb-2">Search Destination</label>
              <div className="relative flex items-end">
                <span className="material-symbols-outlined absolute left-0 bottom-3 text-ink-charcoal">search</span>
                <input className="w-full editorial-input font-section-heading-mobile text-section-heading-mobile pl-10 placeholder:text-surface-variant placeholder:opacity-50 text-ink-charcoal focus:ring-0 focus:border-ink-charcoal transition-all" placeholder="e.g. Prague, Czech Republic" type="text" />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-label-caps text-label-caps text-ink-charcoal">Trending Connections</h2>
              <div className="h-px bg-deep-teal/20 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group cursor-pointer">
                <div className="relative w-full aspect-[4/5] overflow-hidden mb-4 bg-surface-container">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFr7daDYHvcbgvIzkOatWoDEyiCSarNlbMkgN5afSsb_g7Jn-0iq_l7AnQL9AidODw_u8FC-1MLNBpj9pnFD3b6kxwj-YT0ilTAmtOolIF_bgYtm4ssnPfb6xpjBA4CeIRVt85VK3YrHaaGAXSbZAOw3Bz_2I2lg2iHgl9lYw4NxyU1fkkkJOPeNTuhCYlq7r83hP4j5HDUDgkuJK_PY3udlTboX-itbsv4c7ttwJZ0X2ocaRlETHGbA" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <div className="absolute top-4 left-4 border border-white/40 backdrop-blur-sm px-3 py-1 font-label-stamp text-label-stamp text-white">+3 HRS BY TRAIN</div>
                </div>
                <h3 className="font-section-heading-mobile text-chapter-number text-ink-charcoal mb-1 group-hover:text-terracotta transition-colors">Vienna</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">add_circle</span> Add to journey
                </p>
              </div>
              <div className="group cursor-pointer md:mt-12">
                <div className="relative w-full aspect-[4/5] overflow-hidden mb-4 bg-surface-container">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYb73pMXHzw9kzuSx0ZYecfJEXZ-g7hTHz6vhHcA3xfM6UbCxEagThij-KoJqedCewFv8AEzA94awU8BQpvDwVLyFMzrgiSlphB1fK4ZcGe-txLsPvkjOr_IZm1FOKrnruhL3tCFsQgC4X1F64BYOC8NMMCxGat7qjHqVvM_ObcLDfkROmtlx5_n57NUM4Uh09fjutOyIFTxbjH_lDqu5COhxUwmmGDXtr1zKM7Ru1xeYgyA_CO9VDJA" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <div className="absolute top-4 left-4 border border-white/40 backdrop-blur-sm px-3 py-1 font-label-stamp text-label-stamp text-white">+4 HRS BY TRAIN</div>
                </div>
                <h3 className="font-section-heading-mobile text-chapter-number text-ink-charcoal mb-1 group-hover:text-terracotta transition-colors">Munich</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">add_circle</span> Add to journey
                </p>
              </div>
              <div className="group cursor-pointer">
                <div className="relative w-full aspect-[4/5] overflow-hidden mb-4 bg-surface-container">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATpjEKXsFnlPQ7I1UjtQXqvA7QVpVDo7D7w7xLObx64SQtAIBMboqKHfyISxhFwjxbGgLsFmhB596oHPfFdC1W_ysCKBm6jTStIUKzbYHEceGS557qkGjii7PQ8xWJtcKapmwK5aXYvGfZm4XuaqLKKJrOdWOFU7fYtStrVXI9L_hNMljmCHW96dvZGKSk1xEE9kbZfuwu-ujuX5Uxj-0_oukrsuLCI4RRD-0aRdpGCd4LoR_OPYEPhQ" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <div className="absolute top-4 left-4 border border-white/40 backdrop-blur-sm px-3 py-1 font-label-stamp text-label-stamp text-white">+6 HRS BY TRAIN</div>
                </div>
                <h3 className="font-section-heading-mobile text-chapter-number text-ink-charcoal mb-1 group-hover:text-terracotta transition-colors">Brussels</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">add_circle</span> Add to journey
                </p>
              </div>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-4 mt-section-lg lg:mt-0">
          <div className="sticky top-32 bg-surface-container-low p-8 border border-deep-teal/10 rounded-DEFAULT">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-label-caps text-label-caps text-ink-charcoal mb-2">Live Preview</h2>
                <h3 className="font-section-heading-mobile text-section-heading-mobile text-ink-charcoal">The Grand Tour</h3>
              </div>
              <span className="font-chapter-number text-chapter-number text-terracotta italic">14 Days</span>
            </div>
            <div className="relative flex flex-col gap-8 pb-4">
              <div className="relative flex gap-6 z-10">
                <div className="timeline-line"></div>
                <div className="w-12 h-12 rounded-full border border-deep-teal/30 bg-surface flex items-center justify-center shrink-0 z-10">
                  <span className="material-symbols-outlined text-ink-charcoal">flight_takeoff</span>
                </div>
                <div className="pt-2">
                  <p className="font-label-stamp text-label-stamp text-terracotta mb-1">STARTING POINT</p>
                  <h4 className="font-section-heading-mobile text-[28px] leading-tight text-ink-charcoal">Paris</h4>
                </div>
              </div>
              <div className="relative flex gap-6 z-10">
                <div className="timeline-line"></div>
                <div className="w-12 h-12 rounded-full border border-deep-teal/30 bg-surface flex items-center justify-center shrink-0 z-10">
                  <span className="font-label-stamp text-label-stamp text-ink-charcoal">3N</span>
                </div>
                <div className="pt-2">
                  <h4 className="font-section-heading-mobile text-[28px] leading-tight text-ink-charcoal">Amsterdam</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm">Train via Thalys • 3h 20m</p>
                </div>
              </div>
              <div className="relative flex gap-6 z-10">
                <div className="timeline-line"></div>
                <div className="w-12 h-12 rounded-full border border-deep-teal/30 bg-surface flex items-center justify-center shrink-0 z-10">
                  <span className="font-label-stamp text-label-stamp text-ink-charcoal">4N</span>
                </div>
                <div className="pt-2">
                  <h4 className="font-section-heading-mobile text-[28px] leading-tight text-ink-charcoal">Berlin</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm">Flight via KLM • 1h 15m</p>
                </div>
              </div>
              <div className="relative flex gap-6 z-10 opacity-60">
                <div className="w-12 h-12 rounded-full border border-dashed border-deep-teal/40 bg-transparent flex items-center justify-center shrink-0 z-10 animate-pulse">
                  <span className="material-symbols-outlined text-deep-teal/60">more_horiz</span>
                </div>
                <div className="pt-2">
                  <p className="font-label-stamp text-label-stamp text-deep-teal mb-1">ADDING...</p>
                  <h4 className="font-section-heading-mobile text-[28px] leading-tight text-ink-charcoal/60">Prague</h4>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <button className="w-full bg-terracotta text-warm-ivory font-label-caps text-label-caps py-4 rounded-DEFAULT hover:bg-terracotta/90 transition-colors">Review Itinerary</button>
            </div>
          </div>
        </aside>
      </main>

      <style>{`
        .timeline-line {
          position: absolute;
          left: 23px;
          top: 24px;
          bottom: -24px;
          width: 1px;
          background-color: rgba(45, 90, 97, 0.2);
        }
      `}</style>
    </div>
  );
}