import Blogs from "./Blogs";
import classes from "./BlogList.module.css";
import NewPost from "./NewPost";
import { useEffect, useState } from "react";
import Modal from "./Modal";

function BlogList({ modalStatus, onModalClose }) {
  const [blogs, setBlogs] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchUserID() {
      const username = sessionStorage.getItem("username");
      const response = await fetch(
        `http://localhost:5056/api/Users/${username}`
      );
      return await response.json();
    }

    async function fetchBlogs(userId) {
      let jwtToken = sessionStorage.getItem("jwtToken");
      const response = await fetch(
        `http://localhost:5056/api/Blogs/${userId}`,
        {
          headers: {
            Authorization: "bearer " + jwtToken,
          },
        }
      );
      const jsonresponse = await response.json();
      jsonresponse.map((data) => {
        setBlogsData(data);
      });
    }

    async function fetching() {
      setIsFetching(true);
      let userId = await fetchUserID();
      fetchBlogs(userId);
      setIsFetching(false);
    }

    fetching();
  }, []);

  function setBlogsData(blogData) {
    setBlogs((blogs) => [blogData, ...blogs]);
  }

  function addBlogHandler(blogData) {
    let jwtToken = sessionStorage.getItem("jwtToken");
    setIsFetching(false);
    fetch("http://localhost:5056/api/Blogs", {
      method: "POST",
      body: JSON.stringify(blogData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + jwtToken,
      },
    }).then((res) => {
      if (res.statusText == "OK") {
        setBlogsData(blogData);
      }
    });
  }

  return (
    <>
      {modalStatus && (
        <Modal onClose={onModalClose}>
          <NewPost
            cancelModal={onModalClose}
            onAddBlog={addBlogHandler}
          ></NewPost>
        </Modal>
      )}

      {!isFetching && blogs.length > 0 && (
        <ul className={classes.blogs}>
          {blogs.map((blog) => (
            <Blogs
              key={blog.content}
              blogTitle={blog.title}
              blogContent={blog.content}
            ></Blogs>
          ))}
        </ul>
      )}

      {isFetching && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>Loading Blogs</h2>
        </div>
      )}

      {!isFetching && blogs.length == 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>No Data, Please add new Blog</h2>
        </div>
      )}
    </>
  );
}

export default BlogList;
