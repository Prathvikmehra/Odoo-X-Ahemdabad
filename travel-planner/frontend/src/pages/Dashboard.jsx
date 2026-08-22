import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="bg-background text-on-background antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* TopNavBar */}
      <nav className="docked full-width top-0 sticky z-50 bg-surface/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop mx-auto h-24">
          <Link to="/" className="font-section-heading-mobile text-section-heading-mobile text-primary">
            GlobeTrotter
          </Link>
          <div className="hidden md:flex space-x-12">
            <Link to="/" className="text-primary border-b-2 border-primary pb-1 font-label-caps text-label-caps hover:text-primary transition-colors duration-300">
              Home
            </Link>
            <Link to="/explore" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300">
              Explore
            </Link>
            <Link to="/trips" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300">
              My Trips
            </Link>
            <Link to="/plan" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300">
              Plan
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
            <img
              alt="User Profile"
              className="w-12 h-12 rounded-full object-cover border border-outline-variant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrQne319x5e1oQLxrTOb-fK87OSFWhCmsF6gc2B51nPocnsXTL78gK44mmEfPApGoDGb0_hje9ippvuu9z_uCDClvs-QoKAyo63CypyqQ_4tEUEKb-mGlP4S4yrFY2kUM-_BY50kbhptVy5wSTtpD5iR3ovxUBZgiEO2C-NrwyPWXi9rln4eafSdLo239zuqTTIieiZC8YRzJRvO61y3R6lawlCMHYAhc86zzIVx3-GcR5u2tMxBVkfQ"
            />
          </div>
        </div>
      </nav>

      <main className="w-full pb-section-xl space-y-section-xl">
        {/* Editorial Hero */}
        <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105"
            style={{
              backgroundImage:
                'url(https://lh3.googleusercontent.com/aida-public/AB6AXuD4eGVQu4NAQKcdJ7-2N4mOWzB9dxiiu5zStUF5trxem3J-rH-PgipCXOttIc1IiQUEs19znUUNyESYD94Pjborz8Y4M_vsHOxpTbf6XVxym3esNwDEalL760o-JyhDcQICEmbYsmHM8G-EWJ5g9FMXmA5HIEaoIWomwNtrFF8vvACrY0JcduDlU91Hz-mAqMOnlSc87QrkdWtPQaVW3fFLTqAiU_NAQjGip6IGue6TnT2NvoVtMmd33Q)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop w-full max-w-7xl mx-auto flex flex-col items-center pt-24 pb-48">
            <span className="inline-block mb-12 font-label-stamp text-label-stamp tracking-[0.3em] text-white/90 uppercase border-b border-white/40 pb-2">
              Active Journey
            </span>
            <h1 className="font-hero-display-mobile md:font-hero-display text-hero-display-mobile md:text-hero-display text-white drop-shadow-2xl mb-8 text-balance uppercase">
              European<br />Summer<br />Escape
            </h1>
            <p className="font-label-caps text-label-caps text-white/80 tracking-widest flex items-center gap-4">
              <span className="w-8 h-[1px] bg-white/50" />
              12 JUN - 25 JUN
              <span className="w-8 h-[1px] bg-white/50" />
            </p>
          </div>
        </section>

        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop space-y-section-xl relative z-20 mt-overlap-lg">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-8 border-b border-outline-variant/30">
            <div>
              <h2 className="font-section-heading text-section-heading text-on-surface mb-2">Command Center</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Your journey at a glance.</p>
            </div>
            <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-caps text-label-caps hover:bg-on-primary-fixed-variant transition-all duration-300 shadow-lg flex items-center gap-2 group">
              <span className="material-symbols-outlined group-hover:rotate-90 transition-transform duration-300">add</span>
              Start a New Journey
            </button>
          </div>

          {/* Asymmetrical Layout */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* Progress Column */}
            <div className="lg:col-span-4 relative">
              <span className="text-terracotta font-label-stamp text-label-stamp tracking-[0.2em] uppercase mb-16 block">
                01. The Route
              </span>
              <div className="relative pl-12 space-y-20 before:absolute before:inset-y-2 before:left-[23px] before:w-[1px] before:bg-outline-variant/40">
                <div className="relative">
                  <div className="absolute -left-[48px] top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md z-10 border-4 border-background">
                    <span className="material-symbols-outlined text-white text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      done
                    </span>
                  </div>
                  <h4 className="font-section-heading-mobile text-section-heading-mobile text-on-surface mb-2">Paris</h4>
                  <p className="font-label-stamp text-label-stamp text-on-surface-variant uppercase text-[10px] tracking-widest">
                    48°51'24"N 2°21'08"E • Completed
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[50px] top-1 w-7 h-7 rounded-full bg-background flex items-center justify-center border border-primary z-10">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  </div>
                  <h4 className="font-section-heading-mobile text-[56px] leading-[1.1] font-bold text-primary mb-2 -ml-2">
                    Amsterdam
                  </h4>
                  <p className="font-label-stamp text-label-stamp text-primary uppercase text-[10px] tracking-widest font-bold">
                    52°22'26"N 4°53'22"E • Current
                  </p>
                </div>
                <div className="relative opacity-50">
                  <div className="absolute -left-[46px] top-2 w-4 h-4 rounded-full border border-outline-variant/60 bg-background z-10" />
                  <h4 className="font-section-heading-mobile text-section-heading-mobile text-on-surface mb-2">Berlin</h4>
                  <p className="font-label-stamp text-label-stamp text-on-surface-variant uppercase text-[10px] tracking-widest">
                    Upcoming
                  </p>
                </div>
              </div>
              <div className="mt-24">
                <p className="font-label-stamp text-label-stamp tracking-[0.2em] text-on-surface-variant mb-6 uppercase border-b border-outline-variant/30 pb-2 inline-block">
                  Trip Overview
                </p>
                <p className="font-section-heading-mobile text-[32px] leading-tight text-on-surface max-w-sm">
                  4 Destinations.<br />13 Days.<br />17 Experiences.<br />$2,450 Planned.
                </p>
              </div>
            </div>

            {/* Next Stop */}
            <div className="lg:col-span-8 group relative z-30 lg:-mt-32">
              <div className="aspect-[16/10] relative overflow-hidden shadow-2xl mb-8">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDEl9ajXJU_RbawpJ8lJv_1-gyoPPgwZlKv6LLuL4qQEyEioRFCXR-zPyFHkess4DZJVg-n4S2gJvGVYLRyNqQkkTUUVakfbLWM5uj34xYnTHvguosBS3R35jmfebzhzJFyc2aGXPKkCBUpeSKEB2REokRHQxY3MMhDJzJsU_bHiNQ7c6Wo06FDDBYhXW5mN8isP3XqIb-8fdOkUODitNGC8cJWDQzE-QquQ_UmeHNyFMjRXTGvie179Q)',
                  }}
                />
                <div className="absolute top-6 right-6 bg-white p-4 rounded-full shadow-lg">
                  <span className="material-symbols-outlined text-primary">push_pin</span>
                </div>
              </div>
              <div className="pl-0 lg:pl-12">
                <span className="text-terracotta font-label-stamp text-label-stamp tracking-[0.2em] uppercase mb-4 block">
                  02. On The Agenda
                </span>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
                  <h3 className="font-section-heading text-[80px] leading-[0.9] text-on-surface">
                    Amsterdam<br /><span className="text-[40px] text-on-surface-variant font-normal">Day 4</span>
                  </h3>
                  <p className="font-label-caps text-label-caps text-on-surface flex items-center gap-3 border-l-2 border-primary pl-4">
                    <span className="material-symbols-outlined text-primary text-[20px]">event</span>
                    Thursday, 15 June
                  </p>
                </div>
                <div className="space-y-12">
                  <div className="flex gap-8 items-start border-b border-outline-variant/30 pb-12 group/item cursor-pointer">
                    <div className="text-on-surface-variant font-label-stamp text-label-stamp tracking-widest mt-2 w-20 shrink-0">
                      18:00
                    </div>
                    <div className="flex-1">
                      <h4 className="font-section-heading-mobile text-[32px] text-on-surface mb-3 group-hover/item:text-primary transition-colors">
                        Canal Cruise
                      </h4>
                      <p className="font-body-lg text-body-lg text-on-surface-variant">
                        Evening architecture tour along the historic rings. A curated experience highlighting 17th-century merchants' houses.
                      </p>
                    </div>
                    <div className="hidden sm:flex bg-surface-container-high w-16 h-16 items-center justify-center rounded-full text-on-surface shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        directions_boat
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-8 items-start border-b border-outline-variant/30 pb-12 group/item cursor-pointer">
                    <div className="text-on-surface-variant font-label-stamp text-label-stamp tracking-widest mt-2 w-20 shrink-0">
                      10:00
                    </div>
                    <div className="flex-1">
                      <h4 className="font-section-heading-mobile text-[32px] text-on-surface mb-3 group-hover/item:text-primary transition-colors">
                        Van Gogh Museum
                      </h4>
                      <p className="font-body-lg text-body-lg text-on-surface-variant">
                        Pre-booked entry. Skip the line and explore the world's largest collection of Van Gogh's masterpieces.
                      </p>
                    </div>
                    <div className="hidden sm:flex bg-surface-container-high w-16 h-16 items-center justify-center rounded-full text-on-surface shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        museum
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-8">
                  <button className="inline-flex items-center gap-4 text-primary font-label-caps text-label-caps uppercase tracking-widest group hover:text-on-primary-fixed-variant transition-colors pb-2 border-b-2 border-primary/30 hover:border-primary">
                    View Full Itinerary
                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Discovery Strip */}
          <section className="pt-24">
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="text-terracotta font-label-stamp text-label-stamp tracking-[0.2em] uppercase mb-6 block">
                  03. Discovery
                </span>
                <h3 className="font-section-heading-mobile text-[56px] leading-[1.1] text-on-surface">
                  Curated for you
                </h3>
              </div>
              <div className="hidden md:flex gap-4">
                <button className="w-16 h-16 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-[28px]">arrow_back</span>
                </button>
                <button className="w-16 h-16 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-[28px]">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="flex gap-12 overflow-x-auto hide-scroll pb-12 snap-x snap-mandatory -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
              <div className="min-w-[320px] md:min-w-[480px] w-[320px] md:w-[480px] shrink-0 snap-start group cursor-pointer">
                <div className="aspect-[3/4] bg-surface-container-high overflow-hidden mb-8 relative">
                  <img
                    alt="Parisian Cafe"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ8Us8sUO95Vfh7O0bk3pCHOSwGTWOsHRkuHBKcEneB0shxqB_wZg2cd3Pf8pAbrmRM2gVouaSREVDq3apOiXVUqVzyjwBmUgqbGTBAIPWrqhyF-Z4ChaSXHj2p5t5ApzvjGmkpdE2U11yYvxJMvvbTiH4AEosvynkk1AGwOCTtMJiQcjk1aOaYfaK7lbvz7YPmzEBoUfOPCF75OG3nwtqamC5Jmg-ca4XMb6b7ROBFBJ-qz-KM4dyCw"
                  />
                </div>
                <h4 className="font-section-heading-mobile text-[32px] text-on-surface mb-4">
                  Hidden Cafes of Le Marais
                </h4>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm">
                  A guide to the best artisanal coffee spots hidden in plain sight.
                </p>
              </div>
              <div className="min-w-[320px] md:min-w-[480px] w-[320px] md:w-[480px] shrink-0 snap-start group cursor-pointer mt-16">
                <div className="aspect-[3/4] bg-surface-container-high overflow-hidden mb-8 relative">
                  <img
                    alt="Berlin Art Gallery"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9SqfGaj3X6duLGa9nBzbKu_zqRwsAh_cAW01nv7TC14C9Z1fJifeIULHTqx-p5Y3I_SmSUAjuTpFuiS-iEtn8a5JF-UgSqzZ9BRVm01AxzCiW6E4zQZhs78ypDJypGPK32oD9qZ8IjEXGrfqtJ6nQIYPfm5qVasItcThC--nf6TGui5X_2zRKNkmtcEO3-SVHz1_Ehzk7_Y6nvEM0RVp4SCVBI8djG5T5qrRtoo2JN2q-9SE_jkw-rA"
                  />
                </div>
                <h4 className="font-section-heading-mobile text-[32px] text-on-surface mb-4">
                  Berlin's Art Scene
                </h4>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm">
                  Must-visit contemporary galleries scattered throughout Mitte.
                </p>
              </div>
              <div className="min-w-[320px] md:min-w-[480px] w-[320px] md:w-[480px] shrink-0 snap-start group cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                <div className="aspect-[3/4] bg-surface-container-high overflow-hidden mb-8 relative">
                  <img
                    alt="Prague Architecture"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdnyKpXVV7IEYlVbVi7FTOq2hgsg6C8bc_dxTPjq_VmowGl-FW18lnRZYcxuKto3ERu6vTkCPfuGVrMfQxh4Gbxx-GT7s-rd4JfRW3XsVnUm2NED6OFiAuRh44z966omrY8iLv8fmHxH1Z5XUdhiZA_ZdaQ3jbNfXmrvSbCLv5X6f76W_pt6Kvt-zPNBuQZpPzjDgGym1SOgRega-gLJ9b25TfpddoutCUAG6jASTkHCm1YMXInF7R1Q"
                  />
                </div>
                <h4 className="font-section-heading-mobile text-[32px] text-on-surface mb-4">
                  Architectural Walk: Prague
                </h4>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm">
                  From Gothic spires to obscure Cubist masterpieces.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}