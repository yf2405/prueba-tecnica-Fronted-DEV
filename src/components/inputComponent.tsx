import viteLogo from "/vite.svg";
function ComponentInput({OpenModal}) {
  return (
    <div className="flex items-center w-[714px] h-[75px]"> 
    {/* Input para el avatar */}
    <div className="border p-4 m-4 rounded-full">
      <img className="w-4 h-4" src={viteLogo} alt="Vite logo" />
    </div>
    {/* Input para el comentario */}
    <input
      className="flex h-[50px] w-[626px] rounded-full px-3 py-2 text-lg file:border-0 file:bg-transparent file:text-6xl file:font-medium placeholder:text-stone-400 focus-visible:outline-none hover:bg-stone-700 bg-input-color"
      onClick={OpenModal}
      placeholder="Escribe tu comentario aquí..."
    />
  </div>
  )
}
export default ComponentInput
