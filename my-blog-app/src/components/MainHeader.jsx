import { MdPostAdd } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineAddCircleOutline } from "react-icons/md";

import classes from "./MainHeader.module.css";

function MainHeader({ onCreatePost }) {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <IoFastFoodOutline />
        Food Blogs
      </h1>
      <p>
        <button className={classes.button} onClick={onCreatePost}>
          <MdOutlineAddCircleOutline size={20} />
          New Blog
        </button>
      </p>
    </header>
  );
}

export default MainHeader;
