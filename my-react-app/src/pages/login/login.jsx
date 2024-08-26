import './login.css'
import {useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { post } from '../../client-Functions';
import VolleyBallImg from '../../assets/volleyball.svg'

function Login() {
    const INITIAL_STATE = {
      email: "",
      password: "",
      remember: false,
    };
  
    const navigate = useNavigate()
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
          
          setTimeout(() => navigate('/'), 2000)
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              required={true}
              placeholder="Enter your email"
              value={loginData.email}
              onChange={onInput}
            />
            <label htmlFor="subject">Password:</label>
            <input
              type="password"
              name="password"
              required={true}
              placeholder="Enter your password"
              value={loginData.password}
              onChange={onInput}
            />
            <label htmlFor="remember">
              Remember me?
              <input
                className="checkbox"
                type="checkbox"
                checked={loginData.remember}
                name="remember"
                value={true}
                onChange={(event) => {
                  onInput(event);
                }}
              />
            </label>
            <button type="submit">LOGIN</button>
          </form>
          {loginResponse && <p>{loginResponse}</p>}
          <NavLink to="/register">Create a new account</NavLink>
        </section>
      </div>
    );
  }

export default Login;
