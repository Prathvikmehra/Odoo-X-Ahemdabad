// GlobeTrotter Curated Editorial Mock Database

export const currentUser = {
  id: "user_alex",
  name: "Alex Mercer",
  email: "alex.mercer@globetrotter.io",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  bio: "Writer, photographer, and perennial slow-traveler based in Kyoto & London. Searching for quiet tea houses and brutalist architecture.",
  role: "Adventurer & Storyteller",
  phone: "+44 7911 123456",
  city: "London",
  country: "United Kingdom",
  joinedDate: "March 2024",
  stats: {
    tripsCount: 14,
    countriesVisited: 26,
    citiesExplored: 68,
    experiencesCompleted: 142,
    totalBudgetPlanned: 485000,
    communityForks: 320,
  },
  preferences: {
    currency: "INR (₹)",
    language: "English (UK)",
    travelPace: "Slow & Immersive",
    dietary: "Pescatarian, matcha enthusiast",
  }
};

export const sampleTrips = [
  {
    id: "trip_japan_2026",
    title: "Autumn in Kyoto & Tokyo",
    subtitle: "A 10-day contemplative journey through ancient temples, neon alleyways, and seasonal kaiseki.",
    status: "ongoing", // ongoing | upcoming | completed
    startDate: "2026-09-12",
    endDate: "2026-09-22",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
    totalBudget: 145000,
    spentBudget: 62000,
    currency: "₹",
    author: currentUser,
    collaborators: [
      { name: "Mei Lin", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" },
      { name: "Julian Vance", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" }
    ],
    destinations: ["Tokyo", "Hakone", "Kyoto"],
    summary: "Starting in high-energy Shinjuku, retreating to hot springs near Fuji, and concluding with meditative walks along Kyoto's Philosopher's Path.",
    sections: [
      {
        id: "sec_tokyo",
        city: "Tokyo",
        country: "Japan",
        dates: "Sep 12 – Sep 15 (3 Nights)",
        allocatedBudget: 55000,
        coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
        notes: "Stay at hotel near Yanaka. Early mornings in Tsukiji outer market and Tsukiji Hongan-ji.",
        days: [
          {
            dayNumber: 1,
            title: "Arrival, Yanaka Alleys & Shibuya Crossing",
            date: "Sep 12",
            activities: [
              {
                id: "act_101",
                time: "09:30 AM",
                title: "Check-in at Hanare Traditional Machiya",
                category: "Accommodation",
                duration: "1h 30m",
                cost: 14000,
                location: "Yanaka, Taito-ku",
                description: "Renovated Edo-era guesthouse distributed across the historical neighborhood.",
                image: "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=600&q=80"
              },
              {
                id: "act_102",
                time: "01:00 PM",
                title: "Handmade Soba & Tempura at Kagiya",
                category: "Dining",
                duration: "1h 15m",
                cost: 2200,
                location: "Nezu",
                description: "Century-old soba parlor renowned for seasonal buckwheat noodles.",
                image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80"
              },
              {
                id: "act_103",
                time: "05:45 PM",
                title: "Sunset over Shibuya Sky Observatory",
                category: "Sightseeing",
                duration: "2h",
                cost: 1800,
                location: "Shibuya Scramble Square",
                description: "360-degree open-air rooftop panoramic terrace capturing golden hour.",
                image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80"
              }
            ]
          },
          {
            dayNumber: 2,
            title: "Old Edo Asakusa & Modern Architecture",
            date: "Sep 13",
            activities: [
              {
                id: "act_104",
                time: "07:30 AM",
                title: "Senso-ji Sunrise Incense Walk",
                category: "Culture",
                duration: "1h 45m",
                cost: 0,
                location: "Asakusa",
                description: "Experience the grand pagoda and lanterns before crowds arrive.",
                image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80"
              },
              {
                id: "act_105",
                time: "02:30 PM",
                title: "Nezu Museum & Bamboo Garden",
                category: "Culture",
                duration: "2h",
                cost: 1200,
                location: "Minato-ku",
                description: "Kengo Kuma-designed sanctuary housing pre-modern Japanese art.",
                image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=600&q=80"
              }
            ]
          }
        ]
      },
      {
        id: "sec_hakone",
        city: "Hakone",
        country: "Japan",
        dates: "Sep 16 – Sep 17 (1 Night)",
        allocatedBudget: 35000,
        coverImage: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80",
        notes: "Ryokan onsen, kaiseki dinner, morning view of Mt. Fuji over Lake Ashi.",
        days: [
          {
            dayNumber: 4,
            title: "Cedar Avenues & Natural Hot Springs",
            date: "Sep 16",
            activities: [
              {
                id: "act_201",
                time: "11:00 AM",
                title: "Romancecar Scenic Express & Hakone Shrine",
                category: "Transport",
                duration: "2h",
                cost: 3400,
                location: "Lake Ashi",
                description: "Iconic red Torii gate standing peacefully in the misty water.",
                image: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=600&q=80"
              },
              {
                id: "act_202",
                time: "04:30 PM",
                title: "Outdoor Onsen & Multi-Course Kaiseki",
                category: "Relaxation",
                duration: "3h",
                cost: 26000,
                location: "Gora",
                description: "Forest mineral baths and 9-course seasonal dining under cedar canopies.",
                image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80"
              }
            ]
          }
        ]
      },
      {
        id: "sec_kyoto",
        city: "Kyoto",
        country: "Japan",
        dates: "Sep 18 – Sep 22 (4 Nights)",
        allocatedBudget: 55000,
        coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
        notes: "Zen rock gardens, tea ceremonies in Uji, Gion evening photography.",
        days: [
          {
            dayNumber: 6,
            title: "Zen Gardens & Arashiyama Bamboo Grove",
            date: "Sep 18",
            activities: [
              {
                id: "act_301",
                time: "06:30 AM",
                title: "Tenryu-ji Garden & Early Bamboo Stroll",
                category: "Nature",
                duration: "2h 30m",
                cost: 600,
                location: "Arashiyama",
                description: "Sunlight filtering through thousand-year bamboo stalks.",
                image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80"
              },
              {
                id: "act_302",
                time: "02:00 PM",
                title: "Traditional Matcha Ceremony at Ippodo",
                category: "Culture",
                duration: "1h 30m",
                cost: 2800,
                location: "Teramachi",
                description: "Whisking ceremonial grade Uji matcha with seasonal wagashi sweets.",
                image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
              }
            ]
          }
        ]
      }
    ],
    expenses: [
      { id: "exp_1", title: "Hanare Machiya Tokyo (3 Nights)", category: "Accommodation", amount: 42000, date: "2026-09-12", paidBy: "Alex" },
      { id: "exp_2", title: "Gora Kadan Ryokan & Kaiseki", category: "Accommodation", amount: 26000, date: "2026-09-16", paidBy: "Alex" },
      { id: "exp_3", title: "Shinkansen Bullet Train Passes", category: "Transport", amount: 24500, date: "2026-09-12", paidBy: "Julian" },
      { id: "exp_4", title: "Shibuya Sky & Museum Passes", category: "Activities", amount: 4800, date: "2026-09-13", paidBy: "Mei" },
      { id: "exp_5", title: "Tsukiji Outer Market & Dining", category: "Meals", amount: 18500, date: "2026-09-14", paidBy: "Alex" },
      { id: "exp_6", title: "Tea Ceremony & Pottery Studio", category: "Activities", amount: 6200, date: "2026-09-18", paidBy: "Alex" },
      { id: "exp_7", title: "Local Taxis & Suica Transit Cards", category: "Transport", amount: 8000, date: "2026-09-15", paidBy: "Julian" }
    ]
  },
  {
    id: "trip_amalfi_2026",
    title: "Amalfi Coast & Southern Sunsets",
    subtitle: "Clifftop villages, lemon groves, and azure waters along Italy's most poetic coastline.",
    status: "upcoming",
    startDate: "2026-10-04",
    endDate: "2026-10-12",
    coverImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85",
    totalBudget: 190000,
    spentBudget: 45000,
    currency: "₹",
    author: currentUser,
    collaborators: [
      { name: "Elena Rossi", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" }
    ],
    destinations: ["Naples", "Positano", "Ravello", "Capri"],
    summary: "Espresso in Naples, winding coastal drives, cliffside dining in Positano, and classical concerts in Ravello's Villa Rufolo.",
    sections: [
      {
        id: "sec_napoli",
        city: "Naples",
        country: "Italy",
        dates: "Oct 04 – Oct 06 (2 Nights)",
        allocatedBudget: 40000,
        coverImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
        notes: "Historical center, wood-fired Neapolitan pizza, Spaccanapoli walks.",
        days: []
      },
      {
        id: "sec_positano",
        city: "Positano & Ravello",
        country: "Italy",
        dates: "Oct 06 – Oct 12 (6 Nights)",
        allocatedBudget: 150000,
        coverImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
        notes: "Private boat charter to Faraglioni, Path of the Gods hike.",
        days: []
      }
    ],
    expenses: [
      { id: "exp_a1", title: "Villa Cimbrone Hotel Deposit", category: "Accommodation", amount: 35000, date: "2026-08-10", paidBy: "Alex" },
      { id: "exp_a2", title: "Naples to Sorrento Car Rental", category: "Transport", amount: 10000, date: "2026-08-15", paidBy: "Alex" }
    ]
  },
  {
    id: "trip_nordic_2025",
    title: "Nordic Solitude & Glacier Lagoons",
    subtitle: "Circumnavigating Iceland's Ring Road under volcanic peaks and dancing aurora skies.",
    status: "completed",
    startDate: "2025-11-02",
    endDate: "2025-11-10",
    coverImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1600&q=85",
    totalBudget: 160000,
    spentBudget: 154000,
    currency: "₹",
    author: currentUser,
    collaborators: [],
    destinations: ["Reykjavik", "Vik", "Höfn", "Snæfellsnes"],
    summary: "Black sand beaches of Reynisfjara, Diamond Beach glacial ice crystals, and thermal springs.",
    sections: [],
    expenses: []
  },
  {
    id: "trip_rajasthan_2025",
    title: "Fortresses & Royal Haveli Trails",
    subtitle: "Golden hour over Jaipur's pink facades, blue lanes of Jodhpur, and shimmering Udaipur lakes.",
    status: "completed",
    startDate: "2025-02-14",
    endDate: "2025-02-23",
    coverImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85",
    totalBudget: 85000,
    spentBudget: 81200,
    currency: "₹",
    author: currentUser,
    collaborators: [],
    destinations: ["Jaipur", "Jodhpur", "Udaipur"],
    summary: "Heritage palatial stays, block-print workshops, and desert sunsets.",
    sections: [],
    expenses: []
  }
];

export const regionalSelections = [
  { id: "reg_1", name: "Kyoto", region: "Kansai, Japan", photo: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80", tripCount: "1.2k planned", tag: "Temples & Tea" },
  { id: "reg_2", name: "Amalfi Coast", region: "Campania, Italy", photo: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80", tripCount: "940 planned", tag: "Coastal Scenic" },
  { id: "reg_3", name: "Zermatt & Matterhorn", region: "Valais, Switzerland", photo: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80", tripCount: "710 planned", tag: "Alpine Treks" },
  { id: "reg_4", name: "Udaipur", region: "Rajasthan, India", photo: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80", tripCount: "850 planned", tag: "Palace Lakes" },
  { id: "reg_5", name: "Reykjavik", region: "Capital Region, Iceland", photo: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=600&q=80", tripCount: "640 planned", tag: "Glaciers & Auroras" },
  { id: "reg_6", name: "Barcelona", region: "Catalonia, Spain", photo: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&q=80", tripCount: "1.5k planned", tag: "Gothic & Modernist" }
];

export const curatedActivities = [
  {
    id: "act_disc_1",
    title: "Philosopher's Path & Honen-in Morning Walk",
    city: "Kyoto",
    country: "Japan",
    category: "Culture",
    duration: "2 hours",
    cost: "₹0 (Free)",
    priceNum: 0,
    rating: 4.9,
    reviews: 240,
    tags: ["Serene", "Cherry Blossoms", "Architecture"],
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    description: "A stone path along a tranquil canal lined with hundreds of cherry and maple trees, leading to the mossy gates of Honen-in."
  },
  {
    id: "act_disc_2",
    title: "Path of the Gods Cliffside Trek (Sentiero degli Dei)",
    city: "Amalfi Coast",
    country: "Italy",
    category: "Adventure",
    duration: "4.5 hours",
    cost: "₹0 (Free)",
    priceNum: 0,
    rating: 4.95,
    reviews: 412,
    tags: ["Panoramic", "Hiking", "Sea View"],
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    description: "Breathtaking high-altitude trail offering dizzying views of the Tyrrhenian sea, lemon terraces, and Capri island."
  },
  {
    id: "act_disc_3",
    title: "Sagrada Família Morning Towers & Crypt Tour",
    city: "Barcelona",
    country: "Spain",
    category: "Culture",
    duration: "2.5 hours",
    cost: "₹3,200",
    priceNum: 3200,
    rating: 4.9,
    reviews: 1890,
    tags: ["Gaudí", "UNESCO", "Must Visit"],
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80",
    description: "Gaudí’s magnum opus flooded with early morning stained-glass prism lights and dizzying organic spires."
  },
  {
    id: "act_disc_4",
    title: "Silfra Fissure Snorkeling between Tectonic Plates",
    city: "Thingvellir",
    country: "Iceland",
    category: "Adventure",
    duration: "3 hours",
    cost: "₹14,500",
    priceNum: 14500,
    rating: 4.88,
    reviews: 310,
    tags: ["Glacial", "Bucket List", "Drysuit"],
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80",
    description: "Float in 100-meter crystal clarity between the North American and Eurasian tectonic continents in glacial meltwater."
  },
  {
    id: "act_disc_5",
    title: "Lake Pichola Sunset Heritage Boat Cruise",
    city: "Udaipur",
    country: "India",
    category: "Relaxation",
    duration: "1.5 hours",
    cost: "₹1,200",
    priceNum: 1200,
    rating: 4.85,
    reviews: 580,
    tags: ["Palaces", "Golden Hour", "Romantic"],
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    description: "Glide past the City Palace and Jag Mandir island as royal marble domes illuminate against the Aravalli hills."
  },
  {
    id: "act_disc_6",
    title: "Shibuya Underground Izakaya & Yakitori Tasting",
    city: "Tokyo",
    country: "Japan",
    category: "Dining",
    duration: "3 hours",
    cost: "₹4,800",
    priceNum: 4800,
    rating: 4.92,
    reviews: 430,
    tags: ["Culinary", "Local Secret", "Nightlife"],
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    description: "Hidden basements and smoky charcoal grills serving authentic skewers, sake pairings, and seasonal sashimi."
  }
];

export const communityTrips = [
  {
    id: "comm_japan_story",
    slug: "tokyo-kyoto-2026",
    title: "The Quiet Japanese Autumn: A 10-Day Journal",
    subtitle: "From neon labyrinth alleys to mossy Zen monasteries and steaming alpine onsen.",
    author: {
      name: "Alex Mercer",
      handle: "@alexmercer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      location: "London & Kyoto"
    },
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=90",
    readTime: "8 min read",
    likes: 842,
    forks: 319,
    daysCount: 10,
    citiesCount: 3,
    totalCost: "₹1,45,000",
    chapters: [
      {
        chapterNumber: "01",
        city: "Tokyo",
        headline: "Electric Shadows & Quiet Machiyas",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
        imagePosition: "left",
        body: "Tokyo exists in two parallel dimensions: the kinetic, kaleidoscopic pulse of Shibuya and Shinjuku, and the hushed, winding wooden alleyways of Yanaka and Nezu where cats nap on bicycle saddles and morning incense drifts from family altars. We began our mornings before dawn at Tsukiji, watching fishmongers slice sashimi with surgical grace, and spent evenings watching twilight tint the skyline violet from Shibuya Sky.",
        highlights: [
          "Stayed in a 1920s restored wood townhouse in Yanaka",
          "Sunset viewing at Shibuya Scramble Sky deck",
          "Ceremonial matcha & seasonal sweets at Nezu Museum garden pavilion"
        ]
      },
      {
        chapterNumber: "02",
        city: "Hakone",
        headline: "Mist, Cedar Canopies & Mountain Hot Springs",
        image: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80",
        imagePosition: "right",
        body: "Leaving the metropolis behind aboard the Romancecar, we climbed into the misty hills of Hakone. The autumn air here is scented with damp pine needle and sulfur vapors. Submerging into outdoor onsen water surrounded by golden Japanese maples while Mount Fuji peeked through afternoon cloud cover was the exact antidote to long transatlantic travel.",
        highlights: [
          "Outdoor mineral onsen overlooking Hakone volcanic caldera",
          "9-Course Autumn Kaiseki dinner featuring matsutake mushrooms",
          "Misty boat crossing past the floating Torii gate on Lake Ashi"
        ]
      },
      {
        chapterNumber: "03",
        city: "Kyoto",
        headline: "The Art of Stillness & Bamboo Echoes",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
        imagePosition: "left",
        body: "In Kyoto, time stretches. Waking up at 5:30 AM allowed us to stand completely alone inside the towering emerald bamboo forest of Arashiyama before the world woke up. We walked along the Philosopher’s Path, stopped for handmade soba by the river, and watched geiko gracefully vanish into the lantern-lit alleys of Gion as dusk settled.",
        highlights: [
          "Dawn meditation at Tenryu-ji Zen rock garden",
          "Philosopher’s Path canal stroll in peak autumnal foliage",
          "Private tea whisking masterclass in historic Gion district"
        ]
      }
    ]
  },
  {
    id: "comm_amalfi_story",
    slug: "amalfi-coast-romance",
    title: "Sunlit Terraces & Azure Waters: Amalfi Solitude",
    subtitle: "Navigating cliffside switchbacks, lemon orchards, and timeless coastal tranquility.",
    author: {
      name: "Chiara Vivaldi",
      handle: "@chiara_travels",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      location: "Florence, Italy"
    },
    heroImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1800&q=90",
    readTime: "6 min read",
    likes: 614,
    forks: 188,
    daysCount: 8,
    citiesCount: 4,
    totalCost: "₹1,90,000",
    chapters: []
  },
  {
    id: "comm_nordic_story",
    slug: "iceland-ring-road-expedition",
    title: "Black Sands & Glacial Diamonds: Ring Road Journal",
    subtitle: "A sub-zero overland expedition through waterfalls, volcanic fields, and green auroras.",
    author: {
      name: "Erik Lindqvist",
      handle: "@erik_nordic",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      location: "Reykjavik, Iceland"
    },
    heroImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1800&q=90",
    readTime: "11 min read",
    likes: 1045,
    forks: 482,
    daysCount: 9,
    citiesCount: 4,
    totalCost: "₹1,60,000",
    chapters: []
  }
];

export const adminAnalytics = {
  totalUsers: 14820,
  activeTrips: 3420,
  totalBudgetManaged: "₹42.8 Cr",
  communityShares: 8930,
  growthRate: "+24.6% this month",
  monthlySignups: [
    { month: "Jan", users: 1200, trips: 310 },
    { month: "Feb", users: 1540, trips: 420 },
    { month: "Mar", users: 2100, trips: 590 },
    { month: "Apr", users: 2800, trips: 780 },
    { month: "May", users: 3400, trips: 960 },
    { month: "Jun", users: 4200, trips: 1350 }
  ],
  popularCities: [
    { name: "Kyoto, Japan", count: 2840, percentage: 34, color: "#00696d" },
    { name: "Positano, Italy", count: 2120, percentage: 26, color: "#dbc3a8" },
    { name: "Barcelona, Spain", count: 1780, percentage: 21, color: "#46464c" },
    { name: "Reykjavik, Iceland", count: 1580, percentage: 19, color: "#76777d" }
  ],
  categoryBreakdown: [
    { category: "Culture & Temples", count: 4820, share: 38 },
    { category: "Dining & Gastronomy", count: 3510, share: 28 },
    { category: "Nature & Hiking", count: 2480, share: 20 },
    { category: "Relaxation & Spas", count: 1790, share: 14 }
  ],
  recentRegistrations: [
    { id: "u_1", name: "Sophie Martin", email: "sophie.m@outlook.com", city: "Paris", country: "France", trips: 3, joined: "2 hours ago", status: "Active" },
    { id: "u_2", name: "Kenji Sato", email: "kenji.sato@kyoto.jp", city: "Kyoto", country: "Japan", trips: 6, joined: "5 hours ago", status: "Active" },
    { id: "u_3", name: "Ananya Sharma", email: "ananya.s@gmail.com", city: "Mumbai", country: "India", trips: 4, joined: "Yesterday", status: "Active" },
    { id: "u_4", name: "Lucas Bennett", email: "lucas.bennett@nyu.edu", city: "New York", country: "USA", trips: 1, joined: "2 days ago", status: "Pending" }
  ]
};
