import classes from "./Blogs.module.css";

function Blogs(props) {
  return (
    <li className={classes.blogs}>
      <p className={classes.blogTitle}>{props.blogTitle}</p>
      <p className={classes.blogContent}>{props.blogContent}</p>
    </li>
  );
}

export default Blogs;
