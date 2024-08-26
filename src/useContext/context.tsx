import React, { createContext, useContext, useState, ReactNode } from "react";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

interface CommentContextProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  image: string | undefined;
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  croppedImage: string | undefined; // Añadido
  setCroppedImage: React.Dispatch<React.SetStateAction<string | undefined>>; 
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
  validateImage : string | undefined;
  validatePrivate: any;
  postData: Array<{ type: string; content: string }> | null;
  setPostData: React.Dispatch<React.SetStateAction<Array<{ type: string; content: string }> | null>>;
  
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
  const [image, setImage] = useState<string | undefined>(undefined);
  const [croppedImage, setCroppedImage] = useState<string | undefined>(undefined); // Añadido
  const [video, setVideo] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [privacy, setPrivacy] = useState<string>("public");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postData, setPostData] = useState<Array<{ type: string; content: string }> | null>(null);

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
        validatePrivate,
        postData,
        setPostData
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};