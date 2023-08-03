import { useRef } from "react"
import useFormValidation from "../utils/useFormValidation"
import PopupWithForm from "./PopupWithForm/PopupWithForm"


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSend }) {
    const input = useRef()
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    function resetFormClose() {
        onClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateAvatar({ avatar: input.current.value }, reset)

    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            isOpen={isOpen}
            isSend={isSend}
            isValid={isValid}
            onClose={resetFormClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__field">
                <input ref={input} type="url" name="avatar"
                    className={`popup__input ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_type_error'}`}
                    disabled={isSend}
                    onChange={handleChange}
                    id="jjjj"
                    placeholder="Ссылка на аватарку"
                    required
                    value={values.avatar ? values.avatar : ''}
                />
                <span className="popup__error popup__error_type_avatar">{errors.avatar}</span>
            </div>
        </PopupWithForm>


    )
}