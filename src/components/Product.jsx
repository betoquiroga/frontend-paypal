import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { productOptions, subscriptionOptions } from "../helpers/paypal"
import useFetch from "../hooks/useFetch"

const DOMAIN = import.meta.env.VITE_API_URL

const Product = () => {

  const params = useParams()
  const [loading, product, error] = useFetch(`products/${params.productID}`)
  const [order, setOrder] = useState() 

  const handleOrder = () => {

    const payload = {
      "email": localStorage.getItem("login-email"),
      "product_id": product.id,
      "price": product.price
    }

    if (product.is_subscription) {
      payload["is_subscription"] = true
      payload["months"] = product.months
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

  if (loading) return <div className='text-center max-w-6xl mx-auto py-4'><p>Cargando</p></div>
  if (error) return <p>{error}</p>

  return (
    <div className='max-w-6xl mx-auto mb-8 px-4 grid grid-columns-6 gap-8 mt-4'>
      <h1 className="text-4xl block w-full col-span-6 px-2">{product.name}</h1>
      <div className="col-span-2 px-2">
        <img className="w-full" src={product.image} alt={product.name} />
      </div>
      <div className="col-span-4">
        <ul className="mb-8">
          <li><b>ID:</b>{product.id}</li>
          <li><b>Detalle:</b>{product.description}</li>
          <li><b>Precio:</b>{product.price}</li>
          { order && <li><b>Orden:</b>{order.id}</li> }
          { !order && <button onClick={handleOrder} className="px-4 py-1 w-full mt-4 text-gray-200 bg-slate-800 rounded-md hover:bg-slate-700">Comprar</button> }
        </ul>
        {order && (
          <PayPalScriptProvider options={product.is_subscription ? subscriptionOptions : productOptions}>
            {
            order.is_subscription ? (
              <PayPalButtons
                createSubscription={(_, actions) =>{
                  return actions.subscription.create({
                    plan_id: product.months === 12 ? "P-1LX09596B11292627MHUJEVI" : "P-5UE878807C470423TMHUKEOQ",
                    custom_id: order.id,
                  })
                }}
                onApprove={(data, actions) => {
                  console.log("subscripcion", data)
                  console.log("subscripcion", actions)
                  alert("Subscripcion completada")
                }}
              />
            ) : (
              <PayPalButtons
                createOrder={(_, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: 'USD',
                          value: order.price,
                        },
                        custom_id: order.id,
                      },
                    ],
                  });
                }}
                onApprove={(_, actions) => {
                  return actions.order.capture().then((details) => {
                    const name = details.payer.name.given_name;
                    alert(`Transaction completed by ${name}`);
                  });
                }}
              />
              )
            } 
          </PayPalScriptProvider>
        )}  
      </div>  
    </div>
  )
}

export default Product