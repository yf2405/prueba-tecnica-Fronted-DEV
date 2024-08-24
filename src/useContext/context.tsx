import React, { createContext, useContext, useState, ReactNode } from "react";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

interface CommentContextProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  croppedImage: string | null; // Añadido
  setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>; // Añadido
  video: string | null;
  setVideo: React.Dispatch<React.SetStateAction<string | null>>;
  audio: string | null;
  setAudio: React.Dispatch<React.SetStateAction<string | null>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  privacy: string;
  setPrivacy: React.Dispatch<React.SetStateAction<string>>;
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showEmojiPicker: boolean; 
  setShowEmojiPicker:  React.Dispatch<React.SetStateAction<boolean>>;
  validateImage : string | null;
  validatePrivate: boolean;
  
}

const CommentContext = createContext<CommentContextProps | undefined>(undefined);

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useCommentContext must be used within a CommentProvider");
  }
  return context;

};

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [comment, setComment] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null); // Añadido
  const [video, setVideo] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [privacy, setPrivacy] = useState<string>("public");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const validateImage = croppedImage ? croppedImage : image;
   const validatePrivate = privacy === "public" ?  <MdOutlinePublic size={24} /> : <RiGitRepositoryPrivateFill />


  return (
    <CommentContext.Provider
      value={{
        comment,
        setComment,
        image,
        setImage,
        croppedImage, // Añadido
        setCroppedImage, // Añadido
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
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};