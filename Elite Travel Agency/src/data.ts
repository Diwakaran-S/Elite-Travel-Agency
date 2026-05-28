import { TravelPackage, GalleryItem, FAQItem } from './types';

export const TRAVEL_PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-maldives',
    title: 'Maldives Trench Aquasphere',
    tagline: 'Sub-aquatic luxury in the deep blue abyss.',
    duration: '6 Days / 5 Nights',
    price: 14900,
    rating: 4.95,
    vibe: 'Abyss',
    neonColor: 'blue',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    description: 'Submerge into complete tranquility in our premium oceanfloor suites. Watch deep sea bio-luminescence right from your custom pressure-sealed glass master suite, featuring a private hydro-jet pool and personal marine biologist drone companion.',
    highlights: [
      'Sub-oceanic luxury suit at -300m',
      'Personal underwater propulsion scooter',
      'Bio-luminescent night-dive expedition',
      'Molecular gourmet dining from Michelin-star chefs'
    ],
    perks: [
      'Decompression-free sub-surface transport',
      'Quantum-encrypted deep-sea comm-link',
      'Custom luxury wetsuit kit'
    ]
  },
  {
    id: 'pkg-tokyo',
    title: 'Neo-Tokyo Cyber-Sect',
    tagline: 'High-altitude sky-living in the neon capital.',
    duration: '5 Days / 4 Nights',
    price: 8500,
    rating: 4.88,
    vibe: 'Cybercity',
    neonColor: 'pink',
    image: 'https://i.pinimg.com/736x/40/c2/4a/40c24a0187e67429c94a6fc390d98ea0.jpg',
    description: 'Experience the ultimate convergence of retro-cyberpunk aesthetic and peak comfort. Hover 120 stories above Shibuya in a floating penthouse with fully adaptive holographic environments, interactive smart-bars, and direct VIP access to top-tier underground clubs.',
    highlights: [
      '120th floor panoramic floating capsule suite',
      'Augmented reality VIP city night-ride',
      'Personal robot mixologist & butler',
      'Secret cyberware-infused jazz lounge entry'
    ],
    perks: [
      'Holographic clothing customizer access',
      'Hyper-train express golden pass',
      'Neural audio-filtering smart-buds'
    ]
  },
  {
    id: 'pkg-iceland',
    title: 'Icelandic Aurora Dome',
    tagline: 'Geothermal thermal pods meets pristine glaciers.',
    duration: '7 Days / 6 Nights',
    price: 11200,
    rating: 4.97,
    vibe: 'Eco-Dome',
    neonColor: 'green',
    image: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&q=80&w=800',
    description: 'Bask under the green ribbon curtains of the Icelandic night skies. The automated intelligent bio-dome shifts transparency to give you unparalleled high-contrast views of the active Aurora Borealis, while keeping you in absolute zero-emission warmth next to thermal vents.',
    highlights: [
      'Vapour-heated smart carbon-fiber dome',
      'Private mineral-rich volcanic spring pool',
      'Glacier ice-cave solar buggy safari',
      'Molecular gastronomy in a lava chamber'
    ],
    perks: [
      'Personal climate-matching winter gear',
      'Aurora-tracking high-altitude drone cameras',
      'Volcanic mud therapy session'
    ]
  },
  {
    id: 'pkg-mars',
    title: 'Martian Frontier Launch',
    tagline: 'Escape gravity. Experience the red sands.',
    duration: '14 Days / 13 Nights',
    price: 89000,
    rating: 4.99,
    vibe: 'Celestial',
    neonColor: 'purple',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800',
    description: 'For the ultimate elite collector: a sub-orbital rocket charter to our premium high-gravity dome complex in Elysium Planitia, Mars. Watch the earth rise, walk on ancient red sands wearing carbon-skeleton lightweight pressure armor, and dine under a blue Martian sunset.',
    highlights: [
      'Launch via sub-orbital elite rocket',
      'Martian desert red dune buggy ride',
      '0.38g low-gravity private tennis court',
      'Hyper-baric dome dining suite with Earthviews'
    ],
    perks: [
      'Comprehensive astronaut physical prep',
      'Personalized oxygen-enriched luxury gear',
      'Titanium-plated certificate of transit'
    ]
  },
  {
    id: 'pkg-paris',
    title: 'Neo-Paris Sovereign Palace',
    tagline: 'Digital aristocracy in the heart of classic France.',
    duration: '6 Days / 5 Nights',
    price: 22000,
    rating: 4.92,
    vibe: 'Sovereign',
    neonColor: 'blue',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    description: 'Live like futuristic royalty. Enjoy a completely leased classic castle fully fitted with dynamic quantum light galleries, live multi-sensory virtual orchestra concerts, and hyper-realistic holographic art galleries spanning the Louvre archives.',
    highlights: [
      'Private 17th-century estate with forcefield privacy',
      'Premium classic culinary tasting reconstructed molecule by molecule',
      'Holographic virtual tour guided by historic AI avatars',
      'Supersonic electric aircraft airport transfer'
    ],
    perks: [
      'Elite personal security companion drone',
      'All-inclusive private virtual opera ticket',
      'Personal digital art acquisition credits'
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Soneva Coral Retreat',
    location: 'Noonu Atoll, Maldives',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
    description: 'Suspended over crystal-clear lagoon depths. Watch a vibrant reef sanctuary directly from your custom glass-bottom floor, offering ultimate serenity in the deep blue waters.',
    vibe: 'Abyss',
    coordinates: 'LOC: 5.6728° N, 73.1897° E | Overwater Villa'
  },
  {
    id: 'gal-2',
    title: 'Otemachi Skyline Haven',
    location: 'Aman Heights, Tokyo Center',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800',
    description: 'A masterfully crafted high-rise sanctuary perched above the sparkling metropolitan skyline. Unwind in a custom hinoki wood soaking tub paired with fully automated floor-to-ceiling privacy blinds.',
    vibe: 'Cybercity',
    coordinates: 'LOC: 35.6852° N, 139.7628° E | Penthouse VIP'
  },
  {
    id: 'gal-3',
    title: 'Matterhorn Alpine Sphere',
    location: 'Zermatt Ridge, Swiss Alps',
    imageUrl: 'https://images.unsplash.com/photo-1483168527879-c66136b56105?auto=format&fit=crop&q=80&w=800',
    description: 'A geothermal-heated glass dome designed to withstand pristine alpine winters while providing unobstructed vistas of the Matterhorn peaks and quiet starry nights.',
    vibe: 'Eco-Dome',
    coordinates: 'LOC: 45.9763° N, 7.6584° E | Altitude +1,600m'
  },
  {
    id: 'gal-4',
    title: 'Patagonia Ridge Observatory',
    location: 'Torres del Paine National Park, Chile',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=800',
    description: 'An architectural marvel seamlessly nestled along the rugged Patagonia peaks. Featuring a state-of-the-art clear panel ceiling designed for unrivaled stargazing.',
    vibe: 'Celestial',
    coordinates: 'LOC: 51.2586° S, 72.8624° W | Star Lodge'
  },
  {
    id: 'gal-5',
    title: 'The Ritz Sovereign Suite',
    location: 'Place Vendôme, Paris',
    imageUrl: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=800',
    description: 'Immerse yourself in authentic classical elegance. Featuring period antiques, hand-woven gold silk drapes, and an exquisite terrace overlooking the historic heart of Paris.',
    vibe: 'Sovereign',
    coordinates: 'LOC: 48.8681° N, 2.3294° E | Royal Class'
  },
  {
    id: 'gal-6',
    title: 'Bamboo River Sanctuary',
    location: 'Arashiyama Bank, Kyoto',
    imageUrl: 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?auto=format&fit=crop&q=80&w=800',
    description: 'An exclusive riverside villa that fuses traditional Japanese cedar woodwork with modern ambient soundscaping. Step straight onto your private electric wooden riverboat.',
    vibe: 'Cybercity',
    coordinates: 'LOC: 35.0116° N, 135.6775° E | Sanctuary Haven'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do you guarantee standard atmospheric safety during sub-orbital or high-pressure journeys?',
    answer: 'All Elite complexes are equipped with triple-redundant atmospheric regulators, quantum radiation deflector shields, and smart air-locks. Guests undergoing Martian travel also wear customized high-comfort light pressure suites built on carbon-scaffold fibers, which regulate full thermo-equilibriums.',
    category: 'technology'
  },
  {
    id: 'faq-2',
    question: 'Are flight and travel details completely private?',
    answer: 'Yes, all transits are managed via personal quantum-secure channels and encrypted telemetry. We maintain absolute digital sovereignty for our premium patrons. No flight paths, guest profiles, or physical logs are stored on shared public databases.',
    category: 'booking'
  },
  {
    id: 'faq-3',
    question: 'Can I reschedule my sub-oceanic deep suite booking due to weather anomalies?',
    answer: 'All aquatic suites are completely impervious to surface-level weather anomalies (typhoons, storms). However, if geothermal shift or deep-ocean currents exceed 12 knots, our routing system will automatically prompt an adaptive orbital rescheduling or upgrade you to a Celestial suite at no auxiliary cost.',
    category: 'logistics'
  },
  {
    id: 'faq-4',
    question: 'What is the purpose of the Neural Translation perk?',
    answer: 'Our proprietary neural audio-filtering earpieces and direct local links bridge communication effortlessly across classic world languages, deep-ocean symbols, and digital synthesized dialects. It translates with sub-millisecond hyper-latency.',
    category: 'technology'
  },
  {
    id: 'faq-5',
    question: 'What does the customized backup companion drone do?',
    answer: 'Our miniature carbon-plated guard drones serve as personal navigators, high-resolution holographic photographers, active climate monitors, and emergency medical transmitters, ensuring you are supported 24/7 in extreme zones.',
    category: 'logistics'
  }
];
