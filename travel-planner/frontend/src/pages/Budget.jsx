import { Link } from 'react-router-dom';

export default function Budget() {
  return (
    <div className="antialiased min-h-screen flex flex-col lg:flex-row font-body-md text-body-md bg-background text-on-background">
      {/* SideNavBar */}
      <nav className="fixed left-0 top-0 h-full w-64 hidden lg:flex flex-col border-r border-deep-teal/10 bg-surface-container-low py-8 px-6 gap-8 z-40">
        <div className="flex flex-col gap-4">
          <h1 className="font-section-heading text-chapter-number text-primary">GlobeTrotter</h1>
          <div className="flex items-center gap-3 mt-4">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjgKr1iumcqyApcBleiOMWPxtxPrmB5bmPOlU1O7SWgyT1v3MJ8pZroNFc4p_-0a6aWBAZcHtg7KHD8vsGd7_3EwRS26oNet7KtkYd6cWtDtjcl6ATpYjDkwzGJGJpDqXHKUl1y1SgEJ0L8QC2hH9s8LrIYGbGr5XIuh78-836C8tFrNWLZ2lkYICkhMJ6Xm1nCqlBdUr5xbFJzfz3_j8jO1FW9cFP1EvFAUrDBkHgkhqRahW6UYtRGw"
            />
            <div>
              <p className="font-label-caps text-label-caps text-on-surface">Mediterranean Escape</p>
              <p className="font-label-stamp text-label-stamp text-on-surface-variant opacity-70 mt-1">July 2024 • 14 Days</p>
            </div>
          </div>
        </div>
        <ul className="flex flex-col gap-2 mt-8 flex-grow">
          <li>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-tertiary-fixed-variant hover:bg-surface-variant/50 transition-all">
              <span className="material-symbols-outlined">map</span>
              <span className="font-label-caps text-label-caps">Overview</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-tertiary-fixed-variant hover:bg-surface-variant/50 transition-all">
              <span className="material-symbols-outlined">auto_stories</span>
              <span className="font-label-caps text-label-caps">Itinerary</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-tertiary-fixed-variant hover:bg-surface-variant/50 transition-all">
              <span className="material-symbols-outlined">receipt_long</span>
              <span className="font-label-caps text-label-caps">Logistics</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface bg-surface-container-highest rounded-lg translate-x-1 duration-200">
              <span className="material-symbols-outlined">payments</span>
              <span className="font-label-caps text-label-caps">Expenses</span>
            </Link>
          </li>
        </ul>
        <div className="mt-auto flex flex-col gap-4">
          <button className="w-full py-3 bg-terracotta text-warm-ivory rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-opacity">Export Journal</button>
          <div className="flex gap-4 justify-center border-t border-deep-teal/10 pt-4">
            <Link to="#" className="text-on-surface-variant hover:text-terracotta transition-colors"><span className="material-symbols-outlined">settings</span></Link>
            <Link to="#" className="text-on-surface-variant hover:text-terracotta transition-colors"><span className="material-symbols-outlined">help</span></Link>
          </div>
        </div>
      </nav>

      {/* TopNavBar Mobile */}
      <nav className="lg:hidden fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-deep-teal/20 flex justify-between items-center px-margin-mobile h-20">
        <h1 className="font-hero-display-mobile text-section-heading-mobile tracking-tighter text-ink-charcoal">GlobeTrotter</h1>
        <div className="flex gap-4 items-center text-primary font-label-caps text-label-caps">
          <span className="material-symbols-outlined">menu</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 pt-24 lg:pt-0 min-h-screen flex flex-col">
        <div className="px-margin-mobile md:px-margin-desktop py-section-lg flex-grow max-w-7xl mx-auto w-full">
          {/* Header */}
          <header className="mb-section-lg grid grid-cols-12 gap-gutter relative">
            <div className="col-span-12 md:col-span-8 md:col-start-2">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-chapter-number text-chapter-number text-terracotta italic">04</span>
                <span className="font-label-stamp text-label-stamp text-ink-charcoal uppercase tracking-widest border border-deep-teal/20 px-3 py-1 rounded-full">Budget</span>
              </div>
              <h2 className="font-section-heading-mobile md:font-section-heading text-section-heading-mobile md:text-section-heading text-ink-charcoal mb-6">Estimated Total Budget</h2>
              <p className="font-hero-display-mobile text-hero-display-mobile text-terracotta tracking-tighter">$2,450</p>
            </div>
            <div className="col-span-12 md:col-span-3 flex items-end justify-start md:justify-end mt-8 md:mt-0">
              <button className="bg-terracotta text-warm-ivory px-6 py-4 rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined">add</span>
                Add Expense
              </button>
            </div>
          </header>

          {/* Breakdown */}
          <section className="mb-section-xl grid grid-cols-12 gap-gutter">
            <div className="col-span-12 md:col-span-10 md:col-start-2 border-t border-deep-teal/20 pt-12">
              <h3 className="font-chapter-number text-chapter-number text-ink-charcoal italic mb-12">Category Breakdown</h3>
              <div className="flex flex-col gap-8">
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-label-caps text-label-caps text-ink-charcoal">Accommodation</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">$1,200</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-deep-teal rounded-full w-[48%] group-hover:bg-terracotta transition-colors duration-300" />
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-label-caps text-label-caps text-ink-charcoal">Transport</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">$650</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-deep-teal/80 rounded-full w-[26%] group-hover:bg-terracotta transition-colors duration-300" />
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-label-caps text-label-caps text-ink-charcoal">Food</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">$400</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-deep-teal/60 rounded-full w-[16%] group-hover:bg-terracotta transition-colors duration-300" />
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-label-caps text-label-caps text-ink-charcoal">Activities</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">$200</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-deep-teal/40 rounded-full w-[10%] group-hover:bg-terracotta transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Expenses */}
          <section className="grid grid-cols-12 gap-gutter mb-section-lg">
            <div className="col-span-12 md:col-span-10 md:col-start-2 border-t border-deep-teal/20 pt-12">
              <h3 className="font-chapter-number text-chapter-number text-ink-charcoal italic mb-8">Recent Expenses</h3>
              <ul className="flex flex-col">
                <li className="py-6 border-b border-deep-teal/10 flex justify-between items-center group hover:bg-surface-container-low transition-colors -mx-4 px-4 rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-body-lg text-body-lg text-ink-charcoal group-hover:text-terracotta transition-colors">Le Meurice, Paris</span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant mt-1">Accommodation</span>
                  </div>
                  <span className="font-body-lg text-body-lg text-ink-charcoal">$450</span>
                </li>
                <li className="py-6 border-b border-deep-teal/10 flex justify-between items-center group hover:bg-surface-container-low transition-colors -mx-4 px-4 rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-body-lg text-body-lg text-ink-charcoal group-hover:text-terracotta transition-colors">Eurostar to Amsterdam</span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant mt-1">Transport</span>
                  </div>
                  <span className="font-body-lg text-body-lg text-ink-charcoal">$120</span>
                </li>
                <li className="py-6 border-b border-deep-teal/10 flex justify-between items-center group hover:bg-surface-container-low transition-colors -mx-4 px-4 rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-body-lg text-body-lg text-ink-charcoal group-hover:text-terracotta transition-colors">Dinner at Rijks</span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant mt-1">Food</span>
                  </div>
                  <span className="font-body-lg text-body-lg text-ink-charcoal">$185</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="#" className="font-chapter-number text-chapter-number italic text-deep-teal border-b border-deep-teal pb-1 hover:text-terracotta hover:border-terracotta transition-colors">
                  View All Transactions
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="w-full mt-auto bg-surface-container-lowest border-t border-deep-teal/10 flex flex-col md:flex-row justify-between items-center py-12 px-margin-mobile md:px-margin-desktop">
          <span className="font-label-caps text-label-caps text-ink-charcoal mb-4 md:mb-0">GlobeTrotter</span>
          <div className="flex gap-6 font-body-md text-label-stamp text-on-surface">
            <Link to="#" className="text-on-surface-variant opacity-60 hover:opacity-100 opacity-transition">Privacy</Link>
            <Link to="#" className="text-on-surface-variant opacity-60 hover:opacity-100 opacity-transition">Terms</Link>
            <Link to="#" className="text-on-surface-variant opacity-60 hover:opacity-100 opacity-transition">Curation Policy</Link>
          </div>
          <span className="font-body-md text-label-stamp text-on-surface-variant opacity-60 mt-4 md:mt-0">© 2024 GlobeTrotter Editorial. All rights reserved.</span>
        </footer>
      </main>
    </div>
  );
}