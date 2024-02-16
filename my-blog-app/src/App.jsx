import { useState } from "react";
import "./App.css";
import BlogList from "./components/BlogList";
import MainHeader from "./components/MainHeader";

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function openNewModal(evemt) {
    setModalIsVisible(true);
  }

  function closeNewModal(event) {
    setModalIsVisible(false);
  }

  return (
    <>
      <MainHeader onCreatePost={openNewModal}></MainHeader>
      <main>
        <BlogList modalStatus={modalIsVisible} onModalClose={closeNewModal}></BlogList>
      </main>
    </>
  );
}

export default App;
