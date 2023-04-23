import { instance } from '../../../common/constants/instance';
import axios from 'axios';

type RegisterType = {
  email: string;
  password: string;
};

export type LoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const authAPI = {
  me() {
    return instance.post('auth/me');
  },

  registration(data: RegisterType) {
    return instance.post('auth/register', data);
  },

  login(data: LoginType) {
    return instance.post('auth/login', data);
  },

  logout() {
    return instance.delete('auth/me', {});
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
    return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', forgot);
  },
};
