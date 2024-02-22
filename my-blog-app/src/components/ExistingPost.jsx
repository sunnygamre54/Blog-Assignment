import React from "react";
import classes from "./NewPost.module.css";

function ExistingPost(props) {
  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="name">Blog Title</label>
        <input type="text" id="name" required value={props.title}/>
      </p>
      <p>
        <label htmlFor="body">Content</label>
        <textarea id="body" required rows={3} value={props.content} />
      </p>
    </form>
  );
}

export default ExistingPost;
