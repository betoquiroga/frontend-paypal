import useFetch from '../../hooks/useFetch'
import Banner from '../utils/Banner'
import Loader from '../utils/Loader'
import Products from '../elements/Products'
import Subscriptions from '../elements/Subscriptions'

const Home = () => {
  const [loading, products] = useFetch('products')

  if (loading) return <Loader />

  return (
    <div>
      <Banner />
      <Products products={products.filter(p => !p.is_subscription)} />
      <Subscriptions subscriptions={products.filter(p => p.is_subscription)} />
    </div>
  )
}

export default Home
