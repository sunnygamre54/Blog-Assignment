import classes from "./Blogs.module.css";
import dayjs from "dayjs";

function Blogs({ blogTitle, blogContent,blogCreatedDate, viewBlog }) {
  function onclickHandler(event) {
    viewBlog(blogTitle, blogContent);
  }
  return (
    <li className={classes.blogs}>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <div style={{ minWidth: "50%" }}>
          <h1 className={classes.blogTitle}>Date : {dayjs(blogCreatedDate.toString()).format("DD MMM YYYY")}</h1>
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
      <div>
        <h1 className={classes.blogContent}>{blogTitle}</h1>
      </div>
    </li>
  );
}

export default Blogs;
