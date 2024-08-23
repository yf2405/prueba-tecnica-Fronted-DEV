import { useState } from 'react';
import Modal from 'react-modal';
import viteLogo from '/vite.svg'

function CommentWithImageModal() {
  const [comment, setComment] = useState('');
  const [image, setImage] = useState<string|null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setIsModalOpen(true); // Abre el modal si hay una imagen seleccionada
    }
  };

  const handlePost = () => {
    // Aquí va la lógica para publicar
    console.log('Publicado:', { comment, image });
    setIsModalOpen(false);
    setComment('');
    setImage(null);
  };

  return ( 
    <div className='p-[4px] rounded-2xl bg-web-color w-full '>
     <div className='flex items-center w-[722px] h-[75px]'>
         {/* Input para el avatar */}
        <div className=' border p-4 m-4  rounded-full'>
             <img  className="w-4 h-4" src={viteLogo} alt="Vite logo" />
        </div>
        {/* Input para el comentario */}
        <input 
        className='flex h-[50px] w-[626px] rounded-full px-3 py-2 
        text-lg file:border-0 
        file:bg-transparent file:text-6xl file:font-medium
         placeholder:text-stone-400 focus-visible:outline-none 
         hover:bg-stone-700 
         bg-input-color
       '
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Escribe tu comentario aquí..."
      />  
      
     </div>
     
      {/* Input para subir imagen 
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      */}
      {/* Modal que aparece al seleccionar una imagen 
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <h2>Revisa y Publica</h2>
          {image && <img src={image} alt="Seleccionada" style={{ maxWidth: '100%' }} />}
          <p>{comment}</p>
          <button onClick={handlePost}>Publicar</button>
          <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
        </Modal>
      )}*/}
    </div>
  );
}

export default CommentWithImageModal;
