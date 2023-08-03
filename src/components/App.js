import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm/PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { useCallback, useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import api from "../utils/api.js"
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  // стейты попап
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup] = useState(false)
  const [isSend, setIsSend] = useState(false)
  // стейт контекста
  const [currentUser, setCurrentUser] = useState({})
  // стейты карточка
  const [cards, setCards] = useState([])
  const [isLoadingCards, setIsLoadingCards] = useState(true)
  const [deleteCardId, setDeleteCardId] = useState('')

  const setAllStatesForClosePopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false);
    setDeletePopupOpen(false)
  }, [])

  const closePopupByEsc = useCallback((evt) => {
    if (evt.key === 'Escape') {
      setAllStatesForClosePopups()
      document.removeEventListener('keydown', closePopupByEsc)
    }
  }, [setAllStatesForClosePopups])

  const closeAllPopups = useCallback(() => {
    setAllStatesForClosePopups();
    document.removeEventListener('keydown', closePopupByEsc)
  }, [setAllStatesForClosePopups, closePopupByEsc])

  function setEvantListenerForDocument() {
    document.addEventListener('keydown', closePopupByEsc)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEvantListenerForDocument()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEvantListenerForDocument()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEvantListenerForDocument()
  }


  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId)
    setDeletePopupOpen(true);
    setEvantListenerForDocument()

  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setImagePopup(true)
    setEvantListenerForDocument()
  }

  useEffect(() => {
    setIsLoadingCards(true)
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser)
        setCards(dataCards)
        setIsLoadingCards(false)
      })
      .catch((error) => console.error(`ошибка ${error}`))

  }, [])

  function handleDeleteSubmit(evt) {
    evt.preventDefault()
    setIsSend(true)
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId
        }))
        closeAllPopups()
        setIsSend(false)
      })
      .catch((error) => console.error(`ошибка ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleUpdateUser(dataUser, reset) {
    setIsSend(true)
    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSend(false)
      })
      .catch((error) => console.error(`ошибка ${error}`))
       .finally(() => setIsSend(false))
  }

  function handleUpdateAvatar(dataUser, reset) {
    setIsSend(true)
    api.setNewAvatar(dataUser)
      .then(res => {
        setCurrentUser(res)
        reset()
        closeAllPopups()
        setIsSend(false)
      })
      .catch((error) => console.error(`ошибка ${error}`))
       .finally(() => setIsSend(false))
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    setIsSend(true)
    api.addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards])
        reset()
        closeAllPopups()
        setIsSend(false)
      })
      .catch((error) => console.error(`ошибка ${error}`))
       .finally(() => setIsSend(false))
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onDelete={handleDeletePopupClick}
          cards={cards}
          isLoading={isLoadingCards}
        />
        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend} />



        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        >

        </AddPlacePopup>
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        >
        </EditAvatarPopup>
        <PopupWithForm
          name='delete'
          title='ВЫ уверена?'
          titleButton='Да'
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteSubmit}
          isSend={isSend}>
        </PopupWithForm>
        <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose={closeAllPopups} />

      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
