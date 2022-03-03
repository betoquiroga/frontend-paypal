import useFetch from '../hooks/useFetch'
import Products from './Products'
import Subscriptions from './Subscriptions'

const Home = () => {
  const [loading, products] = useFetch('products')

  if (loading) return <div className='text-center max-w-6xl mx-auto py-4'><p>Cargando</p></div>

  return (
    <div>
      <div className='mb-6 bg-slate-700 text-gray-300 py-4'>
        <div className='max-w-6xl mx-auto py-4 px-4'>
          <h1 className='text-xl'>Bienvenido</h1>
          <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error odio ab quo aliquam ea dolores pariatur expedita magnam. Facilis, ipsa quam iure recusandae voluptate doloremque nemo nihil quis ipsam quasi.</p>
        </div>
      </div>
      <Products products={products.filter(p => !p.is_subscription)} />
      <Subscriptions subscriptions={products.filter(p => p.is_subscription)} />
    </div>
  )
}

export default Home
