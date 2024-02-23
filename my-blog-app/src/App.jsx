import { useEffect, useState } from "react";
import "./App.css";
import BlogList from "./components/BlogList";
import MainHeader from "./components/MainHeader";
import { useNavigate } from "react-router-dom";

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const navigate = useNavigate();
  const [viewMyBlog, setViewMyBlog] = useState(false);

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

  function sendViewBlogStatus(event) {
    setViewMyBlog(true);
  }

  function sendViewBlogStatusForAll(event) {
    setViewMyBlog(false);
  }

  return (
    <div className="body">
      <MainHeader
        onCreatePost={openNewModal}
        onViewMyBlogs={sendViewBlogStatus}
        onViewAllBlogs={sendViewBlogStatusForAll}
      ></MainHeader>
      <main>
        <BlogList
          modalStatus={modalIsVisible}
          onModalClose={closeNewModal}
          viewMyBlogStatus={viewMyBlog}
        ></BlogList>
      </main>
    </div>
  );
}

export default App;
