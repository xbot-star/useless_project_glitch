export interface MatrimonyMatch {
  id: string;
  name: string;
  objectType: string;
  age: number;
  location: string;
  imageUrl: string;
  compatibilityScore: number;
  tags: string[];
  quote: string;
  about: string;
  familyBackground: string;
}

export interface LinkedInExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  logoType: 'mcdonalds' | 'book' | 'tech' | 'office';
}

export interface LinkedInEducation {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export interface LinkedInPost {
  id: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
  timeAgo: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface ConnectionSuggestion {
  id: string;
  name: string;
  role: string;
  connectionDegree: string;
  imageUrl: string;
}

export interface PersonalityDNADimension {
  label: string;
  score: number;
  color: string;
}

export interface LifeTimelineEvent {
  year: string;
  event: string;
  category?: 'milestone' | 'tragedy' | 'achievement' | 'origin';
}

export interface DayInTheLifeEvent {
  time: string;
  event: string;
  status: string;
  emoji?: string;
}

export interface JeevifyMoments {
  mostEmbarrassing: string;
  biggestAchievement: string;
  secretTalent: string;
  biggestFear: string;
  mostUsedPhrase: string;
  worstHabit: string;
  secretDream: string;
  redFlag: string;
  greenFlag: string;
}

export interface JeevifyIdentity {
  id: string; // Formatted as JVF-XXXX-TYPE e.g. JVF-7X29-PEN
  humanName: string;
  objectType: string;
  normalizedObjectType: string;
  inputContext?: string; // e.g. "broken" from "my broken charger"
  age: number;
  imageUrl: string;
  origin: string;
  occupation: string;
  personality: string;
  oneLinerBio: string;
  status: string;
  socialStatus: string; // e.g. "Emergency Hero", "Drawer Resident"
  relationshipStatus?: string; // e.g. "Emotionally unavailable", "It's not you, it's the battery"
  evolutionLevel: number;
  
  // Real AI Intelligence & Discovery Attributes
  physicalDescription?: string;
  firstImpression?: string;
  funnyObservation?: string;
  currently?: string; // e.g. "Being blamed for someone's slow charging."
  objectQuote?: string; // e.g. "I only become important when you're almost dead."
  secretLife?: string; // e.g. "Spends most of its free time hiding between sofa cushions."
  objectAchievement?: string; // e.g. "Saved 2,341 battery emergencies."
  greenFlag?: string;
  redFlag?: string;
  objectVibe?: Array<{ label: string; score: number; color: string }>;

  // Life breakdown
  skills: string[];
  strengths: string[];
  weaknesses: string[];
  quirks: string[];

  // WOW Features Content
  personalityDNA: PersonalityDNADimension[];
  lifeTimeline: LifeTimelineEvent[];
  dayInTheLife: DayInTheLifeEvent[];
  jeevifyMoments: JeevifyMoments;
  secretConfession: string;
  
  // Life stats
  lifeStats: {
    personalityScore: number;
    careerScore: number;
    socialScore: number;
    romanceStatus: string;
  };

  // Three Worlds Data
  matrimony: {
    matches: MatrimonyMatch[];
  };

  linkedIn: {
    handle: string;
    location: string;
    experienceYears: number;
    openToWork: boolean;
    aboutQuote: string;
    skills: Array<{ name: string; percentage: number }>;
    experience: LinkedInExperience[];
    education: LinkedInEducation[];
    posts: LinkedInPost[];
    peopleYouMayKnow: ConnectionSuggestion[];
    similarProfiles: ConnectionSuggestion[];
  };

  astro: {
    element: string;
    planet: string;
    cosmicTrait: string;
    luckyEnvironment: string;
    greatestStrength: string;
    cosmicWeakness: string;
    destiny: string;
    todayReading: string;
    transit: string;
  };

  // Master Rebuild Unified Life Attributes
  fictionalHome?: string; // e.g. "The right side of your study table"
  memoriesList?: Array<{ title: string; story: string; year: string; icon: string }>;
  secret?: string; // "One thing it never told you"
  dream?: string; // "Its Dream"
  familyMembers?: Array<{ name: string; relation: string; icon: string; personality: string }>;
  familyDrama?: string;
  currentPartner?: MatrimonyMatch;
  isMarried?: boolean;
  weddingDetails?: {
    date: string;
    venue: string;
    bestMan: string;
    officiant: string;
    gift: string;
    quote: string;
  };

  // World of Things Character Ecosystem
  friends?: Array<{ name: string; role: string; icon: string }>;
  enemies?: Array<{ name: string; role: string; icon: string }>;
  future10Years?: string;
  thingCourtCase?: {
    title: string;
    crime: string;
    prosecutor: string;
    defense: string;
    evidence: string;
    witness: string;
    defaultVerdict: string;
  };
  thingNewsItems?: Array<{
    id: string;
    headline: string;
    date: string;
    category: string;
    content: string;
    imageUrl?: string;
  }>;
}

export type ViewMode = 'landing' | 'my-world' | 'my-identity' | 'matrimony' | 'linkedin' | 'astro' | 'porutham' | 'thing-court' | 'thing-news' | 'family';


