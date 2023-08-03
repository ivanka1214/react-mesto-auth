import { useEffect, useState } from "react"
import api from "../../utils/api"

export default function ButtonLike({likes,myid,cardid}) {

const [isLike, setIsLike] = useState(false)
const [count, setCount] = useState(likes.length) 

useEffect(() => {
    setIsLike(likes.some(element => myid === element._id))
},[likes, myid])

function handleLike() {
    if (isLike) {
        api.deleteLike(cardid)
        .then(res => {
            setIsLike(false)
            setCount(res.likes.length)
        })
        .catch((error) => console.error(`ошибка ${error}`))
    } else {
        api.addLike(cardid)
        .then(res => {
            setIsLike(true)
            setCount(res.likes.length)
        })
        .catch((error) => console.error(`ошибка ${error}`))
    }
}
    return (
        <>
        <button type="button" name="button_love" className={`elements__love ${isLike ? 'elements__love_active' : ''}`} onClick={handleLike}></button>
        <p className="elements__count">{count}</p>
        
        </>
    )
}