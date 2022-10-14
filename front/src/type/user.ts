export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
  // image?:string; //프로필이미지 default
}
export interface UserRegisterForm extends Omit<User, "token"> {
  password: string;
  confirmPassword?: string;
}
export interface UserLoginForm extends Omit<User, "token"> {
  password: string;
}
