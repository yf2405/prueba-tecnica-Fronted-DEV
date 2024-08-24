import { useState, useEffect, useRef } from "react";
import viteLogo from "/vite.svg";
import { PiImageFill, PiPlayCircleFill } from "react-icons/pi";
import { AiFillAudio } from "react-icons/ai";
import ImageCropper from './ImageCropper.js';
import ComponentInput from "./InputComponent.js";
import { useCommentContext } from "../useContext/context.js";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { IoClose } from "react-icons/io5";
import { FaFaceGrinHearts } from "react-icons/fa6";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { MdOutlinePublic } from "react-icons/md";

function CommentWithMediaModal() {
  const {
    comment,
    setComment,
    image,
    setImage,
    video,
    setVideo, 
    audio,
    setAudio,
    isModalOpen,
    setIsModalOpen,
    isEditing,
    setIsEditing,
    privacy,
    setPrivacy,
    dropdownOpen,
    setDropdownOpen,
    showEmojiPicker, 
    setShowEmojiPicker,
    validateImage,
    validatePrivate 
  } = useCommentContext();

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

  const addEmoji = (emoji: any) => {
    setComment((prev) => prev + emoji.native);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handlePost = () => {
    console.log("Publicado:", { comment, image, video, audio });
    setIsModalOpen(false);
    setComment(comment);
    setImage(image);
    setVideo(null);
    setAudio(null);
    setPrivacy(privacy);
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
      <ComponentInput OpenModal={handleOpenModal} />
      {isEditing && Image && <ImageCropper src={image} />} 
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#132419] bg-opacity-50 z-50">
          <div className={`flex flex-col items-center gap-3 p-3 mx-auto ${
    image ? 'mt-0' : 'mt-60'
  } mb-4 rounded-2xl bg-web-color w-full max-w-[720px]`}>
            <div className="flex justify-between items-center w-full">
              <h3 className="text-lg font-bold">Create post</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-transparent hover:bg-input-color text-white rounded-lg"
              >
               <IoClose size={28} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center ">
            <section className="align-items-start gap-3 p-3 flex items-start rounded-2xl bg-web-color w-full max-w-[720px] mx-4">
              <div className="border m-2 rounded-full">
                <img
                  className="w-[45px] h-[45px]"
                  src={viteLogo}
                  alt="Vite logo"
                />
              </div>
              <div className="w-100">
                {image && (
                  <div className="mb-3 relative">
                    <div className="absolute top-2 left-2 z-10 flex gap-2">
                      <button
                        type="button"
                        className="btn backdrop-blur-sm bg-black/30 rounded-full"
                      >
                        <FaPlus />
                      </button>
                      <button
                        type="button"
                        className="btn backdrop-blur-sm bg-black/30 rounded-full flex justify-center gap-1 items-center"
                        onClick={handleEditClick}
                      >
                        <FiEdit size={20} /> Edit
                      </button>
                    </div>
                    <div className="rounded-3 overflow-hidden">
                      <div className="relative w-full h-full">
                        <img
                          src={validateImage}
                          alt="Seleccionada"
                          className="w-full rounded-lg object-cover"
                          style={{ aspectRatio: "16 / 9" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {video && (
                  <video controls src={video} style={{ maxWidth: "100%" }} />
                )}
                {audio && <audio controls src={audio} />}

                <div className="relative mb-3">
                  <textarea
                    className="flex min-h-[50px] w-[626px] px-3 py-2 file:border-0 file:bg-transparent file:text-6xl file:font-medium placeholder:text-stone-400 focus-visible:outline-none border-2 border-transparent rounded-xl text-[var(--bs-body-color)] text-base font-normal leading-6 p-1.5 transition duration-150 ease-in-out focus:border-blue-500 focus:shadow-outline hover:bg-stone-700 bg-input-color"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe tu comentario aquí..."
                  />
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute bottom-2 bg-transparent right-4 p-1 rounded-full"
                  >
                   <FaFaceGrinHearts size={18} />
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute bottom-14 left-0">
                      <Picker data={data} onEmojiSelect={addEmoji} />
                    </div>
                  )}
              </div>
  
              <div className="flex flex-row items-center justify-center pr-8 mb-3">
                <div className="flex pr-8 gap-2">

               
                <div className="flex  relative items-center border-[3px] px-4 py-1.5 rounded-full border-input-color gap-2">
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
                  <button
                    onClick={toggleDropdown}
                    className="text-white gap-8 relative  hover:bg-stone-700 bg-input-color focus:outline-none border-none rounded-full px-4 py-1.5 text-center inline-flex  items-center"
                  >
                    {validatePrivate}
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
                      className="absolute z-10 ml-[175px] mt-12 divide-y divide-gray-100 rounded-3xl shadow-xl shadow-web-color-700/50 bg-input-color"
                    >
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li className="px-2">
                          <button
                            onClick={() => setPrivacy("public")}
                            className="h-[40px] w-[159px] text-left flex items-center rounded-3xl px-2 py-4 bg-transparent border-none hover:bg-hover-color"
                          >
                         Public
                          </button>
                        </li>
                        <li className="px-2">
                          <button
                            onClick={() => setPrivacy("private")}
                            className="h-[40px] w-[159px] rounded-3xl px-2 py-4 text-left flex items-center bg-transparent border-none hover:bg-hover-color"
                          >
                            private
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
   </div>
                  {/* Botón Post */}    
                <div className="left-24 flex gap-2 relative">
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