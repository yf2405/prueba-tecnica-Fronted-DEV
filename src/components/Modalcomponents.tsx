import { useState } from 'react';
import Modal from 'react-modal';

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
    <div>
      {/* Input para el comentario */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Escribe tu comentario aquí..."
      />
      
      {/* Input para subir imagen */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      {/* Modal que aparece al seleccionar una imagen */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <h2>Revisa y Publica</h2>
          {image && <img src={image} alt="Seleccionada" style={{ maxWidth: '100%' }} />}
          <p>{comment}</p>
          <button onClick={handlePost}>Publicar</button>
          <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
        </Modal>
      )}
    </div>
  );
}

export default CommentWithImageModal;
