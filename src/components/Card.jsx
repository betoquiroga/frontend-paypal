import { Link } from 'react-router-dom'

const Card = ({ data }) => {
  return (
    <div className="rounded-lg w-full shadow-xl bg-white">
      <Link to={`/${data.id}`}>
        <img
          src={data.image}
          alt={data.name}
          className="rounded-t-lg h-60 w-full object-cover hover:opacity"
        />
      </Link>
      <header className=" text-xl font-extrabold p-4">
        <Link to={`/${data.id}`}>{data.name}</Link>
      </header>
      <div className="px-5">
        <p className="text-gray-500">
          {data.description}
        </p>
      </div>
      <footer className="py-4 px-4 text-gray-500">
        <Link to={`/${data.id}`}
          className="py-2 px-4 bg-slate-800 rounded-lg text-white font-semibold hover:bg-teal-700"
        >
          $ {data.price} USD
        </Link>
      </footer>
    </div>
  )
}

export default Card