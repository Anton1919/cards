import { instance } from '../../../common/constants/instance';

export const authAPI = {
  me() {
    return instance.post('auth/me');
  },

  registration(data: any) {
    return instance.post('auth/register', data);
  },

  login(data: any) {
    return instance.post('auth/login', data);
  },

  logout() {
    return instance.delete('auth/me', {});
  },

  newPassword(password: string, resetPassword: string) {
    return instance.post('auth/set-new-password', { password, resetPassword });
  },

  forgotPassword(email: string) {
    const forgot = {
      email,
      from: 'test-front-admin <@>',
      message:
        '<div style="background-color: lime; padding: 15px">\n' +
        'password recovery link: \n' +
        "<a href='https://Anton1919.github.io/cards/#/set-new-password/$token$'>\n" +
        'link</a>\n' +
        '</div>',
    };
    return instance.post('auth/forgot', forgot);
  },
};
