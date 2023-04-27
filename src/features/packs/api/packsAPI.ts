import { instance } from '../../../common/constants/instance';

export const packsAPI = {
  getUsersPacks(page: number, pageCount: number) {
    return instance.get<ResponsePackType>('cards/pack', {
      params: {
        page: page,
        pageCount: pageCount,
      },
    });
  },
};

export type PackType = {
  cardsCount: number;
  created: string;
  grade: number;
  more_id: string;
  name: string;
  path: string;
  private: boolean;
  deckCover: string;
  shots: number;
  type: string;
  updated: string;
  user_id: string;
  user_name: string;
  _v: number;
  _id: string;
};

type ResponsePackType = {
  cardPacks: PackType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
  token: string;
  tokenDeathTime: string;
};
