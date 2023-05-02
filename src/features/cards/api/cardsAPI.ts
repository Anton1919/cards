import {instance} from "../../../common/constants/instance";

export const cardsAPI = {
    getCards(data: CardParamsType) {
        return instance.get<ResponseCardsType>('cards/card', {
            params: {
                cardsPack_id: data.cardsId,
                page: data.page,
                pageCount: data.pageCount
            }
        })
    }
}

export type CardParamsType = {
    page: number
    pageCount: number
    cardsId: string | undefined
}

export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

type ResponseCardsType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packCreated: string
    packDeckCover: string
    packName: string
    packPrivate: boolean
    packUpdated: string
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}