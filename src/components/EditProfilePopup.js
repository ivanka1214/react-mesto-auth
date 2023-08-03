import { useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import useFormValidation from "../utils/useFormValidation";
import PopupWithForm from "./PopupWithForm/PopupWithForm";


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSend }) {
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

  useEffect(() => {
    setValue("name", currentUser.name)
    setValue("jobs", currentUser.about)
  }, [currentUser, setValue])

  function resetFormClose() {
    onClose()
    reset({ name: currentUser.name, jobs: currentUser.about })
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({ name: values.name, jobs: values.jobs }, reset)
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={resetFormClose}
      isValid={isValid}
      isSend={isSend}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="text"
          id="nameInput"
          minLength={2}
          maxLength={40}
          name="name"
          required
          className={`popup__input ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input_type_error'}`}
          value={values.name ? values.name : ''}
          disabled={isSend}
          onChange={handleChange} />
        <span className='popup__error popup__error_type_name'>{errors.name}</span>
      </div>
      <div className="popup__field">
        <input type="text" name="jobs"
          id="jobs" minLength={2} maxLength={200} required
          className={`popup__input ${isInputValid.jobs === undefined || isInputValid.jobs ? '' : 'popup__input_type_error'}`}
          value={values.jobs ? values.jobs : ''} disabled={isSend} onChange={handleChange} />
        <span className="popup__error popup__error_type_jobs">{errors.jobs}</span>
      </div>
    </PopupWithForm>
  )
}