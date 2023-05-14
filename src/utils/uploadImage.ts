import {setAppError} from "app/appReducer";
import {ChangeEvent} from "react";
import {Dispatch} from "redux";

export const onUpload = (e: ChangeEvent<HTMLInputElement>, setAva: (value: string) => void, dispatch: Dispatch) => {
    if (e.target.files && e.target.files.length) {
        const file = e.target.files[0]
        if (file.size < 4000000) {
            convertFileToBase64(file, (file64: string) => {
                setAva(file64)
            })
        } else {
            dispatch(setAppError({error: 'Файл слишком большого размера'}))
        }
    }
}

const convertFileToBase64 = (
    file: File,
    callBack: (value: string) => void
) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        const file64 = reader.result as string
        callBack(file64)
    }
    reader.readAsDataURL(file)
}