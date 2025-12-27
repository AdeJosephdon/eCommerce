import { useState, useContext } from "react";
import PageStructure from "../components/PageStructure";
import { DataContext } from "../components/DataContext";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";

function Login() {
  const { auth, refetchAuth } = useContext(DataContext);


  const navigateHome = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  
function errorMessageTimeout() {
  return setTimeout(() => {
    setErrorMessage("");
  }, 5000);
}

    function clearErrorMessage(dataMessage) {
        setErrorMessage(dataMessage);
        errorMessageTimeout()
    }

  const loginUser = async () => {
    setLoading(true);
    if (!email || !password) {
      clearErrorMessage("Please fill in all fields.");
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
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();
      console.log("Server response:", data);

      if (data.success) {
        setLoading(false);

        await refetchAuth();

        console.log("auth", auth);

        if (auth && auth.authenticated ) {
          navigateHome("/home");
        } else {
          clearErrorMessage("Login failed. Please try again.");
        }
      } else {
        clearErrorMessage(data.message || "Login failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error posting product:", error);
      setLoading(false);
      clearErrorMessage("Login failed. Please try again.", error.message);
    }
    setLoading(false);
  };

  return (
    <PageStructure>
      <main className="sign-up-container">
        {/* <div > */}
        <img src="/dl.beatsnoop 1.webp" alt="Sign Up" />
        {/* </div> */}

        <div  className="create-an-account">
          <h1>Log in to Exclusive</h1>
          <p>Enter your details below</p>

          <form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <p>
              Register/Sign Up, or use: Email: adejosephdon@gmail.com ;
              Password: Joseph123
            </p>
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
