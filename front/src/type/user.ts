export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
<<<<<<< HEAD
  social?: string;
  reviews?: number[]; // 작성한 review Id 배열
  greenCrews?: number[]; // 참여한 greenCrew Id 배열
=======
  social?: "origin" | "kakao" | "naver"; // 카카오,네이버는 1,풀빛마실은 origin
>>>>>>> fbfbaf5e6393fa8aa1730c29090a64252323cbce
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
