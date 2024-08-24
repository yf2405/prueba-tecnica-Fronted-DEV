import './App.css';
import CommentWithImageModal from './components/Modalcomponents';
import NewPostComponent from './components/NewPostComponent.js';
import { CommentProvider, useCommentContext } from './useContext/context.js';


function Content() {
  const { validateImage, comment } = useCommentContext(); 

  return (
    <>
      <CommentWithImageModal />
      {/* Renderizado condicional de NewPostComponent */}
      {(comment || validateImage) && <NewPostComponent />}
    </>
  );
}

function App() {
  return (
    <CommentProvider>
      <Content />
    </CommentProvider>
  );
}

export default App;