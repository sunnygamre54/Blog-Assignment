import Blogs from "./Blogs";
import classes from "./BlogList.module.css";
import NewPost from "./NewPost";
import { useEffect, useState } from "react";
import Modal from "./Modal";

function BlogList({ modalStatus, onModalClose }) {
  const [blogs, setBlogs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchBlogs() {
      const response = await fetch("http://localhost:5056/api/Blogs");
      const jsonresponse = await response.json();
      jsonresponse.map((data) => {
        addBlogHandler(data);
      });
    }
    fetchBlogs();
  }, []);

  function addBlogHandler(blogData) {
    setIsFetching(true);
    fetch("http://localhost:5056/api/Blogs", {
      method: "POST",
      body: JSON.stringify(blogData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setBlogs((blogs) => [blogData, ...blogs]);
    setIsFetching(false);
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
              key={blog.id}
              blogTitle={blog.title}
              blogContent={blog.content}
            ></Blogs>
          ))}
        </ul>
      )}

      {!isFetching && blogs.length == 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>No Data, Please add new Blog</h2>
        </div>
      )}

      { isFetching && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>Loading Blogs</h2>
        </div>
      )}
    </>
  );
}

export default BlogList;
