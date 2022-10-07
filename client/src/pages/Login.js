import { useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postReq } from "../utilities/fetchUtils";

function Login(props) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameInput = useRef();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = await postReq("/api/login", { username, password });
      if (!data || data instanceof Error) {
        usernameInput.current.setCustomValidity("Access denied.");
        setTimeout(() => {
          e.target.requestSubmit();
        }, 1);
        return;
      }
      localStorage.setItem("currentUser", data);
      navigate(`/users/${data}`);
    },
    [navigate, password, username]
  );

  return (
    <form action="" onSubmit={handleSubmit} className="login-form">
      <div className="form-container">
        <label htmlFor="username" className="form-label">
          Enter a username:
        </label>
        <input
          ref={usernameInput}
          autoComplete="off"
          className="form-input"
          id="username"
          type="text"
          value={username}
          onChange={(e) => {
            usernameInput.current.setCustomValidity("");
            setUsername(e.target.value);
          }}
        />
      </div>

      <div className="form-container">
        <label htmlFor="password" className="form-label">
          Enter a password:
        </label>
        <input
          className="form-input"
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            usernameInput.current.setCustomValidity("");
            setPassword(e.target.value);
          }}
        />
      </div>
      <button className="btn">LOG IN</button>
    </form>
  );
}

export default Login;
