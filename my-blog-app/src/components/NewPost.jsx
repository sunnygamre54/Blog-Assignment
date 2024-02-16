import { useState } from "react";
import classes from "./NewPost.module.css";

function NewPost({ cancelModal, onAddBlog }) {
  const [enteredContent, setEnteredContent] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");

  function changeContentHandler(event) {
    setEnteredContent(event.target.value);
  }
  function changeTitleHandler(event) {
    setEnteredTitle(event.target.value);
  }

  function submitHandler(event){
    event.preventDefault();
    const postData = {
        title : enteredTitle,
        content : enteredContent
    }
    onAddBlog(postData);
    cancelModal();
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="name">Blog Title</label>
        <input type="text" id="name" required onChange={changeTitleHandler} />
      </p>
      <p>
        <label htmlFor="body">Content</label>
        <textarea id="body" required rows={3} onChange={changeContentHandler} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelModal}>
          Cancel
        </button>
        <button>Submit</button>
      </div>
    </form>
  );
}

export default NewPost;
