import React, { useEffect, useState } from "react";
import classes from "./NewPost.module.css";
import dayjs from "dayjs";

function Comments({ closeModal, blogData, userid }) {
  const [currentComment, setCurrentComment] = useState("");
  const [comments, setComments] = useState([]);

  function onCommentChangeHandler(event) {
    setCurrentComment(event.target.value);
  }

  useEffect(() => {
    async function getComments() {
      const response = await fetch(
        `http://localhost:5056/api/Comments/${blogData}`
      );
      const jsonResponse = await response.json();
      setComments(jsonResponse);
    }
    getComments();
  }, []);

  function setCommentsData(commentData) {
    setComments((comments) => [...comments, commentData]);
  }

  function submitHandler(event) {
    event.preventDefault();
    const jwtToken = sessionStorage.getItem("jwtToken");
    const postData = {
      blogID: blogData,
      userID: userid,
      content: currentComment,
      createdAt: new Date(),
    };

    fetch("http://localhost:5056/api/Comments", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
        Authentication: "bearer" + jwtToken,
      },
    }).then((res) => {
      setCommentsData(postData);
    });
  }

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        {comments.map((comment) => {
          return (
            <div
              style={{
                backgroundColor: "black",
                borderRadius: "8px",
                padding: "7px",
                marginBottom: "10px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <label htmlFor="name">UserID : {comment.userID}</label>
                </div>
                <div style={{ width: "50%", float: "right" }}>
                  <label htmlFor="name">
                    Date :{" "}
                    {dayjs(comment.createdAt.toString()).format("DD MMM YYYY")}
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="name">Comment : {comment.content}</label>
              </div>
            </div>
          );
        })}
        <div className={classes.actions}>
          <textarea
            style={{ minHeight: "100%" }}
            type="text"
            id="name"
            onChange={onCommentChangeHandler}
            required
          />
          <button>Add</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default Comments;
