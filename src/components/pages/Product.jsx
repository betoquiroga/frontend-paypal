import { useState } from "react"
import { useParams } from "react-router-dom"
import { getToken } from "../../helpers/token"
import useFetch from "../../hooks/useFetch"
import Loader from "../utils/Loader"

const DOMAIN = import.meta.env.VITE_API_URL

const Product = () => {

  const params = useParams()
  const [loading, product, error] = useFetch(`products/${params.productID}`)
  const [order, setOrder] = useState() 

  const handleOrder = () => {

    const payload = {
      "email": getToken(),
      "product_id": product?.id,
      "price": product?.price
    }

    if (product?.is_subscription) {
      payload["is_subscription"] = true
      payload["months"] = product?.months
    } else {
      payload["is_product"] = true
    }

    fetch(`${DOMAIN}/orders`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    })
    .then(resp => resp.json())
    .then(data => setOrder(data.message))
  }

  if (loading) return <Loader />
  if (error) return <p>{error}</p>

  return (
    <div className='max-w-6xl mx-auto mb-8 px-4 grid grid-columns-6 gap-8 mt-4'>
      <h1 className="text-4xl block w-full col-span-6 px-2">{product.name}</h1>
      <div className="col-span-2 px-2">
        <img className="w-full" src={product.image} alt={product.name} />
      </div>
      <div className="col-span-4">
        <ul className="mb-8">
          <li><b>ID: </b>{product.id}</li>
          <li><b>Detalle: </b>{product.description}</li>
          <li><b>Precio: </b>${product.price} USD</li>
          { order && <li><b>ID de la orden de compra: </b>{order.id}</li> }
          { !order && <button onClick={handleOrder} className="button">Comprar</button> }
        </ul>  
      </div>  
    </div>
  )
}

export default Product