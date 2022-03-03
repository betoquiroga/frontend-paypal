import { useState, useEffect } from "react"

const DOMAIN = import.meta.env.VITE_API_URL

const useFetch = (url) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  const baseUrl = `${DOMAIN}/${url}`

  useEffect(() => {
    fetch(baseUrl)
      .then(resp => {
        if(resp.status !== 200) {
          setError("Error al encontrar el producto")
        }
        return resp.json()
      })
      .then(data => {
        setData(data.data)
        setLoading(false)
      })
  }, [])

  return [loading, data, error]
}

export default useFetch