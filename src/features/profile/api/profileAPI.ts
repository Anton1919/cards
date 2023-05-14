import { instance } from 'common/constants/instance';
import { RequestProfileType } from '../../auth/api/authAPI';

export const profileAPI = {
  getProfileData() {
    return instance.post<RequestProfileType>('auth/me').then((res) => res.data);
  },
  changeProfile(name: string, avatar: string) {
    return instance.put<ResponseChangeProfileType>('auth/me', { name, avatar });
  },
};

type ResponseChangeProfileType = {
  updatedUser: ProfileType
  token: string
  tokenDeathTime: number
}

type ProfileType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
}