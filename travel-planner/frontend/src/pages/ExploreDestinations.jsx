import { Link } from 'react-router-dom';

export default function ExploreDestinations() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden selection:bg-terracotta selection:text-warm-ivory">
      <nav className="bg-warm-ivory/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-deep-teal/20 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 h-24">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-hero-display text-[32px] leading-none text-primary italic font-bold">GlobeTrotter</Link>
        </div>
        <div className="hidden md:flex items-center gap-8 font-label-caps text-label-caps uppercase">
          <Link to="/explore" className="text-terracotta border-b border-terracotta pb-1 hover:opacity-70 transition-opacity duration-300">Destinations</Link>
          <Link to="#" className="text-deep-teal hover:opacity-70 transition-opacity duration-300">Stories</Link>
          <Link to="#" className="text-deep-teal hover:opacity-70 transition-opacity duration-300">Shop</Link>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-deep-teal hover:opacity-70 transition-opacity duration-300">
            <span className="material-symbols-outlined">language</span>
          </button>
          <button className="text-deep-teal hover:opacity-70 transition-opacity duration-300">
            <span className="material-symbols-outlined">search</span>
          </button>
          <img
            alt="User profile"
            className="w-10 h-10 rounded-full object-cover border border-outline-variant"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVczx43FxjOs1sF1oZleHd70K8rGZ7OtvsA2xk7PvozZjS-68odTJ0XILq3at6wqMMpLdcb50g5BHrURRtBngK378-CxMaqNvMiMvsQmbpB9eOOE86iIH4FYFU3j4I7ERo6izRUIyiRK563xC4Au-3csxmca1ikuQIUoJFZHw25oW4XugjLX6nCKREQssx1BqN1vOdrNNMHsyoBnJD6TQzIL2wiz8xEFAoTBUukL-phnr5IxhDSyzgWw"
          />
        </div>
      </nav>

      <main className="pt-32 pb-section-xl">
        <section className="relative min-h-[90vh] flex flex-col justify-center px-margin-mobile md:px-margin-desktop mb-section-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-gutter relative z-10">
            <div className="col-span-12 md:col-span-10 md:col-start-2 relative z-20">
              <h1 className="font-hero-display-mobile md:font-hero-display text-hero-display-mobile md:text-hero-display text-on-background tracking-tighter mix-blend-difference pointer-events-none mb-8">
                WHERE<br />COULD WE<br />GO?
              </h1>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] md:w-[65%] h-[70vh] z-10 -mr-margin-mobile md:-mr-margin-desktop overflow-hidden">
              <img
                alt="Cinematic landscape"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW-NWqx3qk2uqwUNVz5F0pt1Fsdev6Fzb6aR-sIK91TDFb7jMbrG14_HMrD2I2eyul0fhNGbzxsNBl8WtS_-qQFxuELy1Vf_RkFfeRfbl9-rnb3qyAAh0T-3wcBpICqwdZlFYuCBliOGQsdyLfL6Y7tIMb5nxykP8s8v0Q6iMiQtARq1fZQoOJYK37S7JRU2EjanN4p0ea8F96JNMujBMNoRCjQsnv7kMltuQu5DDGB6eSQYN8C_Hx_g"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-2 mt-overlap-lg relative z-30 bg-warm-ivory p-8 border border-deep-teal/20 w-full max-w-2xl">
            <div className="font-label-stamp text-label-stamp uppercase text-terracotta mb-4">Explore</div>
            <div className="flex items-center border-b border-ink-charcoal pb-2">
              <span className="material-symbols-outlined text-deep-teal mr-4">search</span>
              <input
                className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 font-body-lg text-body-lg placeholder:text-outline-variant text-on-background"
                placeholder="Search destinations, cities or vibes..."
                type="text"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-warm-ivory w-full border-t border-deep-teal/20 mt-section-lg flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-12">
        <div className="font-hero-display-mobile text-[40px] md:text-[64px] leading-none text-primary italic font-bold mb-8 md:mb-0">
          GlobeTrotter
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 font-label-caps text-label-caps uppercase text-deep-teal mb-8 md:mb-0">
          <Link to="#" className="text-deep-teal/60 hover:text-terracotta transition-colors duration-300 opacity-80 hover:opacity-100">Journal</Link>
          <Link to="#" className="text-deep-teal/60 hover:text-terracotta transition-colors duration-300 opacity-80 hover:opacity-100">About Us</Link>
          <Link to="#" className="text-deep-teal/60 hover:text-terracotta transition-colors duration-300 opacity-80 hover:opacity-100">Privacy</Link>
          <Link to="#" className="text-deep-teal/60 hover:text-terracotta transition-colors duration-300 opacity-80 hover:opacity-100">Terms</Link>
          <Link to="#" className="text-deep-teal/60 hover:text-terracotta transition-colors duration-300 opacity-80 hover:opacity-100">Support</Link>
        </div>
        <div className="font-body-md text-body-md text-deep-teal/60">
          © 2024 GlobeTrotter Editorial. All rights reserved.
        </div>
      </footer>
    </div>
  );
}