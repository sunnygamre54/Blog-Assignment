import { useEffect, useState } from "react";
import classes from "./NewPost.module.css";

function NewPost({ cancelModal, onAddBlog }) {
  const [enteredContent, setEnteredContent] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [fetchedUserId, setFetchedUserId] = useState("");

  function changeContentHandler(event) {
    setEnteredContent(event.target.value);
  }
  function changeTitleHandler(event) {
    setEnteredTitle(event.target.value);
  }

  useEffect(() => {
    async function fetchUserID() {
      const username = sessionStorage.getItem("username");
      const response = await fetch(
        `http://localhost:5056/api/Users/${username}`
      );
      setFetchedUserId(await response.json());
    }
    fetchUserID();
  }, []);

  function submitHandler(event) {
    event.preventDefault();
    const postData = {    
      title: enteredTitle,
      content: enteredContent,
      userId: fetchedUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log(postData);
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
