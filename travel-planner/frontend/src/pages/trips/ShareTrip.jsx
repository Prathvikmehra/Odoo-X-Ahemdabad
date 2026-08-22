import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../../context/TravelContext';
import { Button, Eyebrow } from '../../components/common/Button';
import { Share2, Globe, Eye, Copy, ArrowLeft, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function ShareTrip() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTripById, updateTrip, showToast } = useTravel();
  const trip = getTripById(tripId);

  const [isPublic, setIsPublic] = useState(trip?.isPublic || false);
  const [token, setToken] = useState(trip?.shareToken || `token_${tripId}`);

  if (!trip) {
    return (
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-20 text-center">
        <h2 className="text-2xl font-bold">Trip not found</h2>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/trips')}>Back to Trips</Button>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/shared/tokyo-kyoto-2026`; // Matches pre-loaded slug for demo

  const handleToggleSharing = () => {
    const nextVal = !isPublic;
    setIsPublic(nextVal);
    updateTrip(tripId, { isPublic: nextVal, shareToken: nextVal ? token : null });
    showToast(nextVal ? "Journey is now viewable publicly." : "Journey sharing deactivated.");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    showToast("Public sharing link copied to clipboard!");
  };

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-10 space-y-8">
      {/* Back Header */}
      <button onClick={() => navigate(`/trips/${tripId}`)} className="text-xs font-semibold text-[#76777d] hover:text-[#1c1c18] transition-colors cursor-pointer flex items-center gap-1">
        ← Back to Passport
      </button>

      <div className="mb-6">
        <Eyebrow color="text-[#00696d]" className="mb-2">Sharing Settings</Eyebrow>
        <h1 className="display-headline text-3xl md:text-4xl font-bold text-[#1c1c18]">Share Journey</h1>
        <p className="text-sm text-[#46464c] mt-2">Publish your multi-city expedition as an editorial online travel log for friends or the community.</p>
      </div>

      <div className="bg-white border border-[#e6e3dc] rounded-3xl p-6 md:p-10 max-w-2xl space-y-8">
        
        {/* Toggle Panel */}
        <div className="flex items-start justify-between gap-6 border-b border-[#e6e3dc] pb-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#1c1c18] flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#00696d]" /> Public Web Link
            </h3>
            <p className="text-xs text-[#76777d]">
              When enabled, anyone with the sharing link can view your itinerary stops, daily activities, and visual journals.
            </p>
          </div>
          
          <button 
            onClick={handleToggleSharing}
            className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${isPublic ? 'bg-[#00696d]' : 'bg-[#c6c6cc]'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isPublic ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* State description */}
        <div className="space-y-4">
          {isPublic ? (
            <>
              {/* Approved status */}
              <div className="bg-[#e0fbfb] border border-[#00696d]/20 rounded-2xl p-4 flex items-center gap-3 text-xs text-[#00696d] font-semibold">
                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                <span>Sharing is active! Your journal is accessible publicly.</span>
              </div>

              {/* Link copying box */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider block">Sharing Link</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-4 py-2.5 bg-[#fcf9f3] border border-[#e6e3dc] rounded-full text-xs text-[#46464c] select-all focus:outline-none"
                  />
                  <Button variant="secondary" size="md" icon={Copy} onClick={copyLink}>
                    Copy
                  </Button>
                </div>
              </div>

              {/* Preview Button */}
              <div className="pt-4 flex gap-2">
                <Button variant="primary" icon={Eye} onClick={() => navigate('/shared/tokyo-kyoto-2026')}>
                  Preview Public Page
                </Button>
              </div>
            </>
          ) : (
            <div className="bg-[#f9f5ed] border border-[#e6e3dc] rounded-2xl p-6 text-center text-xs text-[#76777d] space-y-2">
              <ShieldAlert className="w-8 h-8 text-[#c6c6cc] mx-auto" />
              <p className="font-semibold text-[#1c1c18]">Sharing is disabled</p>
              <p className="max-w-xs mx-auto">This trip is currently private and visible only to you. Toggle the switch above to activate a public web link.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
