import { Link } from 'react-router-dom'
import { MapPin, Utensils, Eye, Train, ArrowRight, Plus, Menu } from 'lucide-react'

export default function ItineraryView() {
  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#1b1b1d] font-body">
      {/* Sidebar - hidden on mobile */}
      <nav className="hidden md:flex flex-col items-center py-8 fixed left-0 top-0 h-full w-20 bg-[#141b2b] text-white z-50 shadow-2xl shadow-[#141b2b]/20">
        <div className="mb-12 text-2xl font-bold text-[#ffdad2] cursor-pointer">J</div>
        <div className="flex flex-col gap-6 items-center h-full w-full">
          <Link to="/" className="text-[#7d8497] p-3 hover:bg-[#ffdad2]/20 transition-all duration-300 scale-95 active:scale-90 flex flex-col items-center group relative">
            <span className="material-symbols-outlined mb-1 group-hover:text-[#ffdad2] transition-colors">home</span>
          </Link>
          <Link to="/trips" className="bg-[#ff6847] text-[#640f00] rounded-xl p-3 flex flex-col items-center scale-95 active:scale-90 transition-transform group relative">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
          </Link>
          <Link to="/itinerary-view" className="text-[#7d8497] p-3 hover:bg-[#ffdad2]/20 transition-all duration-300 scale-95 active:scale-90 flex flex-col items-center group relative">
            <span className="material-symbols-outlined mb-1 group-hover:text-[#ffdad2] transition-colors">route</span>
          </Link>
          <Link to="/budget" className="text-[#7d8497] p-3 hover:bg-[#ffdad2]/20 transition-all duration-300 scale-95 active:scale-90 flex flex-col items-center group relative">
            <span className="material-symbols-outlined mb-1 group-hover:text-[#ffdad2] transition-colors">payments</span>
          </Link>
        </div>
        <div className="mt-auto pt-8 border-t border-white/10 w-full flex justify-center">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOdW3dkfiifV6jW9VtqFDmj9OstyPU9UGjMyhxPjZD4n_n4KHekQrC0PLba59U5vzsqx6F3oicu-lWdaWCcglwlefh-4dM5GT4pdllihGydNRYu02GGrr1TjCr_eM1abJ219B9-RHz0Q54xfyDVBy4Txaym2BfYY46y80Co-EokG9B11qt-PAknmdXMoijI6HsPMaJia0WthGcOfs5UQRrjTpiM7Fef4pSzDIuO8kA0fSIaS6na1Ob" 
            alt="User" 
            className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-[#ffdad2] transition-colors cursor-pointer"
          />
        </div>
      </nav>

      {/* Top Navigation (Mobile) */}
      <nav className="md:hidden fixed top-0 w-full bg-[#F7F5EF]/80 backdrop-blur-md z-40 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="text-2xl font-bold text-[#141b2b]">Journey OS</div>
        <button className="text-[#141b2b] hover:opacity-70 transition-opacity">
          <Menu className="w-8 h-8" />
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 md:ml-20 min-h-screen relative overflow-x-hidden pt-20 md:pt-0 pb-32">
        {/* Header */}
        <header className="px-6 md:px-12 py-20 max-w-[1440px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-block px-4 py-1 rounded-full border border-[#c6c6cd] mb-6">
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#45464c]">JAPAN ADVENTURE | TOKYO -&gt; KYOTO -&gt; OSAKA</span>
            </div>
            <h1 className="text-[32px] md:text-[80px] font-bold leading-[36px] md:leading-[84px] tracking-[-0.01em] md:tracking-[-0.04em] text-[#141b2b] max-w-4xl mb-4">
              DAY 04 | TOKYO | SEP 13
            </h1>
            <p className="text-[18px] leading-[28px] text-[#45464c] max-w-2xl">
              Exploring the neon-lit streets, ancient traditions, and culinary mastery of Japan's vibrant capital.
            </p>
          </div>
          <Link to="/search" className="inline-flex items-center gap-2 bg-[#141b2b] text-white px-6 py-3 rounded-full text-[13px] font-medium hover:bg-[#141b2b]/90 transition-colors shadow-lg shrink-0">
            <Plus className="w-4 h-4" />
            ADD EXPERIENCE
          </Link>
        </header>

        {/* Floating Day Selector */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-xl shadow-[0px_20px_40px_rgba(17,24,39,0.1)] rounded-full px-6 py-3 flex items-center gap-4 md:left-[calc(50%+40px)] border border-[#e5e2e3]">
          {[1,2,3,4,5,'...',8].map((day, idx) => (
            <button 
              key={idx}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                day === 4 
                  ? 'bg-[#141b2b] text-white shadow-lg scale-110' 
                  : 'text-[#45464c] hover:bg-[#f0edee]'
              } transition-colors text-[11px] font-semibold ${day === '...' ? 'hidden sm:flex' : ''}`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 pb-20 relative">
          <div className="relative w-full max-w-5xl mx-auto py-12">
            {/* Center Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[linear-gradient(to_bottom,#30918d_50%,transparent_50%)] bg-[length:2px_16px] z-0 transform md:-translate-x-1/2"></div>

            {/* Node 1: Shibuya */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-20 group">
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-[#30918d] rounded-full -translate-x-[7px] md:-translate-x-1/2 z-10 border-4 border-[#F7F5EF] shadow-md group-hover:scale-125 transition-transform duration-300 top-8 md:top-auto"></div>
              <div className="w-full md:w-[45%] text-left md:text-right pl-12 md:pl-0 pr-0 md:pr-12 mb-4 md:mb-0 relative top-6 md:top-auto">
                <div className="text-2xl font-medium text-[#141b2b] mb-1">09:00</div>
                <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#45464c] flex items-center gap-2 md:justify-end">
                  <span className="px-2 py-1 bg-[#eae7e9] rounded-full">Sightseeing</span>
                  <span>•</span>
                  <span>2h</span>
                  <span>•</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="w-full md:w-[45%] pl-12 md:pl-12">
                <div className="bg-white rounded-xl shadow-[0px_20px_40px_rgba(17,24,39,0.05)] overflow-hidden group cursor-pointer border border-[#e5e2e3] transition-all duration-500 hover:shadow-[0px_30px_60px_rgba(17,24,39,0.08)] hover:-translate-y-1">
                  <div className="h-64 overflow-hidden relative">
                    <div 
                      className="bg-cover bg-center w-full h-full transition-transform duration-[10s] ease-out group-hover:scale-110"
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxU2GeRj2FQIYbz82bY8tJSKdsbQCkdUuWYCy0z1KJmLTJPPezVO7MIZ2g1rKLUb1IkjNDtAsLbYyExlQQ0pQpSOmR1ZHOX085f8Lxj7dpEFiPLIrqODb4CDS1WsfM1YZemNjrNPRgnOUMzQL94W2UD52OdlnHBDlixN3TSYvixPygP9Dj1nLuNL3Y0T-U-3DluPWxVZJBDQB_klFeNlfZdXqwxVA4ZrOdcoN2hKemmEyapsGPjjC7')" }}
                    ></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#30918d] shadow-sm flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Shibuya
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-medium text-[#141b2b] mb-2">Shibuya Crossing</h3>
                    <p className="text-[16px] leading-[24px] text-[#45464c]">Experience the organized chaos of the world's busiest intersection. Best viewed from the Starbucks above or diving straight into the crowd.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Node 2: Sushi */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-20 group">
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-[#30918d] rounded-full -translate-x-[7px] md:-translate-x-1/2 z-10 border-4 border-[#F7F5EF] shadow-md group-hover:scale-125 transition-transform duration-300 top-8 md:top-auto"></div>
              <div className="w-full md:w-[45%] pl-12 md:pl-0 pr-0 md:pr-12 order-2 md:order-1 mt-4 md:mt-0">
                <div className="bg-white rounded-xl shadow-[0px_20px_40px_rgba(17,24,39,0.05)] overflow-hidden group cursor-pointer border border-[#e5e2e3] transition-all duration-500 hover:shadow-[0px_30px_60px_rgba(17,24,39,0.08)] hover:-translate-y-1">
                  <div className="h-64 overflow-hidden relative">
                    <div 
                      className="bg-cover bg-center w-full h-full transition-transform duration-[10s] ease-out group-hover:scale-110"
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxzldeu0hCJEwOSTnKTvEg0d9DMQ14k6VYCRDbp2mY_nj4YGa9vSUV7ZE9btk57VSWYzGrNUu7ddLaDSK3zAUlMP9DGLO1rUwP1GWTgtKTJC4eNI0W15aIbcTo4lFB64jcXJGLenktqYAfZXDggqipTXE8L_lY3cZo78fNa39Ler3ypzlvnvd1nePwmOKDtkFrcDAsxgvpOu5wsubhK-BPgteb6f5_WFCOpeTjcxAJvx8UJd2_Fpzi')" }}
                    ></div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#30918d] shadow-sm flex items-center gap-1">
                      <Utensils className="w-3.5 h-3.5" />
                      Tsukiji Outer Market
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-medium text-[#141b2b] mb-2">Omakase Sushi Experience</h3>
                    <p className="text-[16px] leading-[24px] text-[#45464c]">A 15-course omakase tasting menu crafted by a master chef. Fresh catches from the morning market prepared with traditional Edo-mae techniques.</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[45%] text-left md:text-left pl-12 md:pl-12 relative top-6 md:top-auto order-1 md:order-2">
                <div className="text-2xl font-medium text-[#141b2b] mb-1">13:00</div>
                <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#45464c] flex items-center gap-2">
                  <span className="px-2 py-1 bg-[#eae7e9] rounded-full">Food</span>
                  <span>•</span>
                  <span>1.5h</span>
                  <span>•</span>
                  <span>₹2,500</span>
                </div>
              </div>
            </div>

            {/* Node 3: Tokyo Tower */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group">
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-[#30918d] rounded-full -translate-x-[7px] md:-translate-x-1/2 z-10 border-4 border-[#F7F5EF] shadow-md group-hover:scale-125 transition-transform duration-300 top-8 md:top-auto"></div>
              <div className="w-full md:w-[45%] text-left md:text-right pl-12 md:pl-0 pr-0 md:pr-12 mb-4 md:mb-0 relative top-6 md:top-auto">
                <div className="text-2xl font-medium text-[#141b2b] mb-1">17:00</div>
                <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#45464c] flex items-center gap-2 md:justify-end">
                  <span className="px-2 py-1 bg-[#eae7e9] rounded-full">Sightseeing</span>
                  <span>•</span>
                  <span>2h</span>
                  <span>•</span>
                  <span>₹1,200</span>
                </div>
              </div>
              <div className="w-full md:w-[45%] pl-12 md:pl-12">
                <div className="bg-white rounded-xl shadow-[0px_20px_40px_rgba(17,24,39,0.05)] overflow-hidden group cursor-pointer border border-[#e5e2e3] transition-all duration-500 hover:shadow-[0px_30px_60px_rgba(17,24,39,0.08)] hover:-translate-y-1">
                  <div className="h-64 overflow-hidden relative">
                    <div 
                      className="bg-cover bg-center w-full h-full transition-transform duration-[10s] ease-out group-hover:scale-110"
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvgR1Vt6yYoMgz-NDfJIP24SEvJkS-UsJYmfYPipAqaT6rgJnJBE1_7Or4pZRK5eQXT7lWqlbqoJdlZ7eHopl5NXVSOqoAJbZuhU-FAytCV2OuzrTqv9MyRRLzbnMzvXpuK2dtZClAjQwsuLOE2_G5zJOlAeLV-y123qrODKrRpi6cQLwYwAL94yhZ0Y-eU6aNKgJIZzv-1cAuMCTmoVe-HPZBSQVXrPQXw1niDA6ijOXMAu8nsQhr')" }}
                    ></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#30918d] shadow-sm flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      Minato City
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-medium text-[#141b2b] mb-2">Tokyo Tower Sunset View</h3>
                    <p className="text-[16px] leading-[24px] text-[#45464c]">Ascend to the main deck as the sun sets over the sprawling metropolis. Watch the city transition from daylight into a sea of glittering neon lights.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cinematic Destination Transition */}
        <section className="mt-12 px-6 md:px-12 max-w-[1440px] mx-auto mb-20">
          <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl h-[400px] flex items-center justify-center group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center w-full h-full transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCptYwnEAquuaGMqhOqUP6VriKGNEhuNGbNNY6FZpQwyU_QZBMbUoJ46vqV--hqQqKxt2TAiJBhIVXNyo2IC00FqxAMu_mzaqLFetYOQ4cN7cmOTcqtWuYwDMFnjvDdTUTykjjafyoYEFAYH350VhQUrD_rGfhvAZ4xIa-RkDAPd4ktpp19R7QqKuXCCzvZJvaEg4tF0nir8m0O0eDkklxSAUwoIS7jqwZAkUGu7BogPb4dmkR3tZwD')" }}
            ></div>
            <div className="absolute inset-0 bg-[#141b2b]/40 backdrop-blur-[2px] transition-all duration-500 group-hover:bg-[#141b2b]/30 group-hover:backdrop-blur-[1px]"></div>
            <div className="relative z-10 text-center px-6">
              <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/80 mb-4">DEPARTING SOON</div>
              <h2 className="text-[32px] md:text-[80px] font-bold leading-[36px] md:leading-[84px] tracking-[-0.01em] md:tracking-[-0.04em] text-white mb-6">
                YOU'RE LEAVING TOKYO.<br />
                <span className="text-[#ffdad2]">NEXT: KYOTO</span>
              </h2>
              <Link to="/budget" className="inline-flex items-center gap-2 bg-white text-[#141b2b] px-8 py-4 rounded-full text-[13px] font-medium hover:bg-[#f0edee] transition-colors shadow-lg">
                <Train className="w-4 h-4" />
                VIEW TRANSIT DETAILS (365 KM)
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-20 border-t border-[#c6c6cd] bg-[#f6f3f4] flex flex-col items-center gap-6 px-12 mt-20">
          <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#1b1b1d]">Plan the journey. Live the story.</div>
          <div className="flex gap-8">
            <a className="text-[16px] leading-[24px] text-[#45464c] hover:text-[#af2f13] transition-colors underline-offset-4 hover:underline" href="#">Journal</a>
            <a className="text-[16px] leading-[24px] text-[#45464c] hover:text-[#af2f13] transition-colors underline-offset-4 hover:underline" href="#">Contact</a>
            <a className="text-[16px] leading-[24px] text-[#45464c] hover:text-[#af2f13] transition-colors underline-offset-4 hover:underline" href="#">Privacy</a>
          </div>
        </footer>
      </main>
    </div>
  )
}