export type University = {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string | null;
  country: string;
  latitude: number | null;
  longitude: number | null;
  website: string | null;
  logo_url: string | null;
  image_url: string | null;
  type: string | null;
  total_enrollment: number | null;
  undergraduate_enrollment: number | null;
  acceptance_rate: number | null;
  average_sat: number | null;
  average_act: number | null;
  application_deadline: string | null;
  application_fee: number | null;
  graduation_rate: number | null;
  retention_rate: number | null;
  student_faculty_ratio: number | null;
  tuition_in_state: number | null;
  tuition_out_state: number | null;
  room_and_board: number | null;
  books_supplies: number | null;
  avg_financial_aid: number | null;
  percent_receiving_aid: number | null;
  avg_net_price: number | null;
  us_news_rank: number | null;
  qs_world_rank: number | null;
  times_rank: number | null;
  forbes_rank: number | null;
  common_app: boolean | null;
  coalition_app: boolean | null;
  requires_essay: boolean | null;
  // PCIP fields - Percentage of degrees awarded in each major
  pcip01: number | null; // Agriculture
  pcip03: number | null; // Natural Resources
  pcip04: number | null; // Architecture
  pcip05: number | null; // Area, Ethnic & Cultural Studies
  pcip09: number | null; // Communication & Journalism
  pcip10: number | null; // Communications Technologies
  pcip11: number | null; // Computer & Information Sciences
  pcip12: number | null; // Personal & Culinary Services
  pcip13: number | null; // Education
  pcip14: number | null; // Engineering
  pcip15: number | null; // Engineering Technologies
  pcip16: number | null; // Foreign Languages
  pcip19: number | null; // Family & Consumer Sciences
  pcip22: number | null; // Legal Professions
  pcip23: number | null; // English Language & Literature
  pcip24: number | null; // Liberal Arts & Sciences
  pcip25: number | null; // Library Science
  pcip26: number | null; // Biological & Biomedical Sciences
  pcip27: number | null; // Mathematics & Statistics
  pcip29: number | null; // Military Technologies
  pcip30: number | null; // Multi/Interdisciplinary Studies
  pcip31: number | null; // Parks, Recreation & Fitness
  pcip38: number | null; // Philosophy & Religious Studies
  pcip39: number | null; // Theology & Religious Vocations
  pcip40: number | null; // Physical Sciences
  pcip41: number | null; // Science Technologies
  pcip42: number | null; // Psychology
  pcip43: number | null; // Homeland Security & Law Enforcement
  pcip44: number | null; // Public Administration
  pcip45: number | null; // Social Sciences
  pcip46: number | null; // Construction Trades
  pcip47: number | null; // Mechanic & Repair Technologies
  pcip48: number | null; // Precision Production
  pcip49: number | null; // Transportation & Materials Moving
  pcip50: number | null; // Visual & Performing Arts
  pcip51: number | null; // Health Professions
  pcip52: number | null; // Business, Management & Marketing
  pcip54: number | null; // History
  created_at: string;
  updated_at: string;
};

export type FilterState = {
  country: string;
  state: string;
  maxTuition: number;
  minAcceptance: number;
  maxAcceptance: number;
  minEnrollment: number;
  maxEnrollment: number;
  type: string;
  major: string;
};
