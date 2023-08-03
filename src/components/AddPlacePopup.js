import useFormValidation from "../utils/useFormValidation";
import PopupWithForm from "./PopupWithForm/PopupWithForm";


export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSend }) {

    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    function resetFormClose() {
        onClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onAddPlace({ title: values.title, link: values.link }, reset)
    }

    return (
        <PopupWithForm
            name='add-profile'
            title='Новое место'
            titleButton='Создать'
            isOpen={isOpen}
            onClose={resetFormClose}
            isValid={isValid}
            isSend={isSend}
            onSubmit={handleSubmit}>
            <div className="popup__field">
                <input type="text"
                    name="title"
                    className={`popup__input ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__input_type_error'}`}
                    id="title-card"
                    placeholder="Название"
                    minLength={2}
                    maxLength={30}
                    required=""
                    value={values.title ? values.title : ''}
                    disabled={isSend}
                    onChange={handleChange} />
                <span className="popup__error popup__error_type_title">{errors.title}</span>
            </div>
            <div className="popup__field">
                <input type="url"
                    name="link"
                    className={`popup__input ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__input_type_error'}`}
                    id="img-src"
                    placeholder="Ссылка на картинку"
                    required=""
                    value={values.link ? values.link : ''}
                    disabled={isSend}
                    onChange={handleChange} />
                <span className="popup__error popup__error_type_link">{errors.link}</span>
            </div>
        </PopupWithForm>
    )
}