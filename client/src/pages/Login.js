import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageStructure from "../components/PageStructure";
import { DataContext } from "../components/DataContext";
import { set } from "mongoose";

function Login() {
  const navigateHome = useNavigate();

  const { auth } = useContext(DataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    setLoading(true);
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      setLoading(false);
      return;
    }
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            // Add auth token or cookies if required
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();
      console.log("Server response:", data);

      if (data.success) {
        window.location.href = "/home";
        setLoading(false);
        console.log("auth", auth);
      }
    } catch (error) {
      console.error("Error posting product:", error);
      setLoading(false);
      setErrorMessage("Login failed. Please try again.", error.message);
    }
    setLoading(false);
  };

  return (
    <PageStructure>
      <main className="sign-up-container">
        {/* <div > */}
        <img src="/dl.beatsnoop 1.png" alt="Sign Up" />
        {/* </div> */}

        <div className="create-an-account">
          <h1>Log in to Exclusive</h1>
          <p>Enter your details below</p>

          <form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <input
              id="email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              className="sign-up-form-input"
            />

            <input
              id="password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="sign-up-form-input"
            />
          </form>

          <div className="login-buttons">
            <button
              className="login-button"
              onClick={() => loginUser()}
              disabled={loading}
            >
              {loading ? "loading..." : "Log In"}
            </button>
            <button className="forgot-password-button">Forget Password?</button>
          </div>
        </div>
      </main>
    </PageStructure>
  );
}

export default Login;
