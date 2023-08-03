import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import ButtonLike from "./ButtonLike/ButtonLike.js";
export default Card;


function Card({ card, onCardClick, onDelete }) {
    const currentUser = useContext(CurrentUserContext)
    
    return (
        <>
             {currentUser._id === card.owner._id && <button type="button" className="elements__delete" onClick={() => onDelete(card._id)}></button>}
          
            <img src={card.link}
                alt={card.name}
                className="elements__img"
                onClick={() => onCardClick({ link: card.link, name: card.name })} />
            <div className="elements__tab">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__likes">
                    <ButtonLike likes={card.likes} myid={currentUser._id} cardid={card._id}/>
                </div>
            </div>
        </>
    )
}