import { useState } from "react";
import { Icon } from "@iconify/react";
import PageStructure from "./PageStructure";



function SignUp() {

  const [login, setLogin] = useState(false);

    function clicked() {
    setLogin(prevlogin => !prevlogin);
  }

  return (

    <PageStructure>
      <main className="sign-up-container">
        {/* <div > */}
          <img src="/dl.beatsnoop 1.png" alt="Sign Up" />
        {/* </div> */}



        {
          login 
          ? 
          <div className="create-an-account">
          <h1>Log in to Exclusive</h1>
          <p>Enter your details below</p>

          <form action={SignUp}>

            <input id="email" type="email" name="email" placeholder="Email or Phone Number" className="sign-up-form-input"/>

            <input id="password" type="password" name="password" placeholder="Password" className="sign-up-form-input"/>

          </form>


          <div className="login-buttons">
          <button className="login-button">Log In</button>
          <button className="forgot-password-button">Forget Password?</button>
          </div>
        </div> 
        :

          <div className="create-an-account">
          <h1>Create and account</h1>
          <p>Enter your details below</p>

          <form action={SignUp}>

            <input id="name" type="name" name="name" placeholder="Name" className="sign-up-form-input"/>

            <input id="email" type="email" name="email" placeholder="Email or Phone Number" className="sign-up-form-input"/>

            <input id="password" type="password" name="password" placeholder="Password" className="sign-up-form-input"/>

          </form>


          <div className="sign-up-buttons">
          <button className="create-account-button">Create Account</button>
          <button className="sign-up-form-button"> <Icon icon="flat-color-icons:google" width="24" height="24" /> Sign up with Google</button>
          </div>


          <p>Already have account? <button onClick={clicked}>Log in</button></p>
        </div>
        }
        

      </main>
    </PageStructure>




  );
}

export default SignUp;