import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow } from '../../components/common/Button';
import { Compass, Clock, MapPin, Heart, GitFork, Copy, Share2, ArrowRight } from 'lucide-react';

export default function SharedTrip() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { communityStories, forkCommunityStory, showToast } = useTravel();

  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  // Find the story in the database/mock database
  const story = communityStories.find(s => s.slug === token) || communityStories[0];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!story) {
    return (
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-20 text-center bg-[#fcf9f3] min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-[#1c1c18]">Shared Journal Not Found</h2>
        <p className="text-sm text-[#46464c] mt-2">This shared travel log could not be located.</p>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/community')}>Back to Stories</Button>
      </div>
    );
  }

  const handleFork = () => {
    forkCommunityStory(story);
    navigate('/trips');
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Shared journal link copied to clipboard!");
  };

  return (
    <div className="bg-[#fcf9f3] min-h-screen relative">
      
      {/* 1. Full-Screen Photo Hero */}
      <div className="relative w-full h-[85vh] min-h-[560px]">
        <img 
          src={story.heroImage} 
          alt={story.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        
        {/* Content Overlaid */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 max-w-[1440px] mx-auto w-full text-white space-y-6">
          <Eyebrow color="text-[#9af1f5]">Travel Journal</Eyebrow>
          <h1 className="display-headline text-4xl md:text-7xl font-bold tracking-tight leading-none max-w-4xl">
            {story.title}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
            {story.subtitle}
          </p>

          {/* Author info */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-3">
              <img 
                src={story.author.avatar} 
                alt={story.author.name} 
                className="w-12 h-12 rounded-full border-2 border-white object-cover" 
              />
              <div>
                <p className="text-sm font-semibold">{story.author.name}</p>
                <p className="text-xs text-white/60">{story.author.handle} · {story.author.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-[#9af1f5]" /> {story.readTime}</span>
              <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-red-400 fill-current" /> {story.likes}</span>
              <span className="flex items-center gap-1"><GitFork className="w-4 h-4 text-[#dbc3a8]" /> {story.forks} forks</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Chapter-by-Chapter Breakdown */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-20 space-y-32">
        {story.chapters?.map((chapter, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div 
              key={idx}
              className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
            >
              {/* Image Column */}
              <div className="w-full lg:w-1/2">
                <div className="h-[380px] md:h-[480px] rounded-3xl overflow-hidden shadow-sm group border border-[#e6e3dc]">
                  <img 
                    src={chapter.image} 
                    alt={chapter.city} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Text / Narration Column */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                  <Eyebrow color="text-[#00696d]">Chapter {chapter.chapterNumber}</Eyebrow>
                  <h2 className="text-2xl md:text-4xl font-bold text-[#1c1c18] tracking-tight">{chapter.city}</h2>
                  <h3 className="text-lg font-serif italic text-[#46464c]">{chapter.headline}</h3>
                </div>

                <p className="text-[#46464c] font-serif text-base leading-relaxed">
                  {chapter.body}
                </p>

                {/* Highlights List */}
                <div className="space-y-2.5 pt-2">
                  <p className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider">Chapter Highlights</p>
                  <ul className="space-y-2">
                    {chapter.highlights?.map((hl, i) => (
                      <li key={i} className="text-xs text-[#1c1c18] flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00696d] mt-1.5 flex-shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Journey in Numbers */}
      <section className="bg-[#f9f5ed] border-y border-[#e6e3dc] py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 text-center space-y-12">
          <Eyebrow color="text-[#00696d]">The Journey in Numbers</Eyebrow>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="space-y-2">
              <p className="display-headline text-5xl md:text-7xl font-bold text-[#1c1c18]">{story.daysCount}</p>
              <Eyebrow>Total Days</Eyebrow>
            </div>
            <div className="space-y-2">
              <p className="display-headline text-5xl md:text-7xl font-bold text-[#1c1c18]">{story.citiesCount}</p>
              <Eyebrow>Cities Logged</Eyebrow>
            </div>
            <div className="space-y-2">
              <p className="display-headline text-5xl md:text-7xl font-bold text-[#00696d]">{story.totalCost}</p>
              <Eyebrow>Calculated Budget</Eyebrow>
            </div>
            <div className="space-y-2">
              <p className="display-headline text-5xl md:text-7xl font-bold text-[#1c1c18]">{story.forks}</p>
              <Eyebrow>Planner Copies</Eyebrow>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Plan Your Own CTA */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-20 text-center space-y-6">
        <h2 className="display-headline text-3xl md:text-5xl font-bold text-[#1c1c18]">Inspired by this journey?</h2>
        <p className="text-sm text-[#46464c] max-w-md mx-auto">
          Copy this complete multi-city itinerary directly into your GlobeTrotter passport and start editing dates, activities, and budget elements.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button variant="primary" size="lg" icon={GitFork} onClick={handleFork}>
            Copy to My Planner
          </Button>
          <Button variant="secondary" size="lg" icon={Share2} onClick={copyShareLink}>
            Share Story
          </Button>
        </div>
      </section>

      {/* 5. Sticky Bottom Bar */}
      {scrolledPastHero && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e6e3dc] py-4 px-6 md:px-12 shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-[#00696d] hidden sm:block" />
            <div>
              <p className="text-xs font-bold text-[#1c1c18] line-clamp-1 max-w-[200px] sm:max-w-md">{story.title}</p>
              <p className="text-[10px] text-[#76777d] uppercase">{story.daysCount} Days · {story.author.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" icon={GitFork} onClick={handleFork}>
              Copy Trip
            </Button>
            <Button variant="secondary" size="sm" icon={Copy} onClick={copyShareLink} className="hidden sm:inline-flex">
              Copy Link
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
