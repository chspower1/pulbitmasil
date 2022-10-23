export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
  reviews?: UserReview[]; // 작성한 review 배열
  greenCrews?: UserGreenCrew[]; // 참여한 greenCrew  배열
  social: "origin" | "kakao" | "naver";
}
export interface UserReview {
  reviewId?: number;
  title: string;
  description: string;
  createAt: Date;
}
export interface UserGreenCrew {
  crewId?: number;
  title: string;
  course: string;
  startAt: Date;
  area: string;
  inProgress: number;
}
export interface UserRegisterForm extends Omit<User, "token"> {
  password: string;
  confirmPassword?: string;
}
export interface UserLoginForm extends Omit<User, "token"> {
  password: string;
}

export interface PasswordForm {
  password: string;
  newPassword: string;
  confirmPassword?: string;
}
export interface NameChangeForm {
  currentName?: string;
  newName: string;
}
