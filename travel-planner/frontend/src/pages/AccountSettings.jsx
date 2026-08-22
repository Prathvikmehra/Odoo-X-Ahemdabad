import { Link } from 'react-router-dom';

export default function AccountSettings() {
  return (
    <div className="bg-background text-on-background min-h-screen antialiased selection:bg-terracotta/20">
      {/* TopNavBar */}
      <nav className="bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-deep-teal/20 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
        <Link to="/" className="font-hero-display-mobile text-section-heading-mobile tracking-tighter text-ink-charcoal hidden md:block">
          GlobeTrotter
        </Link>
        <div className="hidden md:flex items-center gap-8 font-label-caps text-label-caps">
          <Link to="/" className="text-on-surface-variant hover:text-terracotta transition-colors duration-300">Journeys</Link>
          <Link to="/explore" className="text-on-surface-variant hover:text-terracotta transition-colors duration-300">Destinations</Link>
          <Link to="/trips" className="text-on-surface-variant hover:text-terracotta transition-colors duration-300">Archive</Link>
        </div>
        <div className="flex items-center gap-6">
          <button className="hidden md:flex items-center justify-center font-label-caps text-label-caps text-on-surface-variant hover:text-terracotta transition-colors scale-95 active:opacity-80 transition-transform">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="bg-terracotta text-warm-ivory px-6 py-2 rounded font-label-caps text-label-caps scale-95 active:opacity-80 transition-transform hover:bg-surface-tint">
            New Entry
          </button>
          <img
            alt="User profile portrait"
            className="w-10 h-10 rounded-full object-cover border border-deep-teal/20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOInMYVguOjbGTtuuFSgvMRCj8OMTp-guqS8MU8RU8TSjVfhUdEY4MzSeBqyIGE07C-sOqimM0nGaJKoRasI386a9IZJWzC7S2po42F-vdBmwtLC9BqODUqDyCJ7wzHdH96HsFF4X0QoVMOZSB1pWjXmdILXzQ-s0xZTTtwwrGtfYXS6KfVU7YGg5ogjCFzvU96unFk1uZB5V9DAeZlUVj-f1GYjia1aswF0kbQRoYInk2eKDGGa7jpQ"
          />
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="bg-surface-container-low fixed left-0 top-0 h-full w-64 hidden lg:flex flex-col border-r border-deep-teal/10 py-8 px-6 gap-8 z-40 pt-28">
        <div className="flex flex-col gap-2">
          <span className="font-label-caps text-label-caps text-on-tertiary-fixed-variant">Account Settings</span>
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          <Link to="/profile" className="text-on-surface bg-surface-container-highest rounded-lg flex items-center gap-3 p-3 font-label-caps text-label-caps translate-x-1 duration-200">
            <span className="material-symbols-outlined">person</span>
            Profile & Settings
          </Link>
          <Link to="#" className="text-on-tertiary-fixed-variant hover:bg-surface-variant/50 transition-all flex items-center gap-3 p-3 font-label-caps text-label-caps rounded-lg">
            <span className="material-symbols-outlined">notifications</span>
            Notifications
          </Link>
          <Link to="#" className="text-on-tertiary-fixed-variant hover:bg-surface-variant/50 transition-all flex items-center gap-3 p-3 font-label-caps text-label-caps rounded-lg">
            <span className="material-symbols-outlined">security</span>
            Security
          </Link>
        </nav>
        <div className="flex flex-col gap-2 mt-auto">
          <Link to="#" className="text-on-tertiary-fixed-variant hover:bg-surface-variant/50 transition-all flex items-center gap-3 p-3 font-label-caps text-label-caps rounded-lg">
            <span className="material-symbols-outlined">help</span>
            Support
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-28 pb-section-xl px-margin-mobile md:px-margin-desktop lg:pl-[calc(256px+80px)] max-w-[1440px] mx-auto min-h-screen flex flex-col gap-section-lg">
        <header className="max-w-3xl">
          <h1 className="font-section-heading-mobile md:font-section-heading text-section-heading-mobile md:text-section-heading text-ink-charcoal mb-4">Settings</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Manage your personal information, preferences, and editorial footprint within the GlobeTrotter ecosystem.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <section className="md:col-span-8 flex flex-col gap-12">
            {/* Profile */}
            <div className="border-t border-deep-teal/20 pt-8 relative">
              <span className="absolute -top-3 left-0 bg-background pr-4 font-label-stamp text-label-stamp text-ink-charcoal">PROFILE</span>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden relative group cursor-pointer border-2 border-transparent hover:border-terracotta transition-colors flex-shrink-0">
                  <img
                    alt="User Profile"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPzYrRK5Xzijzw2uNEoQWdkUAIASTUAvTinx5zsydi7tRKBrKM9-pirL37-siRXBT8FkuUZbRwcPRb1x1fo7WPhIU2nLFHunFejJZw1R8D9YLo7As1IolKBfCWf4SlGd9mNC51T0dW9NUBtfzlZhSn9Ez-l8yFYopUQTBRADoIiSKUS8Gse5QczIPUFp_P1StfG6Qcm9ibGooDdO7vAH6s2wIn6SXTa4kkH6lCzL3fF5uDbeYwzdeoHQ"
                  />
                  <div className="absolute inset-0 bg-ink-charcoal/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-warm-ivory">photo_camera</span>
                  </div>
                </div>
                <div className="flex-grow w-full flex flex-col gap-8 pt-4">
                  <div>
                    <label className="editorial-label" htmlFor="name">Display Name</label>
                    <input className="editorial-input" id="name" placeholder="Enter your full name" type="text" defaultValue="Eleanor Vance" />
                  </div>
                  <div>
                    <label className="editorial-label" htmlFor="email">Email Address</label>
                    <input className="editorial-input" id="email" placeholder="Enter your email" type="email" defaultValue="eleanor.vance@example.com" />
                  </div>
                  <div>
                    <label className="editorial-label" htmlFor="bio">Editorial Bio</label>
                    <textarea className="editorial-input min-h-[100px] resize-y" id="bio" placeholder="A brief description of your travels..."></textarea>
                  </div>
                  <div className="flex justify-start">
                    <button className="bg-terracotta text-warm-ivory px-8 py-3 rounded font-label-caps text-label-caps hover:bg-surface-tint transition-colors">
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="border-t border-deep-teal/20 pt-8 relative">
              <span className="absolute -top-3 left-0 bg-background pr-4 font-label-stamp text-label-stamp text-ink-charcoal">PREFERENCES</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="editorial-label" htmlFor="currency">Display Currency</label>
                  <div className="relative">
                    <select className="editorial-input appearance-none pr-10 cursor-pointer" id="currency" defaultValue="usd">
                      <option value="usd">USD - US Dollar</option>
                      <option value="eur">EUR - Euro</option>
                      <option value="gbp">GBP - British Pound</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-ink-charcoal pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div>
                  <label className="editorial-label" htmlFor="language">Interface Language</label>
                  <div className="relative">
                    <select className="editorial-input appearance-none pr-10 cursor-pointer" id="language" defaultValue="en">
                      <option value="en">English</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-ink-charcoal pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div className="border-t border-deep-teal/20 pt-8 relative">
              <span className="absolute -top-3 left-0 bg-background pr-4 font-label-stamp text-label-stamp text-ink-charcoal">PRIVACY & SHARING</span>
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-body-lg text-body-lg text-ink-charcoal">Public Profile</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">Allow your curated journeys to be discovered in the Archive.</span>
                  </div>
                  <input defaultChecked className="toggle-switch" type="checkbox" />
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-body-lg text-body-lg text-ink-charcoal">Trip Sharing</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">Generate shareable links for your active itineraries.</span>
                  </div>
                  <input defaultChecked className="toggle-switch" type="checkbox" />
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="border-t border-deep-teal/20 pt-8 relative pb-12">
              <span className="absolute -top-3 left-0 bg-background pr-4 font-label-stamp text-label-stamp text-ink-charcoal">ACCOUNT</span>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button className="border border-deep-teal text-deep-teal px-6 py-3 rounded font-label-caps text-label-caps hover:bg-deep-teal hover:text-warm-ivory transition-colors">
                  Change Password
                </button>
                <button className="text-error border border-error/20 px-6 py-3 rounded font-label-caps text-label-caps hover:bg-error/5 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </section>

          <div className="hidden md:block md:col-span-4 relative">
            <div className="sticky top-32 pl-8 border-l border-deep-teal/20">
              <p className="font-label-stamp text-label-stamp text-on-surface-variant mb-4">NOTE</p>
              <p className="font-body-md text-body-md text-ink-charcoal">
                Changes to your public profile may take a few minutes to reflect across the Archive. For security, changing your password will terminate all active sessions.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest w-full mt-section-lg border-t border-deep-teal/10 flex flex-col md:flex-row justify-between items-center py-12 px-margin-desktop z-10 relative">
        <span className="font-label-caps text-label-caps text-ink-charcoal mb-4 md:mb-0">GlobeTrotter</span>
        <div className="flex gap-6 font-body-md text-label-stamp text-on-surface-variant opacity-60">
          <Link to="#" className="hover:opacity-100 opacity-transition">Privacy</Link>
          <Link to="#" className="hover:opacity-100 opacity-transition">Terms</Link>
          <Link to="#" className="hover:opacity-100 opacity-transition">Curation Policy</Link>
        </div>
        <span className="font-body-md text-label-stamp text-on-surface mt-4 md:mt-0">© 2024 GlobeTrotter Editorial. All rights reserved.</span>
      </footer>
    </div>
  );
}