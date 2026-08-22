import { Link } from 'react-router-dom';

export default function MyTrips() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <header className="bg-surface/90 backdrop-blur-md text-primary sticky top-0 z-50 border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-gutter mx-auto h-24 max-w-[1600px]">
          <div className="font-section-heading text-[32px] font-bold text-primary">GlobeTrotter</div>
          <nav className="hidden md:flex space-x-12">
            <Link to="/" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300">Home</Link>
            <Link to="/explore" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300">Explore</Link>
            <Link to="/trips" className="text-primary font-label-caps text-label-caps border-b border-primary pb-1">Passports</Link>
            <Link to="/plan" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300">Plan</Link>
            <Link to="/itinerary-builder" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300">Itinerary</Link>
            <Link to="/budget" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300">Budget</Link>
          </nav>
          <div className="flex items-center space-x-6">
            <button className="text-on-surface-variant hover:text-primary transition-colors duration-300">
              <span className="material-symbols-outlined">search</span>
            </button>
            <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/30">
              <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB28ZCYIRcPZjh0RvZhAlmelS1Wr1lT60iyF1Aa6DSsgzxDhgZ-iprPfeUxLu2wZqCMDnUpJrQrtWjYw5BeGn69UluwmouVZoFGvzMZHaJekVVCnrZFMD-XUGmGv6ExgFr_DM02AGro2pUmhw5wopUz_BUGlah5R33-QXkOZnf4iP0iFfUMb4O35qAtOGxnMfb8651DK7vu8bg72GUzWYGQVzsfsJGsN2cmmKP5nFq6TEiEigMzwdaXpg" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full pb-section-xl">
        <div className="px-margin-mobile md:px-gutter max-w-[1600px] mx-auto pt-24 pb-16 border-b border-outline-variant/40">
          <h1 className="font-hero-display-mobile md:font-hero-display text-hero-display-mobile md:text-hero-display text-on-surface mb-8 tracking-tighter">My Passports</h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl font-serif italic text-2xl">A curated collection of your chapters abroad. Every departure, every arrival, elegantly archived here.</p>
            <div className="flex space-x-12 mt-12 md:mt-0">
              <button className="tab-btn active pb-2 font-label-caps text-label-caps text-primary border-b border-primary transition-colors">Upcoming</button>
              <button className="tab-btn pb-2 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">Past</button>
              <button className="tab-btn pb-2 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">Drafts</button>
            </div>
          </div>
        </div>

        <div className="px-margin-mobile md:px-margin-desktop mt-section-lg max-w-[1600px] mx-auto">
          <div className="tab-content active space-y-[240px]" id="tab-upcoming">
            <article className="relative flex flex-col lg:flex-row group w-full kinetic-container">
              <div className="lg:w-6/12 relative z-10 overflow-hidden h-[600px] lg:h-[850px] shadow-2xl">
                <img alt="Amalfi Coast" className="w-full h-full object-cover kinetic-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8vuQxE-5KzPL2C7IdJ8MkhEiqCgTEll0qtsXM0tTeNlbo581W21S6NOmkRseMZgM9pkCxb80Ks81zOcTh7T0YQTNtmiJzDGJkXKLHOM5DlVWagee0oxmmLjK-0Rqe96RUo1n4SkmxrDpPOzdasSMOn2XO3alfWoCVz14EgL_3GIq6D0MS2UlcWl2_sov3pqRER-20UjBauGf_S9v0IC6hPONq4iv5eAEalFjDG0Glnmn-5N-EVHyg7Q" />
                <div className="absolute top-8 left-8 font-label-stamp text-label-stamp text-surface uppercase tracking-[0.2em] bg-on-surface/30 backdrop-blur-sm px-4 py-2 rounded-sm">Vol. 01 — Planned</div>
              </div>
              <div className="lg:w-6/12 bg-surface p-10 md:p-16 lg:p-24 relative z-20 lg:-ml-24 lg:mt-48 border border-outline-variant/30 flex flex-col justify-between self-start shadow-xl shadow-on-background/5">
                <div className="absolute -top-12 -right-8 w-32 h-32 passport-stamp rotate-12">
                  <div className="passport-stamp-inner"><span>DEP</span><span className="text-sm my-1">SEP 15</span><span>JFK</span></div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-tertiary mb-10 font-label-caps text-label-caps text-xs">
                    <span className="bg-surface-container-low px-3 py-1 border border-outline-variant/50">SEP 15 - SEP 28</span>
                    <span className="bg-surface-container-low px-3 py-1 border border-outline-variant/50">14 DAYS</span>
                    <span className="bg-surface-container-low px-3 py-1 border border-outline-variant/50 text-primary tracking-widest">40.633° N, 14.602° E</span>
                    <span className="bg-surface-container-low px-3 py-1 border border-outline-variant/50">AZ 609</span>
                  </div>
                  <h2 className="font-section-heading-mobile md:font-section-heading text-section-heading-mobile md:text-section-heading text-on-surface mb-16 leading-tight">Italian Riviera<br />Escape</h2>
                  <div className="flex items-center justify-between text-on-surface font-label-caps text-label-caps mb-20 relative">
                    <div className="text-center z-10 bg-surface px-2">
                      <div className="font-label-stamp text-label-stamp text-tertiary mb-3">DEP</div>
                      <div className="w-14 h-14 rounded-full border border-outline-variant flex items-center justify-center mx-auto text-primary bg-surface-container-low mb-4">JFK</div>
                      <span className="text-xs">New York</span>
                    </div>
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center z-0 px-14">
                      <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                      <div className="flex-grow h-px trip-route-line text-outline mx-3"></div>
                      <span className="material-symbols-outlined text-outline mx-3 text-xl">flight</span>
                      <div className="flex-grow h-px trip-route-line text-outline mx-3"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                      <div className="flex-grow h-px trip-route-line text-outline mx-3"></div>
                      <span className="material-symbols-outlined text-outline mx-3 text-xl">train</span>
                      <div className="flex-grow h-px trip-route-line text-outline mx-3"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                    </div>
                    <div className="text-center z-10 bg-surface px-2">
                      <div className="font-label-stamp text-label-stamp text-tertiary mb-3">VIA</div>
                      <div className="w-14 h-14 rounded-full border border-outline-variant flex items-center justify-center mx-auto text-primary bg-surface-container-low mb-4">FCO</div>
                      <span className="text-xs">Rome</span>
                    </div>
                    <div className="text-center z-10 bg-surface px-2">
                      <div className="font-label-stamp text-label-stamp text-primary mb-3">ARR</div>
                      <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center mx-auto text-on-primary bg-primary mb-4 shadow-lg shadow-primary/30">NAP</div>
                      <span className="text-primary font-bold text-xs">Naples</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-outline-variant/40 pt-10 mt-12">
                  <div>
                    <span className="text-tertiary font-label-caps text-label-caps block mb-3 text-xs">EST. BUDGET</span>
                    <span className="font-chapter-number text-chapter-number text-on-surface font-serif italic">$4,200</span>
                  </div>
                  <button className="text-primary font-label-caps text-label-caps hover:text-on-primary-container transition-colors flex items-center group/btn uppercase tracking-widest text-sm">
                    View Itinerary
                    <span className="material-symbols-outlined ml-3 text-xl transform group-hover/btn:translate-x-2 transition-transform">arrow_right_alt</span>
                  </button>
                </div>
              </div>
            </article>

            <article className="relative flex flex-col group w-full kinetic-container mt-[240px]">
              <div className="w-full relative z-10 overflow-hidden h-[400px] lg:h-[600px] shadow-2xl">
                <img alt="Swiss Alps" className="w-full h-full object-cover kinetic-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6V6aZ7Vhu14lnsxZ2r4YnLBHa1zMyOEKdiXvzjvgqeW7PT_mZ6WEhsWLAwvhUdDexLZP_0LEUuI4cisWVbkNX5UeBdzKbACBpYfM4Agv9QuDWt-0JmjLEi3b7Oz12VDWHbH7DsCdNIFdoliotkejYMFmEr_oJpTspnKp91IOvhwJMzaU-WcKbmeDScD2GA0ULvO5e9GRyxIJpt1c-3QGCOqm8MxYjnwxr_IhD6Vb7QcWkrHjc_mMe3A" />
                <div className="absolute top-8 left-8 font-label-stamp text-label-stamp text-surface uppercase tracking-[0.2em] bg-on-surface/30 backdrop-blur-sm px-4 py-2 rounded-sm">Vol. 02 — Planning</div>
              </div>
              <div className="w-full lg:w-10/12 bg-surface p-10 md:p-16 relative z-20 lg:-mt-32 lg:ml-auto border border-outline-variant/30 flex flex-col md:flex-row gap-12 justify-between shadow-xl shadow-on-background/5">
                <div className="absolute -top-10 left-12 w-28 h-28 passport-stamp -rotate-6 border-secondary text-secondary">
                  <div className="passport-stamp-inner border-secondary"><span>WINTER</span><span className="text-[10px] my-1">2024</span><span>ZRH</span></div>
                </div>
                <div className="md:w-1/2">
                  <h2 className="font-section-heading-mobile md:font-section-heading text-section-heading-mobile md:text-[56px] text-on-surface mb-8 leading-tight">Alpine<br />Expedition</h2>
                  <div className="flex flex-wrap items-center gap-4 text-tertiary font-label-caps text-label-caps text-xs">
                    <span className="bg-surface-container-low px-3 py-1 border border-outline-variant/50">DEC 10 - DEC 20</span>
                    <span className="bg-surface-container-low px-3 py-1 border border-outline-variant/50 text-secondary tracking-widest">46.559° N, 7.966° E</span>
                  </div>
                </div>
                <div className="md:w-1/2 flex flex-col justify-end">
                  <p className="text-on-surface-variant font-body-md mb-10">A journey through snow-capped peaks and pristine glacial valleys. Plotting out the scenic train routes and mountain lodges for the ultimate winter escape.</p>
                  <div className="flex justify-between items-end border-t border-outline-variant/40 pt-8">
                    <div>
                      <span className="text-tertiary font-label-caps text-label-caps block mb-2 text-xs">STATUS</span>
                      <span className="font-chapter-number text-[20px] text-on-surface font-serif italic">Drafting</span>
                    </div>
                    <button className="text-secondary font-label-caps text-label-caps hover:text-deep-teal transition-colors flex items-center group/btn uppercase tracking-widest text-sm">
                      Continue Planning
                      <span className="material-symbols-outlined ml-3 text-xl transform group-hover/btn:translate-x-2 transition-transform">arrow_right_alt</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="tab-content space-y-section-xl relative pb-32" id="tab-past">
            <div className="mb-16">
              <h2 className="font-section-heading text-5xl text-on-surface mb-4 font-serif italic">Gathered Memories</h2>
              <p className="text-on-surface-variant max-w-xl">A collection of stamped pages and archived journeys.</p>
            </div>
            <div className="relative h-[800px] w-full max-w-5xl mx-auto">
              <article className="absolute top-0 left-0 w-[450px] bg-surface p-4 pb-12 shadow-2xl border border-outline-variant/40 transform -rotate-3 hover:rotate-0 hover:z-50 transition-all duration-500 cursor-pointer">
                <div className="h-[300px] overflow-hidden mb-6 relative">
                  <img alt="Kyoto" className="w-full h-full object-cover sepia-[0.3]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLnN2gnGpT2LWgS_Wc-ZM4xUrdyB7wRZrw_HNsZwHR5QD2iZcOs-mRjH-vSlAHB4baPeQ8Zt-QHtH2IyUualJGKpCKq9rMAEjA5o0xNtE2qjIwop7kty-U71TxFnNG_H9WwchVRawL96UE5A-KbrYbmu7c7bSXcsMdvPb8ig2oZ97o1G2oNANAkWjO2GJ_D2-xvJCQFK4aNQqlYcr2KytADfqJoRVrQ8ZlFeUIHRfi0cCsY1Q37AMfUA" />
                  <div className="absolute bottom-4 right-4 w-20 h-20 passport-stamp border-stamp-red text-stamp-red rotate-[25deg] bg-surface/80 backdrop-blur-sm">
                    <div className="passport-stamp-inner border-stamp-red"><span className="text-[8px]">APR 12</span><span className="text-[12px] font-bold my-1">KIX</span><span className="text-[8px]">2023</span></div>
                  </div>
                </div>
                <div className="px-4">
                  <h3 className="font-section-heading text-3xl mb-2">Cherry Blossom Retreat</h3>
                  <p className="font-mono text-xs text-tertiary mb-4">35.011° N, 135.768° E • APR 2023</p>
                  <div className="flex items-center text-primary font-label-caps text-xs uppercase tracking-widest">Open Journal <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span></div>
                </div>
              </article>
              <article className="absolute top-32 right-12 w-[500px] bg-surface p-4 pb-16 shadow-2xl border border-outline-variant/40 transform rotate-6 hover:rotate-2 hover:z-50 transition-all duration-500 cursor-pointer z-20">
                <div className="h-[350px] overflow-hidden mb-6 relative">
                  <img alt="Paris" className="w-full h-full object-cover grayscale-[20%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGeeQFE6hFJciZrmx8wkbZkoLhhLHZqqjCbT14n_39uUX-pZJExk4NX_Pls-L6mGwoJ6ES0QnvuDZ67A19l7TnfOX8sd_qc05296ScKGLS_cnt2F4Hv3Dj7abT1nJPndENkL888ykVefwfCSbGjilKuFtBMK-_axU1wcUFc-uERzxK4tWkuMvyJ_OZxPYmw1B7aYlg-gDpkI7usu5OM0B5gKcoZzDM1tvIb_EHBJ6kaTX8ZIgU_wMOeA" />
                  <div className="absolute top-4 left-4 w-24 h-24 passport-stamp border-secondary text-secondary -rotate-12 bg-surface/70 backdrop-blur-sm">
                    <div className="passport-stamp-inner border-secondary"><span className="text-[10px]">ARRIVED</span><span className="text-[14px] font-bold my-1">CDG</span><span className="text-[10px]">PARIS</span></div>
                  </div>
                </div>
                <div className="px-6 flex justify-between items-end">
                  <div>
                    <h3 className="font-section-heading text-4xl mb-2">Parisian Autumn</h3>
                    <p className="font-mono text-xs text-tertiary">48.856° N, 2.352° E • OCT 2022</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center border border-outline-variant">
                    <span className="material-symbols-outlined text-primary">auto_stories</span>
                  </div>
                </div>
              </article>
              <article className="absolute top-[400px] left-32 w-[400px] bg-surface p-5 pb-10 shadow-2xl border border-outline-variant/40 transform -rotate-8 hover:-rotate-4 hover:z-50 transition-all duration-500 cursor-pointer z-10">
                <div className="h-[250px] overflow-hidden mb-6 relative">
                  <img alt="Morocco" className="w-full h-full object-cover contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYL7nA7o0LVvpwtZ70c_xAS2QtZPyT7rBOPZxrFAaKxbdBAP_tbHuV_VhUOKbEF2jOaYH9lEdRhc9KXJ7mi8FnQXZ067NkVq_yU8hy_wn8kobUNI3JQ0cGFccN0pSZVN0O7YCa9ls-2LubSdD1JWMNgAZKAwqDxV9ahuYxbe6ApwI_1ZCVrKgi06Zzr6DXT_SG00TnvRQc9BI6P9_xZxAYPGCCw4gfEuwFRlZofbbfqcAko4dAbaPE9A" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 passport-stamp border-on-surface text-on-surface rotate-[45deg] bg-surface/40 backdrop-blur-md">
                    <div className="passport-stamp-inner border-on-surface"><span className="text-[12px]">MARRAKECH</span><span className="text-[18px] font-bold my-1">RAK</span><span className="text-[10px]">ENTRY VISAS</span></div>
                  </div>
                </div>
                <div className="px-2 text-center">
                  <h3 className="font-section-heading text-2xl mb-2 italic">Medina Nights</h3>
                  <p className="font-mono text-[10px] text-tertiary">31.629° N, 7.981° W • MAY 2021</p>
                </div>
              </article>
            </div>
          </div>

          <div className="tab-content" id="tab-drafts">
            <div className="flex flex-col items-center justify-center py-section-lg text-center max-w-3xl mx-auto border border-outline-variant/30 p-16 lg:p-32 bg-surface-container-low shadow-inner">
              <div className="w-40 h-40 mb-16 relative flex items-center justify-center">
                <div className="absolute inset-0 border border-tertiary-fixed rounded-full"></div>
                <div className="absolute inset-4 border border-tertiary-fixed rounded-full border-dashed"></div>
                <span className="material-symbols-outlined text-[80px] text-tertiary relative z-10 font-light">explore</span>
              </div>
              <h3 className="font-section-heading text-5xl text-on-surface mb-8 font-serif italic">Blank Pages</h3>
              <p className="font-body-lg text-xl text-on-surface-variant mb-16 max-w-xl mx-auto leading-relaxed">The atlas awaits. Start dreaming up your next destination—whether it's a weekend getaway or a month-long expedition.</p>
              <button className="border border-primary text-primary px-12 py-5 font-label-caps text-label-caps hover:bg-primary hover:text-on-primary transition-colors tracking-widest text-sm uppercase">Commence a Draft</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-surface text-on-surface py-24 border-t border-outline-variant/40">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-[1600px] mx-auto">
          <div className="font-section-heading text-3xl text-tertiary mb-10 md:mb-0">GlobeTrotter</div>
          <div className="flex flex-wrap justify-center space-x-12 mb-10 md:mb-0">
            <Link to="#" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest text-xs">Our Story</Link>
            <Link to="#" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest text-xs">Travel Ethos</Link>
            <Link to="#" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest text-xs">Privacy</Link>
            <Link to="#" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest text-xs">Support</Link>
          </div>
          <div className="font-body-md text-sm text-tertiary">© 2024 GlobeTrotter Journal.</div>
        </div>
      </footer>
    </div>
  );
}