import { createContext, useContext, useState, useEffect } from 'react';
import { currentUser as initialUser, sampleTrips as initialTrips, curatedActivities, communityTrips as initialCommunity, regionalSelections } from '../data/mockData';

const TravelContext = createContext(null);

export function TravelProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gt_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('gt_trips');
    return saved ? JSON.parse(saved) : initialTrips;
  });

  const [communityStories, setCommunityStories] = useState(() => {
    const saved = localStorage.getItem('gt_community');
    return saved ? JSON.parse(saved) : initialCommunity;
  });

  const [savedActivityIds, setSavedActivityIds] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('gt_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('gt_trips', JSON.stringify(trips));
  }, [trips]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addTrip = (newTripData) => {
    const trip = {
      id: `trip_${Date.now()}`,
      title: newTripData.title || "Untitled Expedition",
      subtitle: newTripData.subtitle || "A new journey waiting to unfold.",
      status: "upcoming",
      startDate: newTripData.startDate || new Date().toISOString().split('T')[0],
      endDate: newTripData.endDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      coverImage: newTripData.coverImage || "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
      totalBudget: Number(newTripData.totalBudget) || 100000,
      spentBudget: 0,
      currency: "₹",
      author: user,
      collaborators: [],
      destinations: newTripData.destinations || ["Kyoto"],
      summary: newTripData.summary || "Curated multi-city travel itinerary.",
      sections: newTripData.sections || [
        {
          id: `sec_${Date.now()}`,
          city: newTripData.destinations?.[0] || "Primary Destination",
          country: "World",
          dates: `${newTripData.startDate || 'Day 1'} – ${newTripData.endDate || 'Day 7'}`,
          allocatedBudget: Number(newTripData.totalBudget) || 100000,
          coverImage: newTripData.coverImage || "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
          notes: "Initial trip notes and exploration plan.",
          days: []
        }
      ],
      expenses: []
    };

    setTrips(prev => [trip, ...prev]);
    showToast(`Journey "${trip.title}" created successfully!`);
    return trip;
  };

  const updateTrip = (id, updatedFields) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
    showToast("Trip details updated.");
  };

  const deleteTrip = (id) => {
    setTrips(prev => prev.filter(t => t.id !== id));
    showToast("Trip removed from your collection.");
  };

  const getTripById = (id) => {
    return trips.find(t => t.id === id) || trips[0];
  };

  const addSectionToTrip = (tripId, sectionData) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      const newSection = {
        id: `sec_${Date.now()}`,
        city: sectionData.city || "New Destination",
        country: sectionData.country || "Explore",
        dates: sectionData.dates || "3 Nights",
        allocatedBudget: Number(sectionData.allocatedBudget) || 30000,
        coverImage: sectionData.coverImage || "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
        notes: sectionData.notes || "",
        days: []
      };
      return {
        ...trip,
        destinations: Array.from(new Set([...trip.destinations, newSection.city])),
        sections: [...(trip.sections || []), newSection]
      };
    }));
    showToast("New destination section added!");
  };

  const updateSection = (tripId, sectionId, updatedFields) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      return {
        ...trip,
        sections: (trip.sections || []).map(sec => sec.id === sectionId ? { ...sec, ...updatedFields } : sec)
      };
    }));
    showToast("Section updated.");
  };

  const deleteSection = (tripId, sectionId) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      return {
        ...trip,
        sections: (trip.sections || []).filter(sec => sec.id !== sectionId)
      };
    }));
    showToast("Section removed.");
  };

  const addActivityToTrip = (tripId, sectionId, dayNumber, activity) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      const updatedSections = (trip.sections || []).map(section => {
        if (section.id !== sectionId && trip.sections.length > 1) return section;
        
        let days = [...(section.days || [])];
        let targetDay = days.find(d => d.dayNumber === dayNumber);
        
        const newActivity = {
          id: `act_${Date.now()}`,
          time: activity.time || "10:00 AM",
          title: activity.title || "Curated Stop",
          category: activity.category || "Sightseeing",
          duration: activity.duration || "2 hours",
          cost: Number(activity.cost) || 0,
          location: activity.location || section.city,
          description: activity.description || "",
          image: activity.image || section.coverImage
        };

        if (targetDay) {
          targetDay.activities = [...(targetDay.activities || []), newActivity];
        } else {
          days.push({
            dayNumber: dayNumber || (days.length + 1),
            title: `Day ${dayNumber || (days.length + 1)} in ${section.city}`,
            date: `Day ${dayNumber || (days.length + 1)}`,
            activities: [newActivity]
          });
        }

        return { ...section, days };
      });

      return { ...trip, sections: updatedSections };
    }));
    showToast(`Added "${activity.title}" to itinerary!`);
  };

  const addExpense = (tripId, expense) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      const newExp = {
        id: `exp_${Date.now()}`,
        title: expense.title,
        category: expense.category || "General",
        amount: Number(expense.amount) || 0,
        date: expense.date || new Date().toISOString().split('T')[0],
        paidBy: expense.paidBy || user.name.split(' ')[0]
      };
      const updatedExpenses = [...(trip.expenses || []), newExp];
      const spentBudget = updatedExpenses.reduce((acc, curr) => acc + curr.amount, 0);
      return { ...trip, expenses: updatedExpenses, spentBudget };
    }));
    showToast("Expense logged.");
  };

  const deleteExpense = (tripId, expenseId) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      const updatedExpenses = (trip.expenses || []).filter(e => e.id !== expenseId);
      const spentBudget = updatedExpenses.reduce((acc, curr) => acc + curr.amount, 0);
      return { ...trip, expenses: updatedExpenses, spentBudget };
    }));
    showToast("Expense deleted.");
  };

  const forkCommunityStory = (story) => {
    const forked = {
      id: `trip_fork_${Date.now()}`,
      title: `${story.title} (My Plan)`,
      subtitle: story.subtitle,
      status: "upcoming",
      startDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + (14 + (story.daysCount || 7)) * 86400000).toISOString().split('T')[0],
      coverImage: story.heroImage,
      totalBudget: 150000,
      spentBudget: 0,
      currency: "₹",
      author: user,
      collaborators: [],
      destinations: story.chapters ? story.chapters.map(c => c.city) : ["Tokyo", "Kyoto"],
      summary: `Forked from community journey by ${story.author.name}`,
      sections: story.chapters ? story.chapters.map((ch, idx) => ({
        id: `sec_fork_${idx}_${Date.now()}`,
        city: ch.city,
        country: "World",
        dates: `Chapter ${ch.chapterNumber}`,
        allocatedBudget: 50000,
        coverImage: ch.image,
        notes: ch.body,
        days: []
      })) : [],
      expenses: []
    };
    setTrips(prev => [forked, ...prev]);
    showToast(`Copied "${story.title}" into your trips!`);
    return forked;
  };

  const toggleSaveActivity = (actId) => {
    setSavedActivityIds(prev => 
      prev.includes(actId) ? prev.filter(id => id !== actId) : [...prev, actId]
    );
  };

  return (
    <TravelContext.Provider value={{
      user,
      setUser,
      trips,
      setTrips,
      addTrip,
      updateTrip,
      deleteTrip,
      getTripById,
      addSectionToTrip,
      updateSection,
      deleteSection,
      addActivityToTrip,
      addExpense,
      deleteExpense,
      communityStories,
      setCommunityStories,
      forkCommunityStory,
      savedActivityIds,
      toggleSaveActivity,
      curatedActivities,
      regionalSelections,
      showToast
    }}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1c18] text-[#fcf9f3] px-5 py-3 rounded-full text-sm font-medium shadow-2xl flex items-center gap-3 border border-[#46464c]/40 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#9af1f5]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
}
