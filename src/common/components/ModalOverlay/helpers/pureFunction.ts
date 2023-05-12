import {ChangeEvent} from "react";

export const onChangeMode = (text: string, setError: (value: string) => void, setMode: (value: boolean) => void, valueMode: boolean) => {
    if (text === '') {
        setError('Field is required')
        return
    }
    setMode(!valueMode)
}

export const onChange = (e: ChangeEvent<HTMLInputElement>, setError: (value: string) => void, setValue: (e: string) => void) => {
    setError('')
    setValue(e.currentTarget.value)
}