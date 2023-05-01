import {instance} from "../../../common/constants/instance";

export const cardsAPI = {
    getCards(cardID: string | undefined) {
        return instance.get<ResponseCardsType>(`cards/card?cardsPack_id=${cardID}`)
    }
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
    tokenDeathTime: number }