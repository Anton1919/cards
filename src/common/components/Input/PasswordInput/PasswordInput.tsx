import React, {useState} from 'react';
import s from './PasswordInput.module.scss'
import eye from 'assets/icons/eye.svg';
import {InputPropsType} from '../BaseInput/BaseInput';

const PasswordInput = <TFormValues extends Record<string, unknown>>({
                                                                        register,
                                                                        label,
                                                                        error,
                                                                        name,
                                                                        rules,
                                                                    }: InputPropsType<TFormValues>) => {
    const [hide, setHide] = useState(true);
    const onChangeHandler = () => setHide(!hide);

    return (
        <label className={s.label}>
            {label && <span className={s.labelText}>{label}</span>}
            <input
                {...(register && register(name, rules))}
                name={name}
                type={hide ? 'password' : 'text'}
                className={s.input}
            />
            <div className={hide ? '' : s.hidePassword} onClick={onChangeHandler}>
                <img className={s.icon} src={eye} alt='icon'/>
            </div>

            {error && <div className={s.errorText}>{error || 'Error'}</div>}
        </label>
    );
};

export default PasswordInput;
