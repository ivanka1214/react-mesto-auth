export default PopupWithForm;

function PopupWithForm({ name, title, titleButton, children, isOpen, onClose,onSubmit,isSend,isValid=true }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''} `}  onClick={onClose}>
      <div className="popup__container" onClick={(evt =>evt.stopPropagation())}>
        <button type="button" className="popup__close popup__close_type-edit" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form action="" name="editData" className="popup__form popup__form_type-edit" noValidate="" onSubmit={onSubmit}>
          <fieldset className="popup__set">
            {children}
            <button type="submit" className={`popup__button ${isValid ? '' : 'popup__button_disabled'}`} disabled={isSend}>{isSend ? '' : titleButton || 'Сохранить'}</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}