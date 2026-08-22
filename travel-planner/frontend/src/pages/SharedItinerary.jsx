import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function SharedItinerary() {
  return (
    <div className="min-h-screen bg-[#fcf9f3] text-[#1c1c18] font-sans antialiased flex flex-col">
      {/* Full Screen Hero */}
      <header className="relative w-full h-screen flex flex-col justify-center items-center px-5 md:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBa-5FUSBDro3w15rKK-s2afMjiQIInfXDJxmcM40rgMr0lxbRJBUNH4BTlgkP4BnKZMYtFr2U12Kzfh7lPuY0Ou3jveeGjnWSPVwRnO1q0mrq0AI4Oqb1O5eMlXKZVE446BeDA2xArRvDIxmruMzW2u7wSKWDPnUidbioPzSRgqVF8pKc4gI7LV_be-58r3IejAIxCMr_nIXTrXbqWfL4mhpse6T4pEqspDPpHkqtaljckoS6V1oTQ')" }}
          ></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-[80px] font-bold leading-[84px] tracking-[-0.04em] uppercase mb-6">JAPAN: TOKYO → KYOTO → OSAKA</h1>
          <p className="text-2xl font-medium text-white/90 tracking-widest uppercase">A JOURNEY BY ALEX</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-16 py-24 flex flex-col gap-32">
        {/* Chapter 01: Tokyo */}
        <section className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between border-b border-[#1c1c18]/10 pb-8">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#46464c]">CHAPTER 01</span>
              <h2 className="text-[48px] font-semibold leading-[52px] tracking-[-0.02em] text-[#1c1c18]">TOKYO</h2>
            </div>
            <p className="text-[18px] leading-[28px] text-[#46464c] max-w-md">The neon pulse of the metropolis. A clash of ancient shrines and futuristic skyscrapers, where tradition meets tomorrow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 h-[600px] rounded-2xl overflow-hidden bg-[#f0eee8] relative group">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBa-5FUSBDro3w15rKK-s2afMjiQIInfXDJxmcM40rgMr0lxbRJBUNH4BTlgkP4BnKZMYtFr2U12Kzfh7lPuY0Ou3jveeGjnWSPVwRnO1q0mrq0AI4Oqb1O5eMlXKZVE446BeDA2xArRvDIxmruMzW2u7wSKWDPnUidbioPzSRgqVF8pKc4gI7LV_be-58r3IejAIxCMr_nIXTrXbqWfL4mhpse6T4pEqspDPpHkqtaljckoS6V1oTQ')" }}
              ></div>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-8">
              <ul className="flex flex-col gap-6">
                <li className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium text-[#1c1c18]">Shibuya Crossing</h3>
                  <p className="text-[16px] leading-[24px] text-[#46464c]">Experience the world's busiest pedestrian crossing under a canopy of glowing neon.</p>
                </li>
                <li className="w-12 h-[1px] bg-[#1c1c18]/10"></li>
                <li className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium text-[#1c1c18]">Sushi Experience</h3>
                  <p className="text-[16px] leading-[24px] text-[#46464c]">Omakase dining at a hidden gem in Ginza.</p>
                </li>
                <li className="w-12 h-[1px] bg-[#1c1c18]/10"></li>
                <li className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium text-[#1c1c18]">Tokyo Tower</h3>
                  <p className="text-[16px] leading-[24px] text-[#46464c]">Panoramic views of the sprawling city skyline at sunset.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cinematic Transition 1 */}
        <div className="w-full h-[400px] relative rounded-2xl overflow-hidden my-12">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXPuRNov2TcqjhuMOj5i7jt_PZTWgKffDZpo6xc2Vn5tf_dDpFI0LjXwIrs4BzW0H0GsZXEsQxKyi6Fj9Fg17hRWlcXmMkCEwUwxwufBorfJeQTTVPztGqAaUfeeOmBip2SnwMOYU9IZixW7SaPyHdQCo3oF4g0hoY4D09IIozyl8o2cVJ9UXt6UpEJ7dVw2bVdtx7yTzLC_Ds2hlmbz_1GKNKdgOQvufCB6ds0k0BiYVfsUQqaUgP')" }}
          ></div>
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white">FROM NEON TO NATURE</span>
          </div>
        </div>

        {/* Chapter 02: Kyoto */}
        <section className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between border-b border-[#1c1c18]/10 pb-8">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#46464c]">CHAPTER 02</span>
              <h2 className="text-[48px] font-semibold leading-[52px] tracking-[-0.02em] text-[#1c1c18]">KYOTO</h2>
            </div>
            <p className="text-[18px] leading-[28px] text-[#46464c] max-w-md">A return to the roots. Thousands of vermilion gates, serene bamboo groves, and the quiet art of the tea ceremony.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex flex-col gap-8 order-2 md:order-1">
              <ul className="flex flex-col gap-6">
                <li className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium text-[#1c1c18]">Fushimi Inari</h3>
                  <p className="text-[16px] leading-[24px] text-[#46464c]">A hike through thousands of sacred torii gates.</p>
                </li>
                <li className="w-12 h-[1px] bg-[#1c1c18]/10"></li>
                <li className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium text-[#1c1c18]">Tea Ceremony</h3>
                  <p className="text-[16px] leading-[24px] text-[#46464c]">A meditative exploration of matcha and mindfulness.</p>
                </li>
                <li className="w-12 h-[1px] bg-[#1c1c18]/10"></li>
                <li className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium text-[#1c1c18]">Arashiyama</h3>
                  <p className="text-[16px] leading-[24px] text-[#46464c]">Wandering through the towering stalks of the famous bamboo forest.</p>
                </li>
              </ul>
            </div>
            <div className="md:col-span-7 md:col-start-6 h-[600px] rounded-2xl overflow-hidden bg-[#f0eee8] relative group order-1 md:order-2">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXPuRNov2TcqjhuMOj5i7jt_PZTWgKffDZpo6xc2Vn5tf_dDpFI0LjXwIrs4BzW0H0GsZXEsQxKyi6Fj9Fg17hRWlcXmMkCEwUwxwufBorfJeQTTVPztGqAaUfeeOmBip2SnwMOYU9IZixW7SaPyHdQCo3oF4g0hoY4D09IIozyl8o2cVJ9UXt6UpEJ7dVw2bVdtx7yTzLC_Ds2hlmbz_1GKNKdgOQvufCB6ds0k0BiYVfsUQqaUgP')" }}
              ></div>
            </div>
          </div>
        </section>

        {/* Cinematic Transition 2 */}
        <div className="w-full h-[400px] relative rounded-2xl overflow-hidden my-12">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqGROqRyw1VNe4p4Arpujg89kCMQpbwv6UvBL_i5ZIyP9-Oh3TJ0sA9Z4hfYv5AHLLw62cWI80wPckFTeG3ArUbdD14YZQDdNajUlxD6YEK9rEJ6t5appuwTTL5TZwde0F6PXMZ6VdIOJLdhzVvoaS9RQH4xqMVsNKBUzC3KDx_EMooz07pyqNQoswGIQzuSGKYTHDNoE1cgjd0mOKdXbwui3BQb-xF-ff51YhfgTcCvY9vBWJHTx4')" }}
          ></div>
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white">INTO THE KITCHEN OF JAPAN</span>
          </div>
        </div>

        {/* Chapter 03: Osaka */}
        <section className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between border-b border-[#1c1c18]/10 pb-8">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#46464c]">CHAPTER 03</span>
              <h2 className="text-[48px] font-semibold leading-[52px] tracking-[-0.02em] text-[#1c1c18]">OSAKA</h2>
            </div>
            <p className="text-[18px] leading-[28px] text-[#46464c] max-w-md">Street food capital, vibrant nightlife, and a bustling energy that pulses through the canals of Dotonbori.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 h-[600px] rounded-2xl overflow-hidden bg-[#f0eee8] relative group">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqGROqRyw1VNe4p4Arpujg89kCMQpbwv6UvBL_i5ZIyP9-Oh3TJ0sA9Z4hfYv5AHLLw62cWI80wPckFTeG3ArUbdD14YZQDdNajUlxD6YEK9rEJ6t5appuwTTL5TZwde0F6PXMZ6VdIOJLdhzVvoaS9RQH4xqMVsNKBUzC3KDx_EMooz07pyqNQoswGIQzuSGKYTHDNoE1cgjd0mOKdXbwui3BQb-xF-ff51YhfgTcCvY9vBWJHTx4')" }}
              ></div>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-8">
              <ul className="flex flex-col gap-6">
                <li className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium text-[#1c1c18]">Dotonbori</h3>
                  <p className="text-[16px] leading-[24px] text-[#46464c]">Cruising the canals under the glow of the Glico running man.</p>
                </li>
                <li className="w-12 h-[1px] bg-[#1c1c18]/10"></li>
                <li className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium text-[#1c1c18]">Osaka Castle</h3>
                  <p className="text-[16px] leading-[24px] text-[#46464c]">Exploring one of Japan's most famous landmarks.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="flex flex-col items-center text-center gap-12 py-24 bg-[#f6f3ed] rounded-3xl mt-12">
          <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#46464c]">THE JOURNEY IN NUMBERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
              <span className="text-6xl md:text-[80px] font-bold leading-[84px] tracking-[-0.04em] text-[#1c1c18]">8</span>
              <span className="text-[18px] leading-[28px] text-[#46464c]">Days</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-6xl md:text-[80px] font-bold leading-[84px] tracking-[-0.04em] text-[#1c1c18]">3</span>
              <span className="text-[18px] leading-[28px] text-[#46464c]">Cities</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-6xl md:text-[80px] font-bold leading-[84px] tracking-[-0.04em] text-[#1c1c18]">₹67k</span>
              <span className="text-[18px] leading-[28px] text-[#46464c]">Total Cost</span>
            </div>
          </div>
          <Link to="/create" className="mt-8 px-8 py-4 bg-[#1c1c18] text-[#fcf9f3] rounded-full text-[16px] font-medium hover:bg-[#1c1c18]/90 transition-colors inline-block">
            PLAN YOUR OWN JOURNEY
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 flex justify-center items-center border-t border-[#1c1c18]/5">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-[#46464c] flex items-center gap-2">
          POWERED BY <Sparkles className="w-4 h-4" /> WANDERLUST
        </p>
      </footer>
    </div>
  )
}