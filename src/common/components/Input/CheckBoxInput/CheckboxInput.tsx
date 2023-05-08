import React from 'react';
import s from './CheckboxInput.module.scss';
import {InputPropsType} from '../BaseInput/BaseInput';

const CheckboxInput = <TFormValues extends Record<string, unknown>>({
                                                                        register,
                                                                        label,
                                                                        name,
                                                                    }: InputPropsType<TFormValues>) => {
    return (
        <div className={s.wrapper}>
            <input {...(register && register(name))} name={name} type='checkbox' className={s.input}/>
            {label && <span className={s.labelText}>{label}</span>}
        </div>
    );
};

export default CheckboxInput;
