import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow } from '../../components/common/Button';
import { HeaderFilterBar } from '../../components/common/HeaderFilterBar';
import { Heart, GitFork, Clock, MapPin, Calendar, ArrowRight, Copy } from 'lucide-react';

export default function Community() {
  const { communityStories, forkCommunityStory } = useTravel();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeSort, setActiveSort] = useState('trending');

  const filtered = communityStories
    .filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.author.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (activeSort === 'forks') return b.forks - a.forks;
      if (activeSort === 'latest') return 0;
      return b.likes - a.likes; // trending
    });

  const handleFork = (story) => {
    const forked = forkCommunityStory(story);
    navigate('/trips');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-10">
      {/* Header */}
      <div className="mb-6">
        <Eyebrow color="text-[#00696d]" className="mb-2">Traveler Stories</Eyebrow>
        <h1 className="display-headline text-4xl md:text-5xl font-bold text-[#1c1c18]">Community Journeys</h1>
        <p className="text-sm text-[#46464c] mt-2 max-w-xl">Discover curated travel narratives from fellow GlobeTrotters around the world.</p>
      </div>

      <HeaderFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="Search stories, authors, destinations..."
        sortOptions={[
          { value: 'trending', label: 'Trending' },
          { value: 'forks', label: 'Most Forked' },
          { value: 'latest', label: 'Latest' }
        ]}
        activeSort={activeSort}
        onSortChange={setActiveSort}
      />

      {/* Community Feed */}
      <div className="space-y-8 mt-8">
        {filtered.length === 0 ? (
          <div className="bg-[#f6f2e9] rounded-3xl p-12 text-center">
            <h3 className="text-xl font-bold text-[#1c1c18]">No stories found</h3>
            <p className="text-sm text-[#46464c] mt-2">Try adjusting your search terms.</p>
          </div>
        ) : filtered.map(story => (
          <div key={story.id} className="bg-white rounded-3xl border border-[#e6e3dc] overflow-hidden group hover:shadow-xl transition-shadow duration-500">
            {/* Hero Image */}
            <div className="relative h-[240px] md:h-[320px] overflow-hidden">
              <img
                src={story.heroImage}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Author overlay */}
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <div className="flex items-center gap-3">
                  <img src={story.author.avatar} alt={story.author.name} className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                  <div>
                    <p className="text-white text-sm font-semibold">{story.author.name}</p>
                    <p className="text-white/70 text-xs">{story.author.handle} · {story.author.location}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />{story.readTime}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#1c1c18] tracking-tight leading-tight">{story.title}</h2>
              <p className="text-sm text-[#46464c] mt-2 line-clamp-2">{story.subtitle}</p>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-[#76777d]">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{story.daysCount} days</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{story.citiesCount} cities</span>
                <span className="font-semibold text-[#1c1c18]">{story.totalCost}</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-400" />{story.likes}</span>
                <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5 text-[#00696d]" />{story.forks} copies</span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-[#e6e3dc]">
                <Link to={`/shared/${story.slug}`}>
                  <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
                    Read Full Story
                  </Button>
                </Link>
                <Button variant="tealLight" size="sm" icon={Copy} onClick={() => handleFork(story)}>
                  Copy to My Trips
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
