import { useContext } from "react"
import Card from "./Card.js"
import Spinner from "./Spinner/Spinner.js"
import CurrentUserContext from "../contexts/CurrentUserContext.js"

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDelete, cards,isLoading }) {

const currentUser = useContext(CurrentUserContext)

  // const [userName, setUserName] = useState('')
  // const [userDescription, setUserDescription] = useState('')
  // const [userAvatar, setUserAvatar] = useState('')
  // const [cards, setCards] = useState([])

  // useEffect(() => {
  //   Promise.all([api.getInfo(), api.getCards()])
  //     .then(([dataUser, dataCards]) => {
  //       setUserName(dataUser.name)
  //       setUserDescription(dataUser.about)
  //       setUserAvatar(dataUser.avatar)
  //       dataCards.forEach(data => data.myid = dataUser._id)
  //       setCards(dataCards)
  //     })
  //       .catch((error) => console.error(`ошибка ${error}`))

  // }, [])

  return (

    <main className="content">
      <section className="profile">
        <div className="profile__blocks">
          <div className="profile__container" onClick={onEditAvatar}>
            <img src={currentUser.avatar ? currentUser.avatar : "#"} alt="Фото" className="profile__avatar" />
            <div className="profile__overlay"></div>
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__title">{currentUser.name ? currentUser.name : "#"}</h1>
              <button type="button" name="button_edit" className="profile__edit-button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{currentUser.about ? currentUser.about : ""}</p>
          </div>
        </div>
        <button type="button" name="button_add" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {isLoading ? <Spinner/> : cards.map(data => {

          return (
            <div className="elements__element" key={data._id}>
              <Card card={data} onCardClick={onCardClick} onDelete={onDelete}/>
            </div>)
        })}

      </section>
    </main>
  );
}

export default Main;
