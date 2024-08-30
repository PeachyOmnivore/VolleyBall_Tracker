import "./registration.css"
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { post } from "../../client-Functions";
import VolleyBallImg from "../../assets/volleyball.svg";

function Registration() {

  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  };

  const [registerData, setRegisterData] = useState(INITIAL_STATE);
  const [confirmPass, setConfirmPass] = useState({ confirmPass: "" });
  const [registerResponse, setRegisterResponse] = useState("");
  const navigate = useNavigate();

  const onInput = (event) => {
    const { name, value } = event.target;

    if (name === "confirmPass") {
      setConfirmPass({
        [name]: value,
      });
      return;
    }

    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (registerData.password !== confirmPass.confirmPass) {
      setRegisterResponse("Passwords do not match");
      return;
    }

    try {
      const data = await post(registerData, "register");

      if (!data.user) {
        setRegisterResponse(data.message);

      } else {
        setRegisterResponse("New account registered");
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/"), 2000);
        return;
      }

    } catch (err) {
      setRegisterResponse(err.message)
    }

    event.target.reset();
    setRegisterData(INITIAL_STATE);
    confirmPass.confirmPass = "";
  };

  return (
    <div className="register-container">
      <section className="register-form-container">
        <div className="register-header">
          <img
            src={VolleyBallImg}
            width="70px"
          />
        <h2>BadSpey Volleyball Registration</h2>
        </div>
        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="firstName"
            required={true}
            placeholder="First Name"
            value={registerData.firstName}
            onChange={onInput}
          />

          <input
            type="text"
            name="lastName"
            required={true}
            placeholder="Last name"
            value={registerData.lastName}
            onChange={onInput}
          />

          <input
            type="text"
            name="email"
            required={true}
            placeholder="Email"
            value={registerData.email}
            onChange={onInput}
          />
          <br />
          <input
            type="password"
            name="password"
            required={true}
            placeholder="Password"
            value={registerData.password}
            onChange={onInput}
          />
          <input
            type="password"
            name="confirmPass"
            required={true}
            placeholder="Confirm your password"
            value={confirmPass.confirmPass}
            onChange={onInput}
          />
          <br />
          <button type="submit">REGISTER</button>
        </form>
        {registerResponse && <p>{registerResponse}</p>}
        <NavLink to="/login">Login to an existing account</NavLink>
      </section>
    </div>
  );
}

export default Registration

