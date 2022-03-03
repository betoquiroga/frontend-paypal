import { useNavigate, NavLink } from "react-router-dom"

const Navigation = () => {

  const navigate = useNavigate()

  const closeSession = () => {
    localStorage.removeItem("login-email")
    navigate('/login')
  }

  return (
    <header>
      <nav className="shadow-lg bg-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div className="flex items-center space-x-1">
                <NavLink to="/" className="link">Productos</NavLink>
                <NavLink to="/invoices" className="link">Mis facturas</NavLink>
                <a onClick={closeSession} className="link cursor-pointer">Cerrar sesión</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation