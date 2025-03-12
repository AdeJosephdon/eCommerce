import PageStructure from "../components/PageStructure";



function Login() {

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

            <input id="email" type="email" name="email" placeholder="Email or Phone Number" className="sign-up-form-input"/>

            <input id="password" type="password" name="password" placeholder="Password" className="sign-up-form-input"/>

          </form>


          <div className="login-buttons">
          <button className="login-button">Log In</button>
          <button className="forgot-password-button">Forget Password?</button>
          </div>
        </div> 

        

      </main>
    </PageStructure>




  );
}

export default Login;