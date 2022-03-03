import Card from './Card'

const Subscriptions = ({ subscriptions }) => {
  return (
    <div className='max-w-6xl mx-auto mb-8 px-4'>
      <h2 className='text-xl py-2'>Suscripciones</h2>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8'>
        {subscriptions.map(sub => <Card key={sub.id} data={sub} />)}
      </div>
    </div>
  )
}

export default Subscriptions
