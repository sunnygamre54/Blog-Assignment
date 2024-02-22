import classes from "./Blogs.module.css";

function Blogs({ blogTitle, blogContent, viewBlog }) {
  function onclickHandler(event) {
    viewBlog(blogTitle, blogContent);
  }
  return (
    <li className={classes.blogs}>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <div style={{ minWidth: "50%" }}>
          <p className={classes.blogTitle}>{blogTitle}</p>
        </div>
        <div style={{ minWidth: "50%" }}>
          <button
            style={{ float: "right" }}
            className="btn btn-dark"
            onClick={onclickHandler}
          >
            View Blog
          </button>
        </div>
      </div>
      <p className={classes.blogContent}>{blogContent}</p>
    </li>
  );
}

export default Blogs;
