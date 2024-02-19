import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import classes from "./Login.module.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function changeUserName(event) {
    setUserName(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  function onLogin(event) {
    console.log("hit");
    event.preventDefault();
    const postData = {
      userName: userName,
      password: password,
    };

    fetch("http://localhost:5056/api/Users/ValidateUser", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status == 200) {
          navigate("/");
          toast.success("Login Successfull");
          sessionStorage.setItem("username",userName);
        } else {
          toast.error("Wrong UserName or Password or User Doesn't exist");
        }
      })
      .catch((err) => {
        toast.error("Login Failed due to : "+err.message);
      });
  }

  return (
    <div className="p-3 m-0 border-0 bd-example m-0 border-0">
      <form onSubmit={onLogin}>
        <div className={"card text-center " + classes.registerCard}>
          <div className="card-header">Login</div>
          <div className={"card-body " + classes.registerCardBody}>
            <div className="row mb-3">
              <label
                htmlFor="InputUserName"
                className="col-sm-2 col-form-label"
              >
                User Name<span className={classes.required}> *</span>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="InputUserName"
                  required
                  onChange={changeUserName}
                />
              </div>
            </div>            
            <div className="row mb-3">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
                
              >
                Password<span className={classes.required}> *</span>
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  required
                  onChange={changePassword}
                />
              </div>
            </div>
          </div>
          <div className="card-footer text-body-secondary">
            <button type="submit" className="btn btn-primary" style={{marginRight : "10px"}}>
              Login
            </button>
            <Link type="button" className="btn btn-success" to={"/register"}>
              New User
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
