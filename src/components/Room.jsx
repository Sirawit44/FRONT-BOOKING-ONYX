export default function Room({data,onClick}) {
  console.log(data);
  return (
    <>
    <div onClick={onClick} className="card card-compact w-96 bg-base-100 shadow-xl border border-gray-500 hover:bg-gray-300 focus:ring focus:border-black forced-colors:appearance-auto ">
      <div className="card-body p-4 grid grid-cols-3 ">
        <h2 className="card-title text-gray-400 w-full h-10">{data.typeName}</h2>
        <h2 className="card-title text-gray-400">{data.area}</h2>
        <h2 className="card-title text-gray-400">{data.pricePerDay}</h2>
      </div>
      <figure>
        <img src={data.imageType}/>
      </figure>
    </div>
    </>
  );
}
