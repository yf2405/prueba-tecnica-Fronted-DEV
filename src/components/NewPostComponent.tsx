import React from 'react'
import Camilo from "../assets/Camilo.jpeg";
import { useCommentContext } from '../useContext/context';
import { MdOutlinePublic } from 'react-icons/md';
import { FaEllipsisV } from 'react-icons/fa';

export default function NewPostComponent() {
    const {
        image,
        video,
        validateImage,  
        audio,
        comment,
        privacy,
        validatePrivate,
        
     } = useCommentContext(); 

     
  return (
    <div className="flex items-center w-[714px] m-6"> 
    {/* Input para el avatar */} 
    <div className='w-[626px] border rounded-2xl px-3 py-2 text-lg file:border-0 file:text-6xl file:font-medium  border-none bg-input-color'>
    <div className='flex justify-between items-center' >
    <div className='flex items-center gap-3'>
    <div className="m-2 rounded-full">
      <img className="w-10 h-10 rounded-full " src={Camilo}  alt="Vite logo" />
    </div>

        <h5 className='font-bold'>
           Camilo
        </h5>
         {validatePrivate}
         </div>
         <FaEllipsisV size={24} />
    
    </div>
    {/* New Post */}
         <div className="flex flex-col gap-3 w-full">
            <div className='p-4 text-start'>
                <h5>{comment} </h5>
            </div>
        {image && (
          <div className="mb-3 ">
            <div className="rounded-3 overflow-hidden">
              <div className=" w-full h-full">
                <img
                  src={validateImage}
                  alt="Seleccionada"
                  className="w-full rounded-lg object-cover"
                  style={{ aspectRatio: '16 / 9' }}
                />
              </div>
            </div>
          </div>
        )}

        {video && (
          <video controls src={video} className="w-full rounded-lg" />
        )}

        {audio && (
          <audio controls src={audio} className="w-full rounded-lg" />
        )}
      </div>
    </div>
    </div>
  );
}
