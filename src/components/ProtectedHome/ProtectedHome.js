import Header from "../Header/Header";
import Main from "../Main/Main";


export default function ProtectedHome({userEmail, ...props}) {
  return(
    <>
      <Header dataUser={userEmail}/>
      <Main
        name='main'
        {...props}
      />
    </>
  )
}
