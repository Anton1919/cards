import React, {ChangeEvent, useEffect, useState} from 'react';
import BackToPackList from "common/components/BackToPackList/BackToPackList";
import Button from "common/components/Button/Button";
import s from './LearnCard.module.scss'
import LearnItem from "common/components/LearnCard/LearnItem/LearnItem";
import {useAppDispatch, useAppSelector} from "app/store";
import {selectCards, selectTotalCount} from "features/cards/selectors/selectors";
import {CardsType} from "features/cards/api/cardsAPI";
import {getCardsTC, setCardPageCount, updateGrade} from "features/cards/cardsReducer";
import {Navigate, useParams} from "react-router-dom";
import {getRandomCard} from "utils/randomGetCards";
import {selectIsLoggedIn} from "common/selectors/selectors";
import {PATHS} from "common/routes/PATHS";

export type OptionType = {
    id: string
    title: string
}

const options: OptionType[] = [
    {id: '1', title: 'Did not know'},
    {id: '2', title: 'Forgot'},
    {id: '3', title: 'A lot of thought'},
    {id: '4', title: 'Сonfused'},
    {id: '5', title: 'Knew the answer'},
]

const LearnCard = () => {
    const [showAnswer, setShowAnswer] = useState(false)
    const [cardQuestion, setCardQuestion] = useState<CardsType>()
    const [value, setValue] = useState('0')
    const cards = useAppSelector(selectCards)
    const totalCardsCount = useAppSelector(selectTotalCount)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()
    const {packId} = useParams()
    const shots = useAppSelector(state => state.cards.shots)

    useEffect(() => {
        dispatch(setCardPageCount({pageCount: totalCardsCount}))
        dispatch(getCardsTC({cardsId: packId}))
    }, [shots])

    useEffect(() => {
        setCardQuestion(getRandomCard(cards))
    }, [cards])

    useEffect(() => {
        setValue('0')
    }, [showAnswer])

    const setAnswerGradeHandler = () => {
        setShowAnswer(false)
        if (cardQuestion) {
            dispatch(updateGrade({grade: +value, card_id: cardQuestion._id}))
        }
    }

    const showAnswerHandler = () => {
        setShowAnswer(true)
    }

    const onChangeOptionValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    if(!isLoggedIn) {
        return <Navigate to={PATHS.login} />
    }

    return (
        <div className={s.container}>
            <BackToPackList/>

            <div className={s.title}>
                <h2>Learn "Pack Name"</h2>
            </div>

            <div className={s.learnBlock}>
                <div className={s.question}>
                    <span>Question:</span>
                    <p>{cardQuestion?.question}</p>
                </div>

                <div className={s.counter}>
                    <p>Количество попыток ответов на вопрос: {cardQuestion?.shots}</p>
                </div>

                {showAnswer &&
                    <div className={showAnswer ? `${s.answerBlock} ${s.active}` : s.answerBlock}>
                        <div className={s.answer}>
                            <span>Answer:</span>
                            <p>{cardQuestion?.answer}</p>
                        </div>
                        <div className={s.rateYourself}>
                            <div className={s.rateTitle}>Rate yourself:</div>
                            <div className={s.listWrapper}>
                                {options.map(el => {
                                    return <LearnItem key={el.id} onChange={onChangeOptionValue} value={value}
                                                      options={el} title={el.title}/>
                                })}
                            </div>
                        </div>
                    </div>
                }

                <div className={s.btn}>
                    {showAnswer
                        ? <Button name={'Next'} variant={'primary'} handler={setAnswerGradeHandler}/>
                        : <Button name={'Show answer'} variant={'primary'} handler={showAnswerHandler}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default LearnCard;