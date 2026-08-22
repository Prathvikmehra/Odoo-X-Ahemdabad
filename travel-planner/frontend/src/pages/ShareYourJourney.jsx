import { Link } from 'react-router-dom';

export default function ShareYourJourney() {
  return (
    <div className="bg-warm-ivory text-ink-charcoal antialiased min-h-screen font-body-md text-body-md overflow-x-hidden selection:bg-terracotta/20">
      <nav className="fixed top-0 w-full z-50 bg-warm-ivory/80 backdrop-blur-md border-b border-deep-teal/20 flex justify-between items-center px-margin-desktop py-6">
        <div className="flex items-center gap-12">
          <Link to="/" className="font-hero-display text-primary italic text-3xl">GlobeTrotter</Link>
          <div className="hidden md:flex gap-8">
            <Link to="/explore" className="font-label-caps text-label-caps text-deep-teal hover:opacity-70 transition-opacity duration-300">Destinations</Link>
            <Link to="#" className="font-label-caps text-label-caps text-terracotta border-b border-terracotta pb-1 hover:opacity-70 transition-opacity duration-300">Stories</Link>
            <Link to="#" className="font-label-caps text-label-caps text-deep-teal hover:opacity-70 transition-opacity duration-300">Shop</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="hover:opacity-70 transition-opacity duration-300 text-primary"><span className="material-symbols-outlined">language</span></button>
          <button className="hover:opacity-70 transition-opacity duration-300 text-primary"><span className="material-symbols-outlined">search</span></button>
          <img alt="User profile" className="w-10 h-10 rounded-full object-cover border border-deep-teal/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCArYKV4FMkamExToY9Tm_WI6fsKmipSwyQCS71qnLIeJGYlbZRGn6aUTajZu39gB6WMxi6y8OJPLEiKkPscd_eew5dXiNoGV3cHoLsy9xO1c_EfjZnZOGcscMPqDkcHrVG1o9xjLxRUW6qCXTugXmai_V285sUfOhPLeyXVQ-siBGefwP5KeKfKHyVbQg0vgEQdJ1svxlKpvAUjNvPQ5QA28p6xi_cXQCUK5dY4KBMCiF4mqmCUrIAag" />
        </div>
      </nav>

      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-surface-container-low border-r border-deep-teal/10 flex-col py-margin-desktop z-40 mt-24">
        <div className="px-6 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <img alt="Trip cover thumbnail" className="w-12 h-12 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5j7CWWhvKGhrTSIwpzJbSJJboDNXrxEw0BpN4r4ZeEKBue2akX6FTfyrkcWqTacDDzLm2j8cnuqYyu-RXSVWD8GSqpJTw96vEawzqmRDPWhVx7Ffmzfc3xZ_PtaADQbHqe28Agyq6Dlnmeqw3tsMI_6cdW6JJpyRuGR8uy-QMYE6cUPsHyZkLaUhL2-PKl5eHSEpfeGMyvo1A8q4aMkQEXSrKX_qkr3QAkmlm2NTd_5iQTAC1iJuhjQ" />
            <div>
              <h2 className="font-section-heading text-primary text-xl leading-tight">Amalfi Coast</h2>
              <p className="font-body-md text-body-md text-deep-teal/70 text-sm">June 2024</p>
            </div>
          </div>
          <button className="w-full py-3 bg-terracotta text-warm-ivory font-label-caps text-label-caps rounded hover:bg-terracotta/90 transition-colors">Invite Friends</button>
        </div>
        <div className="flex flex-col gap-2 px-2 flex-grow">
          <Link to="#" className="flex items-center gap-3 py-3 px-4 rounded text-deep-teal pl-4 hover:bg-surface-container-high transition-colors font-label-caps text-label-caps"><span className="material-symbols-outlined text-[20px]">dashboard</span> Overview</Link>
          <Link to="#" className="flex items-center gap-3 py-3 px-4 rounded text-deep-teal pl-4 hover:bg-surface-container-high transition-colors font-label-caps text-label-caps"><span className="material-symbols-outlined text-[20px]">event_note</span> Itinerary</Link>
          <Link to="#" className="flex items-center gap-3 py-3 px-4 rounded text-deep-teal pl-4 hover:bg-surface-container-high transition-colors font-label-caps text-label-caps"><span className="material-symbols-outlined text-[20px]">payments</span> Budget</Link>
          <Link to="#" className="flex items-center gap-3 py-3 px-4 rounded text-deep-teal pl-4 hover:bg-surface-container-high transition-colors font-label-caps text-label-caps"><span className="material-symbols-outlined text-[20px]">explore</span> Map</Link>
          <Link to="#" className="flex items-center gap-3 py-3 px-4 rounded text-terracotta font-bold border-l-2 border-terracotta pl-4 hover:bg-surface-container-high transition-colors bg-surface-container-high/50 font-label-caps text-label-caps"><span className="material-symbols-outlined text-[20px]">photo_library</span> Photos</Link>
        </div>
        <div className="flex flex-col gap-2 px-2 mt-auto pt-6 border-t border-deep-teal/10">
          <Link to="#" className="flex items-center gap-3 py-3 px-4 rounded text-deep-teal pl-4 hover:bg-surface-container-high transition-colors font-label-caps text-label-caps"><span className="material-symbols-outlined text-[20px]">settings</span> Settings</Link>
          <Link to="#" className="flex items-center gap-3 py-3 px-4 rounded text-deep-teal pl-4 hover:bg-surface-container-high transition-colors font-label-caps text-label-caps"><span className="material-symbols-outlined text-[20px]">archive</span> Archive</Link>
        </div>
      </div>

      <main className="pt-32 pb-section-xl lg:pl-64 px-margin-mobile md:px-margin-desktop max-w-[1600px] mx-auto min-h-screen flex flex-col">
        <header className="mb-24 mt-12 grid grid-cols-12 gap-gutter">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center md:text-left relative">
            <span className="font-chapter-number text-chapter-number text-terracotta absolute -left-12 top-2 hidden md:block">05</span>
            <h1 className="font-section-heading-mobile text-section-heading-mobile md:font-section-heading md:text-section-heading text-primary mb-6">Share Your Journey</h1>
            <p className="font-body-lg text-body-lg text-deep-teal max-w-2xl">Publish your curated experiences to the world or keep them closely guarded. The narrative is yours to control.</p>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-gutter items-start">
          <div className="col-span-12 lg:col-span-7 relative group">
            <div className="aspect-[4/5] bg-surface-container-low rounded p-4 md:p-8 relative overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCy8shx6IRBFnYIeaxoBCDWu0oVs05IMICxBqwIPTrxj70Kt1uHLqXCER0vbghYwcZz7IhExSttQUihVriSA99NWI0xDzKETFsnVu9AmxtYgXKMQtlPhpbrP9iehezrDKJBXq4JprLom94wdN2qLbrrCDspdm11Yd8apc2Cvp4tJVu6xhghrSw-oEm9w1zXbID7vnyB3vjlRd1qf0OET-nnYg1xpa3GWUmNBcFGW2cluMR6l9hCGu-0Sg)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-charcoal/80 via-ink-charcoal/20 to-transparent"></div>
              <div className="relative h-full flex flex-col justify-between z-10 p-6 md:p-8 text-warm-ivory">
                <div className="flex justify-between items-start w-full">
                  <div className="border border-warm-ivory/30 rounded-full px-4 py-1 backdrop-blur-sm">
                    <span className="font-label-stamp text-label-stamp text-warm-ivory tracking-widest">SUMMER 2024</span>
                  </div>
                  <div className="w-16 h-16 border border-warm-ivory/50 rounded-full flex items-center justify-center rotate-12 backdrop-blur-sm">
                    <div className="w-14 h-14 border border-warm-ivory/30 rounded-full flex flex-col items-center justify-center text-[8px] font-label-stamp text-label-stamp uppercase text-center leading-tight">
                      <span>Paris</span>
                      <span className="text-terracotta">FR</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto max-w-md backdrop-blur-md bg-ink-charcoal/40 p-6 rounded border border-warm-ivory/10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-hero-display-mobile text-[40px] md:text-hero-display-mobile leading-none mb-4 italic">Parisian Days & Riviera Nights</h3>
                  <div className="flex items-center gap-4 text-sm font-body-md">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 14 Days</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">map</span> 5 Stops</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col gap-12 pt-8 lg:pt-0">
            <section className="bg-surface p-8 border border-deep-teal/10 rounded relative">
              <h2 className="font-label-caps text-label-caps text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">visibility</span> Visibility Status
              </h2>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-body-lg text-body-lg text-ink-charcoal font-semibold">Public Story</p>
                  <p className="font-body-md text-body-md text-deep-teal/70 text-sm mt-1">Anyone with the link can view.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-14 h-7 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-terracotta"></div>
                </label>
              </div>
            </section>

            <section className="bg-surface p-8 border border-deep-teal/10 rounded relative">
              <h2 className="font-label-caps text-label-caps text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">link</span> Share Link
              </h2>
              <div className="relative mb-6">
                <input className="w-full bg-transparent border-b border-ink-charcoal/20 py-4 font-body-md text-ink-charcoal focus:border-terracotta focus:ring-0 transition-colors pr-24" readOnly type="text" value="globetrotter.app/shared/europe-24" />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 font-label-caps text-label-caps text-terracotta hover:text-primary transition-colors">Copy Link</button>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-terracotta text-warm-ivory font-label-caps text-label-caps py-4 rounded hover:bg-terracotta/90 transition-colors scale-102 hover:scale-100 duration-200 shadow-sm flex justify-center items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">share</span> Share
                </button>
                <button className="flex-1 border border-deep-teal text-deep-teal font-label-caps text-label-caps py-4 rounded hover:bg-deep-teal/5 transition-colors duration-200 flex justify-center items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span> Preview Story
                </button>
              </div>
            </section>

            <section className="bg-surface p-8 border border-deep-teal/10 rounded relative">
              <h2 className="font-label-caps text-label-caps text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">tune</span> Content Inclusions
              </h2>
              <div className="space-y-6">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input className="peer appearance-none w-5 h-5 border border-deep-teal/30 rounded checked:bg-terracotta checked:border-terracotta transition-colors" type="checkbox" />
                    <span className="material-symbols-outlined text-white absolute opacity-0 peer-checked:opacity-100 text-[16px] pointer-events-none transition-opacity">check</span>
                  </div>
                  <div>
                    <p className="font-body-md text-ink-charcoal group-hover:text-terracotta transition-colors">Show budget summary</p>
                    <p className="text-sm text-deep-teal/60">Include total costs and category breakdowns.</p>
                  </div>
                </label>
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input className="peer appearance-none w-5 h-5 border border-deep-teal/30 rounded checked:bg-terracotta checked:border-terracotta transition-colors" type="checkbox" />
                    <span className="material-symbols-outlined text-white absolute opacity-0 peer-checked:opacity-100 text-[16px] pointer-events-none transition-opacity">check</span>
                  </div>
                  <div>
                    <p className="font-body-md text-ink-charcoal group-hover:text-terracotta transition-colors">Show private notes</p>
                    <p className="text-sm text-deep-teal/60">Reveal diary entries marked as private.</p>
                  </div>
                </label>
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input defaultChecked className="peer appearance-none w-5 h-5 border border-deep-teal/30 rounded checked:bg-terracotta checked:border-terracotta transition-colors" type="checkbox" />
                    <span className="material-symbols-outlined text-white absolute opacity-0 peer-checked:opacity-100 text-[16px] pointer-events-none transition-opacity">check</span>
                  </div>
                  <div>
                    <p className="font-body-md text-ink-charcoal group-hover:text-terracotta transition-colors">Allow comments</p>
                    <p className="text-sm text-deep-teal/60">Let viewers leave remarks on your journey.</p>
                  </div>
                </label>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-warm-ivory border-t border-deep-teal/20 mt-section-lg flex flex-col md:flex-row justify-between items-center px-margin-desktop py-12 w-full">
        <div className="font-hero-display-mobile text-primary text-2xl md:text-4xl italic mb-8 md:mb-0">GlobeTrotter</div>
        <div className="flex flex-wrap justify-center gap-6 mb-8 md:mb-0">
          <Link to="#" className="font-label-caps text-label-caps text-deep-teal/60 hover:text-terracotta transition-colors duration-300 opacity-80 hover:opacity-100">Journal</Link>
          <Link to="#" className="font-label-caps text-label-caps text-deep-teal/60 hover:text-terracotta transition-colors duration-300 opacity-80 hover:opacity-100">About Us</Link>
          <Link to="#" className="font-label-caps text-label-caps text-deep-teal/60 hover:text-terracotta transition-colors duration-300 opacity-80 hover:opacity-100">Privacy</Link>
          <Link to="#" className="font-label-caps text-label-caps text-deep-teal/60 hover:text-terracotta transition-colors duration-300 opacity-80 hover:opacity-100">Terms</Link>
          <Link to="#" className="font-label-caps text-label-caps text-deep-teal/60 hover:text-terracotta transition-colors duration-300 opacity-80 hover:opacity-100">Support</Link>
        </div>
        <div className="font-body-md text-body-md text-deep-teal text-sm text-center md:text-right">© 2024 GlobeTrotter Editorial. All rights reserved.</div>
      </footer>
    </div>
  );
}