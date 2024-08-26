import  { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useCommentContext } from '../useContext/context';


const ImageCropper = ({ src }: { src: string | undefined }) => {
  const { setCroppedImage ,   setIsModalOpen,   setIsEditing, } = useCommentContext(); 
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (completedCrop && imageRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const image = imageRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      const url = canvas.toDataURL("image/jpeg");
      setCroppedImage(url); // Guardar la imagen recortada en el contexto
    }
  }, [completedCrop, setCroppedImage]);

  const handleCancel = () => {
        setIsEditing(false);
        setIsModalOpen(true);
        setCroppedImage(undefined);
  };

 const handleSave = () => {
  setIsEditing(false)
  setIsModalOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-auto">
    <div className="flex flex-col items-center gap-3 p-3 mx-auto my-10 rounded-2xl bg-web-color  w-[520px]">

    <div className='flex justify-between w-full pl-3'>
      <h3 className=' font-semibold'>Edit Photo</h3>
    </div>
      {/* Área de recorte de imagen */}
      <div className=" rounded-lg  w-full">
        <ReactCrop
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          style={{ maxWidth: '98%',  margin:'0px', padding:'1px', border: 'lightgray' }}
        >
          <img
            ref={imageRef}
            src={src}
            alt="Imagen para recortar"
            style={{ maxWidth: '100%' , padding:'0px'}}
          />
        </ReactCrop>

        {/* Mostrar imagen recortada 
        {croppedImageUrl && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <img
              src={croppedImageUrl}
              alt="Imagen recortada"
              className="w-full rounded-lg object-cover"

            />
          </div>
        )} */}
      </div>
     

      {/* Botón Guardar */}
      <div className="flex justify-end gap-2 w-full">
      <button
          onClick={handleCancel}
          className="px-6 text-white hover:bg-hover-color  bg-transparent focus:outline-none border-none rounded-full font-bold text-base py-1.5 text-center inline-flex gap-8 items-center"
        >
          Cancelar
        </button>
        <button
         onClick={handleSave}
          className="px-6 text-black hover:bg-hover-button-post bg-button-post-color focus:outline-none border-none rounded-full font-bold text-base py-1.5 text-center inline-flex gap-8 items-center"
        >
          Guardar
        </button>
      </div>
    </div>
    <canvas ref={canvasRef} style={{ display: 'none' }} />
  </div>
);
};

export default ImageCropper;