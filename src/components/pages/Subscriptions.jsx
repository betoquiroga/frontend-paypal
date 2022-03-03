import { getToken } from '../../helpers/token'
import useFetch from '../../hooks/useFetch'
import Loader from '../utils/Loader'

const Subscriptions = () => {
  const [loading, subscriptions] = useFetch(`subscriptions/${getToken()}`)

  if (loading) return <Loader />

  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='text-3xl mb-8 mt-8'>Mis suscripciones</h1>
      <table className='table table-auto w-full'>
        <thead className='bg-gray-50 dark:bg-gray-700'>
          <tr className='table-row'>
            <th className='th'>ID</th>
            <th className='th'>Inicio</th>
            <th className='th'>Fin</th>
            <th className='th'>Estado</th>
          </tr>
        </thead>
        <tbody className='table-row-group'>
          { !subscriptions ? (
            <tr className='table-row'>
              <td colSpan={6}>No tienes suscripciones aún</td>
            </tr>
          ) : subscriptions.map(inv => (
            <tr className='tr' key={inv.id}>
              <td className='td'>{inv.id}</td>
              <td className='td'>{inv.begins_at}</td>
              <td className='td'>{inv.ends_at}</td>
              <td className='td'>{inv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Subscriptions
