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
                  <h1>Welcome!</h1>
                  <img
                      src={VolleyBallImg}
                      width="70px"
                      alt="Well grounded counselling logo"
                  />
              </div>
              <h2>Register a new account</h2>
              <form onSubmit={handleRegister}>
                  <label htmlFor="firstName">First name:</label>
                  <input
                      type="text"
                      name="firstName"
                      required={true}
                      placeholder="Enter your first name"
                      value={registerData.firstName}
                      onChange={onInput}
                  />
                  <label htmlFor="lastName">Last name:</label>
                  <input
                      type="text"
                      name="lastName"
                      required={true}
                      placeholder="Enter your last name"
                      value={registerData.lastName}
                      onChange={onInput}
                  />
                  <label htmlFor="email">Phone number:</label>
                  <input
                      type="phone"
                      name="phone"
                      required={true}
                      placeholder="Enter your phone number"
                      value={registerData.phone}
                      onChange={onInput}
                  />
                  <br />
                  <hr />
                  <label htmlFor="email">Email:</label>
                  <input
                      type="text"
                      name="email"
                      required={true}
                      placeholder="Enter your email or username"
                      value={registerData.email}
                      onChange={onInput}
                  />
                  <label htmlFor="subject">Password:</label>
                  <input
                      type="password"
                      name="password"
                      required={true}
                      placeholder="Enter your password"
                      value={registerData.password}
                      onChange={onInput}
                  />
                  <label htmlFor="confirmPass">Confirm password:</label>
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

