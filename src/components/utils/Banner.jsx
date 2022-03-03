import { getToken } from "../../helpers/token"

const Banner = () => {
  return (
    <div className='mb-6 bg-slate-700 text-gray-300 py-4'>
      <div className='max-w-6xl mx-auto py-4 px-4'>
        <h1 className='text-xl'>Bienvenido {getToken()}</h1>
        <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error odio ab quo aliquam ea dolores pariatur expedita magnam. Facilis, ipsa quam iure recusandae voluptate doloremque nemo nihil quis ipsam quasi.</p>
      </div>
    </div>
  )
}
export default Banner