import React, {useEffect, useState} from 'react';
import {Slider} from '@mui/material';
import s from './RangeSlider.module.scss';
import {useAppDispatch, useAppSelector} from "app/store";
import {setMax, setMin} from "features/packs/packsReducer";
import {selectMax, selectMaxCardsCount, selectMin, selectMinCardsCount} from "features/packs/selectors/selectors";

const RangeSlider = () => {
    const dispatch = useAppDispatch()
    const maxValue = useAppSelector(selectMaxCardsCount)
    const minValue = useAppSelector(selectMinCardsCount)
    const min = useAppSelector(selectMin)
    const max = useAppSelector(selectMax)

    const [value, setValue] = useState<number[]>([minValue, maxValue]);

    useEffect(() => {
        if (!min && !max) {
            setValue([minValue, maxValue])
        } else {
            setValue([min, max])
        }
    }, [min, max, maxValue])

    useEffect(() => {
        if(minValue !==min) setValue([minValue, value[1]])
        if(maxValue !==max) setValue([value[0], maxValue])
    },[maxValue, minValue])

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    const onChangeCommittedHandler = () => {
        dispatch(setMin({min: value[0]}))
        dispatch(setMax({max: value[1]}))
    }

    return (
        <div className={s.wrapper}>
            <div className={s.title}>Number of cards</div>
            <div className={s.slider}>
                <span className={s.value}>{value[0]}</span>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay='auto'
                    onChangeCommitted={onChangeCommittedHandler}
                    max={maxValue}
                    min={minValue}
                />
                <span className={s.value}>{value[1]}</span>
            </div>
        </div>
    );
};

export default RangeSlider;
