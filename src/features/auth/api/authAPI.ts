import { instance } from '../../../common/constants/instance';
import axios from 'axios';

export const authAPI = {
  me() {
    return instance.post<RequestProfileType>('auth/me');
  },

  registration(data: RegisterType) {
    return instance.post<RequestRegisterType>('auth/register', data);
  },

  login(data: LoginType) {
    return instance.post<RequestProfileType>('auth/login', data);
  },

  logout() {
    return instance.delete('auth/me');
  },

  newPassword(password: string, resetPasswordToken: string) {
    return instance.post('auth/set-new-password', { password, resetPasswordToken });
  },

  forgotPassword(email: string) {
    const forgot = {
      email,
      from: 'test-front-admin <@>',
      message: `<div style="background-color: lime; padding: 15px">password recovery link: 
                <a href='https://Anton1919.github.io/cards/#/set-new-password/$token$'>link</a></div>`,
    };
    return axios.post<ForgotResponseType>('https://neko-back.herokuapp.com/2.0/auth/forgot', forgot);
  },
};

type RegisterType = Omit<LoginType, 'rememberMe'>;

export type LoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RequestProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
  avatar: string;
};

type addUserType = Omit<RequestProfileType, 'tokenDeathTime' | 'avatar' | 'token'>;

type RequestRegisterType = {
  addedUser: addUserType;
};

type ForgotResponseType = {
  info: string;
  success: boolean;
  answer: boolean;
  html: boolean;
};
