import classes from "./Blogs.module.css";
import dayjs from "dayjs";

function Blogs({
  blogTitle,
  blogContent,
  blogCreatedDate,
  blogid,
  viewBlog,
  viewComment,
}) {
  function onViewBlogHandler(event) {
    viewBlog(blogTitle, blogContent);
  }

  function onViewCommentHandler(event) {
    viewComment(blogid);
  }
  return (
    <li className={classes.blogs}>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <div style={{ minWidth: "40%" }}>
          <h1 className={classes.blogTitle}>
            Date : {dayjs(blogCreatedDate.toString()).format("DD MMM YYYY")}
          </h1>
        </div>
        <div style={{ minWidth: "60%" }}>
          <button
            style={{ float: "right", fontSize: "13px", marginLeft: "12px" }}
            className="btn btn-dark"
            onClick={onViewCommentHandler}
          >
            View Comments
          </button>
          <button
            style={{ float: "right", fontSize: "13px" }}
            className="btn btn-dark"
            onClick={onViewBlogHandler}
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
