export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
  social?: "origin" | "kakao" | "naver"; // 카카오,네이버는 1,풀빛마실은 origin
  // image?:string; //프로필이미지 default
}
export interface UserRegisterForm extends Omit<User, "token"> {
  password: string;
  confirmPassword?: string;
}
export interface UserLoginForm extends Omit<User, "token"> {
  password: string;
}

export interface PasswordChangeForm {
  currentPassword: string;
  changePassword: string;
  confirmPassword: string;
}
