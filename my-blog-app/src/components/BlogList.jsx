import Blogs from "./Blogs";
import classes from "./BlogList.module.css";
import NewPost from "./NewPost";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ExistingPost from "./ExistingPost";
import RefreshToken from "./RefreshToken";

function BlogList({ modalStatus, onModalClose, viewMyBlogStatus }) {
  const [blogs, setBlogs] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [viewBlogModalStatus, setViewBlogModalStatus] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    async function fetchUserID() {
      const username = sessionStorage.getItem("username");
      const response = await fetch(
        `http://localhost:5056/api/Users/${username}`
      );
      setUserId(await response.json());
    }

    async function fetchBlogs(userId) {
      let jwtToken = sessionStorage.getItem("jwtToken");
      let refreshToken = sessionStorage.getItem("refreshToken");
      try {
        const response = await fetch(`http://localhost:5056/api/Blogs`, {
          headers: {
            Authorization: "bearer " + jwtToken,
          },
        });

        if (response.statusText == "Unauthorized") {
          await RefreshToken(jwtToken, refreshToken).then((res) => {
            sessionStorage.setItem("jwtToken", res.jwtToken);
            sessionStorage.setItem("refreshToken", res.refreshToken);
            fetchBlogs(userId);
          });
        } else {
          const jsonresponse = await response.json();
          jsonresponse.map((data) => {
            setBlogsData(data);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function fetching() {
      setIsFetching(true);
      await fetchUserID();
      fetchBlogs(userId);
      setIsFetching(false);
    }

    // async function fetchingMyBlogs() {
    //   let data = [];
    //   let userId = fetchUserID();
    //   blogs.map((x) => {
    //     if (x.userId == userId) {
    //       data.push(x);
    //     }
    //   });
    //   setBlogs("");
    //   setBlogsData(data);
    // }

    // viewMyBlogStatus && fetchingMyBlogs;
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
    })
      .then((res) => {
        if (res.statusText == "OK") {
          setBlogsData(blogData);
        } else if (response.statusText == "Unauthorized") {
          RefreshToken(jwtToken, refreshToken).then((res) => {
            sessionStorage.setItem("jwtToken", res.jwtToken);
            sessionStorage.setItem("refreshToken", res.refreshToken);
            addBlogHandler(blogData);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onViewBlog(bTitle, bContent) {
    setViewBlogModalStatus(true);
    setCurrentTitle(bTitle);
    setCurrentContent(bContent);
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

      {viewBlogModalStatus && (
        <Modal
          onClose={() => {
            setViewBlogModalStatus(false);
          }}
        >
          <ExistingPost
            title={currentTitle}
            content={currentContent}
          ></ExistingPost>
        </Modal>
      )}

      {!viewMyBlogStatus && !isFetching && blogs.length > 0 && (
        <ul className={classes.blogs}>
          {blogs.map((blog) => (
            <Blogs
              key={blog.content}
              blogTitle={blog.title}
              blogContent={blog.content}
              blogCreatedDate={blog.createdAt}
              viewBlog={onViewBlog}
            ></Blogs>
          ))}
        </ul>
      )}

      {viewMyBlogStatus && !isFetching && blogs.length > 0 && (
        <ul className={classes.blogs}>
          {blogs
            .filter((blog) => blog.userID == userId)
            .map((blog) => (
              <Blogs
                key={blog.content}
                blogTitle={blog.title}
                blogContent={blog.content}
                blogCreatedDate={blog.createdAt}
                viewBlog={onViewBlog}
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
