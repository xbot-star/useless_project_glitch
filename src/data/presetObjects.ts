import type { JeevifyIdentity } from '../types';

export const HIGH_QUALITY_OBJECT_IMAGES: Record<string, string> = {
  potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
  pen: 'https://images.unsplash.com/photo-1585336261026-8f5786372969?auto=format&fit=crop&w=800&q=80',
  chair: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
  diary: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  stapler: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  bottle: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
  laptop: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  eraser: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
  pencil: 'https://images.unsplash.com/photo-1569388330292-79cc1ec67270?auto=format&fit=crop&w=800&q=80',
  remote: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&w=800&q=80',
  charger: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
  shoe: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  watch: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
  coffee: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  backpack: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
  tomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
  onion: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
  cucumber: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=800&q=80',
  chilli: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
  mango: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
  carrot: 'https://images.unsplash.com/photo-1598170845058-12f621a6309b?auto=format&fit=crop&w=800&q=80',
  broccoli: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80',
  bellpepper: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80',
  coconut: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=80'
};

// Preset Identity 1: Arjun Potato
export const POTATO_IDENTITY: JeevifyIdentity = {
  id: 'JVF-8X42-POTATO',
  humanName: 'Arjun Potato',
  objectType: 'Potato',
  normalizedObjectType: 'Potato',
  age: 2,
  imageUrl: HIGH_QUALITY_OBJECT_IMAGES.potato,
  origin: 'High Ranges Farm, Kerala',
  occupation: 'Culinary Operations Specialist',
  personality: 'Adaptable, Grounded, Versatile',
  oneLinerBio: 'Turning simple ingredients into extraordinary moments. Currently exploring opportunities in culinary and hospitality.',
  status: 'Open to Work',
  socialStatus: 'Household Celebrity',
  evolutionLevel: 2,
  skills: ['Cooking', 'Teamwork', 'Adaptability', 'Food Safety', 'Time Management'],
  strengths: ['Fits into any dish or conversation', 'Resilient under pressure', 'Grounded perspective'],
  weaknesses: ['Gets chipped easily', 'Sprouts when bored', 'Over-relies on butter'],
  quirks: ['Refuses to leave the vegetable basket without sunglasses', 'Spends weekends dreaming of being French Fries'],
  
  personalityDNA: [
    { label: 'Starch Density', score: 95, color: '#f59e0b' },
    { label: 'Adaptability', score: 98, color: '#10b981' },
    { label: 'Deep Fry Potential', score: 94, color: '#ef4444' },
    { label: 'Groundedness', score: 96, color: '#8b5cf6' },
    { label: 'Comfort Delivery', score: 92, color: '#06b6d4' },
    { label: 'Curry Synergy', score: 90, color: '#ec4899' }
  ],
  
  lifeTimeline: [
    { year: '2022', event: 'Harvested in High Ranges farm with big dreams.', category: 'origin' },
    { year: '2023', event: 'First experienced being chosen for Sunday Biryani.', category: 'milestone' },
    { year: '2024', event: 'Enrolled in JEEVIFY Culinary Institute for Advanced Frying.', category: 'achievement' },
    { year: '2025', event: 'Avoided peeling during emergency dinner prep.', category: 'tragedy' },
    { year: '2026', event: 'Promoted to Lead Culinary Operations Specialist.', category: 'milestone' }
  ],

  dayInTheLife: [
    { time: '07:00 AM', event: 'Chilling in the wicker basket with Onion Olivia.', status: 'Resting', emoji: '🧺' },
    { time: '10:30 AM', event: 'Examined by chef for lunch menu selection.', status: 'Auditioning', emoji: '👀' },
    { time: '01:00 PM', event: 'Heroically saved mid-day hunger crisis.', status: 'On Duty', emoji: '🥔' },
    { time: '05:00 PM', event: 'Gossiping about garlic cloves near pantry window.', status: 'Socializing', emoji: '🗣️' },
    { time: '09:00 PM', event: 'Watching cooking shows on TV from kitchen counter.', status: 'Learning', emoji: '📺' },
    { time: '11:45 PM', event: 'Putting on sunglasses for overnight basket sleep.', status: 'Sleeping', emoji: '🕶️' }
  ],

  jeevifyMoments: {
    mostEmbarrassing: 'Rolled out of the vegetable bag into the living room during guest visit.',
    biggestAchievement: 'Surviving 3 weeks without sprouting a single extra eye.',
    secretTalent: 'Can turn any dull soup into a thick luxurious gravy.',
    biggestFear: 'Being left in a boiling pot without salt.',
    mostUsedPhrase: 'I fit everywhere.',
    worstHabit: 'Rolling into hard-to-reach refrigerator corners.',
    secretDream: 'To be served at a Michelin-star restaurant in Paris.',
    redFlag: 'Gets dramatic if kept in a plastic bag.',
    greenFlag: 'Brings out the best in every vegetable around it.'
  },

  secretConfession: 'I secretly prefer being smashed into mashed potatoes over being cut into thin french fries.',

  lifeStats: {
    personalityScore: 94,
    careerScore: 89,
    socialScore: 78,
    romanceStatus: 'Looking for a Dip'
  },

  matrimony: {
    matches: [
      {
        id: 'mat-001',
        name: 'Tomato T. Thomas',
        objectType: 'Tomato',
        age: 1,
        location: 'Kottayam, Kerala',
        imageUrl: HIGH_QUALITY_OBJECT_IMAGES.tomato,
        compatibilityScore: 98,
        tags: ['Passionate', 'Juicy', 'Culinary'],
        quote: 'You bring the texture. I bring the flavor.',
        about: 'Fresh, vibrant tomato who loves making spicy curries and late-night snacks.',
        familyBackground: 'Comes from a respected red vegetable lineage. Father: Organic Vine Tomato.'
      },
      {
        id: 'mat-002',
        name: 'Onion Olivia',
        objectType: 'Onion',
        age: 2,
        location: 'Kochi, Kerala',
        imageUrl: HIGH_QUALITY_OBJECT_IMAGES.onion,
        compatibilityScore: 95,
        tags: ['Deep', 'Multi-layered', 'Emotional'],
        quote: 'I make people cry, but with you, they are tears of joy.',
        about: 'A complex, multi-layered personality who thrives in hot oil and emotional conversations.',
        familyBackground: 'Daughter of White Onion Senior. Respected in every kitchen in South Asia.'
      },
      {
        id: 'mat-003',
        name: 'Charlotte Chair',
        objectType: 'Chair',
        age: 5,
        location: 'Kochi, Kerala',
        imageUrl: HIGH_QUALITY_OBJECT_IMAGES.chair,
        compatibilityScore: 84,
        tags: ['Supportive', 'Patient', 'Calm'],
        quote: 'She’s always there, even when you’re tired.',
        about: 'Elegant pink velvet armchair who provides comfort to tired potatoes everywhere.',
        familyBackground: 'Crafted in a European atelier. Mother: Teakwood Sofa.'
      }
    ]
  },

  linkedIn: {
    handle: 'arjun-potato-jvf8x42',
    location: 'Kerala, India',
    experienceYears: 2,
    openToWork: true,
    aboutQuote: 'Turning simple ingredients into extraordinary moments. Currently exploring opportunities in the culinary and hospitality industry.',
    skills: [
      { name: 'Cooking', percentage: 95 },
      { name: 'Teamwork', percentage: 90 },
      { name: 'Adaptability', percentage: 98 },
      { name: 'Food Safety', percentage: 88 },
      { name: 'Time Management', percentage: 85 }
    ],
    experience: [
      {
        id: 'exp-1',
        role: 'Kitchen Operations Associate',
        company: "McDonald's",
        period: '2024 - 2026',
        location: 'Kerala, India',
        description: 'Successfully transformed from raw farm produce to gold-standard crispy french fries under intense heat.',
        logoType: 'mcdonalds'
      },
      {
        id: 'exp-2',
        role: 'Literary Potato',
        company: 'Shakespeare & Co.',
        period: '2022 - 2024',
        location: 'Kerala, India',
        description: 'Served as an inspiring desk prop while famous plays were drafted. Maintained emotional composure.',
        logoType: 'book'
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.Tech in Culinary Engineering',
        institution: 'JEEVIFY Culinary Institute',
        period: '2020 - 2024',
        location: 'Kerala, India'
      }
    ],
    posts: [
      {
        id: 'post-1',
        authorName: 'Arjun Potato',
        authorTitle: 'Culinary Operations Specialist',
        authorImage: HIGH_QUALITY_OBJECT_IMAGES.potato,
        timeAgo: '2h • Edited',
        content: 'Another day, another delicious opportunity. ☀️ It’s not just about being in the kitchen — it’s about being part of something bigger.\n\nGrateful for the journey so far. Still a lot to grow, learn and cook! 🥔✨\n\n#CulinaryLife #FoodIsLife #PotatoDiaries #Jeevify',
        imageUrl: HIGH_QUALITY_OBJECT_IMAGES.potato,
        likes: 348,
        comments: 24,
        shares: 12
      }
    ],
    peopleYouMayKnow: [
      { id: 'p1', name: 'Tomato T. Thomas', role: 'Food Enthusiast', connectionDegree: '3rd+', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.tomato },
      { id: 'p2', name: 'Onion Olivia', role: 'Content Creator', connectionDegree: '3rd+', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.onion },
      { id: 'p3', name: 'Cucumber Carl', role: 'Product Manager', connectionDegree: '3rd+', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.cucumber },
      { id: 'p4', name: 'Chilli Chris', role: 'Spice Specialist', connectionDegree: '3rd+', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.chilli }
    ],
    similarProfiles: [
      { id: 's1', name: 'Mango Maya', role: 'Marketing Specialist', connectionDegree: '2nd', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.mango },
      { id: 's2', name: 'Carrot Charlie', role: 'Graphic Designer', connectionDegree: '2nd', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.carrot },
      { id: 's3', name: 'Broccoli Brandon', role: 'Data Analyst', connectionDegree: '3rd', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.broccoli },
      { id: 's4', name: 'Bell Pepper Bella', role: 'Product Designer', connectionDegree: '3rd', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.bellpepper }
    ]
  },

  astro: {
    element: 'Earth & Starch',
    planet: 'Saturn (Shani)',
    cosmicTrait: 'Chronically Grounded',
    luckyEnvironment: 'Cool Dark Pantry with Sun Glimpses',
    greatestStrength: 'Thrives in any temperature',
    cosmicWeakness: 'Procrastinates sprouting',
    destiny: 'To bring comfort to hungry souls after midnight.',
    todayReading: 'Not the best time for new beginnings, Arjun. You are under the influence of Kandaka Shani. It may bring delays, mental stress and unexpected kitchen heat. Be patient and avoid risky boiling water for now.',
    transit: 'Kandaka Shani (Current Transit)'
  }
};

// Preset Identity 2: Pennu Prakash (Pen)
export const PEN_IDENTITY: JeevifyIdentity = {
  id: 'JVF-7X29-PEN',
  humanName: 'Pennu Prakash',
  objectType: 'Ballpoint Pen',
  normalizedObjectType: 'Pen',
  age: 2,
  imageUrl: HIGH_QUALITY_OBJECT_IMAGES.pen,
  origin: 'Trivandrum, Kerala',
  occupation: 'Senior Ink & Signature Executive',
  personality: 'Reliable under pressure, Overworked',
  oneLinerBio: 'Reliable under pressure, except when my ink runs out 5 minutes before the final exam submission.',
  status: 'Currently Signing Documents',
  socialStatus: 'Office Legend',
  evolutionLevel: 3,
  skills: ['Document Signing', 'Cheque Validation', 'Crossword Solving', 'Leaking in Pockets'],
  strengths: ['Extremely sharp mind', 'Writes history', 'Flows effortlessly'],
  weaknesses: ['Runs out of ink at critical moments', 'Stolen easily by colleagues'],
  quirks: ['Clicks nervously during stressful board meetings'],
  
  personalityDNA: [
    { label: 'Signature Precision', score: 99, color: '#3b82f6' },
    { label: 'Ink Flow Control', score: 88, color: '#06b6d4' },
    { label: 'Pocket Safety Risk', score: 65, color: '#ef4444' },
    { label: 'Cheque Validation', score: 96, color: '#10b981' },
    { label: 'Deadline Resistance', score: 90, color: '#8b5cf6' },
    { label: 'Cap Retention', score: 45, color: '#f59e0b' }
  ],

  lifeTimeline: [
    { year: '2022', event: 'Manufactured with high-density blue ink reserves.', category: 'origin' },
    { year: '2023', event: 'Signed first bank cheque worth Rs. 50,000 without blotches.', category: 'achievement' },
    { year: '2024', event: 'Survived being borrowed for "one quick minute" by boss.', category: 'milestone' },
    { year: '2025', event: 'Accidentally drew stick figures during 3-hour Zoom meeting.', category: 'tragedy' },
    { year: '2026', event: 'Promoted to Senior Ink & Signature Executive.', category: 'milestone' }
  ],

  dayInTheLife: [
    { time: '08:30 AM', event: 'Checked pocket temperature before commuting.', status: 'Preparing', emoji: '👔' },
    { time: '10:00 AM', event: 'Signed 14 official letters and 2 invoices.', status: 'Active', emoji: '🖊️' },
    { time: '01:30 PM', event: 'Left capless on desk near hot coffee mug.', status: 'Dehydrating', emoji: '☕' },
    { time: '03:45 PM', event: 'Heroically solved tough 7-letter crossword clue.', status: 'Brainwork', emoji: '🧩' },
    { time: '06:00 PM', event: 'Clicking cap nervously to pace office gossip.', status: 'Stressed', emoji: '⚙️' },
    { time: '09:00 PM', event: 'Resting comfortably in leather desk organizer.', status: 'Sleeping', emoji: '🌙' }
  ],

  jeevifyMoments: {
    mostEmbarrassing: 'Leaking blue blob of ink into owner’s white formal shirt pocket.',
    biggestAchievement: 'Signing over 1,400 loan agreements without skipping a line.',
    secretTalent: 'Can draw perfect circles when bored during conference calls.',
    biggestFear: 'Being chewed on by someone thinking about math problems.',
    mostUsedPhrase: 'Put my cap back on!',
    worstHabit: 'Rolling off the edge of smooth glass tables.',
    secretDream: 'To write a bestselling romance novel in cursive handwriting.',
    redFlag: 'Disappears when someone asks "can I borrow a pen?".',
    greenFlag: 'Never bloats or smears on official paper.'
  },

  secretConfession: 'I secretly enjoy clicking my cap 40 times a minute to annoy the person sitting next to me.',

  lifeStats: {
    personalityScore: 91,
    careerScore: 96,
    socialScore: 65,
    romanceStatus: 'Looking for a Diary'
  },

  matrimony: {
    matches: [
      {
        id: 'mat-101',
        name: 'Diana Diary',
        objectType: 'Notebook',
        age: 2,
        location: 'Kozhikode, Kerala',
        imageUrl: HIGH_QUALITY_OBJECT_IMAGES.diary,
        compatibilityScore: 97,
        tags: ['Thoughtful', 'Loyal', 'Creative'],
        quote: 'You write. She listens.',
        about: 'Elegant hardcover diary with 365 blank pages eager to hold your deepest thoughts.',
        familyBackground: 'From a noble line of recycled eco-paper notebooks. Mother: Leather Journal.'
      },
      {
        id: 'mat-102',
        name: 'Charlotte Chair',
        objectType: 'Chair',
        age: 5,
        location: 'Kochi, Kerala',
        imageUrl: HIGH_QUALITY_OBJECT_IMAGES.chair,
        compatibilityScore: 92,
        tags: ['Supportive', 'Patient', 'Calm'],
        quote: 'She’s always there, even when you’re tired.',
        about: 'Soft velvet armchair who loves supporting pens during late night writing sessions.',
        familyBackground: 'Royal furniture heritage.'
      },
      {
        id: 'mat-103',
        name: 'Pencil Paul',
        objectType: 'Writing Instrument',
        age: 1,
        location: 'Thrissur, Kerala',
        imageUrl: HIGH_QUALITY_OBJECT_IMAGES.pencil,
        compatibilityScore: 88,
        tags: ['Energetic', 'Optimistic', 'Focused'],
        quote: 'Sharp mind, soft heart.',
        about: '2B Graphite artist pencil who loves sketching dreams and making quick edits.',
        familyBackground: 'Cedartree family from High Ranges.'
      }
    ]
  },

  linkedIn: {
    handle: 'pennu-prakash-jvf7x29',
    location: 'Trivandrum, Kerala',
    experienceYears: 4,
    openToWork: false,
    aboutQuote: 'Has signed over 1,400 loan documents and drawn 8,000 stick figures during boring Zoom calls.',
    skills: [
      { name: 'Document Signing', percentage: 99 },
      { name: 'Cheque Validation', percentage: 94 },
      { name: 'Crossword Solving', percentage: 88 },
      { name: 'Pocket Leaking', percentage: 75 }
    ],
    experience: [
      {
        id: 'exp-pen1',
        role: 'Chief Signature Officer',
        company: 'State Bank of India (Desk 3)',
        period: '2023 - Present',
        location: 'Trivandrum, India',
        description: 'Tethered by a spiral wire to desk 3. Handled high-stakes cheque signing with 0% nib wobble.',
        logoType: 'office'
      }
    ],
    education: [
      {
        id: 'edu-pen1',
        degree: 'Master of Fine Ink & Calligraphy',
        institution: 'National Stationery Academy',
        period: '2021 - 2023',
        location: 'Kochi, Kerala'
      }
    ],
    posts: [
      {
        id: 'post-pen1',
        authorName: 'Pennu Prakash',
        authorTitle: 'Senior Ink & Signature Executive',
        authorImage: HIGH_QUALITY_OBJECT_IMAGES.pen,
        timeAgo: '4h',
        content: 'Reminder to all humans: when you borrow me for "one quick sign", PLEASE PUT MY CAP BACK ON. Oxygen is my enemy. Thank you. 🖊️ #StationeryLife #InkRights #Jeevify',
        imageUrl: HIGH_QUALITY_OBJECT_IMAGES.pen,
        likes: 512,
        comments: 48,
        shares: 31
      }
    ],
    peopleYouMayKnow: [
      { id: 'pk1', name: 'Diana Diary', role: 'Content Curator', connectionDegree: '1st', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.diary },
      { id: 'pk2', name: 'Stapler Suresh', role: 'Binding Lead', connectionDegree: '2nd', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.stapler }
    ],
    similarProfiles: [
      { id: 'sp1', name: 'Pencil Paul', role: 'Drafting Specialist', connectionDegree: '1st', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.pencil },
      { id: 'sp2', name: 'Erica Eraser', role: 'Error Correction Specialist', connectionDegree: '2nd', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.eraser }
    ]
  },

  astro: {
    element: 'Ink & Metal',
    planet: 'Mercury (Budha)',
    cosmicTrait: 'Expressive Communication',
    luckyEnvironment: 'Front shirt pocket or leather journal',
    greatestStrength: 'Precision under deadline pressure',
    cosmicWeakness: 'Spontaneous ink leaks',
    destiny: 'To sign the historic treaty of your owner’s first home purchase.',
    todayReading: 'Mercury aligns with your Nib today, Pennu. Great day for finalizing contracts, writing poetry, or crosswords. Watch out for colleagues who pretend to borrow you!',
    transit: 'Mercury Direct in 3rd House'
  }
};

export const PRESET_IDENTITIES: Record<string, JeevifyIdentity> = {
  potato: POTATO_IDENTITY,
  pen: PEN_IDENTITY
};

