import "./login.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { post } from "../../client-Functions";
import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch.jsx";
import VolleyBallImg from "../../assets/volleyball.svg";

function Login() {
  const INITIAL_STATE = {
    email: "",
    password: "",
    remember: false,
  };

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(INITIAL_STATE);
  const [loginResponse, setloginResponse] = useState("");

  const onInput = (event) => {
    const { name, value } = event.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await post(loginData, "users/login");

      if (!data.token) {
        setloginResponse(data.message);
      } else {
        setloginResponse(data.message);
        if (loginData.remember) {
          localStorage.setItem("token", data.token);
        }

        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setloginResponse(err.message);
    }

    event.target.reset();
    setLoginData(INITIAL_STATE);
  };

  return (
    <div className="login-container">
      <section className="login-form-container">
        <div className="login-header">
          <img
            src={VolleyBallImg}
            width="70px"
            alt="Well grounded counselling logo"
          />
          <h1>BadSpey Volleyball Login</h1>
        </div>
        <form onSubmit={handleLogin}>
          <section>
            <input
              type="email"
              name="email"
              required={true}
              placeholder="Email"
              value={loginData.email}
              onChange={onInput}
            />
          </section>
          <section>
            <input
              type="password"
              name="password"
              required={true}
              placeholder="Password"
              value={loginData.password}
              onChange={onInput}
            />
          </section>
          <section className="remember">
            <p>Remember me?</p>
            <div>
              <ToggleSwitch check={loginData.remember} onInput={onInput} />
            </div>
          </section>
          <button type="submit">LOGIN</button>
        </form>
        {loginResponse && <p>{loginResponse}</p>}
        <NavLink to="/register">Create a new account</NavLink>
      </section>
    </div>
  );
}

export default Login;
