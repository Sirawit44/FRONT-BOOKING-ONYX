
const color = {
  'black' : 'bg-black hover:bg-gray-500 text-white',
  'white': 'border border-white text-white'

}

export default function Button({
  children,
  bg ='black',
  onClick

}) {
  return <button onClick={onClick} className={`px-3 py-1.5 ${color[bg]} rounded-md`}  >
    {children}
    </button>
  
}
