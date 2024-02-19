import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import classes from "./Register.module.css";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function changeUserName(event) {
    setUserName(event.target.value);
  }

  function changeEmail(event) {
    setEmail(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }

  function onRegister(event) {
    event.preventDefault();
    const postData = {
      userName: userName,
      userEmail: email,
      password: password,
    };

    fetch("http://localhost:5056/api/Users", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status == 200) {
          navigate("/login");
          toast.success("User Added Successfully");
        } else {
          toast.warning("User already exists");
        }
      })
      .catch((err) => {
        toast.error("Failed : " + err.message);
      });
  }


  return (
    <div className="p-3 m-0 border-0 bd-example m-0 border-0">
      <form onSubmit={onRegister}>
        <div className={"card text-center " + classes.registerCard}>
          <div className="card-header">Register</div>
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
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Email<span className={classes.required}> *</span>
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  required
                  onChange={changeEmail}
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
              Submit
            </button>            
            <button type="reset" className="btn btn-dark" >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
