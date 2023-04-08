export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAgreement: boolean;
}

export interface EditProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export interface CurrentUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  role: string;
}

export interface CurrentUserResponse extends CurrentUser {}

export interface Profile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  role: string;
}

export interface ProfileResponse extends Profile {}

export interface ProfileResolverData {
  profileComponentData: ProfileResponse;
}
