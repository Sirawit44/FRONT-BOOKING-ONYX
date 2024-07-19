export default function Card({data,onClick}) {
  console.log("first", data);
  console.log(onClick)
  return (
    <div onClick={onClick} className="card card-compact w-96 bg-base-100 shadow-xl relative max-w-xs overflow-hidden bg-cover bg-no-repeat active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300">
      <figure>
        <img className="max-w-xs transition duration-300 ease-in-out hover:scale-110"
          src={data.imageHeader}
        />
      </figure>

      <div className="card-body p-4">
        <p>{data.name}</p>
        <h2 className="card-title text-gray-400">{data.location}</h2>
      </div>
    </div>
  );
}
