import Card from './Card'

const Products = ({ products }) => {
  return (
    <div className='max-w-6xl mx-auto mb-8 px-4'>
      <h2 className='text-xl py-2'>Nuestros productos</h2>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {products.map(product => <Card key={product.id} data={product} />)}
      </div>
    </div>
  )
}

export default Products
