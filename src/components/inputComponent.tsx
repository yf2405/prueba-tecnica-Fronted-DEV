import camilo from "../assets/Camilo.jpeg";
function ComponentInput({OpenModal} : {OpenModal :any} ) {
  return (
    <div className="flex items-center w-[714px] h-[75px]"> 
    {/* Input para el avatar */}
    <div className=" m-4 rounded-full">
      <img className="w-10 h-10 rounded-full" src={camilo} alt="Vite logo" />
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
