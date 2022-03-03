import useFetch from '../hooks/useFetch'

const Invoices = () => {
  const [loading, invoices] = useFetch(`invoices/${localStorage.getItem("login-email")}`)

  if (loading) return <div className='text-center max-w-6xl mx-auto py-4'><p>Cargando</p></div>

  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='text-3xl mb-8 mt-8'>Mis facturas</h1>
      <table className='table table-auto w-full'>
        <thead className='bg-gray-50 dark:bg-gray-700'>
          <tr className='table-row'>
            <th className='th'>ID</th>
            <th className='th'>Producto</th>
            <th className='th'>Precio</th>
            <th className='th'>Tipo</th>
          </tr>
        </thead>
        <tbody className='table-row-group'>
          { !invoices ? (
            <tr className='table-row'>
              <td colSpan={6}>No tienes facturas registradas</td>
            </tr>
          ) : invoices.map(inv => (
            <tr className='tr' key={inv.id}>
              <td className='td'>{inv.id}</td>
              <td className='td'>{inv.product_id}</td>
              <td className='td'>{inv.price}</td>
              <td className='td'>{inv.is_subscription ? "Suscripción" : "Producto"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Invoices
