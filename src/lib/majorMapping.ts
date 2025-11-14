// CIP (Classification of Instructional Programs) code to major name mapping
// These codes represent different academic programs offered by universities

export const CIP_CODE_MAPPING: Record<string, string> = {
  '01': 'Agriculture',
  '03': 'Natural Resources',
  '04': 'Architecture',
  '05': 'Area, Ethnic & Cultural Studies',
  '09': 'Communication & Journalism',
  '10': 'Communications Technologies',
  '11': 'Computer & Information Sciences',
  '12': 'Personal & Culinary Services',
  '13': 'Education',
  '14': 'Engineering',
  '15': 'Engineering Technologies',
  '16': 'Foreign Languages',
  '19': 'Family & Consumer Sciences',
  '22': 'Legal Professions',
  '23': 'English Language & Literature',
  '24': 'Liberal Arts & Sciences',
  '25': 'Library Science',
  '26': 'Biological & Biomedical Sciences',
  '27': 'Mathematics & Statistics',
  '29': 'Military Technologies',
  '30': 'Multi/Interdisciplinary Studies',
  '31': 'Parks, Recreation & Fitness',
  '38': 'Philosophy & Religious Studies',
  '39': 'Theology & Religious Vocations',
  '40': 'Physical Sciences',
  '41': 'Science Technologies',
  '42': 'Psychology',
  '43': 'Homeland Security & Law Enforcement',
  '44': 'Public Administration',
  '45': 'Social Sciences',
  '46': 'Construction Trades',
  '47': 'Mechanic & Repair Technologies',
  '48': 'Precision Production',
  '49': 'Transportation & Materials Moving',
  '50': 'Visual & Performing Arts',
  '51': 'Health Professions',
  '52': 'Business, Management & Marketing',
  '54': 'History',
};

// Get all major names as an array
export const getAllMajors = (): string[] => {
  return Object.values(CIP_CODE_MAPPING).sort();
};

// Get CIP code for a major name
export const getCIPCode = (majorName: string): string | undefined => {
  const entry = Object.entries(CIP_CODE_MAPPING).find(
    ([_, name]) => name.toLowerCase() === majorName.toLowerCase()
  );
  return entry?.[0];
};

// Check if a university offers a specific major (has > 0% of degrees in that field)
export const universityOffersMajor = (
  university: any,
  cipCode: string
): boolean => {
  const fieldName = `pcip${cipCode}`;
  const value = university[fieldName];
  return value !== null && value !== undefined && value > 0;
};
