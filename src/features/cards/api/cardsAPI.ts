import {instance} from "common/constants/instance";

export const cardsAPI = {
    getCards(data: CardParamsType) {
        return instance.get<ResponseCardsType>('cards/card', {
            params: {
                cardsPack_id: data.cardsId,
                page: data.page,
                pageCount: data.pageCount,
                cardQuestion: data.question
            }
        })
    },
    addCard(data: AddCardType) {
        return instance.post<ResponseAddCardType>('cards/card', data)
    },

    deleteCard(cardId: string) {
        return instance.delete(`cards/card?id=${cardId}`)
    },

    updateCard(data: UpdateCardType) {
        return instance.put<ResponseUpdateCard>('cards/card', data)
    },

    updateCardGrade(data: UpdateCardGrade) {
        return instance.put<ResponseGradeUpdateGradeType>('cards/grade', data)
    }
}

 type ResponseGradeUpdateGradeType = {
    updatedGrade: UpdatedGrade
    token: string
    tokenDeathTime: number
}

export type UpdatedGrade = {
    card_id: string
    user_id: string
    cardsPack_id: string
    grade: number
    shots: number
    more_id: string
    _id: string
    created: string
    updated: string
    __v: number
}

export type UpdateCardGrade = {
    grade: number
    card_id: string
}

type ResponseUpdateCard = {
    updatedCard: CardsType
    token: string
    tokenDeathTime: number
}

export type UpdateCardType = {
    card: {
        _id: string
        question: string
        answer: string
    }
}

type ResponseAddCardType = {
    newCard: CardsType
    token: string
    tokenDeathTime: number
}

export type AddCardType = {
    card: {
        cardsPack_id: string | undefined
        question?: string
        answer?: string
        grade?: number
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}

export type CardParamsType = {
    page: number
    pageCount: number
    cardsId: string | undefined
    question: string
}

export type CardsType = {
    _id: string
    answer: string
    question: string
    cardsPack_id: string
    questionImg?: string
    answerImg?: string
    grade: number
    shots?: number
    user_id: string
    created: string
    updated: string
    comments?: string
    type?: string
    rating?: number
    more_id?: string
    card_id?: string
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