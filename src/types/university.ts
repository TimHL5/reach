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
  // PCIP columns - percentage of degrees awarded in each program area
  pcip01: number | null; // Agriculture, Agriculture Operations, And Related Sciences
  pcip03: number | null; // Natural Resources And Conservation
  pcip04: number | null; // Architecture And Related Services
  pcip05: number | null; // Area, Ethnic, Cultural, Gender, And Group Studies
  pcip09: number | null; // Communication, Journalism, And Related Programs
  pcip10: number | null; // Communications Technologies/Technicians And Support Services
  pcip11: number | null; // Computer And Information Sciences And Support Services
  pcip12: number | null; // Personal And Culinary Services
  pcip13: number | null; // Education
  pcip14: number | null; // Engineering
  pcip15: number | null; // Engineering Technologies And Engineering-Related Fields
  pcip16: number | null; // Foreign Languages, Literatures, And Linguistics
  pcip19: number | null; // Family And Consumer Sciences/Human Sciences
  pcip22: number | null; // Law And Legal Studies
  pcip23: number | null; // English Language And Literature/Letters
  pcip24: number | null; // Liberal Arts And Sciences, General Studies And Humanities
  pcip25: number | null; // Library Science
  pcip26: number | null; // Biological And Biomedical Sciences
  pcip27: number | null; // Mathematics And Statistics
  pcip29: number | null; // Military Sciences And Technologies
  pcip30: number | null; // Multidisciplinary Studies
  pcip31: number | null; // Parks, Recreation, Leisure, And Fitness Studies
  pcip38: number | null; // Philosophy And Religious Studies
  pcip39: number | null; // Theology And Religious Vocations
  pcip40: number | null; // Physical Sciences
  pcip41: number | null; // Science Technologies/Technicians
  pcip42: number | null; // Psychology
  pcip43: number | null; // Homeland Security, Law Enforcement, And Firefighting
  pcip44: number | null; // Public Administration And Social Service Professions
  pcip45: number | null; // Social Sciences
  pcip46: number | null; // Construction Trades
  pcip47: number | null; // Mechanic And Repair Technologies/Technicians
  pcip48: number | null; // Precision Production
  pcip49: number | null; // Transportation And Materials Moving
  pcip50: number | null; // Visual And Performing Arts
  pcip51: number | null; // Health Professions And Related Programs
  pcip52: number | null; // Business, Management, Marketing, And Related Support Services
  pcip54: number | null; // History
  created_at: string;
  updated_at: string;
};

export type FilterState = {
  country: string;
  state: string;
  maxTuition: number;
  minTotalCost: number;
  maxTotalCost: number;
  minAcceptance: number;
  maxAcceptance: number;
  minEnrollment: number;
  maxEnrollment: number;
  type: string;
};
