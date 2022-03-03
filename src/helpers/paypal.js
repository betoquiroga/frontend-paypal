const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID

export const productOptions = {
  "client-id": CLIENT_ID,
  currency: "USD",
  intent: "capture"
}
  
export const subscriptionOptions = {
  "client-id": CLIENT_ID,
  intent: "subscription",
  vault: true,
  components: "buttons",
}