import { Link } from 'react-router-dom';

export default function TripDetails() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased overflow-x-hidden selection:bg-terracotta selection:text-white">
      <section className="relative min-h-[80vh] flex items-end pb-section-lg pt-32 px-margin-mobile md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCInAOJC6Dr-GWW0rzQtralAscSjoy68CO1Ir7lvpXGv1Q2u1ORo8d8_nx5kg2h5vTQWeIYh5Ik-JOVG0E-RFGQ2bpmo8RqZyPOwSM1GYyO5iM2bLBkqS1tLAkHip42qXCUBAwDXYYAtZGUus7UJ3tK109L9NmXnJSTOUA2e0jgvrVdvIYpxkNxoMzAuXmnYsl58yIq4IvdNECRE7tCD6yVlwQ4hnMV3aOjRsyS_KueB1qqc8n0Za83KA)' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-charcoal/80 via-ink-charcoal/20 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-8 md:w-3/4">
            <span className="font-label-stamp text-label-stamp text-warm-ivory uppercase tracking-widest border border-warm-ivory/30 px-3 py-1.5 w-max">TRIP OVERVIEW</span>
            <h1 className="font-hero-display-mobile text-hero-display-mobile md:font-hero-display md:text-hero-display text-warm-ivory">European<br />Summer<br />Escape</h1>
            <div className="flex flex-wrap gap-8 pt-8 border-t border-warm-ivory/20">
              <div className="flex flex-col gap-2">
                <span className="font-label-caps text-label-caps text-warm-ivory/60">ROUTE</span>
                <span className="font-body-lg text-body-lg text-warm-ivory">Paris → Amsterdam → Berlin → Prague</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-label-caps text-label-caps text-warm-ivory/60">DURATION</span>
                <span className="font-body-lg text-body-lg text-warm-ivory">13 Days</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-label-caps text-label-caps text-warm-ivory/60">DATES</span>
                <span className="font-body-lg text-body-lg text-warm-ivory">June 12 - 24, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-section-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-12 border-r border-deep-teal/10 pr-8">
            <div>
              <h3 className="font-label-stamp text-label-stamp text-terracotta uppercase tracking-widest mb-8">Journey Route</h3>
              <div className="relative flex flex-col gap-12">
                <div className="absolute left-2 top-4 bottom-4 w-px bg-deep-teal/20"></div>
                <div className="relative flex gap-6 items-start">
                  <div className="w-4 h-4 rounded-full bg-terracotta mt-1 z-10 ring-4 ring-background"></div>
                  <div>
                    <h4 className="font-section-heading-mobile text-xl text-ink-charcoal">Paris</h4>
                    <p className="font-body-md text-deep-teal/70 mt-1">Days 1 - 3</p>
                    <span className="inline-block font-label-stamp text-[10px] text-terracotta border border-terracotta px-2 py-1 mt-3">STAMPED</span>
                  </div>
                </div>
                <div className="relative flex gap-6 items-start">
                  <div className="w-4 h-4 rounded-full border-2 border-terracotta bg-background mt-1 z-10 ring-4 ring-background"></div>
                  <div>
                    <h4 className="font-section-heading-mobile text-xl text-ink-charcoal">Amsterdam</h4>
                    <p className="font-body-md text-deep-teal/70 mt-1">Days 4 - 6</p>
                    <span className="inline-block font-label-stamp text-[10px] text-deep-teal/60 border border-deep-teal/20 px-2 py-1 mt-3">UPCOMING</span>
                  </div>
                </div>
                <div className="relative flex gap-6 items-start">
                  <div className="w-4 h-4 rounded-full border-2 border-deep-teal/30 bg-background mt-1 z-10 ring-4 ring-background"></div>
                  <div>
                    <h4 className="font-section-heading-mobile text-xl text-ink-charcoal/40">Berlin</h4>
                    <p className="font-body-md text-deep-teal/40 mt-1">Days 7 - 9</p>
                  </div>
                </div>
                <div className="relative flex gap-6 items-start">
                  <div className="w-4 h-4 rounded-full border-2 border-deep-teal/30 bg-background mt-1 z-10 ring-4 ring-background"></div>
                  <div>
                    <h4 className="font-section-heading-mobile text-xl text-ink-charcoal/40">Prague</h4>
                    <p className="font-body-md text-deep-teal/40 mt-1">Days 10 - 13</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-12 border-t border-deep-teal/10">
              <h3 className="font-label-stamp text-label-stamp text-terracotta uppercase tracking-widest mb-6">Quick Actions</h3>
              <div className="flex flex-col gap-4">
                <button className="flex items-center gap-3 font-label-caps text-label-caps text-deep-teal hover:text-terracotta transition-colors group">
                  <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">event_note</span> Full Itinerary
                </button>
                <button className="flex items-center gap-3 font-label-caps text-label-caps text-deep-teal hover:text-terracotta transition-colors group">
                  <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">calendar_month</span> Calendar Sync
                </button>
                <button className="flex items-center gap-3 font-label-caps text-label-caps text-deep-teal hover:text-terracotta transition-colors group">
                  <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">share</span> Share Journey
                </button>
                <button className="flex items-center gap-3 font-label-caps text-label-caps text-deep-teal hover:text-terracotta transition-colors group">
                  <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">edit</span> Edit Trip
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-section-lg md:pl-12 mt-16 md:mt-0">
            <section className="relative">
              <span className="absolute -left-12 -top-8 font-chapter-number text-chapter-number text-terracotta opacity-50 italic">01</span>
              <h2 className="font-section-heading-mobile text-section-heading-mobile md:font-section-heading md:text-section-heading text-ink-charcoal mb-12">Curated Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter relative">
                <div className="flex flex-col gap-4 z-10 md:-mb-16">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <div className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700 ease-in-out" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDK3n5-adgGXiqQCBOioFao4Y3NTTsKKQetEPMBU3oKkc5cvz-79UH_uMT3s51M9Og9qGK1S6651TvxKyCC3_jGzrwXzK5DwDMg93JnkUN8HKMdhB7WIyeG8am0M5S4WDuKJdtulMa92y2rK2lHPZa9GXQNAe7PYffW0ZWnrlkTnvhVTYrRPWNHXNVCzb9PDDaNHuj_CQbtCjk2Ca7j8qFhhI4xaIy0aISZbGfFfMBRXuHDBSe7TZVm0w)' }}></div>
                  </div>
                  <div>
                    <span className="font-label-stamp text-label-stamp text-terracotta">PARIS</span>
                    <h3 className="font-section-heading-mobile text-2xl text-ink-charcoal mt-2">Iron & Light</h3>
                  </div>
                </div>
                <div className="flex flex-col gap-4 z-20 md:mt-32 md:-ml-12">
                  <div className="aspect-square w-full overflow-hidden shadow-2xl shadow-ink-charcoal/5">
                    <div className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700 ease-in-out" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCeSUkDNlnCVskZVnkUR56FUsrJrudi13iP2RsIksQmwYUXqst-YdaZiD846EWNDg0UTYTfUdMZ6-qzNI9nxU6bwEFnq5cIaeBFKuFz2m81YZ9nMyBSbFNZUH9oSota_VFRDAGzBeKnSf3PAD8we_L4auL3ob2hCs4IX91mLp3zGlETO70_rx9-RRhjYHty8sR6wvpr3x_qJViTlX77IOVhN7u5WOKzGmz_Pk6JnsHxhkshXoz5LhJJPQ)' }}></div>
                  </div>
                  <div className="bg-surface p-6 -mt-8 mx-4 relative border border-deep-teal/10">
                    <span className="font-label-stamp text-label-stamp text-terracotta">AMSTERDAM</span>
                    <h3 className="font-section-heading-mobile text-2xl text-ink-charcoal mt-2">The Dutch Masters</h3>
                    <p className="font-body-md text-deep-teal/80 mt-4 line-clamp-3">An afternoon dedicated to the textural brilliance of the Van Gogh Museum, followed by a quiet stroll along the Prinsengracht.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative pt-16 border-t border-deep-teal/10">
              <span className="absolute -left-12 top-8 font-chapter-number text-chapter-number text-terracotta opacity-50 italic">02</span>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <h2 className="font-section-heading-mobile text-section-heading-mobile md:font-section-heading md:text-section-heading text-ink-charcoal">Budget Summary</h2>
                <button className="bg-terracotta text-warm-ivory px-6 py-3 font-label-caps text-label-caps hover:bg-ink-charcoal transition-colors duration-300">VIEW DETAILS</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="flex flex-col p-8 bg-surface-container-low border border-deep-teal/5 hover:border-deep-teal/20 transition-colors">
                  <span className="font-label-stamp text-label-stamp text-deep-teal/60 mb-2">TOTAL ESTIMATE</span>
                  <span className="font-hero-display-mobile text-4xl text-ink-charcoal">$4,250</span>
                </div>
                <div className="flex flex-col p-8 bg-surface-container-low border border-deep-teal/5 hover:border-deep-teal/20 transition-colors">
                  <span className="font-label-stamp text-label-stamp text-deep-teal/60 mb-2">SPENT SO FAR</span>
                  <span className="font-hero-display-mobile text-4xl text-terracotta">$1,820</span>
                </div>
                <div className="flex flex-col p-8 bg-surface-container-low border border-deep-teal/5 hover:border-deep-teal/20 transition-colors">
                  <span className="font-label-stamp text-label-stamp text-deep-teal/60 mb-2">REMAINING</span>
                  <span className="font-hero-display-mobile text-4xl text-secondary">$2,430</span>
                </div>
              </div>
              <div className="mt-8 flex h-4 w-full rounded-none overflow-hidden bg-surface-container-high">
                <div className="h-full bg-terracotta" style={{ width: '45%' }}></div>
                <div className="h-full bg-secondary" style={{ width: '30%' }}></div>
                <div className="h-full bg-outline" style={{ width: '15%' }}></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-6 font-label-caps text-xs text-deep-teal/70">
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-terracotta"></div> Accommodations (45%)</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-secondary"></div> Flights & Transit (30%)</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-outline"></div> Activities (15%)</div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}