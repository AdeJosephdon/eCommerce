import { Icon } from "@iconify/react";
import PageStructure from "../components/PageStructure";
import { Link } from "react-router-dom";



function SignUp() {


  return (

    <PageStructure>
      <main className="sign-up-container">
        {/* <div > */}
          <img src="/dl.beatsnoop 1.png" alt="Sign Up" />
        {/* </div> */}

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


          <p>Already have account? <Link to="/login"><button>Log in</button></Link></p>
        </div>

      </main>
    </PageStructure>




  );
}

export default SignUp;