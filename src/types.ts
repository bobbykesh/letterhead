export interface LetterheadData {
  fullName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  logo: string | null;
  content: string;
  primaryColor: string;
}

export interface TemplateProps {
  data: LetterheadData;
}
