import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import PageStructure from "../components/PageStructure";
import { data, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";
import { DataContext } from "../components/DataContext";

function SignUp() {
  const { auth } = useContext(DataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigateHome = useNavigate();

  const registerUser = async () => {

    setLoading(true);

    const user = {
      name: name,
      email: email,
      password: password,
    };

    function errorMessageTimeout() {
      return setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }

    function clearErrorMessage(dataMessage) {
        setErrorMessage(dataMessage);
        errorMessageTimeout()
    }
    



    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
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
      if (data.success) {

        setLoading(false);
        console.log("auth", auth);

        if (auth && auth.authenticated ) {
          navigateHome("/home");
        } else {
          clearErrorMessage("Authentication failed. Please try again.");
        }
      } else {
        clearErrorMessage(data.message || "Registration failed. Please try again.");
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

        <div 
        className="create-an-account">
          <h1>Create an account</h1>
          <p>Enter your details below</p>

          <form action={SignUp}>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <input
              id="name"
              type="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
              className="sign-up-form-input"
            />

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

          <div className="sign-up-buttons">
            <button
              className="create-account-button"
              onClick={() => registerUser()}
            >
              {loading ? "loading..." : "Create Account"}
              
            </button>
            <button className="sign-up-form-button">
              {" "}
              <Icon
                icon="flat-color-icons:google"
                width="24"
                height="24"
              />{" "}
              Sign up with Google
            </button>
          </div>

          <p>
            Already have account?{" "}
            <Link to="/login">
              <button>Log in</button>
            </Link>
          </p>
        </div>
      </main>
    </PageStructure>
  );
}

export default SignUp;
