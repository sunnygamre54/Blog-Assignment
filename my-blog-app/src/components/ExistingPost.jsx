import React from "react";
import classes from "./NewPost.module.css";

function ExistingPost(props) {
  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="name">Blog Title</label>
        <input disabled="true" type="text" id="name" required value={props.title}/>
      </p>
      <p>
        <label htmlFor="body">Content</label>
        <textarea disabled="true" id="body" required rows={3} value={props.content} />
      </p>
    </form>
  );
}

export default ExistingPost;
