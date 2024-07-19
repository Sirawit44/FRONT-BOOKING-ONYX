export default function Input({ placeholder, type = "text", error, onChange, name, value  }) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        className={` text-black w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-500 focus:ring-gray-300"
        }`}
      />
      {error? <small className="text-red-500 px-4 ">{error}</small> : null }
    </>
  );
}
