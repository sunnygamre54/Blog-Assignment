import { MdPostAdd } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";

import classes from "./MainHeader.module.css";

function MainHeader({ onCreatePost, onViewAllBlogs, onViewMyBlogs }) {
  const username = sessionStorage.getItem("username");

  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <IoFastFoodOutline />
        Food Blogs
      </h1>
      <div style={{ display: "flex" }}>
        <p>
          <button
            type="button"
            className="btn btn-info"
            style={{ marginTop: "5px", height: "48px" }}
          >
            Hi, {username}
          </button>
        </p>
        <p>
          <button
            type="button"
            className="btn btn-success"
            style={{ marginTop: "5px", height: "48px", marginLeft: "20px" }}
            onClick={onViewAllBlogs}
          >
            View All blogs
          </button>
        </p>
        <p>
          <button
            type="button"
            className="btn btn-warning"
            style={{ marginTop: "5px", height: "48px", marginLeft: "20px" }}
            onClick={onViewMyBlogs}
          >
            View my blogs
          </button>
        </p>
        <p>
          <button
            className="btn btn-light"
            onClick={onCreatePost}
            style={{ marginTop: "5px", height: "48px", marginLeft: "20px" }}
          >
            <MdOutlineAddCircleOutline size={20} />
            New Blog
          </button>
        </p>
        <p style={{ marginLeft: "20px", marginTop: "10px" }}>
          <Link className="btn btn-danger" to={"/login"}>
            Log out
          </Link>
        </p>
      </div>
    </header>
  );
}

export default MainHeader;
