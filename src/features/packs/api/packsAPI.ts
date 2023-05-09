import {instance} from 'common/constants/instance';

export const packsAPI = {
    getUsersPacks(page: number, pageCount: number, min: number, max: number, sortPacks: string, packName: string, userId?: string | undefined) {
        return instance.get<ResponsePackType>('cards/pack', {
            params: {
                page,
                pageCount,
                min,
                max,
                sortPacks,
                packName,
                user_id: userId
            },
        });
    },

    addPack(data: AddPackType) {
        return instance.post<ResponseAddPackType>('cards/pack', data).then((res) => res.data);
    },

    deletePack(id: string) {
        return instance.delete<ResponseDeletePackType>(`cards/pack?id=${id}`);
    },
    editPack(data: UpdatePackType) {
        return instance.put<ResponseUpdateType>(`cards/pack`, data)
    },
};

export type UpdatePackType = {
    cardsPack: {
        _id: string
        name?: string
        private?: boolean
        deckCover?: string
    }
}

type ResponseUpdateType = {
    updatedCardsPack: PackType
    token: string
    tokenDeathTime: number
}

type ResponseDeletePackType = {
    deletedCardsPack: PackType;
    token: string;
    tokenDeathTime: string;
};

type ResponseAddPackType = {
    newCardsPack: PackType;
    token: string;
    tokenDeathTime: string;
};

type CardPropertiesType = {
    name: string;
    deckCover: string;
    private: boolean;
};

export type AddPackType = {
    cardsPack: Partial<CardPropertiesType>;
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
    tokenDeathTime: number;
};
