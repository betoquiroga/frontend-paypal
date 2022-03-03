import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getToken } from "../../helpers/token"
import useFetch from "../../hooks/useFetch"
import Loader from "../utils/Loader"

const DOMAIN = import.meta.env.VITE_API_URL

const productOptions = {
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID
}

const subscriptionOptions = {
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
  "vault": true,
  "intent": "subscription"
}

const Product = () => {

  const params = useParams()
  const navigate = useNavigate()
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
        { order && 
        <PayPalScriptProvider options={product.is_subscription ? subscriptionOptions : productOptions}>
          <PayPalButtons
          createOrder={!product.is_subscription ? (_, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: product.price
                },
                custom_id: order.id
              }]
            })
          } : null}

          createSubscription={product.is_subscription ? (_, actions)=> {
            return actions.subscription.create({
              plan_id: product.months === 1 ? 'P-5UE878807C470423TMHUKEOQ' : 'P-1LX09596B11292627MHUJEVI',
              custom_id: order.id
            })
          } : null}
          
          onApprove={(data, actions) => {
            navigate("/pago-exitoso")
            
            if(product.is_subscription) {
              console.log("SUSCRIPCIÓN EXITOSA")
              console.log(data)
              return
            }
            
            return actions.order.capture().then(details => {
              console.log("PAGO EXITOSO")
              console.log(details)
            })
          }}
          />
        </PayPalScriptProvider>} 
      </div>  
    </div>
  )
}

export default Product