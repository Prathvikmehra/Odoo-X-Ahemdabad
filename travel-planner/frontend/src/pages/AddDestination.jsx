import { Link } from 'react-router-dom';

export default function AddDestination() {
  return (
    <div className="bg-warm-ivory text-on-surface font-body-md overflow-hidden antialiased">
      {/* Background Context */}
      <main className="h-screen w-full relative z-0 opacity-40">
        <div className="pt-32 px-margin-desktop">
          <h1 className="font-section-heading text-section-heading text-ink-charcoal mb-12">Summer Traverse</h1>
          <div className="grid grid-cols-12 gap-gutter">
            <div className="col-span-8">
              <div className="border-t border-deep-teal/20 py-8">
                <span className="font-label-caps text-label-caps text-deep-teal">Day 01</span>
                <h2 className="font-section-heading-mobile text-section-heading-mobile text-ink-charcoal mt-2">Arrival in Paris</h2>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Overlay */}
      <div className="fixed inset-0 bg-ink-charcoal/20 backdrop-blur-sm z-40 transition-opacity duration-300" />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-warm-ivory shadow-2xl z-50 flex flex-col transform translate-x-0 transition-transform duration-500 ease-out border-l border-deep-teal/10">
        <header className="flex justify-between items-center px-8 py-10 border-b border-deep-teal/10">
          <h2 className="font-section-heading-mobile text-section-heading-mobile text-ink-charcoal">Add to Journey</h2>
          <button className="text-ink-charcoal hover:text-terracotta transition-colors duration-200">
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </header>

        <div className="px-8 py-12 relative">
          <label className="absolute top-8 left-8 font-label-caps text-label-caps text-deep-teal transition-all duration-300 transform -translate-y-4 text-xs" htmlFor="destination-search">
            Where to next?
          </label>
          <input className="editorial-input w-full pt-6 pb-2 text-xl font-body-lg text-ink-charcoal placeholder-transparent" id="destination-search" placeholder="Where to next?" type="text" />
          <span className="material-symbols-outlined absolute right-8 bottom-4 text-deep-teal">search</span>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-12">
          {/* Result 1 */}
          <div className="group relative flex items-center mb-16 ml-4">
            <div className="w-24 h-32 overflow-hidden z-10 shrink-0">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbmNQRPpSJPp7IS2We-BtMmcxlfS11YIVC369vtCx2FebSEdpnX9IRPPANKeSg1cdWUTgc5nJ29aXLKG0n1PBpKVsYnmdIawykF8wUp8pHaDScAfjXonLnlg48KCgHuY6AF_9H1RnwL9j8sINEoP7pJ4RVEWqyhuEyYD5PmgdYxP3xlIT2GOGx1Wh8bhoLde04CarcP01dkpGV1DxQoIqxh7rlZ-6W2IiBY-5i1mCeZUst10p9k0Ovpw"
              />
            </div>
            <div className="ml-6 -mt-8 flex-1">
              <div className="flex items-baseline justify-between border-b border-deep-teal/20 pb-2">
                <div>
                  <span className="font-label-stamp text-label-stamp text-terracotta block mb-1">AUSTRIA</span>
                  <h3 className="font-section-heading-mobile text-section-heading-mobile text-ink-charcoal italic group-hover:text-terracotta transition-colors duration-300">Vienna</h3>
                </div>
                <span className="font-label-stamp text-label-stamp text-deep-teal/60 hidden sm:block">48.2082° N, 16.3738° E</span>
              </div>
            </div>
            <button className="absolute -right-4 -bottom-6 w-12 h-12 rounded-full bg-warm-ivory border border-deep-teal text-deep-teal flex items-center justify-center hover:bg-terracotta hover:text-warm-ivory hover:border-terracotta transition-all duration-300 z-20 group-hover:scale-110">
              <span className="material-symbols-outlined text-xl">add</span>
            </button>
          </div>

          {/* Result 2 */}
          <div className="group relative flex items-center mb-16 ml-16 sm:ml-24">
            <div className="w-32 h-24 overflow-hidden z-10 shrink-0 order-2">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByoFBT_rDf_Uw-i2ny5qBOb1EslgCGbxEAThcQC67aORbtb950Bf5N_d21WxiT-Dq5x4u5qsgh5COK2yo6apREWPurZERdijEGzT3pg8vES-DAbskvqML9HM1S35zuMmOwI9rfyu1Lt0TK6ejD-u0yAjRmVzDIgkL50yoquJt698ofXwWFfUA-_2vERsSylWjDhr5L-52RiyRkBNsl36dfEEOAlkvnLXCmUT91B3N-RXNi7f-U25bTcg"
              />
            </div>
            <div className="mr-6 mt-8 flex-1 order-1 text-right">
              <div className="flex flex-col items-end border-b border-deep-teal/20 pb-2">
                <span className="font-label-stamp text-label-stamp text-terracotta block mb-1">GERMANY</span>
                <h3 className="font-section-heading-mobile text-section-heading-mobile text-ink-charcoal italic group-hover:text-terracotta transition-colors duration-300">Munich</h3>
                <span className="font-label-stamp text-label-stamp text-deep-teal/60 mt-2 block sm:hidden">48.1351° N, 11.5820° E</span>
              </div>
            </div>
            <button className="absolute left-8 -bottom-4 w-12 h-12 rounded-full bg-warm-ivory border border-deep-teal text-deep-teal flex items-center justify-center hover:bg-terracotta hover:text-warm-ivory hover:border-terracotta transition-all duration-300 z-20 group-hover:scale-110">
              <span className="material-symbols-outlined text-xl">add</span>
            </button>
            <span className="absolute -left-12 top-0 font-label-stamp text-label-stamp text-deep-teal/60 hidden sm:block rotate-90 origin-left">48.1351° N, 11.5820° E</span>
          </div>

          {/* Result 3 */}
          <div className="group relative flex items-center mb-16 ml-0">
            <div className="w-20 h-28 overflow-hidden z-10 shrink-0">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgjCbyVC4TM9-18gNOaeJj2D3L22qWYqkJFhG-OG8eEunttWbqICdLNH9V3lkwjW8vmIo8ZRo4r9fFXoNsVkWwag6V1_Nooxk3U87Kt0-oLNR6HJjZA5FXfD1avsSO-egQlOWitR_i6O3QT6Zfk8Qc004ZMEja40hiYIOy_VPep5Hw8it6KGy-Say-eESeEKT3TNC3SuxjaMj6tkztVMN-Hfi5kcpJbyvslUKLJa3aMvdrI3py28NlYg"
              />
            </div>
            <div className="ml-8 mt-4 flex-1">
              <div className="flex items-baseline justify-between border-b border-deep-teal/20 pb-2">
                <div>
                  <span className="font-label-stamp text-label-stamp text-terracotta block mb-1">BELGIUM</span>
                  <h3 className="font-section-heading-mobile text-section-heading-mobile text-ink-charcoal italic group-hover:text-terracotta transition-colors duration-300">Brussels</h3>
                </div>
                <span className="font-label-stamp text-label-stamp text-deep-teal/60 hidden sm:block">50.8503° N, 4.3517° E</span>
              </div>
            </div>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-terracotta text-warm-ivory flex items-center justify-center hover:bg-ink-charcoal transition-all duration-300 z-20 shadow-lg scale-110">
              <span className="material-symbols-outlined text-xl">check</span>
            </button>
          </div>
        </div>

        <div className="px-8 py-6 border-t border-deep-teal/10 bg-warm-ivory">
          <button className="w-full bg-ink-charcoal text-warm-ivory font-label-caps text-label-caps py-4 rounded-none hover:bg-terracotta transition-colors duration-300">
            Browse Full Map
          </button>
        </div>
      </div>
    </div>
  );
}