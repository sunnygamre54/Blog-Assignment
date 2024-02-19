import { useEffect, useState } from "react";
import "./App.css";
import BlogList from "./components/BlogList";
import MainHeader from "./components/MainHeader";
import { useNavigate } from "react-router-dom";

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    var usersession = sessionStorage.getItem("username");
    if (usersession === null || usersession === "") {
      navigate("/login");
    }
  }, []);

  function openNewModal(evemt) {
    setModalIsVisible(true);
  }

  function closeNewModal(event) {
    setModalIsVisible(false);
  }

  return (
    <div className="body">
      <MainHeader onCreatePost={openNewModal}></MainHeader>
      <main>
        <BlogList
          modalStatus={modalIsVisible}
          onModalClose={closeNewModal}
        ></BlogList>
      </main>
    </div>
  );
}

export default App;
