import React, { useState } from "react";
import { Icon } from "@iconify/react";
import PageStructure from "../components/PageStructure";
import { Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

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
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Error posting product:", error);
    }
  };

  return (
    <PageStructure>
      <main className="sign-up-container">
        {/* <div > */}
        <img src="/dl.beatsnoop 1.webp" alt="Sign Up" />
        {/* </div> */}

        <div className="create-an-account">
          <h1>Create an account</h1>
          <p>Enter your details below</p>

          <form action={SignUp}>
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
              Create Account
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
