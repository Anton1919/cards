import React, {ChangeEvent} from 'react';
import s from './LearnItem.module.scss'
import {OptionType} from "common/components/LearnCard/LearnCard";

type LearnItemType = {
    value: string
    title: string
    options: OptionType
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const LearnItem = ({title, options, value, onChange}: LearnItemType) => {
    return (
        <div className={s.listOptions}>
            <input type="radio" value={options.id} checked={value === options.id} onChange={onChange}/>
            <span>{title}</span>
        </div>
    );
};

export default LearnItem;