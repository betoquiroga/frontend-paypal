import { Outlet, Navigate } from 'react-router-dom'
import Navigation from "./Navigation"
import "../styles/styles.css"


const App = () => {

  if (!localStorage.getItem("login-email")) return <Navigate to="/login" />

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

export default App
