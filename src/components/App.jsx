import { Outlet, Navigate } from 'react-router-dom'
import Navigation from "./elements/Navigation"
import "../styles/styles.css"
import { getToken } from '../helpers/token'

const App = () => {
  if (!getToken()) return <Navigate to="/login" />
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

export default App
