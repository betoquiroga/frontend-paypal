import { useNavigate, Navigate } from "react-router-dom"
import { getToken, setToken } from "../../helpers/token"

const Login = () => {

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.target
    const data = new FormData(form)
    const email = data.get('email')

    setToken(email)
    navigate('/')
  }

  if (getToken()) return <Navigate to="/" />

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white border-2">
        <h1 className="text-2xl text-gray-900">Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block text-xs font-bold text-gray-600" htmlFor="email">Dirección de correo electrónico</label>
              <input type="email" name="email"
                  className="w-full px-4 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1" />
            </div>
            <div>
                <button className="button">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) 
}

export default Login