import { IsOptional, IsString } from 'class-validator';

export class LoginToronetDTO {
  @IsString()
  address: string;

  @IsString()
  password: string;
}

export class MintriseRegisterUserToronetDTO {
  @IsString()
  address: string;

  @IsString()
  password: string;

  @IsString()
  userName: string;

  @IsOptional()
  profileImage?: string;

  @IsOptional()
  referrerId?: string;
}

export class MintriseRegisterProjectToronetDTO {
  @IsString()
  address: string;

  @IsString()
  password: string;

  @IsString()
  userName: string;

  @IsOptional()
  profileImage?: string;

  @IsOptional()
  companyName: string;

  @IsOptional()
  companyWebsite: string;

  @IsOptional()
  country: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  referrerId?: string;
}
