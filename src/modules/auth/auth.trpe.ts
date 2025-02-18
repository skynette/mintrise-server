export interface LoginToronet {
  address: string;
  password: string;
}
export interface MintriseRegisterUserToronet {
  address: string;
  password: string;
  userName: string;
  profileImage?: string;
  referrerId?: string;
}
export interface MintriseRegisterProjectToronet {
  address: string;
  password: string;
  userName: string;
  profileImage?: string;
  companyName: string;
  companyWebsite: string;
  country: string;
  phoneNumber: string;
  referrerId?: string;
}
