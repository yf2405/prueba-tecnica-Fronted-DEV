import { useState, useEffect, useRef } from "react";
import viteLogo from "/vite.svg";
import { PiImageFill, PiPlayCircleFill } from "react-icons/pi";
import { AiFillAudio } from "react-icons/ai";
import   ImageCropper  from './ImageCropper.js';
import ComponentInput from "./InputComponent.js";


function CommentWithMediaModal() {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [privacy, setPrivacy] = useState("public"); // Estado para controlar la selección de privacidad
  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar la visibilidad del dropdown

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      if (type === "image") {
        setImage(fileURL);
      } else if (type === "video") {
        setVideo(fileURL);
      } else if (type === "audio") {
        setAudio(fileURL);
      }
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setIsModalOpen(false)
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handlePost = () => {
    console.log("Publicado:", { comment, image, video, audio });
    setIsModalOpen(false);
    setComment("");
    setImage(null);
    setVideo(null);
    setAudio(null);
    setPrivacy("public"); // Reinicia la selección de privacidad a 'public'
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="p-[4px] rounded-2xl bg-web-color w-full">
       <ComponentInput OpenModal={handleOpenModal}/>
      
      {isEditing && Image && (
         <ImageCropper  src = {image}/>
       )} 
       
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50  z-50">
      <div className="flex flex-col items-center gap-3 p-3  mx-auto my-10 rounded-2xl bg-web-color w-full  max-w-[720px]">
  <div className="flex justify-between items-center w-full">
    <h3 className="text-lg font-bold">Create post</h3>
    <button
      onClick={() => setIsModalOpen(false)}
      className="px-4 py-2 bg-red-500 text-white rounded-lg"
    >
      Cancelar
    </button>
  </div>
</div>

        <div className=" flex items-center justify-center">
          <section className="align-items-start gap-3 p-3 flex items-start rounded-2xl bg-web-color w-full max-w-[720px] mx-4">
                 
            {/* Input para el avatar */}
            <div className="border m-2 rounded-full">
              <img className="w-[45px] h-[45px]" src={viteLogo} alt="Vite logo" />
            </div>
            <div className="w-100">
              {image && (
                <div className="mb-3 relative">
                  {/* Botones en la parte superior izquierda */}
                  <div className="absolute top-2 left-2 z-10 flex gap-2">
                    <button type='button' className="btn btn-gray rounded-pill">
                      +
                    </button>
                    <button
                type="button"
                className="btn btn-gray rounded-pill"
                onClick={handleEditClick}
              >
                Edit
              </button>
                  </div>
                  <div className="rounded-3 overflow-hidden">
                    <div className="relative w-full h-full">
                      <img 
                        src={image} 
                        alt="Seleccionada" 
                        className="w-full rounded-lg object-cover" 
                        style={{ aspectRatio: '16 / 9' }} 
                      />
                    </div>
                  </div>
                </div>
              )}
              {video && <video controls src={video} style={{ maxWidth: "100%" }} />}
              {audio && <audio controls src={audio} />}
                
              {/* Input para el comentario */}
              <div className="relative mb-3">
                <textarea
                  className="flex h-[50px] w-[626px]  px-3 py-2  file:border-0
                   file:bg-transparent file:text-6xl file:font-medium placeholder:text-stone-400 
                   focus-visible:outline-none 
                   
                      border-2 
      border-transparent 
      rounded-xl
      text-[var(--bs-body-color)] 
     
      text-base 
      font-normal 
      leading-6 
      p-1.5 
     
      transition 
      duration-150 
      ease-in-out 
     
      focus:border-blue-500 
      focus:shadow-outline 
     hover:bg-stone-700 bg-input-color"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Escribe tu comentario aquí..."
                />
              </div>
  
              <div className="flex flex-row items-center justify-center pl-4 mb-3">
                <div className="flex -left-10 relative items-center border-[3px] px-4 py-1.5 rounded-full border-input-color gap-3">
                  <h3 className="text-lg">Agregar</h3>
                  {/* Botón para subir imagen */}
                  <div className="relative group">
                    <label
                      htmlFor="image-upload"
                      className="custom-file-upload cursor-pointer"
                    >
                      <PiImageFill size={23} />
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "image")}
                      className="hidden"
                    />
                    <span className="absolute bg-hover-color rounded-full left-1/2 px-2 py-1 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-center">
                      Photo
                    </span>
                  </div>
  
                  {/* Botón para subir video */}
                  <div className="relative group">
                    <label
                      htmlFor="video-upload"
                      className="custom-file-upload cursor-pointer"
                    >
                      <PiPlayCircleFill size={23} className="block" />
                    </label>
                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, "video")}
                      className="hidden"
                    />
                    <span className="absolute bg-hover-color rounded-full left-1/2 px-2 py-1 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-center">
                      Video
                    </span>
                  </div>
  
                  {/* Botón para subir audio */}
                  <div className="relative group">
                    <label
                      htmlFor="audio-upload"
                      className="custom-file-upload cursor-pointer"
                    >
                      <AiFillAudio size={23} />
                    </label>
                    <input
                      id="audio-upload"
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleFileUpload(e, "audio")}
                      className="hidden"
                    />
                    <span className="absolute bg-hover-color rounded-full w-24 px-2 py-1 left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-center">
                      Voice note
                    </span>
                  </div>
                </div>
  
                {/* Dropdown para seleccionar privacidad */}
                <div className="left-24 flex gap-2 relative">
                  <button
                    onClick={toggleDropdown}
                    className="text-white hover:bg-stone-700 bg-input-color focus:outline-none border-none rounded-full px-4 py-1.5 text-center inline-flex  items-center"
                  >
                    {privacy === "public" ? "Público" : "Privado"}
                    <svg
                      className="w-6 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 mt-12 divide-y divide-gray-100 rounded-3xl shadow-xl shadow-web-color-700/50 bg-input-color"
                    >
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li className="px-2">
                          <button
                            onClick={() => setPrivacy("public")}
                            className="h-[40px] w-[159px] text-left flex items-center rounded-3xl px-2 py-4 bg-transparent border-none hover:bg-hover-color"
                          >
                            Público
                          </button>
                        </li>
                        <li className="px-2">
                          <button
                            onClick={() => setPrivacy("private")}
                            className="h-[40px] w-[159px] rounded-3xl px-2 py-4 text-left flex items-center bg-transparent border-none hover:bg-hover-color"
                          >
                            Privado
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
  
                  {/* Botón Post */}
                  <button
                    onClick={handlePost}
                    className="px-6  text-black hover:bg-hover-button-post bg-button-post-color focus:outline-none border-none rounded-full font-bold text-base py-1.5 text-center inline-flex gap-8 items-center"
                  >
                    Post
                  </button>
                </div>
              </div>        
            </div>
          </section>
        </div> 
        </div>
      )}
    </div>
  );}

  export default CommentWithMediaModal;