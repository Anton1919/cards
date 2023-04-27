import { instance } from '../../../common/constants/instance';
import { RequestProfileType } from '../../auth/api/authAPI';

export const profileAPI = {
  getProfileData() {
    return instance.post<RequestProfileType>('auth/me').then((res) => res.data);
  },
  changeProfile(name: string, avatar: string) {
    return instance.put('auth/me', { name, avatar });
  },
};
